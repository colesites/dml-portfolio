"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? (o, m, k, k2) => {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = { enumerable: true, get: () => m[k] };
        }
        Object.defineProperty(o, k2, desc);
      }
    : (o, m, k, k2) => {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? (o, v) => {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : (o, v) => {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  ((mod) => {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.hasOwn(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  });
var __exportStar =
  (this && this.__exportStar) ||
  ((m, exports) => {
    for (var p in m)
      if (p !== "default" && !Object.hasOwn(exports, p))
        __createBinding(exports, m, p);
  });
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = exports.isexe = exports.posix = exports.win32 = void 0;
const posix = __importStar(require("./posix.js"));
exports.posix = posix;
const win32 = __importStar(require("./win32.js"));
exports.win32 = win32;
__exportStar(require("./options.js"), exports);
const platform = process.env._ISEXE_TEST_PLATFORM_ || process.platform;
const impl = platform === "win32" ? win32 : posix;
/**
 * Determine whether a path is executable on the current platform.
 */
exports.isexe = impl.isexe;
/**
 * Synchronously determine whether a path is executable on the
 * current platform.
 */
exports.sync = impl.sync;
//# sourceMappingURL=index.js.map
