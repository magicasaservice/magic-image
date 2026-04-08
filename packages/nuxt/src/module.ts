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

// Extended modifiers covering all maas + mux provider params
export type MagicImageModifiers = Omit<ImageModifiers, 'fit'> & {
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside' | 'pad' | 'smartcrop'
  // MaaS
  pixelDensity?: number
  trimImage?: boolean
  sharpen?: number
  brightness?: number
  saturation?: number
  hue?: number
  filter?: 'greyscale' | 'sepia' | 'negative' | 'duotone'
  gamma?: number
  contrast?: number
  blur?: number
  mirror?: boolean
  mask?:
    | 'circle'
    | 'ellipse'
    | 'triangle'
    | 'triangle-180'
    | 'pentagon'
    | 'pentagon-180'
    | 'hexagon'
    | 'square'
    | 'star'
    | 'heart'
  maskTrim?: boolean
  maskBackground?: string
  // Mux
  time?: number
  flipHorizontal?: boolean
  flipVertical?: boolean
  start?: number
  end?: number
  fps?: number
}

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
    const imageOptions = options.image as Record<string, unknown>
    const providers = {
      maas: {
        name: 'maas',
        provider: resolver.resolve('./runtime/providers/maas'),
        options: {
          ...(imageOptions.maas as Record<string, unknown>),
        },
      },
      mux: {
        name: 'mux',
        provider: resolver.resolve('./runtime/providers/mux'),
        options: {
          ...(imageOptions.mux as Record<string, unknown>),
        },
      },
    }

    // Prepare image module options with custom providers
    const mergedImageOptions = defu(options.image, {
      providers: providers,
    })

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.magicImage = {
      sizes: options.sizes,
      providers: providers,
      ...options.unlazy, // Include unlazy options if needed client-side
    }

    // Install dependencies with merged options
    await installModule('@nuxt/image', mergedImageOptions)
    await installModule('@unlazy/nuxt', options.unlazy)
  },
})

export default module
