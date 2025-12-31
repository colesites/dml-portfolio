const Container = require("./container");
const list = require("./list");

class Rule extends Container {
  get selectors() {
    return list.comma(this.selector);
  }

  set selectors(values) {
    const match = this.selector ? this.selector.match(/,\s*/) : null;
    const sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
    this.selector = values.join(sep);
  }

  constructor(defaults) {
    super(defaults);
    this.type = "rule";
    if (!this.nodes) this.nodes = [];
  }
}

module.exports = Rule;
Rule.default = Rule;

Container.registerRule(Rule);
