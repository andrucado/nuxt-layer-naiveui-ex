import {
  defineConfig,
  presetUno,
  presetAttributify,
  transformerVariantGroup,
  transformerDirectives,
  presetIcons,
  presetTagify,
  extractorSplit,
} from 'unocss'

import extractorPug from '@unocss/extractor-pug'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetAttributify(), presetTagify(), presetUno(), presetIcons()],
  extractors: [extractorPug(), extractorSplit],
})
