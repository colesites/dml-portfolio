import { getIpcExport } from "./lib/ipc/methods.js";
import { mapCommandAsync, mapCommandSync } from "./lib/methods/command.js";
import { createExeca } from "./lib/methods/create.js";
import { mapNode } from "./lib/methods/node.js";
import {
  deepScriptOptions,
  mapScriptAsync,
  setScriptSync,
} from "./lib/methods/script.js";

export { parseCommandString } from "./lib/methods/command.js";
export { ExecaError, ExecaSyncError } from "./lib/return/final-error.js";

export const execa = createExeca(() => ({}));
export const execaSync = createExeca(() => ({ isSync: true }));
export const execaCommand = createExeca(mapCommandAsync);
export const execaCommandSync = createExeca(mapCommandSync);
export const execaNode = createExeca(mapNode);
export const $ = createExeca(
  mapScriptAsync,
  {},
  deepScriptOptions,
  setScriptSync,
);

const { sendMessage, getOneMessage, getEachMessage, getCancelSignal } =
  getIpcExport();
export { sendMessage, getOneMessage, getEachMessage, getCancelSignal };
