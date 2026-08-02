import type {
  CreateNodeOptions,
  DocumentOptions,
  ParseOptions,
  SchemaOptions,
  ToJSOptions,
  ToStringOptions,
} from "yaml";
import type { Format } from "../index.js";

export type YamlParseOptions = ParseOptions &
  DocumentOptions &
  SchemaOptions &
  ToJSOptions;
export type YamlStringifyOptions = DocumentOptions &
  SchemaOptions &
  ParseOptions &
  CreateNodeOptions &
  ToStringOptions;

export declare function parse(input: string, options?: YamlParseOptions): unknown;
export declare function stringify(
  value: unknown,
  options?: YamlStringifyOptions,
): string;
export declare const yaml: Format<
  string,
  unknown,
  YamlParseOptions,
  YamlStringifyOptions
>;
export default yaml;
