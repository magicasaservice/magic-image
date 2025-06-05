export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  magicImage: {
    image: {
      provider: 'maas',
    },
  },
  compatibilityDate: '2024-12-20',
})
