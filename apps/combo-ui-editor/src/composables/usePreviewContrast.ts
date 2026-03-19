import { FastAverageColor } from 'fast-average-color'
import type { ComputedRef } from 'vue'

export interface PreviewContrastOptions {
  isDarkBackground: ComputedRef<boolean>
  contrastClass: ComputedRef<string>
  cardClass: ComputedRef<string>
}

const fac = new FastAverageColor()

const isDarkBackground = ref(false)

export const usePreviewContrast = (): PreviewContrastOptions => {
  const { previewBackground } = useComponentTheme()

  const contrastClass = computed(() => (isDarkBackground.value ? 'contrast-light' : 'contrast-dark'))
  const cardClass = computed(() => (isDarkBackground.value ? 'card-contrast-light' : 'card-contrast-dark'))

  const updateContrast = async (color: string) => {
    try {
      const result = await fac.getColorAsync(color, { algorithm: 'simple' })
      isDarkBackground.value = result.isDark
    } catch {
      const hex = color.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      isDarkBackground.value = luminance < 0.5
    }
  }

  watch(previewBackground, updateContrast, { immediate: true })

  return {
    isDarkBackground: computed(() => isDarkBackground.value),
    contrastClass,
    cardClass
  }
}
