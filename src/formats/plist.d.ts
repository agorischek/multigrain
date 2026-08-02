import type { PlistValue } from "plist";
import type { Format } from "../index.js";

export type { PlistValue } from "plist";

export type PlistInput = string | Uint8Array | ArrayBuffer;
export interface PlistStringifyOptions {
  pretty?: boolean;
  indent?: string;
  newline?: string;
  [key: string]: unknown;
}

export declare function parse(input: PlistInput): PlistValue;
export declare function stringify(
  value: PlistValue,
  options?: PlistStringifyOptions,
): string;
export declare const plist: Format<
  PlistInput,
  PlistValue,
  undefined,
  PlistStringifyOptions
>;
export default plist;
