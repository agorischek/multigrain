import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const temporaryDirectory = await mkdtemp(path.join(tmpdir(), "multigrain-package-"));
const sourcePackage = JSON.parse(
  await readFile(path.join(process.cwd(), "package.json"), "utf8")
);

try {
  const pack = run("npm", [
    "pack",
    "--json",
    "--pack-destination",
    temporaryDirectory,
  ]);
  const packResult = JSON.parse(pack.stdout)[0];
  const files = packResult.files.map(({ path: filePath }) => filePath);

  assert(files.includes("src/index.js"));
  assert(files.includes("src/index.d.ts"));
  assert(!files.some((filePath) => filePath.startsWith("test/")));
  assert(!files.some((filePath) => filePath.startsWith(".github/")));
  assert(!files.some((filePath) => filePath.startsWith("lib/")));

  const consumerDirectory = path.join(temporaryDirectory, "consumer");
  await mkdir(consumerDirectory);
  await writeFile(
    path.join(consumerDirectory, "package.json"),
    JSON.stringify({ private: true, type: "module" })
  );
  await writeFile(
    path.join(consumerDirectory, "index.js"),
    `
      import assert from "node:assert/strict";
      import { convert, parse } from "multigrain";
      import multigrain from "multigrain/all";
      import { json } from "multigrain/json";
      import { yaml } from "multigrain/yaml";

      const encoded = convert("name: grain\\n", { from: yaml, to: json });
      assert.deepEqual(parse(encoded, json), { name: "grain" });
      assert.equal(multigrain.has("plist"), true);
    `
  );

  const tarball = path.join(temporaryDirectory, packResult.filename);
  run("npm", [
    "install",
    "--ignore-scripts",
    "--no-package-lock",
    "--prefix",
    consumerDirectory,
    tarball,
  ]);
  run(process.execPath, [path.join(consumerDirectory, "index.js")]);

  const installedPackage = JSON.parse(
    await readFile(
      path.join(consumerDirectory, "node_modules/multigrain/package.json"),
      "utf8"
    )
  );
  assert.equal(installedPackage.version, sourcePackage.version);
  console.log("packed consumer ok");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed\n${result.stdout}\n${result.stderr}`
    );
  }
  return result;
}
