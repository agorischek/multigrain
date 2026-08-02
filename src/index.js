/**
 * Parse serialized input with a format adapter.
 *
 * @param {unknown} input
 * @param {import("./index.js").Format} format
 * @param {unknown} [options]
 * @returns {unknown}
 */
export function parse(input, format, options) {
  assertFormat(format);
  return format.parse(input, options);
}

/**
 * Serialize a JavaScript value with a format adapter.
 *
 * @param {unknown} value
 * @param {import("./index.js").Format} format
 * @param {unknown} [options]
 * @returns {string}
 */
export function stringify(value, format, options) {
  assertFormat(format);
  return format.stringify(value, options);
}

/**
 * Convert serialized input from one adapter to another. Omit `from` when the
 * input is already a JavaScript value.
 *
 * @param {unknown} input
 * @param {object} options
 * @param {import("./index.js").Format} [options.from]
 * @param {import("./index.js").Format} options.to
 * @param {unknown} [options.parseOptions]
 * @param {unknown} [options.stringifyOptions]
 * @returns {string}
 */
export function convert(
  input,
  { from, to, parseOptions, stringifyOptions } = {}
) {
  if (to === undefined) {
    throw new TypeError("A target format is required");
  }

  const value = from === undefined ? input : parse(input, from, parseOptions);
  return stringify(value, to, stringifyOptions);
}

/**
 * Create a named-format converter. This is useful when an application has a
 * known set of supported formats and wants to select among them at runtime.
 * Only adapters passed here can be used by name.
 *
 * @param {Iterable<import("./index.js").Format>} formats
 * @returns {import("./index.js").Converter}
 */
export function createConverter(formats) {
  if (formats == null || typeof formats[Symbol.iterator] !== "function") {
    throw new TypeError("Formats must be an iterable of format adapters");
  }

  const registered = new Map();
  for (const format of formats) {
    assertFormat(format);
    if (registered.has(format.name)) {
      throw new TypeError(`Duplicate format name: ${format.name}`);
    }
    registered.set(format.name, format);
  }

  const formatNames = Object.freeze([...registered.keys()]);

  function resolve(reference) {
    const name = typeof reference === "string" ? reference : reference?.name;
    const format = registered.get(name);
    if (format === undefined) {
      throw new TypeError(`Unknown format: ${String(name)}`);
    }
    return format;
  }

  const converter = {
    formats: formatNames,
    has(format) {
      const name = typeof format === "string" ? format : format?.name;
      return registered.has(name);
    },
    parse(input, format, options) {
      return parse(input, resolve(format), options);
    },
    stringify(value, format, options) {
      return stringify(value, resolve(format), options);
    },
    convert(input, { from, to, parseOptions, stringifyOptions } = {}) {
      if (to === undefined) {
        throw new TypeError("A target format is required");
      }
      const value =
        from === undefined ? input : parse(input, resolve(from), parseOptions);
      return stringify(value, resolve(to), stringifyOptions);
    },
  };

  return Object.freeze(converter);
}

/**
 * @param {unknown} format
 * @returns {asserts format is import("./index.js").Format}
 */
function assertFormat(format) {
  if (
    format === null ||
    typeof format !== "object" ||
    typeof format.name !== "string" ||
    format.name.length === 0 ||
    typeof format.parse !== "function" ||
    typeof format.stringify !== "function"
  ) {
    throw new TypeError("Invalid format adapter");
  }
}
