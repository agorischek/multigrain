import { createConverter } from "./index.js";
import { cson } from "./formats/cson.js";
import { json } from "./formats/json.js";
import { plist } from "./formats/plist.js";
import { toml } from "./formats/toml.js";
import { yaml } from "./formats/yaml.js";

export { createConverter } from "./index.js";
export { cson, json, plist, toml, yaml };

export const multigrain = createConverter([cson, json, plist, toml, yaml]);
export const { convert, formats, has, parse, stringify } = multigrain;
export default multigrain;
