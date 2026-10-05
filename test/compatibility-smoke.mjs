import assert from "node:assert/strict";
import multigrain, { cson, json, plist, toml, yaml } from "multigrain/all";
import { convert, parse, stringify } from "multigrain";

const sample = {
  name: "grain",
  count: 3,
  active: true,
  tags: ["a", "b"],
  nested: { value: 2 },
};
const tomlSample = Object.assign(Object.create(null), sample, {
  nested: Object.assign(Object.create(null), sample.nested),
});

for (const format of [json, yaml, cson, plist, toml]) {
  const encoded = stringify(sample, format);
  assert.equal(typeof encoded, "string", `${format.name} did not return text`);
  assert.deepEqual(
    parse(encoded, format),
    format === toml ? tomlSample : sample,
    `${format.name} changed data`
  );
}

assert.deepEqual(
  parse(convert("name: grain\n", { from: yaml, to: json }), json),
  { name: "grain" }
);
assert.equal(multigrain.has("yaml"), true);
assert.deepEqual(
  multigrain.parse("name = 'grain'", "toml"),
  Object.assign(Object.create(null), { name: "grain" })
);
