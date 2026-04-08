![NPM Version](https://img.shields.io/npm/v/%40maas%2Fmagic-image)
![NPM Downloads](https://img.shields.io/npm/dm/%40maas%2Fmagic-image)

# Magic Image

Magic Image is a Nuxt module that combines [Nuxt Image](https://image.nuxt.com) and [Unlazy](https://unlazy.byjohann.dev) into a single component with automatic lazy loading, responsive srcsets, and built-in support for the MaaS and Mux image providers.

---

## Key Benefits

- **Auto lazy loading** — Native lazy loading via Unlazy with SSR placeholder support
- **Responsive srcsets** — Automatic multi-size srcset generation via Nuxt Image
- **Built-in providers** — MaaS image CDN and Mux video thumbnail extraction out of the box
- **Typed modifiers** — Full TypeScript types for all provider-specific modifier options

---

## Install

Install the package and its peer dependencies:

```bash
# npm
npm install @maas/magic-image @nuxt/image @unlazy/nuxt

# pnpm
pnpm add @maas/magic-image @nuxt/image @unlazy/nuxt

# yarn
yarn add @maas/magic-image @nuxt/image @unlazy/nuxt
```

> **Tip:** This package ships with an `.npmrc` that sets `auto-install-peers=true`. With **pnpm**, this means `@nuxt/image` and `@unlazy/nuxt` are installed automatically alongside `@maas/magic-image` — a single `pnpm add @maas/magic-image` is enough. **npm 7+** auto-installs peer deps by default too. **Yarn** always requires manual peer dep installation as shown above.

---

## Configure

Register the module in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@maas/magic-image'],
  magicImage: {
    // Default srcset breakpoints (optional)
    sizes: '128w:128px 512w:512px 720w:720px 1024w:1024px 1440w:1440px',
    // Passed to @nuxt/image — see https://image.nuxt.com/get-started/configuration
    image: {
      provider: 'maas',
    },
    // Passed to @unlazy/nuxt — see https://unlazy.byjohann.dev/integrations/nuxt.html
    unlazy: {
      ssr: true,
    },
  },
})
```

---

## Usage

The `<MagicImage>` component is registered globally — no import needed.

```vue
<template>
  <MagicImage
    src="https://images.unsplash.com/photo-1694444070793-13db645409f4"
    :modifiers="{ width: 800, height: 600, fit: 'cover' }"
  />
</template>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image source URL (required) |
| `provider` | `string` | module default | Provider name (`'maas'`, `'mux'`, or any Nuxt Image provider) |
| `modifiers` | `Partial<MagicImageModifiers>` | — | Provider-specific image transformations |
| `sizes` | `string \| Record<string, string \| number>` | module default | Responsive size breakpoints |
| `preset` | `string` | — | Nuxt Image preset name |
| `densities` | `string` | — | Device density descriptors (e.g. `'1x 2x'`) |
| `placeholderSrc` | `string` | 1×1 GIF | Placeholder shown while loading |
| `preload` | `boolean` | `false` | Add `<link rel="preload">` to `<head>` |
| `autoSizes` | `boolean` | `true` | Auto-compute sizes attribute |
| `lazyload` | `boolean` | `true` | Enable lazy loading |

### Events

| Event | Description |
|-------|-------------|
| `loaded` | Fired when the image has finished loading |

---

## Providers

### MaaS

Built-in provider for the [MaaS image CDN](https://img.maas.earth). Set `provider: 'maas'` (or use it as the default provider) and pass any of the supported modifiers:

```vue
<MagicImage
  src="https://images.unsplash.com/photo-1694444070793-13db645409f4"
  provider="maas"
  :modifiers="{
    width: 800,
    height: 600,
    fit: 'cover',
    format: 'webp',
    quality: 80,
  }"
/>
```

**MaaS modifiers:**

| Modifier | Type | Description |
|----------|------|-------------|
| `width` | `number` | Output width in px |
| `height` | `number` | Output height in px |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'inside' \| 'outside'` | Resize fit mode |
| `format` | `'jpg' \| 'jpeg' \| 'png' \| 'webp'` | Output format |
| `quality` | `number` | Output quality (1–100) |
| `pixelDensity` | `number` | Device pixel ratio (e.g. `2` for 2×) |
| `blur` | `number` | Blur radius |
| `sharpen` | `number` | Sharpening strength |
| `brightness` | `number` | Brightness adjustment |
| `contrast` | `number` | Contrast adjustment |
| `saturation` | `number` | Saturation adjustment |
| `hue` | `number` | Hue rotation in degrees |
| `gamma` | `number` | Gamma correction |
| `filter` | `'greyscale' \| 'sepia' \| 'negative' \| 'duotone'` | Color filter |
| `rotate` | `number` | Rotation in degrees |
| `mirror` | `boolean` | Flip horizontally |
| `mask` | `'circle' \| 'ellipse' \| 'triangle' \| 'pentagon' \| 'hexagon' \| 'square' \| 'star' \| 'heart' \| …` | Shape mask |
| `background` | `string` | Background color |
| `trimImage` | `boolean` | Auto-trim whitespace |

### Mux

Built-in provider for [Mux video thumbnail extraction](https://docs.mux.com/guides/get-images-from-a-video). Pass the full Mux thumbnail URL as `src` and set `provider="mux"`:

```vue
<MagicImage
  src="https://image.mux.com/YOUR_PLAYBACK_ID/thumbnail.jpg"
  provider="mux"
  :modifiers="{
    width: 1280,
    height: 720,
    fit: 'cover',
    time: 12,
  }"
/>
```

**Mux modifiers:**

| Modifier | Type | Description |
|----------|------|-------------|
| `width` | `number` | Thumbnail width in px |
| `height` | `number` | Thumbnail height in px |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'pad' \| 'smartcrop'` | Resize fit mode |
| `time` | `number` | Timestamp in seconds to extract thumbnail from |
| `rotate` | `number` | Rotation in degrees |
| `flipHorizontal` | `boolean` | Flip horizontally |
| `flipVertical` | `boolean` | Flip vertically |
| `start` | `number` | Clip start time |
| `end` | `number` | Clip end time |
| `fps` | `number` | Frames per second (for animated thumbnails) |

---

## TypeScript

Import `MagicImageModifiers` for typed modifier objects:

```ts
import type { MagicImageModifiers } from '@maas/magic-image'

const modifiers: Partial<MagicImageModifiers> = {
  width: 800,
  format: 'webp',
  filter: 'greyscale',
}
```

---

## 🐛 Found a Bug?

[Submit a bug report](https://github.com/magicasaservice/magic-image/issues/new?assignees=&labels=bug%2Cpending+triage&template=bug_report.yml)

---

## License

[MIT License](https://github.com/magicasaservice/magic-image/blob/main/LICENSE) © 2024-PRESENT [Magic as a Service GmbH](https://github.com/magicasaservice)
