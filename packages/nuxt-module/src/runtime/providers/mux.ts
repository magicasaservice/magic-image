import { createOperationsGenerator, defineProvider } from '@nuxt/image/runtime'
import { joinURL } from 'ufo'

const MUX_BASE_URL = 'https://image.mux.com'

const operationsGenerator = createOperationsGenerator()

interface MuxOptions {
  modifiers?: {
    format?: 'png' | 'jpg' | 'webp' | 'gif'
    width?: number
    height?: number
    quality?: number
    rotate?: 90 | 180 | 270
    fitMode?: 'preserve' | 'stretch' | 'crop' | 'smartcrop' | 'pad'
    flipH?: boolean
    flipV?: boolean
    time?: number
    latest?: boolean
    start?: number
    end?: number
    fps?: number
  }
}

export default defineProvider<MuxOptions>({
  getImage: (src, { modifiers = {} }) => {
    const isAnimated = Number(modifiers.start) && Number(modifiers.end) && (Number(modifiers.end) - Number(modifiers.start) > 0)

    const muxFilename = isAnimated
      ? `animated.${modifiers.format === 'webp' ? 'webp' : 'gif'}`
      : `thumbnail.${modifiers.format || 'webp'}`

    let width = modifiers.width || 0
    let height = modifiers.height || 0

    if (isAnimated && (width > 640 || height > 640)) {
      console.warn('[nuxt-image] [mux] Width and height should not exceed 640px.')
      width = Math.min(width, 640)
      height = Math.min(height, 640)
    }

    const normalizedModifiers = {
      width,
      height,
      quality: modifiers.quality,
      fit_mode: modifiers.fitMode || 'smartcrop',
      flip_h: modifiers.flipH !== undefined ? String(modifiers.flipH) : undefined,
      flip_v: modifiers.flipV !== undefined ? String(modifiers.flipV) : undefined,
      time: !isAnimated ? (modifiers.time || modifiers.start || modifiers.end) : undefined,
      latest: !isAnimated && modifiers.latest ? 'true' : undefined,
      start: isAnimated ? modifiers.start : undefined,
      end: isAnimated ? modifiers.end : undefined,
      fps: isAnimated ? modifiers.fps : 15,
    }

    const operations = operationsGenerator(normalizedModifiers)

    const url = joinURL(MUX_BASE_URL, src, `${muxFilename}?${operations}`)

    return { url }
  },
})
