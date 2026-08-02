import prettyStringify from "json-stringify-pretty-compact";

export function parse(input, options = {}) {
  return JSON.parse(input, options.reviver);
}

export function stringify(value, options) {
  return prettyStringify(value, options);
}

export const json = Object.freeze({ name: "json", parse, stringify });
export default json;
