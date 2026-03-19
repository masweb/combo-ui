import { usePersistence } from '@/composables/usePersistence'
import type { ChipVariant } from '@/types/chip'
import type { BorderValue, BorderRadiusValue, PaddingValue, UnitNumber, LetterSpacingValue } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'none',
  width: 1,
  unit: 'px',
  color: '#dee2e6'
}

const defaultBorderRadius: BorderRadiusValue = {
  linked: true,
  unit: 'px',
  tl: 20,
  tr: 20,
  br: 20,
  bl: 20
}

const defaultPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 6,
  right: 12,
  bottom: 6,
  left: 12
}

const defaultFontSize: UnitNumber = {
  value: 14,
  unit: 'px'
}

const defaultLetterSpacing: LetterSpacingValue = {
  value: 0,
  unit: 'px'
}

const defaultCloseSize: UnitNumber = {
  value: 16,
  unit: 'px'
}

const createDefaultVariant = (name: string): ChipVariant => ({
  name,
  background: '#e9ecef',
  color: '#333333',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: { ...defaultLetterSpacing },
  closeSize: { ...defaultCloseSize },
  closeColor: '#6c757d',
  closeHoverColor: '#495057',
  closeActiveColor: '#343a40',
  shadows: undefined,
  dark: {
    background: '#343a40',
    color: '#ffffff',
    borderColor: '#495057',
    closeColor: '#adb5bd',
    closeHoverColor: '#ced4da',
    closeActiveColor: '#dee2e6',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowInsetColor: 'rgba(0,0,0,0.3)'
  }
})

export const useChipStore = defineStore('chip', () => {
  const persistence = usePersistence<ChipVariant>({
    componentId: 'chip',
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
