const defaultBorder: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#0d6efd'
}

const defaultBorderRadius: BorderRadiusValue = {
  linked: true,
  unit: 'px',
  tl: 6,
  tr: 6,
  br: 6,
  bl: 6
}
const defaultPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 10,
  right: 20,
  bottom: 10,
  left: 20
}
const defaultFontSize: UnitNumber = {
  value: 14,
  unit: 'px'
}
const defaultLetterSpacing: LetterSpacingValue = {
  value: 0,
  unit: 'px'
}
const createDefaultVariant = (name: string): ButtonVariant => ({
  name,
  background: '#0d6efd',
  color: '#ffffff',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: null,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: { ...defaultLetterSpacing },
  hoverBackground: '#0b5ed7',
  hoverColor: '#ffffff',
  hoverBorder: { ...defaultBorder, color: '#0b5ed7' },
  activeBackground: '#0a58ca',
  activeColor: '#ffffff',
  activeBorder: { ...defaultBorder, color: '#0a58ca' },
  focusColor: '#0d6efd',
  focusOffset: { value: 2, unit: 'px' },
  showFocus: false,
  disabledBackground: '#e9ecef',
  disabledColor: '#6c757d',
  disabledBorder: { ...defaultBorder, color: '#adb5bd' },
  disabledOpacity: 0.65,
  showDisabled: false,
  shadows: undefined,
  dark: {
    background: '#3d3d3d',
    color: '#ffffff',
    borderColor: '#3d3d3d',
    hoverBackground: '#4d4d4d',
    hoverColor: '#ffffff',
    hoverBorderColor: '#4d4d4d',
    activeBackground: '#2d2d2d',
    activeColor: '#ffffff',
    activeBorderColor: '#2d2d2d',
    focusColor: '#3d3d3d',
    disabledBackground: '#2d2d2d',
    disabledColor: '#6c757d',
    disabledBorderColor: '#495057',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowInsetColor: 'rgba(0,0,0,0.2)'
  }
})

export const useButtonStore = defineStore('button', () => {
  const persistence = usePersistence<ButtonVariant>({
    componentId: 'button',
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
