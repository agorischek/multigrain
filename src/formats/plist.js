import { build as buildPlist, parse as parsePlist } from "plist";

export function parse(input) {
  return parsePlist(input);
}

export function stringify(value, options) {
  return buildPlist(value, options);
}

export const plist = Object.freeze({ name: "plist", parse, stringify });
export default plist;
