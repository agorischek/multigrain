import YAML from "yaml";

export function parse(input, options) {
  return YAML.parse(input, options);
}

export function stringify(value, options) {
  return YAML.stringify(value, options);
}

export const yaml = Object.freeze({ name: "yaml", parse, stringify });
export default yaml;
