<img alt="Multigrain logo" src="img/logo.png" width="195" height="195" />

# Multigrain

Tree-shakeable conversion between JSON, YAML, CSON, PLIST, and TOML.

[![CI](https://github.com/agorischek/multigrain/actions/workflows/ci.yml/badge.svg)](https://github.com/agorischek/multigrain/actions/workflows/ci.yml)
[![Version](https://img.shields.io/npm/v/multigrain.svg)](https://www.npmjs.com/package/multigrain)
[![License](https://img.shields.io/github/license/agorischek/multigrain.svg)](https://github.com/agorischek/multigrain/blob/master/LICENSE)

```sh
npm install multigrain
```

Multigrain 3 is an ESM-only package for Node.js 20 and newer. It has a small,
dependency-free core and one entry point per serialization format.

## Convert between formats

Import only the format adapters your application uses:

```js
import { convert } from "multigrain";
import { json } from "multigrain/json";
import { yaml } from "multigrain/yaml";

const output = convert("name: grain\n", {
  from: yaml,
  to: json,
});
```

The root `multigrain` entry point does not import any serializer. In the example
above, a bundler includes the JSON and YAML implementations but not CSON, PLIST,
or TOML. The package declares `sideEffects: false`, and CI verifies these bundle
boundaries with esbuild.

Available adapter entry points are:

- `multigrain/json`
- `multigrain/yaml`
- `multigrain/cson`
- `multigrain/plist`
- `multigrain/toml`

The CSON adapter uses the older `cson` ecosystem and is intended for Node.js.
The core and the other adapters can be bundled for browsers.

## Parse and stringify

Adapters can be used with the core helpers:

```js
import { parse, stringify } from "multigrain";
import { toml } from "multigrain/toml";

const value = parse('name = "grain"', toml);
const output = stringify({ name: "grain" }, toml);
```

Or directly:

```js
import { parse, stringify } from "multigrain/toml";
```

Parser and serializer options are passed to the underlying implementation:

```js
import { parse } from "multigrain";
import { yaml } from "multigrain/yaml";

const value = parse(source, yaml, { merge: true });
```

`convert` accepts `parseOptions` and `stringifyOptions` separately:

```js
convert(source, {
  from: yaml,
  to: json,
  parseOptions: { merge: true },
  stringifyOptions: { indent: 2, maxLength: 100 },
});
```

When the input is already a JavaScript value, omit `from`:

```js
const output = convert({ name: "grain" }, { to: yaml });
```

## Runtime-selected formats

Applications that select formats by name can create an explicit registry. Only
the imported adapters become part of the application bundle.

```js
import { createConverter } from "multigrain";
import { json } from "multigrain/json";
import { yaml } from "multigrain/yaml";

const documents = createConverter([json, yaml]);

documents.convert(source, {
  from: "yaml",
  to: "json",
});
```

If an application genuinely supports every format, `multigrain/all` provides a
ready-made registry:

```js
import multigrain from "multigrain/all";

const output = multigrain.convert(source, {
  from: "plist",
  to: "toml",
});
```

Importing `multigrain/all` intentionally includes every processor.

## Migrating from v2

Version 3 intentionally changes the API and runtime contract:

| v2 | v3 |
| --- | --- |
| CommonJS `require("multigrain")` | ESM `import` |
| Node.js 18+ | Node.js 20+ |
| Every processor loaded by the root module | Explicit, tree-shakeable format imports |
| `multigrain.json(input, "yaml")` | `convert(input, { from: yaml, to: json })` |
| `multigrain.parse(input, "yaml")` | `parse(input, yaml)` |
| Heuristic input-format detection | Explicit source format |
| Process-wide mutable default options | Options passed per operation |

The explicit source format removes ambiguous detection behavior. The stateless
option model also prevents one consumer from changing serialization behavior for
another consumer in the same process.

Applications that cannot migrate yet can remain on the maintained `2.x` line.

## Processors

- JSON: the built-in `JSON.parse` and `json-stringify-pretty-compact`
- YAML: `yaml`
- CSON: `cson`
- PLIST: `plist`
- TOML: `smol-toml`

The PLIST 5 adapter accepts XML, binary, and OpenStep property lists. The TOML
adapter moves from the unmaintained `@iarna/toml` implementation used by v2 to
`smol-toml`.

## Publishing

Releases are published by the [Publish Package](https://github.com/agorischek/multigrain/actions/workflows/publish.yml) GitHub Actions workflow using npm Trusted Publishing.
