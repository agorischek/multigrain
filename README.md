# Multigrain
Single-step conversion between JSON, YAML, CSON, PLIST, and TOML

```sh
npm install multigrain
```

## Use

Multigrain provides simple conversion between common serial formats, avoiding the need to manually chain processors when a variety of formats and conversions are necessary.

The most basic use is to call the desired output format function and pass the input string. Multigrain will use some simple heuristics to guess the input format, and will return a string in the requested format.

```js
multigrain.json(input)
multigrain.yaml(input)
multigrain.cson(input)
multigrain.plist(input)
multigrain.toml(input)
```

Alternatively, `parse` will return a native JavaScript object.

```js
Multigrain.parse(input)
```

You can also pass the input format explicitly ('json', 'yaml', 'cson', 'plist', or 'toml'). Unless the input format can vary unpredictably, this is recommended.

```js
multigrain.cson(input, "yaml")
```

Options supported by the underlying parser can be passed as an optional object argument.

```js
multigrain.yaml(input, "cson", parseOpts)
```

Supported build options can optionally be passed similarly:

```js
multigrain.plist(input, "toml", parseOpts, buildOpts)
```

## Processors

Multigrain uses the following processors for parsing and building:

- YAML: [yamljs]()
- CSON: [cson]()
- PLIST: [plist]()
- TOML: [@iarna/toml]()

Reference their respective documentation for parse and build options.
