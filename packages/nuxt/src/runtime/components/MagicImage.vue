<template>
  <img
    v-if="priority"
    ref="image"
    class="magic-image"
    :data-loaded="loaded"
    :src="sources?.src"
    :srcset="sources?.srcset"
    :sizes="sources?.sizes"
    loading="eager"
    fetchpriority="high"
    @load="onLoaded"
  />
  <un-lazy-image
    v-else
    class="magic-image"
    :data-loaded="loaded"
    :placeholder-src="placeholderSrc"
    :src-set="sources?.srcset"
    :sizes="sizesAttribute"
    :auto-sizes="autoSizes"
    :preload="preload"
    :lazy-load="lazyload"
    @image-load="onLoaded"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useHead,
  useImage,
  useRuntimeConfig,
  useTemplateRef,
} from '#imports'
import { UnLazyImage } from '#components'
import type { ImageOptions } from '@nuxt/image'
import type { MagicImageModifiers, MagicImageRuntimeConfig } from '../../module'

interface MagicImageProps {
  src: string
  provider?: string
  preset?: string
  densities?: string
  modifiers?: Partial<MagicImageModifiers>
  placeholderSrc?: string
  preload?: boolean
  priority?: boolean
  sizes?: Record<string, string | number> | string
  autoSizes?: boolean
  lazyload?: boolean
}

// `@nuxt/image` narrows `provider` and `modifiers` to the app's provider map.
type GetSizes = (
  source: string,
  options?: Omit<ImageOptions, 'provider' | 'modifiers'> & {
    provider?: string
    modifiers?: Partial<MagicImageModifiers>
  }
) => ReturnType<ReturnType<typeof useImage>['getSizes']>

const {
  src,
  provider,
  preset,
  densities,
  modifiers,
  placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  preload = false,
  priority = false,
  sizes,
  autoSizes = true,
  lazyload = true,
} = defineProps<MagicImageProps>()

const emit = defineEmits<{ loaded: [] }>()

const config = useRuntimeConfig().public.magicImage as MagicImageRuntimeConfig
const getSizes = useImage().getSizes as GetSizes

const sources = computed(() =>
  getSizes(src, {
    sizes: sizes ?? config.sizes,
    modifiers,
    provider,
    preset,
    densities,
  })
)

const sizesAttribute = computed(() => {
  if (!autoSizes) {
    return sources.value?.sizes
  }
  return lazyload ? 'auto' : undefined
})

if (preload || priority) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: () => sources.value?.src,
        imagesrcset: () => sources.value?.srcset,
        imagesizes: () => sources.value?.sizes,
        fetchpriority: priority ? 'high' : undefined,
      },
    ],
  })
}

const loaded = ref(false)
const image = useTemplateRef<HTMLImageElement>('image')

function onLoaded() {
  if (loaded.value) {
    return
  }
  loaded.value = true
  emit('loaded')
}

// A priority image can finish before hydration, so `load` never fires for the
// listener. `complete` is also true for a broken image, hence the size check.
onMounted(() => {
  if (priority && image.value?.complete && image.value.naturalWidth > 0) {
    onLoaded()
  }
})
</script>
