var buffer = require("buffer");
var Buffer = buffer.Buffer;
var safer = require("./safer.js");
var Safer = safer.Buffer;

var dangerous = {};

var key;

for (key in safer) {
  if (!Object.hasOwn(safer, key)) continue;
  dangerous[key] = safer[key];
}

var Dangereous = (dangerous.Buffer = {});

// Copy Safer API
for (key in Safer) {
  if (!Object.hasOwn(Safer, key)) continue;
  Dangereous[key] = Safer[key];
}

// Copy those missing unsafe methods, if they are present
for (key in Buffer) {
  if (!Object.hasOwn(Buffer, key)) continue;
  if (Object.hasOwn(Dangereous, key)) continue;
  Dangereous[key] = Buffer[key];
}

if (!Dangereous.allocUnsafe) {
  Dangereous.allocUnsafe = (size) => {
    if (typeof size !== "number") {
      throw new TypeError(
        'The "size" argument must be of type number. Received type ' +
          typeof size,
      );
    }
    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError(
        'The value "' + size + '" is invalid for option "size"',
      );
    }
    return Buffer(size);
  };
}

if (!Dangereous.allocUnsafeSlow) {
  Dangereous.allocUnsafeSlow = (size) => {
    if (typeof size !== "number") {
      throw new TypeError(
        'The "size" argument must be of type number. Received type ' +
          typeof size,
      );
    }
    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError(
        'The value "' + size + '" is invalid for option "size"',
      );
    }
    return buffer.SlowBuffer(size);
  };
}

module.exports = dangerous;
