![NPM Version](https://img.shields.io/npm/v/%40maas%2Fmagic-image)
![NPM Downloads](https://img.shields.io/npm/dm/%40maas%2Fmagic-image)

# Magic Image

Magic Image is a Nuxt module that combines [Nuxt Image](https://image.nuxt.com) and [Unlazy](https://unlazy.byjohann.dev) into a single component. Reach for it whenever an image should carry a responsive srcset and lazy load itself without per-image wiring: content images, hero art, CMS media, Mux video thumbnails.

---

## Key Benefits

- **Auto lazy loading** – Native lazy loading via Unlazy with SSR placeholder support
- **Responsive srcsets** – Automatic multi-size srcset generation via Nuxt Image
- **Built-in providers** – MaaS image CDN and Mux video thumbnail extraction out of the box
- **Typed modifiers** – Full TypeScript types for all provider-specific modifier options

---

## Anatomy

```vue
<template>
  <magic-image
    src="https://images.unsplash.com/photo-1694444070793-13db645409f4"
    :modifiers="{ width: 800, height: 600, fit: 'cover' }"
  />
</template>
```

The component is registered globally. No import needed.

---

## Installation

Add `@maas/magic-image` to your dependencies.

```sh
# pnpm
pnpm add @maas/magic-image

# npm
npm install @maas/magic-image

# yarn
yarn add @maas/magic-image

# bun
bun add @maas/magic-image
```

### Nuxt

Register the module in your `nuxt.config.ts`. Every option is optional.

```ts
export default defineNuxtConfig({
  modules: ['@maas/magic-image'],
  magicImage: {
    sizes: '128w:128px 512w:512px 720w:720px 1024w:1024px 1440w:1440px',
    image: {
      provider: 'maas',
    },
    unlazy: {
      ssr: true,
    },
  },
})
```

Leave `@nuxt/image` and `@unlazy/nuxt` out of `modules`. Magic Image registers both itself and forwards `magicImage.image` and `magicImage.unlazy` to them, so configure them there rather than through their own top-level keys.

---

## Peer Dependencies

Both peer dependencies have to be installed manually. Each one augments your app’s types – `declare module '@nuxt/image'` and its Unlazy equivalent – and a type augmentation only applies where the package resolves from your app. Package managers that auto-install peers into their own store, pnpm among them, do not put them there.

| Package                                                    | Version  |
| ---------------------------------------------------------- | -------- |
| [@nuxt/image](https://www.npmjs.com/package/@nuxt/image)   | `^2.0.0` |
| [@unlazy/nuxt](https://www.npmjs.com/package/@unlazy/nuxt) | `^2.0.1` |

### Installation

```sh
# pnpm
pnpm add @nuxt/image @unlazy/nuxt

# npm
npm install @nuxt/image @unlazy/nuxt

# yarn
yarn add @nuxt/image @unlazy/nuxt

# bun
bun add @nuxt/image @unlazy/nuxt
```

---

## API Reference

### Props

| Prop             | Type                                         | Default        | Description                                                   |
| ---------------- | -------------------------------------------- | -------------- | ------------------------------------------------------------- |
| `src`            | `string`                                     | –              | Image source URL (required)                                   |
| `provider`       | `string`                                     | module default | Provider name (`'maas'`, `'mux'`, or any Nuxt Image provider) |
| `modifiers`      | `Partial<MagicImageModifiers>`               | –              | Provider-specific image transformations                       |
| `sizes`          | `string \| Record<string, string \| number>` | module default | The width the image is displayed at, per screen               |
| `preset`         | `string`                                     | –              | Nuxt Image preset name                                        |
| `densities`      | `string`                                     | –              | Device density descriptors (e.g. `'1x 2x'`)                   |
| `placeholderSrc` | `string`                                     | 1×1 GIF        | Placeholder shown while loading                               |
| `preload`        | `boolean`                                    | `false`        | Add `<link rel="preload">` to `<head>`                        |
| `autoSizes`      | `boolean`                                    | `true`         | Measure the element instead of using the declared `sizes`     |
| `lazyload`       | `boolean`                                    | `true`         | Enable lazy loading                                           |

### Options

To customize the module, override the necessary options in your `nuxt.config.ts`. Any custom options are merged with the defaults.

| Option   | Type                                         | Default                                                        | Description                                                              |
| -------- | -------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `sizes`  | `string \| Record<string, string \| number>` | `'128w:128px 512w:512px 720w:720px 1024w:1024px 1440w:1440px'` | Sizes applied to every image, overridden per image by the `sizes` prop   |
| `image`  | Nuxt Image module options                    | `{}`                                                           | Passed to [Nuxt Image](https://image.nuxt.com/get-started/configuration) |
| `unlazy` | Unlazy module options                        | `{}`                                                           | Passed to [Unlazy](https://unlazy.byjohann.dev/integrations/nuxt.html)   |

### Events

| Event    | Description                               |
| -------- | ----------------------------------------- |
| `loaded` | Fired when the image has finished loading |

---

## Sizes

A srcset alone does not decide which candidate the browser downloads. It resolves the candidates against the image’s `sizes` attribute. Get `sizes` wrong and the browser picks a candidate that is too small, then upscales it.

`autoSizes` is on by default, so the element measures itself: `sizes` is rendered as `auto` and Unlazy keeps it in line with the element’s layout width. Reach for it whenever the image’s width follows the layout.

Turn `autoSizes` off to declare the width yourself. The `sizes` prop is rendered as the `sizes` attribute, one entry per screen.

```vue
<magic-image
  src="https://images.unsplash.com/photo-1694444070793-13db645409f4"
  sizes="640w:100vw 1024w:50vw"
  :auto-sizes="false"
/>
```

The same `sizes` value also decides which srcset candidates are generated, and the module option applies to every image. So declare a per-image `sizes` prop whenever an image is displayed at a different width than the module default describes.

---

## Caveats

Both paths describe the element’s **layout** width. An image painted with `object-fit: cover` covers more width than its box whenever the box is taller than the image’s own aspect ratio. Lay such an image out at the size the crop paints, or every candidate is measured against a box narrower than what ends up on screen.

`sizes="auto"` is only valid on a lazy loaded image. With `lazyload` off, no `sizes` attribute is rendered and the browser assumes the image spans the full viewport width.

---

## Providers

### MaaS

Built-in provider for the [MaaS image CDN](https://img.maas.earth). Set `provider: 'maas'`, or use it as the default provider, and pass any of the supported modifiers.

```vue
<magic-image
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

#### Modifiers

| Modifier       | Type                                                                                                   | Description                          |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `width`        | `number`                                                                                               | Output width in px                   |
| `height`       | `number`                                                                                               | Output height in px                  |
| `fit`          | `'cover' \| 'contain' \| 'fill' \| 'inside' \| 'outside'`                                              | Resize fit mode                      |
| `format`       | `'jpg' \| 'jpeg' \| 'png' \| 'webp'`                                                                   | Output format                        |
| `quality`      | `number`                                                                                               | Output quality (1–100)               |
| `pixelDensity` | `number`                                                                                               | Device pixel ratio (e.g. `2` for 2×) |
| `blur`         | `number`                                                                                               | Blur radius                          |
| `sharpen`      | `number`                                                                                               | Sharpening strength                  |
| `brightness`   | `number`                                                                                               | Brightness adjustment                |
| `contrast`     | `number`                                                                                               | Contrast adjustment                  |
| `saturation`   | `number`                                                                                               | Saturation adjustment                |
| `hue`          | `number`                                                                                               | Hue rotation in degrees              |
| `gamma`        | `number`                                                                                               | Gamma correction                     |
| `filter`       | `'greyscale' \| 'sepia' \| 'negative' \| 'duotone'`                                                    | Color filter                         |
| `rotate`       | `number`                                                                                               | Rotation in degrees                  |
| `mirror`       | `boolean`                                                                                              | Flip horizontally                    |
| `mask`         | `'circle' \| 'ellipse' \| 'triangle' \| 'pentagon' \| 'hexagon' \| 'square' \| 'star' \| 'heart' \| …` | Shape mask                           |
| `background`   | `string`                                                                                               | Background color                     |
| `trimImage`    | `boolean`                                                                                              | Auto-trim whitespace                 |

### Mux

Built-in provider for [Mux video thumbnail extraction](https://docs.mux.com/guides/get-images-from-a-video). Pass the full Mux thumbnail URL as `src` and set `provider="mux"`.

```vue
<magic-image
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

#### Modifiers

| Modifier         | Type                                                     | Description                                    |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------- |
| `width`          | `number`                                                 | Thumbnail width in px                          |
| `height`         | `number`                                                 | Thumbnail height in px                         |
| `fit`            | `'cover' \| 'contain' \| 'fill' \| 'pad' \| 'smartcrop'` | Resize fit mode                                |
| `time`           | `number`                                                 | Timestamp in seconds to extract thumbnail from |
| `rotate`         | `number`                                                 | Rotation in degrees                            |
| `flipHorizontal` | `boolean`                                                | Flip horizontally                              |
| `flipVertical`   | `boolean`                                                | Flip vertically                                |
| `start`          | `number`                                                 | Clip start time                                |
| `end`            | `number`                                                 | Clip end time                                  |
| `fps`            | `number`                                                 | Frames per second (for animated thumbnails)    |

---

## TypeScript

Import `MagicImageModifiers` for typed modifier objects.

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
