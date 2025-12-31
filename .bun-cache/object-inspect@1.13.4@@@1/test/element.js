var inspect = require("../");
var test = require("tape");

test("element", (t) => {
  t.plan(3);
  var elem = {
    nodeName: "div",
    attributes: [{ name: "class", value: "row" }],
    getAttribute: (key) => key,
    childNodes: [],
  };
  var obj = [1, elem, 3];
  t.deepEqual(inspect(obj), '[ 1, <div class="row"></div>, 3 ]');
  t.deepEqual(
    inspect(obj, { quoteStyle: "single" }),
    "[ 1, <div class='row'></div>, 3 ]",
  );
  t.deepEqual(
    inspect(obj, { quoteStyle: "double" }),
    '[ 1, <div class="row"></div>, 3 ]',
  );
});

test("element no attr", (t) => {
  t.plan(1);
  var elem = {
    nodeName: "div",
    getAttribute: (key) => key,
    childNodes: [],
  };
  var obj = [1, elem, 3];
  t.deepEqual(inspect(obj), "[ 1, <div></div>, 3 ]");
});

test("element with contents", (t) => {
  t.plan(1);
  var elem = {
    nodeName: "div",
    getAttribute: (key) => key,
    childNodes: [{ nodeName: "b" }],
  };
  var obj = [1, elem, 3];
  t.deepEqual(inspect(obj), "[ 1, <div>...</div>, 3 ]");
});

test("element instance", (t) => {
  t.plan(1);
  var h = global.HTMLElement;
  global.HTMLElement = function (name, attr) {
    this.nodeName = name;
    this.attributes = attr;
  };
  global.HTMLElement.prototype.getAttribute = () => {};

  var elem = new global.HTMLElement("div", []);
  var obj = [1, elem, 3];
  t.deepEqual(inspect(obj), "[ 1, <div></div>, 3 ]");
  global.HTMLElement = h;
});
