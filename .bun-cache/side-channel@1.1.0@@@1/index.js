var $TypeError = require("es-errors/type");
var inspect = require("object-inspect");
var getSideChannelList = require("side-channel-list");
var getSideChannelMap = require("side-channel-map");
var getSideChannelWeakMap = require("side-channel-weakmap");

var makeChannel =
  getSideChannelWeakMap || getSideChannelMap || getSideChannelList;

/** @type {import('.')} */
module.exports = function getSideChannel() {
  /** @typedef {ReturnType<typeof getSideChannel>} Channel */

  /** @type {Channel | undefined} */ var $channelData;

  /** @type {Channel} */
  var channel = {
    assert: (key) => {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    delete: (key) => !!$channelData && $channelData["delete"](key),
    get: (key) => $channelData && $channelData.get(key),
    has: (key) => !!$channelData && $channelData.has(key),
    set: (key, value) => {
      if (!$channelData) {
        $channelData = makeChannel();
      }

      $channelData.set(key, value);
    },
  };
  // @ts-expect-error TODO: figure out why this is erroring
  return channel;
};
