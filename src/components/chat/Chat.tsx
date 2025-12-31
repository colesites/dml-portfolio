"use client";

import { useEffect, useRef, useState } from "react";
import { SparklesIcon, XIcon } from "lucide-react";
import { nanoid } from "nanoid";

import {
  createSession,
  type ChatSessionBootstrap,
} from "@/app/actions/create-session";
import {
  CHAT_DISCLAIMER,
  CHAT_GREETING_FALLBACK,
  CHAT_PLACEHOLDER_INPUT,
  CHAT_STARTER_PROMPTS,
  CHAT_TONE_OPTIONS,
  DEFAULT_CHAT_TONE_ID,
  type ChatStarterPrompt,
} from "@/lib/config";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputController,
} from "@/components/ai-elements/prompt-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import type { CHAT_PROFILE_QUERY_RESULT } from "../../../sanity.types";
import type { ChatMessage, ChatStatus } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../ui/sidebar";

type ChatApiResponse = {
  answer: string;
  reasoning?: string | null;
  followUps?: string[];
  filtered?: boolean;
  error?: string;
};

type ChatProps = {
  profile: CHAT_PROFILE_QUERY_RESULT | null;
};

const STORAGE_KEY = "chat-messages";

export function Chat({ profile }: ChatProps) {
  const { toggleSidebar } = useSidebar();
  const [session, setSession] = useState<ChatSessionBootstrap | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [tone, setTone] =
    useState<(typeof CHAT_TONE_OPTIONS)[number]["id"]>(DEFAULT_CHAT_TONE_ID);
  const [suggestions, setSuggestions] =
    useState<ChatStarterPrompt[]>(CHAT_STARTER_PROMPTS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  );
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [displayedContent, setDisplayedContent] = useState<string>("");

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const ready = Boolean(session);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const bootstrapSession = await createSession();
        if (!isMounted) return;
        setSession(bootstrapSession);

        if (messagesRef.current.length === 0) {
          setMessages([
            {
              id: bootstrapSession.id,
              role: "assistant",
              content: bootstrapSession.greeting,
            },
          ]);
        }
      } catch (error) {
        if (!isMounted) return;
        console.warn("[Chat] Falling back to default greeting", error);
        setSession({
          id: nanoid(),
          greeting: buildGreetingFallback(profile),
          disclaimer: CHAT_DISCLAIMER,
        });

        if (messagesRef.current.length === 0) {
          setMessages([
            {
              id: nanoid(),
              role: "assistant",
              content: buildGreetingFallback(profile),
            },
          ]);
        }
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, [profile]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Typewriter effect
  useEffect(() => {
    if (!typingMessageId) return;

    const message = messages.find((m) => m.id === typingMessageId);
    if (!message) return;

    const fullContent = message.content;
    if (displayedContent.length >= fullContent.length) {
      setTypingMessageId(null);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedContent(fullContent.slice(0, displayedContent.length + 2));
    }, 10);

    return () => clearTimeout(timeout);
  }, [typingMessageId, displayedContent, messages]);

  const handleSubmit = async ({ text }: { text: string }) => {
    const content = text.trim();
    if (!content) return;
    if (!session) {
      setErrorMessage("Still getting everything ready—try again in a moment.");
      return;
    }

    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: nanoid(),
      role: "user",
      content,
    };

    const nextMessages = [...messagesRef.current, userMessage];
    setMessages(nextMessages);
    setStatus("submitted");

    const assistantId = nanoid();
    setStreamingMessageId(assistantId);
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "", reasoning: null },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          tone,
          messages: nextMessages.map(({ role, content: c }) => ({
            role,
            content: c,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error ?? "Unable to get a response.");
      }

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as ChatApiResponse;
        const answerContent = payload.answer ?? CHAT_GREETING_FALLBACK;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content: answerContent,
                  reasoning: payload.reasoning ?? null,
                }
              : msg
          )
        );

        setStreamingMessageId(null);
        setDisplayedContent("");
        setTypingMessageId(assistantId);
        setStatus("idle");

        if (Array.isArray(payload.followUps) && payload.followUps.length > 0) {
          setSuggestions(
            payload.followUps.map((prompt, index) => ({
              id: `follow-up-${index}`,
              label: prompt,
              prompt,
            }))
          );
        } else {
          setSuggestions(CHAT_STARTER_PROMPTS);
        }
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      const parsed = parseStructuredResponse(fullText);
      console.log("=== DEBUG ===");
      console.log("Raw response:", fullText);
      console.log("Parsed:", parsed);
      console.log("Reasoning value:", parsed.reasoning);
      console.log("Reasoning type:", typeof parsed.reasoning);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content: parsed.answer,
                reasoning: parsed.reasoning ?? null,
              }
            : msg
        )
      );

      setStreamingMessageId(null);
      setDisplayedContent("");
      setTypingMessageId(assistantId);
      setStatus("idle");

      if (Array.isArray(parsed.followUps) && parsed.followUps.length > 0) {
        setSuggestions(
          parsed.followUps.map((prompt, index) => ({
            id: `follow-up-${index}`,
            label: prompt,
            prompt,
          }))
        );
      } else {
        setSuggestions(CHAT_STARTER_PROMPTS);
      }
    } catch (error) {
      console.error("[Chat] send message error", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== assistantId));
      setStreamingMessageId(null);
      setTypingMessageId(null);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const getDisplayContent = (message: ChatMessage) => {
    if (message.id === typingMessageId) {
      return displayedContent;
    }
    return message.content;
  };

  const currentDisclaimer = session?.disclaimer ?? CHAT_DISCLAIMER;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <ChatHeader profile={profile} onClose={toggleSidebar} />

      {/* Scrollable conversation area */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Conversation>
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                className="mt-10"
                description="I'm loading my Sanity CMS data—hang tight!"
                icon={<SparklesIcon className="size-6" />}
                title="Preparing your AI twin..."
              />
            ) : (
              messages.map((message, index) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.role === "assistant" &&
                      (message.id === streamingMessageId ? (
                        <Reasoning defaultOpen={true} isStreaming={true}>
                          <ReasoningTrigger />
                          <ReasoningContent>Thinking...</ReasoningContent>
                        </Reasoning>
                      ) : message.reasoning ? (
                        <Reasoning defaultOpen={index === messages.length - 1}>
                          <ReasoningTrigger />
                          <ReasoningContent>
                            {message.reasoning}
                          </ReasoningContent>
                        </Reasoning>
                      ) : null)}
                    {message.id !== streamingMessageId && (
                      <MessageResponse>
                        {getDisplayContent(message)}
                      </MessageResponse>
                    )}
                  </MessageContent>
                </Message>
              ))
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {/* Fixed input area */}
      <div className="shrink-0 border-t bg-background">
        <PromptInputProvider>
          <SuggestionBar suggestions={suggestions} />
          <PromptInput className="px-4 pb-3" onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                aria-label="Ask me anything"
                disabled={!ready || status === "submitted"}
                placeholder={CHAT_PLACEHOLDER_INPUT}
              />
            </PromptInputBody>
            <PromptInputFooter className="gap-3 pt-2">
              <PromptInputTools>
                <PromptInputSelect
                  disabled={status === "submitted"}
                  onValueChange={(value) =>
                    setTone(value as (typeof CHAT_TONE_OPTIONS)[number]["id"])
                  }
                  value={tone}
                >
                  <PromptInputSelectTrigger className="w-[110px]">
                    <PromptInputSelectValue />
                  </PromptInputSelectTrigger>
                  <PromptInputSelectContent>
                    {CHAT_TONE_OPTIONS.map((option) => (
                      <PromptInputSelectItem key={option.id} value={option.id}>
                        {option.label}
                      </PromptInputSelectItem>
                    ))}
                  </PromptInputSelectContent>
                </PromptInputSelect>
              </PromptInputTools>
              <div className="flex flex-1 items-center justify-end gap-3">
                {errorMessage && (
                  <span className="text-xs text-destructive">
                    {errorMessage}
                  </span>
                )}
                <PromptInputSubmit
                  disabled={!ready || status === "submitted"}
                  status={
                    status === "submitted"
                      ? "submitted"
                      : status === "error"
                        ? "error"
                        : "idle"
                  }
                />
              </div>
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
        <p className="px-4 pb-4 text-xs text-muted-foreground">
          {currentDisclaimer}
        </p>
      </div>
    </div>
  );
}

