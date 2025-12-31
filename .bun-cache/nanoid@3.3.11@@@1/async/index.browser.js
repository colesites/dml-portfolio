const random = async (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
const customAlphabet = (alphabet, defaultSize = 21) => {
  const mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
  const step = -~((1.6 * mask * defaultSize) / alphabet.length);
  return async (size = defaultSize) => {
    let id = "";
    while (true) {
      const bytes = crypto.getRandomValues(new Uint8Array(step));
      let i = step | 0;
      while (i--) {
        id += alphabet[bytes[i] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
const nanoid = async (size = 21) => {
  let id = "";
  const bytes = crypto.getRandomValues(new Uint8Array((size |= 0)));
  while (size--) {
    const byte = bytes[size] & 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += "_";
    } else {
      id += "-";
    }
  }
  return id;
};
export { nanoid, customAlphabet, random };
