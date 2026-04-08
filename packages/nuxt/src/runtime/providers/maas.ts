import { withBase } from 'ufo'
import { createOperationsGenerator, defineProvider } from '@nuxt/image/runtime'

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

export default defineProvider({
  getImage(src, { modifiers = {} }) {
    const filename = src.substring(src.lastIndexOf('/') + 1)

    const stringModifiers = Object.fromEntries(
      Object.entries(modifiers).map(([key, value]) => [
        key,
        value != null ? String(value) : value,
      ])
    )

    const operations = operationsGenerator({
      filename: encodeURIComponent(filename),
      we: 'true',
      ...stringModifiers,
      url: encodeURIComponent(src),
    }).replace('=true', '')

    return {
      url: withBase(
        operations.length ? '?' + operations : '',
        'https://img.maas.earth'
      ),
    }
  },
})
