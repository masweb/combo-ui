import { usePersistence } from '@/composables/usePersistence'
import type { ProgressVariant } from '@/types/progress'
import type { BorderValue, BorderRadiusValue, UnitNumber } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'none',
  width: 1,
  unit: 'px',
  color: '#dee2e6'
}

const defaultBorderRadius: BorderRadiusValue = {
  linked: true,
  unit: 'px',
  tl: 10,
  tr: 10,
  br: 10,
  bl: 10
}

const defaultHeight: UnitNumber = {
  value: 20,
  unit: 'px'
}

const defaultLabelFontSize: UnitNumber = {
  value: 12,
  unit: 'px'
}

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

export const useProgressStore = defineStore('progress', () => {
  const persistence = usePersistence<ProgressVariant>({
    componentId: 'progress',
    initialVariants: [createDefaultVariant('variante-1')],
    createDefault: createDefaultVariant
  })

  return {
    variants: persistence.variants,
    selectedVariantIndex: persistence.selectedVariantIndex,
    selectedVariant: persistence.selectedVariant,
    isLoaded: persistence.isLoaded,
    isLoading: persistence.isLoading,
    hasChanges: persistence.hasChanges,
    saveError: persistence.saveError,
    addVariant: persistence.addVariant,
    updateVariant: persistence.updateVariant,
    deleteVariant: persistence.deleteVariant,
    selectVariant: persistence.selectVariant
  }
})
