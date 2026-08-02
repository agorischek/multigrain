import type { Format } from "../index.js";

export interface JsonParseOptions {
  reviver?: (this: unknown, key: string, value: unknown) => unknown;
}

export interface JsonStringifyOptions {
  indent?: number | string;
  maxLength?: number;
  replacer?: ((key: string, value: unknown) => unknown) | readonly string[];
}

export declare function parse(input: string, options?: JsonParseOptions): unknown;
export declare function stringify(
  value: unknown,
  options?: JsonStringifyOptions,
): string;
export declare const json: Format<
  string,
  unknown,
  JsonParseOptions,
  JsonStringifyOptions
>;
export default json;
