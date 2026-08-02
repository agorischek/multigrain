import CSON from "cson";

export function parse(input, options) {
  return unwrap(CSON.parseCSONString(input, options));
}

export function stringify(value, options) {
  return unwrap(CSON.createCSONString(value, options));
}

export const cson = Object.freeze({ name: "cson", parse, stringify });
export default cson;

function unwrap(result) {
  if (result instanceof Error) {
    throw result;
  }
  return result;
}
