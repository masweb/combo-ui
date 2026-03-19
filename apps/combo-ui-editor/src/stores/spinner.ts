import { usePersistence } from '@/composables/usePersistence'
import type { SpinnerVariant } from '@/types/spinner'
import type { BorderValue, UnitNumber } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 4,
  unit: 'px',
  color: '#0d6efd'
}

const defaultSize: UnitNumber = {
  value: 40,
  unit: 'px'
}

const createDefaultVariant = (name: string): SpinnerVariant => ({
  name,
  type: 'ring',
  color: '#0d6efd',
  trackColor: '#95b6d8',
  border: { ...defaultBorder },
  size: { ...defaultSize },
  speed: 1,
  dark: {
    color: '#0d6efd',
    trackColor: '#527e9d',
    borderColor: '#495057'
  }
})

export const useSpinnerStore = defineStore('spinner', () => {
  const persistence = usePersistence<SpinnerVariant>({
    componentId: 'spinner',
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
