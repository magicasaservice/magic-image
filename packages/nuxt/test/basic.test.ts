import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('magic-image module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the page without error', async () => {
    const html = await $fetch('/')
    expect(html).toBeTruthy()
  })

  it('registers MagicImage component globally', async () => {
    const html = await $fetch('/')
    expect(html).toContain('magic-image')
  })

  describe('maas provider', () => {
    it('generates img.maas.earth URLs', async () => {
      const html = await $fetch('/')
      expect(html).toContain('img.maas.earth')
    })

    it('includes encoded source URL as url param', async () => {
      const html = await $fetch('/')
      expect(html).toContain('url=')
    })

    it('includes width modifier', async () => {
      const html = await $fetch('/')
      expect(html).toContain('w=800')
    })

    it('includes height modifier', async () => {
      const html = await $fetch('/')
      expect(html).toContain('h=600')
    })
  })

  describe('mux provider', () => {
    it('preserves source URL for mux thumbnails', async () => {
      const html = await $fetch('/')
      expect(html).toContain('image.mux.com/abc123/thumbnail.jpg')
    })

    it('appends width as query param', async () => {
      const html = await $fetch('/')
      expect(html).toMatch(/image\.mux\.com\/abc123\/thumbnail\.jpg\?width=\d+/)
    })
  })
})
