import { usePersistence } from '@/composables/usePersistence'
import type { CardVariant } from '@/types/card'
import type { BorderValue, BorderRadiusValue, PaddingValue, UnitNumber, LetterSpacingValue } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#dee2e6'
}

const defaultBorderRadius: BorderRadiusValue = {
  linked: true,
  unit: 'px',
  tl: 8,
  tr: 8,
  br: 8,
  bl: 8
}

const defaultPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 16,
  right: 16,
  bottom: 16,
  left: 16
}

const defaultHeaderPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 12,
  right: 16,
  bottom: 12,
  left: 16
}

const defaultHeaderBorderBottom: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#dee2e6'
}

const defaultFontSize: UnitNumber = {
  value: 14,
  unit: 'px'
}

const defaultHeaderFontSize: UnitNumber = {
  value: 16,
  unit: 'px'
}

const defaultLetterSpacing: LetterSpacingValue = {
  value: 0,
  unit: 'px'
}

const createDefaultVariant = (name: string): CardVariant => ({
  name,
  background: '#ffffff',
  color: '#212529',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: { ...defaultLetterSpacing },
  textAlign: 'left',
  headerBackground: '#f8f9fa',
  headerColor: '#212529',
  headerPadding: { ...defaultHeaderPadding },
  headerBorderBottom: { ...defaultHeaderBorderBottom },
  headerFontFamily: undefined,
  headerFontStyle: 'normal',
  headerFontWeight: '600',
  headerFontSize: { ...defaultHeaderFontSize },
  headerLetterSpacing: { ...defaultLetterSpacing },
  headerTextAlign: 'left',
  shadows: undefined,
  dark: {
    background: '#2d2d2d',
    color: '#ffffff',
    borderColor: '#3d3d3d',
    headerBackground: '#1a1a1a',
    headerColor: '#ffffff',
    headerBorderBottomColor: '#3d3d3d',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowInsetColor: 'rgba(0,0,0,0.2)'
  }
})

export const useCardStore = defineStore('card', () => {
  const persistence = usePersistence<CardVariant>({
    componentId: 'card',
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
