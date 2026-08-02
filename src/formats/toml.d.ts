import type { TomlTable } from "smol-toml";
import type { Format } from "../index.js";

export interface TomlParseOptions {
  maxDepth?: number;
  integersAsBigInt?: boolean | "asNeeded";
}

export interface TomlStringifyOptions {
  maxDepth?: number;
  numbersAsFloat?: boolean;
}

export declare function parse(
  input: string,
  options?: TomlParseOptions,
): TomlTable;
export declare function stringify(
  value: TomlTable,
  options?: TomlStringifyOptions,
): string;
export declare const toml: Format<
  string,
  TomlTable,
  TomlParseOptions,
  TomlStringifyOptions
>;
export default toml;
