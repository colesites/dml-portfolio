import { NextResponse } from "next/server";
import {
  fetchPortfolioContext,
  formatContextForPrompt,
} from "@/lib/chat/context";
import {
  extractMessageText,
  type GatewayChatMessage,
  sendChatCompletion,
  sendChatCompletionStream,
} from "@/lib/chat/gateway";
import { DEFAULT_CHAT_TONE_ID, getToneInstructions } from "@/lib/config";
import { loadPrompt } from "@/lib/prompts";
import type { ChatMessage } from "@/types/chat";

const MAX_HISTORY = 12;

type ChatRequestPayload = {
  messages: Pick<ChatMessage, "role" | "content">[];
  tone?: string;
  sessionId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestPayload;

    if (!Array.isArray(body?.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 },
      );
    }

    const sanitizedHistory = sanitizeMessages(body.messages);
    if (sanitizedHistory.length === 0) {
      return NextResponse.json(
        { error: "Unable to process empty conversation." },
        { status: 400 },
      );
    }

    const latestUserMessage = [...sanitizedHistory]
      .reverse()
      .find((m) => m.role === "user");

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "A user message is required." },
        { status: 400 },
      );
    }

    const topicAllowed = await allowTopic(latestUserMessage.content);
    if (!topicAllowed) {
      const moderationReply = await buildModeratorResponse(
        latestUserMessage.content,
      );
      return NextResponse.json({
        answer: moderationReply,
        reasoning: null,
        followUps: [],
        filtered: true,
      });
    }

    const [context, aiTwinPrompt, guardrailPrompt] = await Promise.all([
      fetchPortfolioContext().catch(() => null),
      loadPrompt("ai_twin_with_sanity_mcp.txt").catch(() => ""),
      loadPrompt("guardrail_fail_agent.txt").catch(() => ""),
    ]);

    const toneInstructions = getToneInstructions(
      body.tone ?? DEFAULT_CHAT_TONE_ID,
    );

    const contextForPrompt = context
      ? formatContextForPrompt(context)
      : "Portfolio data is temporarily unavailable.";

    const structuredResponseInstruction = `IMPORTANT: Always respond with valid JSON in this exact format. Never omit any field:
      {"answer": "your reply here", "reasoning": "your thinking process here - never leave empty", "followUps": ["suggestion 1", "suggestion 2"]}`;

    const systemMessages: GatewayChatMessage[] = [];

    if (aiTwinPrompt) {
      systemMessages.push({ role: "system", content: aiTwinPrompt });
    }
    if (guardrailPrompt) {
      systemMessages.push({ role: "system", content: guardrailPrompt });
    }
    systemMessages.push({
      role: "system",
      content: `Tone: ${toneInstructions}`,
    });
    systemMessages.push({
      role: "system",
      content: `Knowledge base:\n${contextForPrompt}`,
    });
    systemMessages.push({
      role: "system",
      content: structuredResponseInstruction,
    });

    const trimmedHistory = sanitizedHistory.slice(-MAX_HISTORY);

    const formatReminder: GatewayChatMessage = {
      role: "system",
      content: `Remember: You MUST respond with valid JSON: {"answer": "...", "reasoning": "...", "followUps": [...]}`,
    };

    const stream = await sendChatCompletionStream({
      messages: [...systemMessages, ...trimmedHistory, formatReminder],
      temperature: 0.65,
      maxTokens: 800,
    });

    const transformedStream = new ReadableStream({
      async start(controller) {
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === "data: [DONE]") continue;
              if (!trimmed.startsWith("data: ")) continue;

              try {
                const json = JSON.parse(trimmed.slice(6));
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(transformedStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("[api/chat] error", error);
    return NextResponse.json(
      { error: "Unable to process chat request." },
      { status: 500 },
    );
  }
}

function sanitizeMessages(
  messages: Pick<ChatMessage, "role" | "content">[],
): GatewayChatMessage[] {
  const allowedRoles = new Set<ChatMessage["role"]>(["user", "assistant"]);
  return messages
    .filter(
      (msg): msg is ChatMessage =>
        typeof msg?.content === "string" &&
        allowedRoles.has(msg.role) &&
        msg.content.trim().length > 0,
    )
    .map((msg) => ({ role: msg.role, content: msg.content }));
}

async function allowTopic(message: string): Promise<boolean> {
  try {
    const topicPrompt = await loadPrompt("topic_filter_prompt.txt");
    const response = await sendChatCompletion({
      messages: [
        { role: "system", content: topicPrompt },
        { role: "user", content: message },
      ],
      temperature: 0,
      maxTokens: 8,
    });
    const classification = extractMessageText(response.choices[0] ?? {})
      .text.trim()
      .toLowerCase();
    if (classification.includes("false")) return false;
    return true;
  } catch {
    return true;
  }
}

async function buildModeratorResponse(message: string): Promise<string> {
  try {
    const moderatorPrompt = await loadPrompt("topic_moderator_agent.txt");
    const response = await sendChatCompletion({
      messages: [
        { role: "system", content: moderatorPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      maxTokens: 200,
    });
    return (
      extractMessageText(response.choices[0] ?? {}).text ||
      "Please keep questions focused on my work."
    );
  } catch {
    return "Let's focus on my professional experience.";
  }
}
