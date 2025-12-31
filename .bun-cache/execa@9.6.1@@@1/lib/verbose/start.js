import { verboseLog } from "./log.js";
import { isVerbose } from "./values.js";

// When `verbose` is `short|full|custom`, print each command
export const logCommand = (escapedCommand, verboseInfo) => {
  if (!isVerbose(verboseInfo)) {
    return;
  }

  verboseLog({
    type: "command",
    verboseMessage: escapedCommand,
    verboseInfo,
  });
};
