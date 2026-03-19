import { usePersistence } from '@/composables/usePersistence'
import type { AlertVariant } from '@/types/alert'
import type { BorderValue, BorderRadiusValue, PaddingValue, UnitNumber, LetterSpacingValue } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#bee5eb'
}

const defaultBorderRadius: BorderRadiusValue = {
  linked: true,
  unit: 'px',
  tl: 4,
  tr: 4,
  br: 4,
  bl: 4
}

const defaultPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 12,
  right: 16,
  bottom: 12,
  left: 16
}

const defaultHeaderPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 8,
  right: 16,
  bottom: 8,
  left: 16
}

const defaultHeaderBorderBottom: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#bee5eb'
}

const defaultFontSize: UnitNumber = {
  value: 14,
  unit: 'px'
}

const defaultHeaderFontSize: UnitNumber = {
  value: 16,
  unit: 'px'
}

const defaultCloseSize: UnitNumber = {
  value: 20,
  unit: 'px'
}

const defaultMaxWidth: UnitNumber = {
  value: 500,
  unit: 'px'
}

const defaultOffset: UnitNumber = {
  value: 16,
  unit: 'px'
}

const defaultLetterSpacing: LetterSpacingValue = {
  value: 0,
  unit: 'px'
}

const createDefaultVariant = (name: string): AlertVariant => ({
  name,
  background: '#d1ecf1',
  color: '#0c5460',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: { ...defaultLetterSpacing },
  textAlign: 'left',
  headerBackground: '#bee5eb',
  headerColor: '#0c5460',
  headerPadding: { ...defaultHeaderPadding },
  headerBorderBottom: { ...defaultHeaderBorderBottom },
  headerFontFamily: undefined,
  headerFontStyle: 'normal',
  headerFontWeight: '600',
  headerFontSize: { ...defaultHeaderFontSize },
  headerLetterSpacing: { ...defaultLetterSpacing },
  headerTextAlign: 'left',
  showClose: false,
  autoDismiss: 0,
  closeSize: { ...defaultCloseSize },
  closeColor: '#0c5460',
  closeHoverColor: '#062a33',
  closeActiveColor: '#041a1f',
  maxWidth: { ...defaultMaxWidth },
  offset: { ...defaultOffset },
  position: 'top-right',
  shadows: undefined,
  dark: {
    background: '#1a3a4a',
    color: '#d1ecf1',
    borderColor: '#2a5a6a',
    headerBackground: '#0c2a3a',
    headerColor: '#d1ecf1',
    headerBorderBottomColor: '#2a5a6a',
    closeColor: '#d1ecf1',
    closeHoverColor: '#ffffff',
    closeActiveColor: '#bee5eb',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowInsetColor: 'rgba(0,0,0,0.2)'
  }
})

export const useAlertStore = defineStore('alert', () => {
  const persistence = usePersistence<AlertVariant>({
    componentId: 'alert',
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
