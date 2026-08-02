import type { Converter } from "./index.js";

export { createConverter } from "./index.js";
export { cson } from "./formats/cson.js";
export { json } from "./formats/json.js";
export { plist } from "./formats/plist.js";
export { toml } from "./formats/toml.js";
export { yaml } from "./formats/yaml.js";

export declare const multigrain: Converter;
export declare const convert: Converter["convert"];
export declare const formats: Converter["formats"];
export declare const has: Converter["has"];
export declare const parse: Converter["parse"];
export declare const stringify: Converter["stringify"];
export default multigrain;
