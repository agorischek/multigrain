<img alt="Multigrain logo" src="img/logo.png" width="195px" height = "195px" />

# Multigrain
Single-step conversion between JSON, YAML, CSON, PLIST, & TOML.

```sh
npm install multigrain
```

Multigrain provides simple conversion between common serial formats, avoiding the need to manually chain processors with differing syntaxes when a variety of formats and conversions are necessary. This can be particularly useful when multiple consumers require the same information in different serialized formats, such as [language grammars]().

## Use

The most basic use is to call the desired output format function and pass an input string or JavaScript object. Multigrain will return a string in the requested format. If a string is passed as input, Multigrain will use some simple heuristics to infer the input format.

```js
multigrain.json(input)
multigrain.yaml(input)
multigrain.cson(input)
multigrain.plist(input)
multigrain.toml(input)
```

Alternatively, `parse` will return a native JavaScript object.

```js
multigrain.parse(input)
```

You can also pass the input format explicitly ('json', 'yaml', 'cson', 'plist', or 'toml'). Unless the input format can vary unpredictably, this is recommended.

```js
multigrain.json(input, "toml")
```

Options supported by the underlying parser can be passed as an optional object argument.

```js
multigrain.yaml(input, "plist", parseOpts)
```

Supported build options can optionally be passed similarly:

```js
multigrain.cson(input, "json", parseOpts, buildOpts)
```

## Processors

Multigrain uses the following processors for parsing and building:

- YAML: [yamljs](https://www.npmjs.com/package/yamljs)
- CSON: [cson](https://www.npmjs.com/package/cson)
- PLIST: [plist](https://www.npmjs.com/package/plist)
- TOML: [@iarna/toml](https://www.npmjs.com/package/@iarna/toml)

Reference their respective documentation for parse and build options.
