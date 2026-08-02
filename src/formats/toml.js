import { parse as parseToml, stringify as stringifyToml } from "smol-toml";

export function parse(input, options) {
  return parseToml(input, options);
}

export function stringify(value, options) {
  return stringifyToml(value, options);
}

export const toml = Object.freeze({ name: "toml", parse, stringify });
export default toml;
