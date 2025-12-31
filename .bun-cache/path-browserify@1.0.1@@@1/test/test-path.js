var tape = require("tape");
var path = require("../");

// Test thrown TypeErrors
var typeErrorTests = [true, false, 7, null, {}, undefined, [], NaN];

function fail(t, fn) {
  var args = [].slice.call(arguments, 1);

  t.throws(() => {
    fn.apply(null, args);
  }, TypeError);
}

tape("path.posix TypeErrors", (t) => {
  typeErrorTests.forEach((test) => {
    fail(t, path.posix.join, test);
    fail(t, path.posix.resolve, test);
    fail(t, path.posix.normalize, test);
    fail(t, path.posix.isAbsolute, test);
    fail(t, path.posix.relative, test, "foo");
    fail(t, path.posix.relative, "foo", test);
    fail(t, path.posix.parse, test);
    fail(t, path.posix.dirname, test);
    fail(t, path.posix.basename, test);
    fail(t, path.posix.extname, test);

    // undefined is a valid value as the second argument to basename
    if (test !== undefined) {
      fail(t, path.posix.basename, "foo", test);
    }
  });
  t.end();
});

tape("path.win32 TypeErrors", { skip: true }, (t) => {
  typeErrorTests.forEach((test) => {
    fail(t, path.win32.join, test);
    fail(t, path.win32.resolve, test);
    fail(t, path.win32.normalize, test);
    fail(t, path.win32.isAbsolute, test);
    fail(t, path.win32.relative, test, "foo");
    fail(t, path.win32.relative, "foo", test);
    fail(t, path.win32.parse, test);
    fail(t, path.win32.dirname, test);
    fail(t, path.win32.basename, test);
    fail(t, path.win32.extname, test);

    // undefined is a valid value as the second argument to basename
    if (test !== undefined) {
      fail(t, path.win32.basename, "foo", test);
    }
  });
  t.end();
});

// path.sep tests
tape("path.win32.sep", { skip: true }, (t) => {
  // windows
  t.strictEqual(path.win32.sep, "\\");
  t.end();
});
tape("path.posix.sep", (t) => {
  // posix
  t.strictEqual(path.posix.sep, "/");
  t.end();
});

// path.delimiter tests
tape("path.win32.delimiter", { skip: true }, (t) => {
  // windows
  t.strictEqual(path.win32.delimiter, ";");
  t.end();
});
tape("path.posix.delimiter", (t) => {
  // posix
  t.strictEqual(path.posix.delimiter, ":");
  t.end();
});

tape("path", (t) => {
  t.strictEqual(path, path.posix);
  t.end();
});
