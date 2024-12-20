![NPM Version](https://img.shields.io/npm/v/%40maas%2Fmagic-image)
![NPM Downloads](https://img.shields.io/npm/dm/%40maas%2Fmagic-image)

# Magic Image 🪄 🖼️

Magic Image is a modern, flexible, and powerful image component for Nuxt applications. It wraps the best features of [Unlazy](https://github.com/johannschopplich/unlazy) and [Nuxt Image](https://github.com/nuxt/image) into a single, plug-and-play package. With Magic Image, you can effortlessly integrate advanced image handling capabilities into your project and benefit from effortless autosizes and best practice lazy loading.

---

## ✨ Key Benefits

- **🌟 Auto-lazy Loading**: Optimize load times with automatic lazy loading.
- **📐 Dynamic Sizing**: Automatically adjust image sizes for different devices.
- **⚡ Optimized Loading**: Deliver the most efficient images for your users.
- **🔗 Unified API**: A single API for all your favorite image CDNs.
- **📦 Extended Providers**:
  - **🎥 MUX Video Thumbnails**: Seamlessly fetch video thumbnails from MUX (coming soon) ([Documentation](https://docs.mux.com/guides/get-images-from-a-video)).
  - **🛍️ Shopify Image CDN**: Support for Shopify images (coming soon) ([Documentation](https://cdn.shopify.com/)).

---

## 📥 Installation

Install the package using your preferred package manager:

```bash
# npm
npm install @magic-image/nuxt

# pnpm
pnpm add @magic-image/nuxt

# yarn
yarn add @magic-image/nuxt
```

---

## ⚙️ Configuration

To use Magic Image in your Nuxt app, register it as a module and configure it in your `nuxt.config.ts` file. Below is an example configuration:

```ts
export default defineNuxtConfig({
  modules: ['@maas/magic-image/nuxt'],
  magicImage: {
    sizes: '256w:256px 960w:960px 1440w:1440px', // optional srcset custom sizes
    // See: https://image.nuxt.com/get-started/configuration
    image: {
      provider: 'unsplash',
      unsplash: {
        baseURL: '',
        modifiers: {
          auto: 'format,compress',
        },
      },
    },
    // See: https://unlazy.byjohann.dev/integrations/nuxt.html#module-options
    unlazy: {
       ssr: true,
    },
  },
});
```

---

## 🔧 Usage

Magic Image provides a unified API for all your image needs. Here’s an example of how to use it in a Nuxt component:

```vue
<template>
  <div>
    <magic-image src="https://images.unsplash.com/photo-1694444070793-13db645409f4" />
  </div>
</template>
```

---

## 🚀 Features

1. **🔗 Seamless Integration**: Combines the power of Unlazy and Nuxt Image into one package.
2. **📦 Customizable Providers**: Support for popular CDNs, including Unsplash, MUX, and Shopify (coming soon).
3. **⚙️ Flexibility**: Easily configure sizes, lazy loading, and more.
4. **⚡ Performance Optimization**: Automatically delivers optimized images for better user experience.

---

## 🗺️ Roadmap

- [ ] Add MUX Video Thumbnail support.
- [ ] Shopify Image CDN integration.

---

## 📜 License

Magic Image is released under the **MIT License**.

