import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { TestId } from './enums'

function imgByTestId(html: string, testId: TestId) {
  const image = new RegExp(`<img[^>]*data-test-id="${testId}"[^>]*>`)
  return html.match(image)?.[0] ?? ''
}

function placeholderOf(html: string, testId: TestId) {
  return imgByTestId(html, testId).match(/\ssrc="([^"]*)"/)?.[1] ?? ''
}

function imagePreloads(html: string) {
  return html.match(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g) ?? []
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

    it('omits sizes on a held image', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.HeldImage)).not.toMatch(/\ssizes=/)
    })
  })

  describe('placeholder', () => {
    it('gives every image its own placeholder URL', async () => {
      const html = await $fetch('/')
      const first = placeholderOf(html, TestId.AutoSizes)
      const second = placeholderOf(html, TestId.ModuleSizes)
      expect(first).toMatch(/^data:image\/gif;base64,[^#]+#.+$/)
      expect(second).toMatch(/^data:image\/gif;base64,[^#]+#.+$/)
      expect(first).not.toBe(second)
    })

    it('leaves a placeholder that carries its own fragment untouched', async () => {
      const html = await $fetch('/')
      expect(placeholderOf(html, TestId.FragmentPlaceholderImage)).toMatch(
        /^data:image\/gif;base64,[^#]+#own$/
      )
    })
  })

  describe('deprecated lazyload prop', () => {
    it('holds the image like lazyLoad does', async () => {
      const html = await $fetch('/')
      const img = imgByTestId(html, TestId.DeprecatedHeldImage)
      expect(img).toContain('loading="eager"')
      expect(img).not.toMatch(/\ssizes=/)
    })

    it('is not rendered as an attribute', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.DeprecatedHeldImage)).not.toContain(
        'lazyload='
      )
    })
  })

  describe('eager loading', () => {
    it('renders loading="eager"', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.EagerImage)).toContain('loading="eager"')
    })

    it('keeps the placeholder while autoSizes measures the element', async () => {
      const html = await $fetch('/')
      const img = imgByTestId(html, TestId.EagerImage)
      expect(img).toMatch(/\sdata-srcset="[^"]*img\.maas\.earth[^"]*"/)
      expect(img).not.toMatch(/\ssrcset=/)
    })

    it('renders the srcset in the server HTML when autoSizes is off too', async () => {
      const html = await $fetch('/')
      const img = imgByTestId(html, TestId.EagerDeclaredSizesImage)
      expect(img).toMatch(/\ssrcset="[^"]*img\.maas\.earth[^"]*"/)
      expect(img).not.toContain('data-srcset=')
      expect(img).toContain('sizes="400px"')
    })
  })

  describe('priority image', () => {
    it('renders the srcset in the server HTML instead of data-srcset', async () => {
      const html = await $fetch('/')
      const img = imgByTestId(html, TestId.PriorityImage)
      expect(img).toMatch(/\ssrcset="[^"]*img\.maas\.earth[^"]*"/)
      expect(img).not.toContain('data-srcset=')
      expect(img).toContain('sizes="400px"')
    })

    it('loads eagerly with high fetch priority', async () => {
      const html = await $fetch('/')
      const img = imgByTestId(html, TestId.PriorityImage)
      expect(img).toContain('loading="eager"')
      expect(img).toContain('fetchpriority="high"')
    })

    it('leaves decoding to the browser', async () => {
      const html = await $fetch('/')
      expect(imgByTestId(html, TestId.PriorityImage)).not.toContain('decoding=')
    })

    it('adds one preload link for the priority image with high fetch priority', async () => {
      const html = await $fetch('/')
      const links = imagePreloads(html).filter((link) =>
        link.includes('imagesizes="400px"')
      )
      expect(links).toHaveLength(1)
      expect(links[0]).toMatch(/imagesrcset="[^"]*img\.maas\.earth[^"]*"/)
      expect(links[0]).toContain('fetchpriority="high"')
    })

    it('keeps a plain preload at default fetch priority', async () => {
      const html = await $fetch('/')
      const plain = imagePreloads(html).find((link) =>
        link.includes('imagesizes="200px"')
      )
      expect(plain).toBeDefined()
      expect(plain).not.toContain('fetchpriority')
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