type ChatHeaderProps = {
  profile: CHAT_PROFILE_QUERY_RESULT | null;
  onClose: () => void;
};

function ChatHeader({ profile, onClose }: ChatHeaderProps) {
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="shrink-0 flex items-center justify-between border-b px-4 py-3">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">Chat with {fullName || "me"}</p>
        <p className="text-xs text-muted-foreground">
          {profile?.headline || "Ask anything about my work or projects."}
        </p>
      </div>
      <Button
        aria-label="Close chat"
        className="h-8 w-8"
        onClick={onClose}
        size="icon"
        type="button"
        variant="ghost"
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  );
}

type SuggestionBarProps = {
  suggestions: ChatStarterPrompt[];
};

function SuggestionBar({ suggestions }: SuggestionBarProps) {
  const controller = usePromptInputController();

  if (!suggestions.length) {
    return null;
  }

  return (
    <Suggestions className="px-4 py-3">
      {suggestions.map((suggestion) => (
        <Suggestion
          key={suggestion.id}
          onClick={() => controller.textInput.setInput(suggestion.prompt)}
          suggestion={suggestion.prompt}
        >
          {suggestion.label}
        </Suggestion>
      ))}
    </Suggestions>
  );
}

function buildGreetingFallback(profile: CHAT_PROFILE_QUERY_RESULT | null) {
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) {
    return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
  }

  return CHAT_GREETING_FALLBACK;
}

function parseStructuredResponse(raw: string) {
  if (!raw) {
    return { answer: CHAT_GREETING_FALLBACK, reasoning: null, followUps: [] };
  }
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```\s*$/i, "");
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first !== -1 && last > first) {
    try {
      const parsed = JSON.parse(cleaned.slice(first, last + 1));
      return {
        answer: typeof parsed.answer === "string" ? parsed.answer : raw,
        reasoning:
          typeof parsed.reasoning === "string" ? parsed.reasoning : null,
        followUps: Array.isArray(parsed.followUps)
          ? parsed.followUps.filter((x: unknown) => typeof x === "string")
          : [],
      };
    } catch {
      // fall through
    }
  }
  return { answer: raw, reasoning: null, followUps: [] };
}

export default Chat;
