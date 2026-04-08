import { describe, it, expect } from 'vitest'
import type { ImageCTX } from '@nuxt/image'
import type { MagicImageModifiers } from '../../src/module'
import providerFactory from '../../src/runtime/providers/mux'

const { getImage } = providerFactory({})
const _ctx = { options: {} } as ImageCTX
const src = 'https://image.mux.com/abc123/thumbnail.jpg'

function img(modifiers: Partial<MagicImageModifiers>) {
  return getImage(src, { modifiers }, _ctx).url
}

describe('mux provider', () => {
  describe('base URL', () => {
    it('preserves the source URL', () => {
      expect(img({})).toContain('https://image.mux.com/abc123/thumbnail.jpg')
    })

    it('appends query params to the source URL', () => {
      expect(img({ width: 800 })).toMatch(
        /^https:\/\/image\.mux\.com\/abc123\/thumbnail\.jpg\?/
      )
    })
  })

  describe('dimension modifiers', () => {
    it('maps width', () => {
      expect(img({ width: 1280 })).toContain('width=1280')
    })

    it('maps height', () => {
      expect(img({ height: 720 })).toContain('height=720')
    })
  })

  describe('fit valueMap', () => {
    it('maps contain to preserve', () => {
      expect(img({ fit: 'contain' })).toContain('fit_mode=preserve')
    })

    it('maps cover to crop', () => {
      expect(img({ fit: 'cover' })).toContain('fit_mode=crop')
    })

    it('maps fill to stretch', () => {
      expect(img({ fit: 'fill' })).toContain('fit_mode=stretch')
    })

    it('maps pad', () => {
      expect(img({ fit: 'pad' })).toContain('fit_mode=pad')
    })

    it('maps smartcrop', () => {
      expect(img({ fit: 'smartcrop' })).toContain('fit_mode=smartcrop')
    })
  })

  describe('video thumbnail modifiers', () => {
    it('maps time for thumbnail extraction', () => {
      expect(img({ time: 5.5 })).toContain('time=5.5')
    })

    it('maps start', () => {
      expect(img({ start: 10 })).toContain('start=10')
    })

    it('maps end', () => {
      expect(img({ end: 30 })).toContain('end=30')
    })

    it('maps fps', () => {
      expect(img({ fps: 24 })).toContain('fps=24')
    })
  })

  describe('transform modifiers', () => {
    it('maps rotate', () => {
      expect(img({ rotate: 90 })).toContain('rotate=90')
    })

    it('maps flipHorizontal to flip_h', () => {
      expect(img({ flipHorizontal: true })).toContain('flip_h=true')
    })

    it('maps flipVertical to flip_v', () => {
      expect(img({ flipVertical: true })).toContain('flip_v=true')
    })
  })
})
