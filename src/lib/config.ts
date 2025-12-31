export type ChatStarterPrompt = {
  id: string;
  label: string;
  prompt: string;
  icon?: string;
};

export type ChatToneOption = {
  id: "crisp" | "clear" | "chatty";
  label: string;
  description: string;
  instructions: string;
};

export const CHAT_STARTER_PROMPTS: ChatStarterPrompt[] = [
  {
    id: "experience",
    label: "What's your experience?",
    prompt: "Tell me about your professional experience and previous roles.",
    icon: "suitcase",
  },
  {
    id: "skills",
    label: "What skills do you have?",
    prompt: "What technologies and programming languages do you specialize in?",
    icon: "square-code",
  },
  {
    id: "projects",
    label: "What have you built?",
    prompt: "Show me some of your most interesting projects.",
    icon: "cube",
  },
  {
    id: "about",
    label: "Who are you?",
    prompt: "Tell me more about yourself and your background.",
    icon: "user",
  },
];

export const CHAT_PLACEHOLDER_INPUT = "Ask me anything about my work...";

export const CHAT_GREETING_FALLBACK =
  "Hi there! Ask me anything about my work, experience, or projects.";

export const CHAT_DISCLAIMER =
  "Disclaimer: This is my AI twin. Please verify important details.";

export const CHAT_TONE_OPTIONS: ChatToneOption[] = [
  {
    id: "crisp",
    label: "Crisp",
    description: "Concise and factual",
    instructions:
      "Answer in 2-3 sentences. Focus on facts, metrics, and direct outcomes.",
  },
  {
    id: "clear",
    label: "Clear",
    description: "Helpful and professional",
    instructions:
      "Provide 4-6 sentences with context, rationale, and how the work was done.",
  },
  {
    id: "chatty",
    label: "Chatty",
    description: "Friendly and conversational",
    instructions:
      "Sound relaxed, sprinkle in light enthusiasm, and keep the conversation flowing naturally.",
  },
];

export const DEFAULT_CHAT_TONE_ID: ChatToneOption["id"] = "clear";

export function getToneInstructions(toneId: string): string {
  return (
    CHAT_TONE_OPTIONS.find((tone) => tone.id === toneId)?.instructions ??
    CHAT_TONE_OPTIONS.find((tone) => tone.id === DEFAULT_CHAT_TONE_ID)!
      .instructions
  );
}
