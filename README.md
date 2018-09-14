# Multigrain
Single-step conversion between JSON, YAML, CSON, PLIST, and TOML

Multigrain provides simple conversion between common serial formats.

```sh
npm install multigrain
```

## Use

The most basic use is to tell it the output format you want, and pass it the input. Multigrain will use some simple heuristics to guess the input format.

```js
multigrain.cson(content)
```

You can also pass the input content type explicitly. Unless you’re truly not sure what the input format is, this is recommended.

```js
multigrain.json(content, type)
```

All input is converted to a JSON intermediary regardless of the target output. If you need to pass options to the underlying parser, they can be passed as an array that will get expanded:

```js
Multigrain.cson(content, type, [toJsonOpts])
```

You can also send options to the output generator:

```js
Multigrain.cson(content, type, [toJsonOpts], [toTargetOpts])
```

## Processors

Multigrain uses the following parsers/generators:

- YAML:
- CSON:
- PLIST:
- TOML:
