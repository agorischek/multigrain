import assert from "node:assert/strict";
import { describe, it } from "vitest";
import multigrain, {
  cson,
  convert as convertAll,
  json,
  plist,
  toml,
  yaml,
} from "multigrain/all";
import { convert, parse, stringify } from "multigrain";

const sample = {
  name: "grain",
  count: 3,
  active: true,
  tags: ["a", "b"],
  nested: { value: 2 },
};

describe("format adapters", () => {
  for (const format of [json, yaml, cson, plist, toml]) {
    it(`round-trips ${format.name}`, () => {
      const encoded = stringify(sample, format);

      assert.equal(typeof encoded, "string");
      assert.deepEqual(parse(encoded, format), sample);
    });
  }

  it("converts between formats without a global registry", () => {
    assert.deepEqual(
      parse(convert("name: grain\n", { from: yaml, to: json }), json),
      { name: "grain" }
    );
  });

  it("passes parser and serializer options to adapters", () => {
    assert.deepEqual(parse('{"count": 2}', json, {
      reviver(key, value) {
        return key === "count" ? value * 2 : value;
      },
    }), { count: 4 });
    assert.equal(stringify({ values: [1, 2] }, json, { maxLength: Infinity }), '{"values": [1, 2]}');

    const withMerge = parse(
      "base: &base\n  enabled: true\nchild:\n  <<: *base\n",
      yaml,
      { merge: true }
    );
    assert.deepEqual(withMerge.child, { enabled: true });
  });

  it("throws errors returned by the legacy CSON processor", () => {
    assert.throws(() => parse("a: [", cson), SyntaxError);

    const circular = {};
    circular.self = circular;
    assert.throws(() => stringify(circular, cson), TypeError);
  });

  it("offers an explicit all-formats registry", () => {
    assert.deepEqual(multigrain.formats, ["cson", "json", "plist", "toml", "yaml"]);
    assert.deepEqual(multigrain.parse("name = 'grain'", "toml"), {
      name: "grain",
    });
    assert.match(
      multigrain.convert("name = 'grain'", { from: "toml", to: "yaml" }),
      /^name: grain/m
    );
    assert.match(
      convertAll("name = 'grain'", { from: "toml", to: "yaml" }),
      /^name: grain/m
    );
  });
});
