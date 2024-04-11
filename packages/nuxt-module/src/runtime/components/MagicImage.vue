<template>
  <un-lazy-image
    placeholder-src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    :src-set="computedImageSizes?.srcset"
    :auto-sizes="autoSizes"
    :preload="preload"
    :lazy-load="lazyload"
    @loaded="onLoaded"
    class="magic-image"
    :class="{ 'magic-image--loaded': loaded }"
  />
</template>

<script lang="ts" setup>
import { useImage, useHead, computed, ref, useRuntimeConfig } from '#imports'
import { UnLazyImage } from '#components'
import type { ModuleOptions } from '../../module'
import type { ImageOptions } from '@nuxt/image'

const options = useRuntimeConfig().public.magicImage as ModuleOptions

interface Props
  extends Pick<
    ImageOptions,
    'provider' | 'preset' | 'densities' | 'modifiers'
  > {
  src: string
  preload?: boolean
  sizes?: Record<string, string | number> | string
  autoSizes?: boolean
  lazyload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: undefined,
  preload: false,
  sizes: undefined,
  autoSizes: true,
  lazyload: true,
  provider: undefined,
  preset: undefined,
  densities: undefined,
  modifiers: undefined,
})

const emit = defineEmits(['loaded'])

const loaded = ref(false)

const { getSizes } = useImage()

const computedImageSizes = computed(() =>
  getSizes(props.src, {
    sizes: props.sizes || options?.sizes,
    provider: props.provider,
    preset: props.preset,
    densities: props.densities,
    modifiers: props.modifiers,
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
