import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, getBrowser, url } from '@nuxt/test-utils/e2e'
import { TestId } from './enums'
import type { Page } from 'playwright-core'

const TIMEOUT = 30_000

function selector(testId: TestId) {
  return `[data-test-id="${testId}"]`
}

describe('priority image in the browser', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    browser: true,
  })

  // `scriptDelay` holds back every script response so the image finishes
  // loading before Nuxt hydrates, which is the case `onMounted` has to cover.
  async function openPage(scriptDelay = 0): Promise<Page> {
    const browser = await getBrowser()
    const page = await browser.newPage()
    if (scriptDelay > 0) {
      await page.route(/\.m?js(\?.*)?$/, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, scriptDelay))
        await route.continue()
      })
    }
    await page.goto(url('/'), { waitUntil: 'commit' })
    return page
  }

  // `state: 'attached'`: the marker span has no size, so the default
  // visibility wait would never resolve.
  async function waitForHydration(page: Page) {
    await page.waitForSelector('#hydrated[data-hydrated="true"]', {
      state: 'attached',
    })
  }

  async function waitForLoaded(page: Page, testId: TestId) {
    await page.waitForSelector(`${selector(testId)}[data-loaded="true"]`, {
      state: 'attached',
    })
  }

  async function isComplete(page: Page, testId: TestId) {
    return page.$eval(
      selector(testId),
      (element) => (element as HTMLImageElement).complete
    )
  }

  it(
    'reports loaded exactly once',
    async () => {
      const page = await openPage()
      await waitForHydration(page)
      await waitForLoaded(page, TestId.LoadedPriorityImage)
      expect(await page.textContent('#priority-loads')).toBe('1')
      await page.close()
    },
    TIMEOUT
  )

  it(
    'still reports loaded when the image finished before hydration',
    async () => {
      const page = await openPage(1500)
      await page.waitForSelector(selector(TestId.LoadedPriorityImage), {
        state: 'attached',
      })
      await page.waitForFunction(
        (sel) => (document.querySelector(sel) as HTMLImageElement)?.complete,
        selector(TestId.LoadedPriorityImage)
      )
      // The image is done and the app has not hydrated yet.
      expect(await page.getAttribute('#hydrated', 'data-hydrated')).toBe(
        'false'
      )

      await waitForHydration(page)
      await waitForLoaded(page, TestId.LoadedPriorityImage)
      expect(await page.textContent('#priority-loads')).toBe('1')
      await page.close()
    },
    TIMEOUT
  )

  it(
    'does not report a broken image as loaded',
    async () => {
      const page = await openPage()
      await waitForHydration(page)
      await page.waitForFunction(
        (sel) => (document.querySelector(sel) as HTMLImageElement)?.complete,
        selector(TestId.BrokenPriorityImage)
      )
      expect(await isComplete(page, TestId.BrokenPriorityImage)).toBe(true)
      expect(
        await page.getAttribute(
          selector(TestId.BrokenPriorityImage),
          'data-loaded'
        )
      ).toBe('false')
      expect(await page.textContent('#broken-loads')).toBe('0')
      await page.close()
    },
    TIMEOUT
  )
})
