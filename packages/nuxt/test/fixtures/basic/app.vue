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
      :lazyload="false"
    />
  </div>
</template>

<script setup lang="ts">
import { TestId } from '../../enums'

const { getSizes } = useImage()

const maasSrc =
  getSizes('/test/photo.jpg', {
    provider: 'maas',
    sizes: '800w:800px',
    modifiers: { width: 800, height: 600 },
  })?.src ?? ''

const muxSrc =
  getSizes('https://image.mux.com/abc123/thumbnail.jpg', {
    provider: 'mux',
    sizes: '800w:800px',
    modifiers: { width: 800 },
  })?.src ?? ''
</script>
