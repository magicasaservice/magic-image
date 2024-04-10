import {
  defineNuxtModule,
  addComponent,
  createResolver,
  installModule,
} from '@nuxt/kit'

import defu from 'defu'

import type { ModuleOptions as NuxtImageModuleOptions } from '@nuxt/image'
import type { ModuleOptions as UnlazyModuleOptions } from '@unlazy/nuxt'

// Module options TypeScript interface definition
export interface ModuleOptions {
  sizes: Record<string, string | number> | string
  image: Partial<NuxtImageModuleOptions>
  unlazy: UnlazyModuleOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'magic-image',
    configKey: 'magicImage',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    sizes: '128w:128px 512w:512px 720w:720px 1024w:1024px 1440w:1440px',
    image: {} as NuxtImageModuleOptions,
    unlazy: {} as UnlazyModuleOptions,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponent({
      filePath: resolver.resolve('./runtime/components/MagicImage.vue'),
      name: 'MagicImage',
      global: true,
    })

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.magicImage = defu(
      {
        sizes: options.sizes,
      },
      options
    )

    // Install the `@nuxt/image` module
    await installModule('@nuxt/image', options.image)

    // Install the `@unlazy/nuxt` module
    await installModule('@unlazy/nuxt', options.unlazy)
  },
})
