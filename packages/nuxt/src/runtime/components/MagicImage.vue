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
    :placeholder-src="placeholder"
    :src-set="sources?.srcset"
    :sizes="sizesAttribute"
    :auto-sizes="autoSizes"
    :preload="preload"
    :loading="loading"
    :lazy-load="mayLoad"
    @image-load="onLoaded"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  ref,
  useHead,
  useId,
  useImage,
  useRuntimeConfig,
  useTemplateRef,
} from '#imports'
import { UnLazyImage } from '#components'
import { warnOnce } from '../utils/warnOnce'
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
  loading?: 'lazy' | 'eager'
  lazyLoad?: boolean
  /** @deprecated Use `lazyLoad` instead. */
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
  loading,
  // Vue casts an absent boolean prop to `false` unless it has a default.
  lazyLoad = undefined,
  lazyload = undefined,
} = defineProps<MagicImageProps>()

if (import.meta.dev && lazyload !== undefined) {
  warnOnce(
    '[magic-image] The `lazyload` prop is deprecated. Use `lazyLoad` instead.'
  )
}

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

const mayLoad = computed(() => lazyLoad ?? lazyload ?? true)

const sizesAttribute = computed(() => {
  if (!autoSizes) {
    return sources.value?.sizes
  }
  // `auto` is only valid on a lazy loaded image.
  return loading === 'eager' || !mayLoad.value ? undefined : 'auto'
})

const id = useId()

// A URL that already loaded is served from memory and fires `load` at once,
// even off-screen, which starts the real image. So no two images share one.
const placeholder = computed(() =>
  placeholderSrc.includes('#') ? placeholderSrc : `${placeholderSrc}#${id}`
)

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
