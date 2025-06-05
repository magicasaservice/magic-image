export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  magicImage: {
    image: {
      provider: 'maas',
      maas: {
        baseURL: 'https://img.maas.earth',
        weservURL: 'https://img.maas.earth',
      },
    },
  },
  compatibilityDate: '2024-12-20',
})
