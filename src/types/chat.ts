export type ChatRole = "system" | "user" | "assistant" | "tool";

export type AttachmentPart = {
  id?: string;
  type?: "file";
  url?: string | null;
  mediaType?: string | null;
  filename?: string | null;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  reasoning?: string | null;
  attachments?: AttachmentPart[];
  createdAt?: string;
};

export type ChatStatus = "idle" | "submitted" | "streaming" | "error";
