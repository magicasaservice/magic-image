<template>
  <un-lazy-image
    class="magic-image"
    :data-loaded="loaded"
    :placeholder-src="placeholderSrc"
    :src-set="computedImageSizes?.srcset"
    :auto-sizes="autoSizes"
    :preload="preload"
    :lazy-load="lazyload"
    @loaded="onLoaded"
  />
</template>

<script lang="ts" setup>
import { useImage, useHead, computed, ref, useRuntimeConfig } from '#imports'
import { UnLazyImage } from '#components'

import { type ModuleOptions } from '../../module'
import { ImageModifiers } from '@nuxt/image'

const options = useRuntimeConfig().public.magicImage as ModuleOptions

interface MagicImageProps {
  src: string
  provider?: string
  preset?: string
  densities?: string
  modifiers?: Partial<ImageModifiers>
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
const loaded = ref(false)

const computedImageSizes = computed(() =>
  getSizes(src, {
    sizes: sizes ?? options?.sizes,
    modifiers: modifiers,
    provider: provider,
    preset: preset,
    densities: densities,
  })
)

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
