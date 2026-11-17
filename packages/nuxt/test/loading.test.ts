import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, getBrowser, url } from '@nuxt/test-utils/e2e'
import { TestId } from './enums'
import type { Page } from 'playwright-core'

const TIMEOUT = 30_000

function selector(testId: TestId) {
  return `[data-test-id="${testId}"]`
}

describe('image loading in the browser', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
  })

  async function openPage(): Promise<Page> {
    const browser = await getBrowser()
    const page = await browser.newPage()
    await page.goto(url('/'), { waitUntil: 'commit' })
    await page.waitForSelector('#hydrated[data-hydrated="true"]', {
      state: 'attached',
    })
    return page
  }

  async function waitForLoaded(page: Page, testId: TestId) {
    await page.waitForSelector(`${selector(testId)}[data-loaded="true"]`, {
      state: 'attached',
    })
  }

  // An image that is not held back starts loading together with the visible
  // one, so half a second on a local server exposes it.
  async function waitForStragglers(page: Page) {
    await waitForLoaded(page, TestId.VisibleLazyImage)
    await page.waitForTimeout(500)
  }

  async function isLoaded(page: Page, testId: TestId) {
    return page.getAttribute(selector(testId), 'data-loaded')
  }

  it(
    'keeps an off-screen image on its placeholder until it scrolls into view',
    async () => {
      const page = await openPage()
      await waitForStragglers(page)
      expect(await isLoaded(page, TestId.OffscreenLazyImage)).toBe('false')

      await page
        .locator(selector(TestId.OffscreenLazyImage))
        .scrollIntoViewIfNeeded()
      await waitForLoaded(page, TestId.OffscreenLazyImage)
      await page.close()
    },
    TIMEOUT
  )
})
