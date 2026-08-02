import type { Format } from "../index.js";

export type CsonOptions = Record<string, unknown>;

export declare function parse(input: string, options?: CsonOptions): unknown;
export declare function stringify(value: unknown, options?: CsonOptions): string;
export declare const cson: Format<
  string,
  unknown,
  CsonOptions,
  CsonOptions
>;
export default cson;
