const fs = require("fs");

function detectEncoding(filepath) {
  const buffer = fs.readFileSync(filepath);

  // check for UTF-16LE BOM (Byte Order Mark)
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return "utf16le";
  }

  /* c8 ignore start */
  // check for UTF-8 BOM
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xef &&
    buffer[1] === 0xbb &&
    buffer[2] === 0xbf
  ) {
    return "utf8";
  }

  /* c8 ignore stop */

  return "utf8";
}

module.exports = detectEncoding;
