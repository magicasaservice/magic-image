export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  magicImage: {
    // sizes: '256w:256px 960w:960px 1440w:1440px',
    image: {
      provider: 'weserv',
      weserv: {
        baseURL: 'https://img.maas.earth',
        weservURL: 'https://img.maas.earth',
        modifiers: {
          af: 'webp',
          format: 'webp',
        },
      },
      // provider: 'imgix',
      // imgix: {
      //   baseURL: '',
      //   modifiers: {
      //     auto: 'format,compress',
      //   },
      // },
    },
    // unlazy: {
    //   ssr: true,
    // },
  },
})
