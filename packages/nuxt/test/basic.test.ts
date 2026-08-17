import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { TestId } from './enums'

function imgByTestId(html: string, testId: TestId) {
  const image = new RegExp(`<img[^>]*data-test-id="${testId}"[^>]*>`)
  return html.match(image)?.[0] ?? ''
}

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

  describe('sizes attribute', () => {
    it('marks sizes as auto while unlazy measures the element', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.AutoSizes)).toContain('sizes="auto"')
    })

    it('renders the computed sizes when autoSizes is off', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.ModuleSizes)).toMatch(
        /sizes="\(max-width: \d+px\) 800px, 1440px"/
      )
    })

    it('prefers the sizes prop over the module default', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.PropSizes)).toContain('sizes="400px"')
    })

    it('omits sizes when eager, since auto needs lazy loading', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.EagerImage)).not.toMatch(/\ssizes=/)
    })
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
