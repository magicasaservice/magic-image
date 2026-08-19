import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

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

// Shape of the public runtime config actually written by the module. `sizes` is
// always the string form here, never the record one — see `serializeSizes`.
export interface MagicImageRuntimeConfig extends UnlazyModuleOptions {
  sizes: string
  providers: Record<
    string,
    { name: string; provider: string; options: Record<string, unknown> }
  >
}

// Extended modifiers covering all maas + mux provider params
export type MagicImageModifiers = Omit<ImageModifiers, 'fit'> & {
  fit?:
    'cover' | 'contain' | 'fill' | 'inside' | 'outside' | 'pad' | 'smartcrop'
  rotate?: number
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

const resolver = createResolver(import.meta.url)

// Nuxt derives the public runtime config types from the values written into it,
// so `sizes` has to land in one stable shape — otherwise the generated type is
// whatever a given app happened to configure, and the union no longer fits it.
// `@nuxt/image` parses both forms into the same map, and stringifies every value
// on the way out, so the string form loses nothing.
function serializeSizes(sizes: ModuleOptions['sizes']): string {
  if (typeof sizes === 'string') {
    return sizes
  }

  return Object.entries(sizes)
    .map(([screen, size]) => `${screen}:${size}`)
    .join(' ')
}

// Build the custom provider definitions. Each provider forwards whatever the
// app configured under `magicImage.image.<name>` to the provider runtime.
function createProviders(image: Partial<NuxtImageModuleOptions>) {
  const imageOptions = image as Record<string, unknown>

  return {
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
  // Nuxt installs these for us. Their options are read from the raw config
  // rather than the resolved ones, because dependencies are resolved before
  // `setup` runs — the defaults for both are empty, so nothing is lost.
  moduleDependencies: (nuxt) => {
    const { image = {}, unlazy = {} } =
      (nuxt.options as { magicImage?: Partial<ModuleOptions> }).magicImage ?? {}

    return {
      '@nuxt/image': {
        // `magicImage.image` wins over a top-level `image` config, while the
        // custom providers only fill in what the app has not defined itself
        overrides: image as Record<string, unknown>,
        defaults: { providers: createProviders(image) },
      },
      '@unlazy/nuxt': {
        overrides: unlazy as Record<string, unknown>,
      },
    }
  },
  setup(options, nuxt) {
    addComponent({
      filePath: resolver.resolve('./runtime/components/MagicImage.vue'),
      name: 'MagicImage',
      global: true,
    })

    const providers = createProviders(options.image)

    // Add module options to public runtime config
    nuxt.options.runtimeConfig.public.magicImage = {
      sizes: serializeSizes(options.sizes),
      providers: providers,
      ...options.unlazy, // Include unlazy options if needed client-side
    }
  },
})

export default module
