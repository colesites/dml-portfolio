var tape = require("tape");
var path = require("../");

var winPaths = [
  // [path, root]
  ["C:\\path\\dir\\index.html", "C:\\"],
  ["C:\\another_path\\DIR\\1\\2\\33\\\\index", "C:\\"],
  ["another_path\\DIR with spaces\\1\\2\\33\\index", ""],
  ["\\", "\\"],
  ["\\foo\\C:", "\\"],
  ["file", ""],
  ["file:stream", ""],
  [".\\file", ""],
  ["C:", "C:"],
  ["C:.", "C:"],
  ["C:..", "C:"],
  ["C:abc", "C:"],
  ["C:\\", "C:\\"],
  ["C:\\abc", "C:\\"],
  ["", ""],

  // unc
  ["\\\\server\\share\\file_path", "\\\\server\\share\\"],
  [
    "\\\\server two\\shared folder\\file path.zip",
    "\\\\server two\\shared folder\\",
  ],
  ["\\\\teela\\admin$\\system32", "\\\\teela\\admin$\\"],
  ["\\\\?\\UNC\\server\\share", "\\\\?\\UNC\\"],
];

var winSpecialCaseParseTests = [["/foo/bar", { root: "/" }]];

var winSpecialCaseFormatTests = [
  [{ dir: "some\\dir" }, "some\\dir\\"],
  [{ base: "index.html" }, "index.html"],
  [{ root: "C:\\" }, "C:\\"],
  [{ name: "index", ext: ".html" }, "index.html"],
  [{ dir: "some\\dir", name: "index", ext: ".html" }, "some\\dir\\index.html"],
  [{ root: "C:\\", name: "index", ext: ".html" }, "C:\\index.html"],
  [{}, ""],
];

var unixPaths = [
  // [path, root]
  ["/home/user/dir/file.txt", "/"],
  ["/home/user/a dir/another File.zip", "/"],
  ["/home/user/a dir//another&File.", "/"],
  ["/home/user/a$$$dir//another File.zip", "/"],
  ["user/dir/another File.zip", ""],
  ["file", ""],
  [".\\file", ""],
  ["./file", ""],
  ["C:\\foo", ""],
  ["/", "/"],
  ["", ""],
  [".", ""],
  ["..", ""],
  ["/foo", "/"],
  ["/foo.", "/"],
  ["/foo.bar", "/"],
  ["/.", "/"],
  ["/.foo", "/"],
  ["/.foo.bar", "/"],
  ["/foo/bar.baz", "/"],
];

var unixSpecialCaseFormatTests = [
  [{ dir: "some/dir" }, "some/dir/"],
  [{ base: "index.html" }, "index.html"],
  [{ root: "/" }, "/"],
  [{ name: "index", ext: ".html" }, "index.html"],
  [{ dir: "some/dir", name: "index", ext: ".html" }, "some/dir/index.html"],
  [{ root: "/", name: "index", ext: ".html" }, "/index.html"],
  [{}, ""],
];

var errors = [
  { method: "parse", input: [null], message: TypeError },
  { method: "parse", input: [{}], message: TypeError },
  { method: "parse", input: [true], message: TypeError },
  { method: "parse", input: [1], message: TypeError },
  { method: "parse", input: [], message: TypeError },
  { method: "format", input: [null], message: TypeError },
  { method: "format", input: [""], message: TypeError },
  { method: "format", input: [true], message: TypeError },
  { method: "format", input: [1], message: TypeError },
];

tape("path.win32.parse", { skip: true }, (t) => {
  checkParseFormat(t, path.win32, winPaths);
  checkSpecialCaseParseFormat(t, path.win32, winSpecialCaseParseTests);
  t.end();
});

tape("path.posix.parse", (t) => {
  checkParseFormat(t, path.posix, unixPaths);
  t.end();
});

tape("path.win32.parse errors", { skip: true }, (t) => {
  checkErrors(t, path.win32);
  t.end();
});

tape("path.posix.parse errors", (t) => {
  checkErrors(t, path.posix);
  t.end();
});

tape("path.win32.format", { skip: true }, (t) => {
  checkFormat(t, path.win32, winSpecialCaseFormatTests);
  t.end();
});

tape("path.posix.format", (t) => {
  checkFormat(t, path.posix, unixSpecialCaseFormatTests);
  t.end();
});

// Test removal of trailing path separators
var windowsTrailingTests = [
  [".\\", { root: "", dir: "", base: ".", ext: "", name: "." }],
  ["\\\\", { root: "\\", dir: "\\", base: "", ext: "", name: "" }],
  ["\\\\", { root: "\\", dir: "\\", base: "", ext: "", name: "" }],
  [
    "c:\\foo\\\\\\",
    { root: "c:\\", dir: "c:\\", base: "foo", ext: "", name: "foo" },
  ],
  [
    "D:\\foo\\\\\\bar.baz",
    {
      root: "D:\\",
      dir: "D:\\foo\\\\",
      base: "bar.baz",
      ext: ".baz",
      name: "bar",
    },
  ],
];
var posixTrailingTests = [
  ["./", { root: "", dir: "", base: ".", ext: "", name: "." }],
  ["//", { root: "/", dir: "/", base: "", ext: "", name: "" }],
  ["///", { root: "/", dir: "/", base: "", ext: "", name: "" }],
  ["/foo///", { root: "/", dir: "/", base: "foo", ext: "", name: "foo" }],
  [
    "/foo///bar.baz",
    { root: "/", dir: "/foo//", base: "bar.baz", ext: ".baz", name: "bar" },
  ],
];

tape("path.win32.parse trailing", { skip: true }, (t) => {
  windowsTrailingTests.forEach((p) => {
    var actual = path.win32.parse(p[0]);
    var expected = p[1];
    t.deepEqual(actual, expected);
  });
  t.end();
});

tape("path.posix.parse trailing", (t) => {
  posixTrailingTests.forEach((p) => {
    var actual = path.posix.parse(p[0]);
    var expected = p[1];
    t.deepEqual(actual, expected);
  });
  t.end();
});

function checkErrors(t, path) {
  errors.forEach((errorCase) => {
    t.throws(() => {
      path[errorCase.method].apply(path, errorCase.input);
    }, errorCase.message);
  });
}

function checkParseFormat(t, path, paths) {
  paths.forEach((p) => {
    var element = p[0];
    var root = p[1];
    var output = path.parse(element);
    t.strictEqual(typeof output.root, "string");
    t.strictEqual(typeof output.dir, "string");
    t.strictEqual(typeof output.base, "string");
    t.strictEqual(typeof output.ext, "string");
    t.strictEqual(typeof output.name, "string");
    t.strictEqual(path.format(output), element);
    t.strictEqual(output.root, root);
    t.ok(output.dir.startsWith(output.root));
    t.strictEqual(output.dir, output.dir ? path.dirname(element) : "");
    t.strictEqual(output.base, path.basename(element));
    t.strictEqual(output.ext, path.extname(element));
  });
}

function checkSpecialCaseParseFormat(t, path, testCases) {
  testCases.forEach((testCase) => {
    var element = testCase[0];
    var expect = testCase[1];
    var output = path.parse(element);
    Object.keys(expect).forEach((key) => {
      t.strictEqual(output[key], expect[key]);
    });
  });
}

function checkFormat(t, path, testCases) {
  testCases.forEach((testCase) => {
    t.strictEqual(path.format(testCase[0]), testCase[1]);
  });

  [null, undefined, 1, true, false, "string"].forEach((pathObject) => {
    t.throws(() => {
      path.format(pathObject);
    }, /The "pathObject" argument must be of type Object. Received type (\w+)/);
  });
}
