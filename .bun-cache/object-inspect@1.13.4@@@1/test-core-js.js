require("core-js");

var inspect = require("./");
var test = require("tape");

test("Maps", (t) => {
  t.equal(inspect(new Map([[1, 2]])), "Map (1) {1 => 2}");
  t.end();
});

test("WeakMaps", (t) => {
  t.equal(inspect(new WeakMap([[{}, 2]])), "WeakMap { ? }");
  t.end();
});

test("Sets", (t) => {
  t.equal(inspect(new Set([[1, 2]])), "Set (1) {[ 1, 2 ]}");
  t.end();
});

test("WeakSets", (t) => {
  t.equal(inspect(new WeakSet([[1, 2]])), "WeakSet { ? }");
  t.end();
});
