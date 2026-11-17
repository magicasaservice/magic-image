<template>
  <div>
    <span id="maas-src">{{ maasSrc }}</span>
    <span id="mux-src">{{ muxSrc }}</span>
    <MagicImage
      src="/test/photo.jpg"
      provider="maas"
      :modifiers="{ width: 800, height: 600 }"
    />
    <MagicImage
      :data-test-id="TestId.AutoSizes"
      src="/test/photo.jpg"
      provider="maas"
    />
    <MagicImage
      :data-test-id="TestId.ModuleSizes"
      src="/test/photo.jpg"
      provider="maas"
      :auto-sizes="false"
    />
    <MagicImage
      :data-test-id="TestId.PropSizes"
      src="/test/photo.jpg"
      provider="maas"
      sizes="800w:400px"
      :auto-sizes="false"
    />
    <MagicImage
      :data-test-id="TestId.EagerImage"
      src="/test/photo.jpg"
      provider="maas"
      loading="eager"
    />
    <MagicImage
      :data-test-id="TestId.PriorityImage"
      src="/test/photo.jpg"
      provider="maas"
      sizes="800w:400px"
      priority
    />
    <MagicImage
      :data-test-id="TestId.PreloadImage"
      src="/test/photo.jpg"
      provider="maas"
      sizes="800w:200px"
      preload
    />
    <!-- Browser tests: a local image that loads and one that 404s. The mux
         provider only appends query params, so the fixture's public dir
         serves them. -->
    <MagicImage
      :data-test-id="TestId.LoadedPriorityImage"
      src="/pixel.png"
      provider="mux"
      sizes="800w:100px"
      priority
      @loaded="priorityLoads++"
    />
    <MagicImage
      :data-test-id="TestId.BrokenPriorityImage"
      src="/missing.png"
      provider="mux"
      sizes="800w:100px"
      priority
      @loaded="brokenLoads++"
    />
    <MagicImage
      :data-test-id="TestId.EagerDeclaredSizesImage"
      src="/test/photo.jpg"
      provider="maas"
      sizes="800w:400px"
      :auto-sizes="false"
      loading="eager"
    />
    <MagicImage
      :data-test-id="TestId.FragmentPlaceholderImage"
      src="/test/photo.jpg"
      provider="maas"
      placeholder-src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==#own"
    />
    <MagicImage
      :data-test-id="TestId.DeprecatedHeldImage"
      src="/test/photo.jpg"
      provider="maas"
      :lazyload="false"
    />
    <span id="hydrated" :data-hydrated="hydrated" />
    <span id="priority-loads">{{ priorityLoads }}</span>
    <span id="broken-loads">{{ brokenLoads }}</span>
    <!-- Loading in the browser: two local images in view, one of them held,
         and two more far below the fold. -->
    <MagicImage
      :data-test-id="TestId.VisibleLazyImage"
      src="/pixel.png"
      provider="mux"
    />
    <MagicImage
      :data-test-id="TestId.HeldImage"
      src="/pixel.png"
      provider="mux"
      :lazy-load="released"
    />
    <button id="release" @click="released = true">Release</button>
    <div style="height: 10000px" />
    <MagicImage
      :data-test-id="TestId.OffscreenLazyImage"
      src="/pixel.png"
      provider="mux"
    />
    <MagicImage
      :data-test-id="TestId.OffscreenEagerImage"
      src="/pixel.png"
      provider="mux"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import { TestId } from '../../enums'
import type { ImageOptions } from '@nuxt/image'

// `@nuxt/image` types `getSizes` for the app's default provider only. This
// fixture compares URLs from other providers, so widen `provider` like
// `MagicImage` does.
const { getSizes } = useImage()
const getProviderSizes = getSizes as (
  source: string,
  options?: Omit<ImageOptions, 'provider'> & { provider?: string }
) => ReturnType<typeof getSizes>

const hydrated = ref(false)
const priorityLoads = ref(0)
const brokenLoads = ref(0)
const released = ref(false)
onMounted(() => {
  hydrated.value = true
})

const maasSrc =
  getProviderSizes('/test/photo.jpg', {
    provider: 'maas',
    sizes: '800w:800px',
    modifiers: { width: 800, height: 600 },
  })?.src ?? ''

const muxSrc =
  getProviderSizes('https://image.mux.com/abc123/thumbnail.jpg', {
    provider: 'mux',
    sizes: '800w:800px',
    modifiers: { width: 800 },
  })?.src ?? ''
</script>
