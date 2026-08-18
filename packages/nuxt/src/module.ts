import { defu } from 'defu'

import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

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

// Shape of the public runtime config actually written by the module
export interface MagicImageRuntimeConfig extends UnlazyModuleOptions {
  sizes: ModuleOptions['sizes']
  providers: Record<
    string,
    { name: string; provider: string; options: Record<string, unknown> }
  >
}

// Extended modifiers covering all maas + mux provider params
export type MagicImageModifiers = Omit<ImageModifiers, 'fit'> & {
  fit?:
    | 'cover'
    | 'contain'
    | 'fill'
    | 'inside'
    | 'outside'
    | 'pad'
    | 'smartcrop'
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

// Resolve the root directory of a package from this module's own location.
// `<pkg>/package.json` cannot be required directly because both dependencies
// restrict subpaths via `exports`, so walk up from the resolved entry point.
function resolvePackageDir(pkg: string): string | undefined {
  const require = createRequire(import.meta.url)
  let dir = dirname(require.resolve(pkg))

  while (dir !== dirname(dir)) {
    const pkgJson = join(dir, 'package.json')
    if (existsSync(pkgJson)) {
      try {
        if (JSON.parse(readFileSync(pkgJson, 'utf8')).name === pkg) {
          return dir
        }
      } catch {
        // Ignore unreadable package.json and keep walking up
      }
    }
    dir = dirname(dir)
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

    // `@nuxt/image` and `@unlazy/nuxt` are dependencies of this module, not of
    // the consuming app. With strict package managers (pnpm) they are therefore
    // not resolvable from the app's `.nuxt` directory, which breaks the type
    // augmentations both modules generate (`declare module '@nuxt/image'`).
    // Register tsconfig `paths` so those specifiers resolve for type checking.
    nuxt.hook('prepare:types', ({ tsConfig, nodeTsConfig, sharedTsConfig }) => {
      const paths: Record<string, string[]> = {}

      for (const pkg of ['@nuxt/image', '@unlazy/nuxt']) {
        try {
          const pkgDir = resolvePackageDir(pkg)
          if (!pkgDir) {
            continue
          }

          paths[pkg] = [pkgDir]
          paths[`${pkg}/*`] = [`${pkgDir}/*`]
        } catch {
          // Leave resolution to the default algorithm
        }
      }

      // `nodeTsConfig` covers `nuxt.config.ts`, where consumers configure
      // `magicImage.image` and thus need `@nuxt/image`'s provider augmentations
      for (const config of [tsConfig, nodeTsConfig, sharedTsConfig]) {
        if (!config) {
          continue
        }

        config.compilerOptions ||= {}
        config.compilerOptions.paths = {
          ...paths,
          ...config.compilerOptions.paths,
        }
      }
    })
  },
})

export default module
