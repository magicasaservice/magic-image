# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-08-06

### Changed

- **BREAKING** — Require `@unlazy/nuxt` `^2.0.1` (was `^1.1.0`). Unlazy v2 renamed the `UnLazyImage` component events from `loaded`/`error` to `image-load`/`image-error`, so v1 is no longer compatible.
- `MagicImage` now listens for Unlazy's `@image-load` event instead of `@loaded`.
- Bump the Volta Node pin to `24.18.0`, satisfying the `engines.node` requirement (`^20.19.0 || >=22.3.0`) introduced by `@nuxt/image` `2.1.0`.

### Added

- This changelog.

### Migration

Consumers of `<MagicImage>` need **no code changes** — the component's own `loaded` emit and `data-loaded` attribute are unchanged. Only the peer dependency has to be updated:

```sh
pnpm add @unlazy/nuxt@^2.0.1
```

Staying on `@unlazy/nuxt` v1 with this release will make `<MagicImage>` silently never fire `loaded` and never set `data-loaded="true"`, since the underlying event no longer exists under that name.

`@nuxt/image` is unaffected — the existing `^2.0.0` range already covers the current `2.1.0`.

## [0.0.14] - 2026-08-06

### Changed

- **BREAKING** — Upgrade to `@nuxt/image` v2 and rename the published package to `@maas/magic-image`.

### Fixed

- Cast the public runtime config to its actual shape in `MagicImage`.
- Scope the `t:release` test dependency to the `nuxt` package.

## [0.0.13] - 2025-06-11

### Added

- `filename` modifier for the MaaS provider.

## [0.0.12] - 2025-06-05

### Added

- Custom Mux image provider.

## [0.0.11] - 2025-06-05

### Added

- Custom MaaS image provider.
- Explicit type export for the Nuxt module.

### Fixed

- Correct the Turbo output path for the module build task.
- Add an explicit type annotation to resolve a build error.
- Stricter check on `computedImageSizes`.

### Changed

- Switch dependency updates from Dependabot to taze.
- Adopt `@maas/config` for linting.

---

Releases before `0.0.11` predate this changelog. See the [release history](https://github.com/magicasaservice/magic-image/releases) for details.

[Unreleased]: https://github.com/magicasaservice/magic-image/compare/0.1.0...HEAD
[0.1.0]: https://github.com/magicasaservice/magic-image/compare/0.0.14...0.1.0
[0.0.14]: https://github.com/magicasaservice/magic-image/compare/0.0.13...0.0.14
[0.0.13]: https://github.com/magicasaservice/magic-image/compare/0.0.12...0.0.13
[0.0.12]: https://github.com/magicasaservice/magic-image/compare/0.0.11...0.0.12
[0.0.11]: https://github.com/magicasaservice/magic-image/compare/0.0.10...0.0.11
