import { readFileSync, statSync, writeFile } from "fs";
import { resolve } from "path";
import { format } from "util";
export default {
  fs: {
    readFileSync,
    writeFile,
  },
  format,
  resolve,
  exists: (file) => {
    try {
      return statSync(file).isFile();
    } catch (err) {
      return false;
    }
  },
};
