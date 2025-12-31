const Stringifier = require("./stringifier");

function stringify(node, builder) {
  const str = new Stringifier(builder);
  str.stringify(node);
}

module.exports = stringify;
stringify.default = stringify;
