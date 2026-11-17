# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2026-11-17

### Changed

- **BREAKING** – Require `@unlazy/nuxt` `^3.0.0` (was `^2.0.1`). The `loaded` event and the `data-loaded` attribute behave as before.
- Every placeholder URL ends in a fragment that is unique to its image. A `placeholderSrc` that already has a fragment is passed on unchanged.
- A `preload` image switches to `loading="eager"` once Unlazy swaps in the real source. It kept `loading="lazy"` before.
- An image that fails to load keeps its placeholder and gets a `data-error` attribute until a later load succeeds.
- Unlazy prints its warning about a lazy loaded LCP element in development only. Production builds no longer log it.

### Deprecated

- `lazyload`, in favour of `lazyLoad`, the name of the Unlazy prop it is passed to. The old name keeps working and logs a warning in development. Both behave as `lazyload` always did: `false` holds the image on its placeholder until the prop turns `true`, unless `preload` is set. The README described it as a switch for lazy loading, which it never was.

### Fixed

- Off-screen images stay on their placeholder until they near the viewport. All images shared one placeholder URL, which the browser serves from memory once it has loaded, so most images loaded right away wherever they were on the page.
- Changing `src` on an image that has already loaded now loads the new source. With Unlazy v2 the image stayed on the first one. `loaded` still fires once per component.

### Added

- `loading` prop, passed to Unlazy and `'lazy'` by default. `loading="eager"` loads the image right after hydration with `fetchpriority="high"`, also when it is off-screen. With `autoSizes` off as well, `srcset` and `sizes` are rendered into the server HTML and there is no placeholder.

### Migration

Update the peer dependency in your app.

```sh
pnpm add @unlazy/nuxt@^3.0.0
```

Rename `:lazyload` to `:lazy-load` in your templates. The old name still works, and logs a deprecation warning in development.

If you turned `lazyload` off to load an image right away, use `loading="eager"` instead. `lazyLoad` holds the image back.

If you select images by `[loading="lazy"]` in CSS or JavaScript, a `preload` image stops matching once it has loaded. Select by class or by `data-loaded` instead.

If several images share one remote `placeholderSrc`, they still load right away. Give each image its own placeholder URL, or use a data URI.

