<template>
  <div>
    <span id="maas-src">{{ maasSrc }}</span>
    <span id="mux-src">{{ muxSrc }}</span>
    <MagicImage src="/test/photo.jpg" provider="maas" :modifiers="{ width: 800, height: 600 }" />
  </div>
</template>

<script setup lang="ts">
const { getSizes } = useImage()

const maasSrc = getSizes('/test/photo.jpg', {
  provider: 'maas',
  sizes: '800w:800px',
  modifiers: { width: 800, height: 600 },
})?.src ?? ''

const muxSrc = getSizes('https://image.mux.com/abc123/thumbnail.jpg', {
  provider: 'mux',
  sizes: '800w:800px',
  modifiers: { width: 800 },
})?.src ?? ''
</script>
