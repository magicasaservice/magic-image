import { defu } from 'defu'

import {
  defineNuxtModule,
  addComponent,
  createResolver,
  installModule,
} from '@nuxt/kit'

import type {
  ModuleOptions as NuxtImageModuleOptions,
  ImageModifiers,
} from '@nuxt/image'

import type { ModuleOptions as UnlazyModuleOptions } from '@unlazy/nuxt'
import type { NuxtModule } from '@nuxt/schema'

// Module options
export interface ModuleOptions {
  sizes: Record<string, string | number> | string
  image: Partial<NuxtImageModuleOptions>
  unlazy: UnlazyModuleOptions
}

// Re-export Image modifiers
export type MagicImageModifiers = ImageModifiers

// Define the module with explicit return type
const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'magic-image',
    configKey: 'magicImage',
  },
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

    // Define all custom providers
    const providers = {
      maas: {
        name: 'maas',
        provider: resolver.resolve('./runtime/providers/maas'),
        options: {
          ...options.image.maas,
        },
      },
      mux: {
        name: 'mux',
        provider: resolver.resolve('./runtime/providers/mux'),
        options: {
          ...options.image.mux,
        },
      },
    }

    // Prepare image module options with custom providers
    const imageOptions = defu(options.image, {
      providers: providers,
    })

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.magicImage = {
      sizes: options.sizes,
      providers: providers,
      ...options.unlazy, // Include unlazy options if needed client-side
    }

    // Install dependencies with merged options
    await installModule('@nuxt/image', imageOptions)
    await installModule('@unlazy/nuxt', options.unlazy)
  },
})

export default module
