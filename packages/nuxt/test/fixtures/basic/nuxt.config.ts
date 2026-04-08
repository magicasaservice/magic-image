import MagicImageModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MagicImageModule],
  magicImage: {
    sizes: '800w:800px 1440w:1440px',
  },
})
