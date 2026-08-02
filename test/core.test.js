import assert from "node:assert/strict";
import { describe, it } from "vitest";
import { convert, createConverter, parse, stringify } from "multigrain";

const text = Object.freeze({
  name: "text",
  parse(input, options = {}) {
    return options.uppercase ? input.toUpperCase() : input;
  },
  stringify(value, options = {}) {
    return options.prefix ? `${options.prefix}${value}` : String(value);
  },
});

const wrapped = Object.freeze({
  name: "wrapped",
  parse(input) {
    return input.slice(1, -1);
  },
  stringify(value) {
    return `[${value}]`;
  },
});

describe("core functions", () => {
  it("parses and stringifies with explicit adapters", () => {
    assert.equal(parse("grain", text, { uppercase: true }), "GRAIN");
    assert.equal(stringify("grain", text, { prefix: ">" }), ">grain");
  });

  it("converts between explicit adapters", () => {
    assert.equal(convert("[grain]", { from: wrapped, to: text }), "grain");
  });

  it("serializes an already-parsed value when from is omitted", () => {
    assert.equal(convert("grain", { to: wrapped }), "[grain]");
  });

  it("rejects invalid adapters and missing targets", () => {
    assert.throws(() => parse("grain", {}), /Invalid format adapter/);
    assert.throws(() => convert("grain"), /target format is required/);
  });
});

describe("createConverter", () => {
  it("provides a frozen named-format registry", () => {
    const converter = createConverter([text, wrapped]);

    assert.deepEqual(converter.formats, ["text", "wrapped"]);
    assert.equal(converter.has("text"), true);
    assert.equal(converter.has(text), true);
    assert.equal(converter.has("yaml"), false);
    assert.equal(converter.convert("[grain]", { from: "wrapped", to: "text" }), "grain");
    assert.equal(Object.isFrozen(converter), true);
    assert.equal(Object.isFrozen(converter.formats), true);
  });

  it("rejects unknown and duplicate formats", () => {
    const converter = createConverter([text]);

    assert.throws(
      () => converter.stringify("grain", "yaml"),
      /Unknown format: yaml/
    );
    assert.throws(
      () => createConverter([text, text]),
      /Duplicate format name: text/
    );
  });
});
