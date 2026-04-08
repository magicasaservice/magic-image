import { describe, it, expect } from 'vitest'
import type { ImageCTX } from '@nuxt/image'
import type { MagicImageModifiers } from '../../src/module'
import providerFactory from '../../src/runtime/providers/maas'

const { getImage } = providerFactory({})
const _ctx = { options: {} } as ImageCTX

function img(src: string, modifiers: Partial<MagicImageModifiers>) {
  return getImage(src, { modifiers }, _ctx).url
}

describe('maas provider', () => {
  describe('base URL', () => {
    it('always targets img.maas.earth', () => {
      expect(img('/photo.jpg', {})).toMatch(/^https:\/\/img\.maas\.earth/)
    })

    it('encodes src as url param', () => {
      expect(img('/path/to/photo.jpg', {})).toContain(
        `url=${encodeURIComponent('/path/to/photo.jpg')}`
      )
    })

    it('extracts filename from src path', () => {
      expect(img('/path/to/photo.jpg', {})).toContain('filename=photo.jpg')
    })

    it('adds we flag without =true', () => {
      const url = img('/photo.jpg', {})
      expect(url).toContain('we')
      expect(url).not.toContain('we=true')
    })
  })

  describe('dimension modifiers', () => {
    it('maps width to w', () => {
      expect(img('/photo.jpg', { width: 800 })).toContain('w=800')
    })

    it('maps height to h', () => {
      expect(img('/photo.jpg', { height: 600 })).toContain('h=600')
    })

    it('maps quality to q', () => {
      expect(img('/photo.jpg', { quality: 80 })).toContain('q=80')
    })

    it('maps pixelDensity to dpr', () => {
      expect(img('/photo.jpg', { pixelDensity: 2 })).toContain('dpr=2')
    })
  })

  describe('format valueMap', () => {
    it('maps jpeg to jpg', () => {
      expect(img('/photo.jpg', { format: 'jpeg' })).toContain('output=jpg')
    })

    it('maps jpg to jpg', () => {
      expect(img('/photo.jpg', { format: 'jpg' })).toContain('output=jpg')
    })

    it('maps webp to webp', () => {
      expect(img('/photo.jpg', { format: 'webp' })).toContain('output=webp')
    })

    it('maps png to png', () => {
      expect(img('/photo.jpg', { format: 'png' })).toContain('output=png')
    })
  })

  describe('image adjustments', () => {
    it('maps blur to blur', () => {
      expect(img('/photo.jpg', { blur: 5 })).toContain('blur=5')
    })

    it('maps rotate to ro', () => {
      expect(img('/photo.jpg', { rotate: 90 })).toContain('ro=90')
    })

    it('maps brightness to mod', () => {
      expect(img('/photo.jpg', { brightness: 50 })).toContain('mod=50')
    })

    it('maps saturation to sat', () => {
      expect(img('/photo.jpg', { saturation: 80 })).toContain('sat=80')
    })

    it('maps contrast to con', () => {
      expect(img('/photo.jpg', { contrast: 10 })).toContain('con=10')
    })

    it('maps sharpen to sharp', () => {
      expect(img('/photo.jpg', { sharpen: 3 })).toContain('sharp=3')
    })
  })

  describe('filter valueMap', () => {
    it('maps greyscale filter', () => {
      expect(img('/photo.jpg', { filter: 'greyscale' })).toContain(
        'filt=greyscale'
      )
    })

    it('maps sepia filter', () => {
      expect(img('/photo.jpg', { filter: 'sepia' })).toContain('filt=sepia')
    })

    it('maps negative filter to negate', () => {
      expect(img('/photo.jpg', { filter: 'negative' })).toContain('filt=negate')
    })

    it('maps duotone filter', () => {
      expect(img('/photo.jpg', { filter: 'duotone' })).toContain('filt=duotone')
    })
  })

  describe('mask valueMap', () => {
    it('maps circle mask', () => {
      expect(img('/photo.jpg', { mask: 'circle' })).toContain('mask=circle')
    })

    it('maps heart mask', () => {
      expect(img('/photo.jpg', { mask: 'heart' })).toContain('mask=heart')
    })

    it('maps triangle-180 mask', () => {
      expect(img('/photo.jpg', { mask: 'triangle-180' })).toContain(
        'mask=triangle-180'
      )
    })
  })
})
