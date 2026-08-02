import assert from "node:assert/strict";
import { build } from "esbuild";
import { describe, it } from "vitest";

const processorMarkers = {
  cson: "/node_modules/cson/",
  json: "/node_modules/json-stringify-pretty-compact/",
  plist: "/node_modules/plist/",
  toml: "/node_modules/smol-toml/",
  yaml: "/node_modules/yaml/",
};

async function bundledInputs(source, platform = "browser") {
  const result = await build({
    bundle: true,
    format: "esm",
    logLevel: "silent",
    metafile: true,
    platform,
    treeShaking: true,
    write: false,
    stdin: {
      contents: source,
      loader: "js",
      resolveDir: process.cwd(),
      sourcefile: "consumer.js",
    },
  });

  return Object.keys(result.metafile.inputs).map((path) => `/${path}`);
}

function includedProcessors(inputs) {
  return Object.fromEntries(
    Object.entries(processorMarkers).map(([name, marker]) => [
      name,
      inputs.some((path) => path.includes(marker)),
    ])
  );
}

describe("tree-shaking contract", () => {
  it("keeps the package root free of serializer dependencies", async () => {
    const inputs = await bundledInputs(
      'import { createConverter } from "multigrain"; console.log(createConverter([]));'
    );

    assert.deepEqual(includedProcessors(inputs), {
      cson: false,
      json: false,
      plist: false,
      toml: false,
      yaml: false,
    });
  });

  it("includes JSON without pulling in YAML or other adapters", async () => {
    const inputs = await bundledInputs(
      'import { stringify } from "multigrain"; import { json } from "multigrain/json"; console.log(stringify({a: 1}, json));'
    );

    assert.deepEqual(includedProcessors(inputs), {
      cson: false,
      json: true,
      plist: false,
      toml: false,
      yaml: false,
    });
  });

  it("includes YAML without pulling in JSON or other adapters", async () => {
    const inputs = await bundledInputs(
      'import { parse } from "multigrain"; import { yaml } from "multigrain/yaml"; console.log(parse("a: 1", yaml));'
    );

    assert.deepEqual(includedProcessors(inputs), {
      cson: false,
      json: false,
      plist: false,
      toml: false,
      yaml: true,
    });
  });

  it("keeps every direct adapter isolated in Node bundles", async () => {
    for (const format of Object.keys(processorMarkers)) {
      const inputs = await bundledInputs(
        `import adapter from "multigrain/${format}"; console.log(adapter.name);`,
        "node"
      );
      const expected = Object.fromEntries(
        Object.keys(processorMarkers).map((name) => [name, name === format])
      );

      assert.deepEqual(includedProcessors(inputs), expected, format);
    }
  });

  it("includes every adapter only through the all entry point", async () => {
    const inputs = await bundledInputs(
      'import multigrain from "multigrain/all"; console.log(multigrain.formats);',
      "node"
    );

    assert.deepEqual(includedProcessors(inputs), {
      cson: true,
      json: true,
      plist: true,
      toml: true,
      yaml: true,
    });
  });
});
