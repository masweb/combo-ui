import { useFormsPersistence } from '@/composables/useFormsPersistence'
import type { FormsGlobalConfig, FormsVariant, FormsVariantName, FormState } from '@/types/forms'
import type { BorderValue, BorderRadiusValue, PaddingUnit, FontSizeUnit } from '@/types/generics'

const FIXED_VARIANT_NAMES: FormsVariantName[] = ['input', 'select', 'radio', 'checkbox', 'slider', 'textarea', 'file']

const DEFAULT_BORDER: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#ced4da'
}

const DEFAULT_BORDER_RADIUS: BorderRadiusValue = {
  linked: true,
  unit: 'px',
  tl: 6,
  tr: 6,
  br: 6,
  bl: 6
}

const DEFAULT_PADDING_UNIT: PaddingUnit = 'px'

const DEFAULT_GLOBAL_CONFIG: FormsGlobalConfig = {
  fontFamily: null,
  color: '#212529',
  background: '#ffffff',
  border: { ...DEFAULT_BORDER },
  borderRadius: { ...DEFAULT_BORDER_RADIUS },
  padding: {
    linkedV: true,
    linkedH: true,
    unit: DEFAULT_PADDING_UNIT,
    top: 10,
    right: 12,
    bottom: 10,
    left: 12
  },
  fontSize: { value: 14, unit: 'px' as FontSizeUnit },
  fieldHeight: 40,

  showLabel: true,
  labelColor: '#212529',
  labelFontSize: { value: 14, unit: 'px' as FontSizeUnit },
  labelFontWeight: '500',
  labelMarginBottom: 4,

  showPlaceholder: true,
  placeholderColor: '#6c757d',

  focusOutlineColor: 'rgba(13, 110, 253, 0.16)',
  focusOutlineWidth: 3,

  errorBorderColor: '#dc3545',
  errorColor: '#dc3545',
  errorFontSize: { value: 12, unit: 'px' as FontSizeUnit },
  errorMarginTop: 4,

  disabledOpacity: 0.65,
  disabledColor: '#6c757d',
  disabledBackground: '#e9ecef',
  disabledBorderColor: '#ced4da',

  checkRadioColor: '#0d6efd',
  checkRadioSize: 18,
  optionColor: '#212529',
  optionFontFamily: null,
  optionFontSize: { value: 14, unit: 'px' as FontSizeUnit },
  optionFontWeight: '400',
  optionSpacingHorizontal: { value: 24, unit: 'px' as FontSizeUnit },
  optionSpacingVertical: { value: 12, unit: 'px' as FontSizeUnit },
  optionOrientation: 'vertical',

  dropzoneBackground: '#f8f9fa',
  dropzoneColor: '#6c757d',
  dropzoneBorder: {
    style: 'dashed' as const,
    width: 2,
    unit: 'px' as const,
    color: '#ced4da'
  },
  dropzoneBorderRadius: {
    linked: true,
    unit: 'px' as const,
    tl: 8,
    tr: 8,
    br: 8,
    bl: 8
  },

  dark: {
    color: '#f8f9fa',
    background: '#222222',
    borderColor: '#495057',
    labelColor: '#f8f9fa',
    placeholderColor: '#adb5bd',
    focusOutlineColor: 'rgba(117, 149, 194, 0.4)',
    errorBorderColor: '#ea868f',
    errorColor: '#ea868f',
    disabledColor: '#6c757d',
    disabledBackground: '#222222',
    disabledBorderColor: '#495057',
    checkRadioColor: '#6ea8fe',
    checkRadioSize: 18,
    optionColor: '#f8f9fa',
    optionSpacingHorizontal: { value: 24, unit: 'px' as FontSizeUnit },
    optionSpacingVertical: { value: 12, unit: 'px' as FontSizeUnit },
    dropzoneBackground: '#222222',
    dropzoneColor: '#adb5bd',
    dropzoneBorderColor: '#495057'
  }
}

const createDefaultVariant = (name: string, type: FormsVariantName): FormsVariant => ({
  id: name,
  name,
  type,
  isFixed: true
})

const initialVariants: FormsVariant[] = FIXED_VARIANT_NAMES.map(name => createDefaultVariant(name, name))

export const getFormsDefaults = () => ({
  globalConfig: { ...DEFAULT_GLOBAL_CONFIG, border: { ...DEFAULT_BORDER }, borderRadius: { ...DEFAULT_BORDER_RADIUS } },
  variants: initialVariants.map(v => ({ ...v }))
})

export const useFormsStore = defineStore('forms', () => {
  const persistence = useFormsPersistence(DEFAULT_GLOBAL_CONFIG, initialVariants)

  const selectedVariant = computed(() => persistence.variants.value[persistence.selectedVariantIndex.value])

  const selectVariant = (index: number) => {
    if (index >= 0 && index < persistence.variants.value.length) {
      persistence.selectedVariantIndex.value = index
      void persistence.saveToDB()
    }
  }

  const setState = (state: FormState) => {
    persistence.currentState.value = state
    void persistence.saveToDB()
  }

  const updateGlobalConfig = (updates: Partial<FormsGlobalConfig>) => {
    Object.assign(persistence.globalConfig.value, updates)
    void persistence.saveToDB()
  }

  const updateGlobalConfigDark = (updates: Partial<FormsGlobalConfig['dark']>) => {
    persistence.globalConfig.value.dark = { ...persistence.globalConfig.value.dark, ...updates }
    void persistence.saveToDB()
  }

  const getBorderColor = (isDark: boolean) => {
    if (isDark) return persistence.globalConfig.value.dark.borderColor
    return persistence.globalConfig.value.border.color
  }

  const resetToDefaults = () => {
    const defaults = getFormsDefaults()
    persistence.globalConfig.value = defaults.globalConfig
    persistence.variants.value = defaults.variants
    persistence.selectedVariantIndex.value = 0
    persistence.currentState.value = 'normal'
    void persistence.saveToDB()
  }

  return {
    globalConfig: persistence.globalConfig,
    variants: persistence.variants,
    selectedVariantIndex: persistence.selectedVariantIndex,
    selectedVariant,
    currentState: persistence.currentState,
    isLoaded: persistence.isLoaded,
    loadFromDB: persistence.loadFromDB,
    clearFromMemory: persistence.clearFromMemory,
    resetToDefaults,
    selectVariant,
    setState,
    updateGlobalConfig,
    updateGlobalConfigDark,
    getBorderColor
  }
})