If your app also uses Unlazy directly, follow the [Unlazy migration guide](https://unlazy.byjohann.dev/guide/migration.html). Unlazy v3 is ESM only, requires Nuxt 4 and folds `@unlazy/core` into `unlazy`.

## [1.1.0] - 2026-10-16

### Added

- `priority` prop for the LCP image. It renders a plain `<img>` with `src`, `srcset` and `sizes` in the server HTML, `loading="eager"`, `fetchpriority="high"` and a `<link rel="preload">` with high fetch priority, so the image paints before hydration instead of waiting for Unlazy to apply the `srcset`. No placeholder and no `autoSizes` in this mode; pass `sizes` for the layout. `loaded` still fires, also when the image finished before hydration.

### Changed

- Require `@nuxt/kit` `^4.6.1` (was `^4.4.2`) and `ufo` `^1.6.4` (was `^1.6.3`).
- Type checking of the playground and the test fixture gates a release, next to the tests and the build.

## [1.0.2] - 2026-08-19

### Changed

- Tighten and reformat the README. The published module behaves as in 1.0.1.

## [1.0.1] - 2026-08-19

### Fixed

- The `peerDependenciesMeta` key in `package.json` was misspelled as `peerDependencyMeta`.

### Changed

- Restructure the README.

## [1.0.0] - 2026-08-19

### Changed

- **BREAKING** – `@nuxt/image` and `@unlazy/nuxt` are required `peerDependencies` again, reverting the 0.2.0 move to regular `dependencies`. Their type augmentations (`declare module '@nuxt/image'`) only apply when both packages resolve from the app itself, and the tsconfig `paths` workaround shipped in 0.2.0 did not hold up. Nuxt still registers and configures both for you through `moduleDependencies` – you install them, the module wires them.
- `runtimeConfig.public.magicImage.sizes` is always a string, even when `magicImage.sizes` is configured as a record. Nuxt derives the runtime config type from the value written into it, so the record form produced a different type per app.

### Fixed

- `MagicImage` now renders the `sizes` attribute. It computed a value from the `sizes` option and then dropped it, so the browser resolved the srcset against its default assumption of `100vw` and downloaded a candidate picked from the wrong number. The attribute is `auto` while `autoSizes` measures the element, the computed `sizes` when `autoSizes` is off, and absent on eager images.
- Type checking of `<MagicImage>` in apps with a configured image provider. `@nuxt/image` narrows `provider` and `modifiers` to the app's generated provider map, which does not fit a deliberately provider-agnostic component.

### Added

- `rotate` to `MagicImageModifiers`.

### Migration

Install both packages in your app:

```sh
pnpm add @nuxt/image@^2.0.0 @unlazy/nuxt@^2.0.1
```

If you removed them when upgrading to 0.2.0, add them back – that migration note no longer applies. Leave them out of `modules` in your `nuxt.config.ts`: the module registers both, and configuring them through `magicImage.image` and `magicImage.unlazy` keeps working.

## [0.2.0] - 2026-08-17

### Changed

- `@nuxt/image` and `@unlazy/nuxt` are now regular `dependencies` instead of `peerDependencies`. The module installs both itself via `installModule`, so consumers no longer need to install (or rely on auto-installed peers for) either package.
- The published `package.json` now declares its runtime dependencies (`@nuxt/kit`, `defu`, `ufo`) explicitly instead of relying on package-manager hoisting.

### Fixed

- Type checking in consuming apps with strict package managers (pnpm). The type augmentations generated by `@nuxt/image` and `@unlazy/nuxt` (`declare module '@nuxt/image'`, e.g. provider option keys like `weserv`) require those specifiers to be resolvable from the app's `.nuxt` directory, which is not the case when they are only dependencies of this module. The module now registers tsconfig `paths` for both packages via the `prepare:types` hook (app, node and shared tsconfigs).

### Migration

_Superseded by 1.0.0, which requires both packages again._

If you added `@nuxt/image` / `@unlazy/nuxt` to your own `package.json` (or a `publicHoistPattern`) solely to satisfy the peer dependency or fix type checking, you can remove them.

## [0.1.0] - 2026-08-06

### Changed

- **BREAKING** – Require `@unlazy/nuxt` `^2.0.1` (was `^1.1.0`). Unlazy v2 renamed the `UnLazyImage` component events from `loaded`/`error` to `image-load`/`image-error`, so v1 is no longer compatible.
- `MagicImage` now listens for Unlazy's `@image-load` event instead of `@loaded`.
- Bump the Volta Node pin to `24.18.0`, satisfying the `engines.node` requirement (`^20.19.0 || >=22.3.0`) introduced by `@nuxt/image` `2.1.0`.

### Added

- This changelog.

### Migration

Consumers of `<MagicImage>` need **no code changes** – the component's own `loaded` emit and `data-loaded` attribute are unchanged. Only the peer dependency has to be updated:

```sh
pnpm add @unlazy/nuxt@^2.0.1
```

Staying on `@unlazy/nuxt` v1 with this release will make `<MagicImage>` silently never fire `loaded` and never set `data-loaded="true"`, since the underlying event no longer exists under that name.

`@nuxt/image` is unaffected – the existing `^2.0.0` range already covers the current `2.1.0`.

## [0.0.14] - 2026-08-06

### Changed

- **BREAKING** – Upgrade to `@nuxt/image` v2 and rename the published package to `@maas/magic-image`.

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

[Unreleased]: https://github.com/magicasaservice/magic-image/compare/2.0.0...HEAD
[2.0.0]: https://github.com/magicasaservice/magic-image/compare/1.1.0...2.0.0
[1.1.0]: https://github.com/magicasaservice/magic-image/compare/1.0.2...1.1.0
[1.0.2]: https://github.com/magicasaservice/magic-image/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/magicasaservice/magic-image/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/magicasaservice/magic-image/compare/0.2.0...1.0.0
[0.2.0]: https://github.com/magicasaservice/magic-image/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/magicasaservice/magic-image/compare/0.0.14...0.1.0
[0.0.14]: https://github.com/magicasaservice/magic-image/compare/0.0.13...0.0.14
[0.0.13]: https://github.com/magicasaservice/magic-image/compare/0.0.12...0.0.13
[0.0.12]: https://github.com/magicasaservice/magic-image/compare/0.0.11...0.0.12
[0.0.11]: https://github.com/magicasaservice/magic-image/compare/0.0.10...0.0.11
