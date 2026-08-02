import multigrain, { json, yaml } from "multigrain/all";
import {
  convert,
  createConverter,
  parse,
  stringify,
  type Format,
} from "multigrain";
import { plist, type PlistValue } from "multigrain/plist";
import { toml } from "multigrain/toml";

const parsedJson: unknown = parse('{"name":"grain"}', json);
const jsonText: string = stringify(parsedJson, json, { indent: 2 });
const yamlText: string = convert("name = 'grain'", {
  from: toml,
  to: yaml,
  stringifyOptions: { lineWidth: 100 },
});
const plistValue: PlistValue = { name: "grain" };
const plistText: string = stringify(plistValue, plist, { pretty: true });

const converter = createConverter([json, yaml]);
const converted: string = converter.convert("name: grain", {
  from: "yaml",
  to: "json",
});

const adapter: Format = json;
const hasJson: boolean = multigrain.has(adapter);

void jsonText;
void yamlText;
void plistText;
void converted;
void hasJson;
