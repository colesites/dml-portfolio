// src/adapter/deno/index.ts

import { getConnInfo } from "./conninfo.js";
import { serveStatic } from "./serve-static.js";
import { denoFileSystemModule, toSSG } from "./ssg.js";
import { upgradeWebSocket } from "./websocket.js";
export {
  denoFileSystemModule,
  getConnInfo,
  serveStatic,
  toSSG,
  upgradeWebSocket,
};
