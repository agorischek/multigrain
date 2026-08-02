export interface Format<
  Input = unknown,
  Value = unknown,
  ParseOptions = unknown,
  StringifyOptions = unknown,
> {
  readonly name: string;
  parse(input: Input, options?: ParseOptions): Value;
  stringify(value: Value, options?: StringifyOptions): string;
}

export type FormatReference = string | Format;

export interface ConvertOptions<
  From extends Format | undefined = Format | undefined,
  To extends Format = Format,
> {
  from?: From;
  to: To;
  parseOptions?: From extends Format
    ? Parameters<From["parse"]>[1]
    : unknown;
  stringifyOptions?: Parameters<To["stringify"]>[1];
}

export interface Converter {
  readonly formats: readonly string[];
  has(format: FormatReference): boolean;
  parse(input: unknown, format: FormatReference, options?: unknown): unknown;
  stringify(value: unknown, format: FormatReference, options?: unknown): string;
  convert(
    input: unknown,
    options: {
      from?: FormatReference;
      to: FormatReference;
      parseOptions?: unknown;
      stringifyOptions?: unknown;
    },
  ): string;
}

export function parse<F extends Format>(
  input: Parameters<F["parse"]>[0],
  format: F,
  options?: Parameters<F["parse"]>[1],
): ReturnType<F["parse"]>;

export function stringify<F extends Format>(
  value: Parameters<F["stringify"]>[0],
  format: F,
  options?: Parameters<F["stringify"]>[1],
): string;

export function convert<
  From extends Format | undefined,
  To extends Format,
>(
  input: From extends Format ? Parameters<From["parse"]>[0] : unknown,
  options: ConvertOptions<From, To>,
): string;

export function createConverter(formats: Iterable<Format>): Converter;
