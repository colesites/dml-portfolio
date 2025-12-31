import { readFile } from "node:fs/promises";
import path from "node:path";

const cache = new Map<string, string>();

async function readPromptFromDisk(fileName: string) {
  const filePath = path.join(process.cwd(), "prompts", fileName);
  const content = await readFile(filePath, "utf-8");
  return content.trim();
}

export async function loadPrompt(fileName: string) {
  if (!cache.has(fileName)) {
    const contents = await readPromptFromDisk(fileName);
    cache.set(fileName, contents);
  }

  return cache.get(fileName)!;
}


