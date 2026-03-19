import { usePersistence } from '@/composables/usePersistence'
import type { BorderValue, UnitNumber } from '@/types/generics'
import type { DividerVariant, DividerWidthValue } from '@/types/divider'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#333333'
}

const defaultWidth: DividerWidthValue = {
  value: 100,
  unit: '%'
}

const defaultSpacing: UnitNumber = {
  value: 16,
  unit: 'px'
}

const createDefaultVariant = (name: string): DividerVariant => ({
  name,
  border: { ...defaultBorder },
  width: { ...defaultWidth },
  spacing: { ...defaultSpacing },
  dark: {
    borderColor: '#aaaaaa'
  }
})

export const useDividerStore = defineStore('divider', () => {
  const persistence = usePersistence<DividerVariant>({
    componentId: 'divider',
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
