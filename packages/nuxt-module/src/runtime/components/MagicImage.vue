<template>
  <un-lazy-image
    class="magic-image"
    :class="{ 'magic-image--loaded': loaded }"
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

import type { ModuleOptions } from '../../module'
import type { ImageModifiers } from '@nuxt/image'

const options = useRuntimeConfig().public.magicImage as ModuleOptions

interface MagicImageProps {
  provider?: string
  preset?: string
  densities?: string
  modifiers?: Partial<ImageModifiers>
  placeholderSrc?: string
  src: string
  preload?: boolean
  sizes?: Record<string, string | number> | string
  autoSizes?: boolean
  lazyload?: boolean
}

const props = withDefaults(defineProps<MagicImageProps>(), {
  placeholderSrc:
    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  preload: false,
  sizes: undefined,
  autoSizes: true,
  lazyload: true,
  provider: undefined,
  preset: undefined,
  modifiers: undefined,
})

const emit = defineEmits(['loaded'])
const { getSizes } = useImage()
const loaded = ref(false)

const computedImageSizes = computed(() =>
  getSizes(props.src, {
    sizes: props.sizes ?? options?.sizes,
    modifiers: props.modifiers,
    provider: props.provider,
    preset: props.preset,
    densities: props.densities,
  })
)

if (props.preload) {
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
