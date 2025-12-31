import type { ChatRole } from "@/types/chat";

export type GatewayChatMessage = {
  role: ChatRole;
  content: string;
};

export type GatewayChatCompletionChoice = {
  message?: {
    role: ChatRole;
    content: string | null;
  };
};

export type GatewayChatCompletionResponse = {
  id: string;
  choices: GatewayChatCompletionChoice[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
};

type ChatCompletionOptions = {
  messages: GatewayChatMessage[];
  temperature?: number;
  maxTokens?: number;
};

// KEEP THIS - used by create-session.ts and helper functions
export async function sendChatCompletion({
  messages,
  temperature,
  maxTokens,
}: ChatCompletionOptions): Promise<GatewayChatCompletionResponse> {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    throw new Error("AI_GATEWAY_API_KEY is not configured.");
  }

  const endpoint = "https://ai-gateway.vercel.sh/v1/chat/completions";
  const model = process.env.AI_GATEWAY_MODEL || "openai/gpt-4o-mini";

  const payload: Record<string, unknown> = { model, messages };
  if (typeof temperature === "number") payload.temperature = temperature;
  if (typeof maxTokens === "number") payload.max_tokens = maxTokens;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as GatewayChatCompletionResponse & {
    error?: { message?: string };
  };

  if (!res.ok) {
    const msg = data?.error?.message ?? `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

// KEEP THIS - used by create-session.ts and helper functions
export function extractMessageText(choice: GatewayChatCompletionChoice): {
  text: string;
  reasoning?: string;
} {
  const content = choice?.message?.content;
  if (typeof content === "string") {
    return { text: content.trim() };
  }
  return { text: "" };
}

// NEW - for streaming in route.ts
export async function sendChatCompletionStream({
  messages,
  temperature,
  maxTokens,
}: ChatCompletionOptions): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    throw new Error("AI_GATEWAY_API_KEY is not configured.");
  }

  const endpoint = "https://ai-gateway.vercel.sh/v1/chat/completions";
  const model = process.env.AI_GATEWAY_MODEL || "openai/gpt-4o-mini";

  const payload: Record<string, unknown> = {
    model,
    messages,
    stream: true,
  };
  if (typeof temperature === "number") payload.temperature = temperature;
  if (typeof maxTokens === "number") payload.max_tokens = maxTokens;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Stream request failed: ${res.status} - ${error}`);
  }

  if (!res.body) {
    throw new Error("No response body");
  }

  return res.body;
}
