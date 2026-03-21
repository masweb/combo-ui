import { createComponentStore } from '@/composables/useComponentStoreFactory'
import { createBorder, createBorderRadius, createUnitNumber } from '@/utils/defaultValues'
import type { ProgressVariant } from '@/types/progress'

const defaultBorder = createBorder('none', 1, '#dee2e6')
const defaultBorderRadius = createBorderRadius(true, 'px', 10)
const defaultHeight = createUnitNumber(20)
const defaultLabelFontSize = createUnitNumber(12)

const createDefaultVariant = (name: string): ProgressVariant => ({
  name,
  background: 'transparent',
  border: { ...defaultBorder },
  type: 'bar',
  trackColor: '#e9ecef',
  fillColor: '#0d6efd',
  stripeColor: '#ffffff',
  height: { ...defaultHeight },
  borderRadius: { ...defaultBorderRadius },
  speed: 1,
  showLabel: true,
  labelColor: '#000000',
  fontFamily: undefined,
  labelFontSize: { ...defaultLabelFontSize },
  fontStyle: 'normal',
  fontWeight: '600',
  shadows: undefined,
  dark: {
    background: 'transparent',
    borderColor: '#495057',
    trackColor: '#343a40',
    fillColor: '#0d6efd',
    stripeColor: '#ffffff',
    labelColor: '#ffffff',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowInsetColor: 'rgba(0,0,0,0.2)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useProgressStore = defineStore('progress', () =>
  createComponentStore<ProgressVariant>({
    componentId: 'progress',
    createDefault: createDefaultVariant
  })
)
