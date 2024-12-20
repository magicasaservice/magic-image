export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['../src/module', '@nuxtjs/tailwindcss'],

  magicImage: {
    image: {
      provider: 'unsplash',
      unsplash: {
        baseURL: '',
        modifiers: {
          auto: 'format,compress',
        },
      },
    },
  },

  compatibilityDate: '2024-12-20',
})
