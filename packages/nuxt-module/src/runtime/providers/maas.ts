import { withBase } from 'ufo'
import { createOperationsGenerator } from '#image'
import type { ProviderGetImage, ImageOptions } from '@nuxt/image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: 'output',
    width: 'w',
    height: 'h',
    quality: 'q',
    background: 'bg',
    pixelDensity: 'dpr',
    trimImage: 'trim',
    sharpen: 'sharp',
    brightness: 'mod',
    saturation: 'sat',
    hue: 'hue',
    filter: 'filt',
    gamma: 'gam',
    contrast: 'con',
    blur: 'blur',
    mirror: 'flop',
    rotate: 'ro',
    mask: 'mask',
    maskTrim: 'mtrim',
    maskBackground: 'mbg',
  },
  valueMap: {
    format: {
      jpeg: 'jpg',
      jpg: 'jpg',
      png: 'png',
      webp: 'webp',
    },
    fit: {
      cover: 'cover',
      contain: 'contain',
      fill: 'fill',
      inside: 'inside',
      outside: 'outside',
    },
    filter: {
      greyscale: 'greyscale',
      sepia: 'sepia',
      negative: 'negate',
      duotone: 'duotone',
    },
    mask: {
      circle: 'circle',
      ellipse: 'ellipse',
      triangle: 'triangle',
      'triangle-180': 'triangle-180',
      pentagon: 'pentagon',
      'pentagon-180': 'pentagon-180',
      hexagon: 'hexagon',
      square: 'square',
      star: 'star',
      heart: 'heart',
    },
  },
  joinWith: '&',
  formatter: (key, value) => `${key}=${value}`,
})

export const getImage: ProviderGetImage = (
  src: string,
  options: ImageOptions
) => {
  const modifiers = Object.fromEntries(
    Object.entries(options.modifiers || {}).map(([key, value]) => [
      key,
      value != null ? String(value) : value,
    ])
  )
  const operations = operationsGenerator({
    we: 'true',
    ...modifiers,
    url: encodeURIComponent(src),
  }).replace('=true', '')
  return {
    url: withBase(
      operations.length ? '?' + operations : '',
      'https://img.maas.earth'
    ),
  }
}
