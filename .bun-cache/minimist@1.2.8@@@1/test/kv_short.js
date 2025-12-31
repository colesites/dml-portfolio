var parse = require("../");
var test = require("tape");

test("short -k=v", (t) => {
  t.plan(1);

  var argv = parse(["-b=123"]);
  t.deepEqual(argv, { b: 123, _: [] });
});

test("multi short -k=v", (t) => {
  t.plan(1);

  var argv = parse(["-a=whatever", "-b=robots"]);
  t.deepEqual(argv, { a: "whatever", b: "robots", _: [] });
});

test("short with embedded equals -k=a=b", (t) => {
  t.plan(1);

  var argv = parse(["-k=a=b"]);
  t.deepEqual(argv, { k: "a=b", _: [] });
});

test("short with later equals like -ab=c", (t) => {
  t.plan(1);

  var argv = parse(["-ab=c"]);
  t.deepEqual(argv, { a: true, b: "c", _: [] });
});
