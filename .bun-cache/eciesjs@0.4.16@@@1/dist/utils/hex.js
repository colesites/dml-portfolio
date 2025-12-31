Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeHex = exports.remove0x = void 0;
var utils_1 = require("@noble/ciphers/utils");
var remove0x = (hex) =>
  hex.startsWith("0x") || hex.startsWith("0X") ? hex.slice(2) : hex;
exports.remove0x = remove0x;
var decodeHex = (hex) => (0, utils_1.hexToBytes)((0, exports.remove0x)(hex));
exports.decodeHex = decodeHex;
