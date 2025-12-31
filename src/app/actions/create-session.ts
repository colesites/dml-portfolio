"use server";

import { CHAT_DISCLAIMER, CHAT_GREETING_FALLBACK } from "@/lib/config";
import { sendChatCompletion, extractMessageText } from "@/lib/chat/gateway";
import { loadPrompt } from "@/lib/prompts";
import { serverClient } from "@/sanity/lib/serverClient";

type ProfileSummary = {
  firstName?: string | null;
  lastName?: string | null;
  headline?: string | null;
  shortBio?: string | null;
};

const PROFILE_QUERY = `*[_type == "profile"][0]{
  firstName,
  lastName,
  headline,
  shortBio
}`;

export type ChatSessionBootstrap = {
  id: string;
  greeting: string;
  disclaimer: string;
};

export async function createSession(): Promise<ChatSessionBootstrap> {
  const [profile, aiTwinPrompt] = await Promise.all([
    serverClient.fetch<ProfileSummary | null>(PROFILE_QUERY).catch(() => null),
    loadPrompt("ai_twin_with_sanity_mcp.txt").catch(() => ""),
  ]);

  const fallback = buildFallbackGreeting(profile);

  try {
    const completion = await sendChatCompletion({
      messages: [
        {
          role: "system",
          content: `${aiTwinPrompt}\nYou are about to greet a visitor on your portfolio website. Respond with a warm, 2 sentence introduction inviting them to ask questions.`,
        },
        {
          role: "user",
          content: JSON.stringify({
            profile,
            instructions:
              "Introduce yourself using the profile data if available.",
          }),
        },
      ],
      temperature: 0.8,
      maxTokens: 200,
    });

    const greeting =
      extractMessageText(completion.choices[0] ?? {}).text || fallback;

    return {
      id: crypto.randomUUID(),
      greeting,
      disclaimer: CHAT_DISCLAIMER,
    };
  } catch (error) {
    console.warn("[createSession] Falling back to static greeting", error);
    return {
      id: crypto.randomUUID(),
      greeting: fallback,
      disclaimer: CHAT_DISCLAIMER,
    };
  }
}

function buildFallbackGreeting(profile: ProfileSummary | null) {
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) {
    return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
  }

  return CHAT_GREETING_FALLBACK;
}
