import MagicImageModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MagicImageModule],
  magicImage: {
    // The record form, so the module's serialisation into the runtime config is
    // covered — it has to render identically to '800w:800px 1440w:1440px'
    sizes: { '800w': '800px', '1440w': 1440 },
  },
})
