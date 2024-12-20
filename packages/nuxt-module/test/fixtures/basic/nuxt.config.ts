import MyModule from '../../../src/module'

// @ts-expect-error defineNuxtConfig not available here
export default defineNuxtConfig({
  modules: [MyModule],
})
