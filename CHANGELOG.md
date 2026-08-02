# Changelog

## 3.0.0

- Replaced the stateful CommonJS API with a stateless ESM API.
- Added independently importable JSON, YAML, CSON, PLIST, and TOML adapters.
- Added a dependency-free core and an explicit `multigrain/all` aggregate.
- Removed heuristic input-format detection in favor of explicit adapters.
- Added TypeScript declarations for every public entry point.
- Upgraded PLIST to version 5 and replaced `@iarna/toml` with `smol-toml`.
- Raised the minimum supported Node.js version to 20.
- Added CI-enforced package, type-resolution, and tree-shaking contracts.

See the README migration guide for v2-to-v3 examples.
