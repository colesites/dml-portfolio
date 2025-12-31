// src/helper/ssg/index.ts
export * from "./ssg.js";

import {
  disableSSG,
  isSSGContext,
  onlySSG,
  ssgParams,
  X_HONO_DISABLE_SSG_HEADER_KEY,
} from "./middleware.js";
export {
  X_HONO_DISABLE_SSG_HEADER_KEY,
  disableSSG,
  isSSGContext,
  onlySSG,
  ssgParams,
};
