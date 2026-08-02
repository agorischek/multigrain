var assert = require("assert");

delete globalThis.i;
delete globalThis.options;

var multigrain = require("../lib/index.js");
var sample = {
  name: "grain",
  count: 3,
  active: true,
  tags: ["a", "b"],
  nested: { value: 2 },
};

["json", "yaml", "cson", "plist", "toml"].forEach(function (format) {
  var encoded = multigrain[format](sample);
  assert.strictEqual(
    typeof encoded,
    "string",
    format + " did not return serialized text"
  );
  var decoded = multigrain.parse(encoded, format);
  assert.deepStrictEqual(decoded, sample, format + " round trip changed data");
});

assert.strictEqual(
  Object.prototype.hasOwnProperty.call(globalThis, "options"),
  false,
  "loading Multigrain leaked the default options into globalThis"
);
assert.strictEqual(
  Object.prototype.hasOwnProperty.call(globalThis, "i"),
  false,
  "automatic format detection leaked its loop counter into globalThis"
);
