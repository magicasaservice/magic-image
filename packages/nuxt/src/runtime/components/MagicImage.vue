<template>
  <un-lazy-image
    class="magic-image"
    :data-loaded="loaded"
    :placeholder-src="placeholderSrc"
    :src-set="computedImageSizes?.srcset"
    :sizes="sizesAttribute"
    :auto-sizes="autoSizes"
    :preload="preload"
    :lazy-load="lazyload"
    @image-load="onLoaded"
  />
</template>

<script lang="ts" setup>
import { useImage, useHead, computed, ref, useRuntimeConfig } from '#imports'
import { UnLazyImage } from '#components'

import type { ImageOptions } from '@nuxt/image'
import type { MagicImageRuntimeConfig, MagicImageModifiers } from '../../module'

// `@nuxt/image` types `provider` and `modifiers` from the app's generated
// provider map, which is `never` here and too narrow in an app. Widen both back
// for this deliberately provider-agnostic component.
type MagicImageSizesOptions = Omit<ImageOptions, 'provider' | 'modifiers'> & {
  provider?: string
  modifiers?: Partial<MagicImageModifiers>
}

const options = useRuntimeConfig().public.magicImage as MagicImageRuntimeConfig

interface MagicImageProps {
  src: string
  provider?: string
  preset?: string
  densities?: string
  modifiers?: Partial<MagicImageModifiers>
  placeholderSrc?: string
  preload?: boolean
  sizes?: Record<string, string | number> | string
  autoSizes?: boolean
  lazyload?: boolean
}

const {
  src,
  placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  preload = false,
  autoSizes = true,
  lazyload = true,
  sizes,
  provider,
  preset,
  modifiers,
  densities,
} = defineProps<MagicImageProps>()

const emit = defineEmits(['loaded'])
const { getSizes } = useImage()
const getMagicImageSizes = getSizes as (
  source: string,
  options?: MagicImageSizesOptions
) => ReturnType<typeof getSizes>
const loaded = ref(false)

const computedImageSizes = computed(() =>
  getMagicImageSizes(src, {
    sizes: sizes ?? options?.sizes,
    modifiers: modifiers,
    provider: provider,
    preset: preset,
    densities: densities,
  })
)

const sizesAttribute = computed(() => {
  if (!autoSizes) {
    return computedImageSizes.value?.sizes
  }
  return lazyload ? 'auto' : undefined
})

if (preload) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: computedImageSizes?.value?.src,
        imagesrcset: computedImageSizes?.value?.srcset,
        imagesizes: computedImageSizes?.value?.sizes,
      },
    ],
  })
}

function onLoaded() {
  emit('loaded')
  loaded.value = true
}
</script>
