import { withQuery } from 'ufo'
import { createOperationsGenerator } from '#image'
import type { ProviderGetImage } from '@nuxt/image'

const operationsGenerator = createOperationsGenerator({
  keyMap: {
    width: 'width',
    height: 'height',
    fit: 'fit_mode',
    time: 'time',
    rotate: 'rotate',
    flipHorizontal: 'flip_h',
    flipVertical: 'flip_v',
    start: 'start',
    end: 'end',
    fps: 'fps',
  },
  valueMap: {
    fit: {
      contain: 'preserve',
      cover: 'crop',
      fill: 'stretch',
      pad: 'pad',
      smartcrop: 'smartcrop',
    },
    flipHorizontal: {
      true: 'true',
      false: 'false',
    },
    flipVertical: {
      true: 'true',
      false: 'false',
    },
  },
  joinWith: '&',
  formatter: (key: string, value: string) => `${key}=${value}`,
})

export const getImage: ProviderGetImage = (src, { modifiers = {} } = {}) => {
  const operations = operationsGenerator(modifiers)
  const params = new URLSearchParams(operations)
  const queryObject = Object.fromEntries(params.entries())
  return {
    url: withQuery(src, queryObject),
  }
}
