import { useTypographyPersistence } from '@/composables/useTypographyPersistence'
import type {
  FontSizeUnit,
  FontStyle,
  LetterSpacingUnit,
  LineHeightUnit,
  TextDecoration,
  TextTransform
} from '@/types/generics'

const FIXED_VARIANT_NAMES: TypographyVariantName[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'display1',
  'display2',
  'display3',
  'display4',
  'display5',
  'display6',
  'body',
  'small',
  'caption',
  'link'
]

const DEFAULT_GLOBAL_CONFIG: TypographyGlobalConfig = {
  fontFamily: 'Inter',
  color: '#212529',
  backgroundColor: '#ffffff',
  dark: { color: '#f8f9fa', backgroundColor: '#222222' }
}

const DEFAULT_FONT_STYLE: FontStyle = 'normal'
const DEFAULT_FONT_WEIGHT = '400'
const DEFAULT_FONT_SIZE_UNIT: FontSizeUnit = 'em'
const DEFAULT_LETTER_SPACING_UNIT: LetterSpacingUnit = 'px'
const DEFAULT_LINE_HEIGHT_UNIT: LineHeightUnit = ''
const DEFAULT_TEXT_TRANSFORM: TextTransform = 'none'
const DEFAULT_TEXT_DECORATION: TextDecoration = 'none'

const getSizeForVariant = (name: TypographyVariantName): number => {
  const sizes: Record<TypographyVariantName, number> = {
    display1: 6,
    display2: 5.25,
    display3: 4.5,
    display4: 3.75,
    display5: 3,
    display6: 2.5,
    h1: 2.25,
    h2: 1.875,
    h3: 1.5,
    h4: 1.25,
    h5: 1,
    h6: 0.875,
    body: 1,
    small: 0.875,
    caption: 0.75,
    link: 1
  }
  return sizes[name]
}

const getWeightForVariant = (name: TypographyVariantName): string => {
  if (name.startsWith('display')) return '200'
  if (name.startsWith('h')) return '600'
  return '400'
}

const getLineHeightForVariant = (name: TypographyVariantName): number => {
  if (name.startsWith('display') || name.startsWith('h')) return 1.2
  return 1.5
}

const createDefaultVariant = (name: string, isFixed: boolean): TypographyVariant => {
  const typedName = name as TypographyVariantName
  return {
    id: name,
    name,
    isFixed,
    fontFamily: null,
    fontStyle: DEFAULT_FONT_STYLE,
    fontWeight: isFixed ? getWeightForVariant(typedName) : DEFAULT_FONT_WEIGHT,
    fontSize: { value: isFixed ? getSizeForVariant(typedName) : 1, unit: DEFAULT_FONT_SIZE_UNIT },
    letterSpacing: { value: 0, unit: DEFAULT_LETTER_SPACING_UNIT },
    lineHeight: { value: isFixed ? getLineHeightForVariant(typedName) : 1.5, unit: DEFAULT_LINE_HEIGHT_UNIT },
    textTransform: DEFAULT_TEXT_TRANSFORM,
    textDecoration: name === 'link' ? 'underline' : DEFAULT_TEXT_DECORATION,
    color: null,
    dark: { color: null }
  }
}

const initialVariants: TypographyVariant[] = FIXED_VARIANT_NAMES.map(name => createDefaultVariant(name, true))

export const getTypographyDefaults = () => ({
  globalConfig: { ...DEFAULT_GLOBAL_CONFIG },
  variants: initialVariants.map(v => ({ ...v }))
})

export const useTypographyStore = defineStore('typography', () => {
  const persistence = useTypographyPersistence(DEFAULT_GLOBAL_CONFIG, initialVariants)

  const selectedVariant = computed(() => persistence.variants.value[persistence.selectedVariantIndex.value])

  const fixedVariants = computed(() => persistence.variants.value.filter(v => v.isFixed))
  const customVariants = computed(() => persistence.variants.value.filter(v => !v.isFixed))

  const sortedVariants = computed(() => {
    const custom = persistence.variants.value.filter(v => !v.isFixed)
    const nonDisplayFixed = persistence.variants.value.filter(v => v.isFixed && !v.name.startsWith('display'))
    const display = persistence.variants.value.filter(v => v.name.startsWith('display'))
    return [...custom, ...nonDisplayFixed, ...display]
  })

  const effectiveFontFamily = computed(() => persistence.globalConfig.value.fontFamily)
  const effectiveColor = computed(() => persistence.globalConfig.value.color)
  const effectiveDarkColor = computed(() => persistence.globalConfig.value.dark.color)

  const getVariantFontFamily = (variant: TypographyVariant) =>
    variant.fontFamily ?? persistence.globalConfig.value.fontFamily
  const getVariantColor = (variant: TypographyVariant, isDark: boolean) => {
    if (isDark) {
      return variant.dark.color ?? persistence.globalConfig.value.dark.color
    }
    return variant.color ?? persistence.globalConfig.value.color
  }

  const selectVariant = (index: number) => {
    if (index >= 0 && index < persistence.variants.value.length) {
      persistence.selectedVariantIndex.value = index
      void persistence.saveToDB()
    }
  }

  const updateVariant = (index: number, updates: Partial<TypographyVariant>) => {
    if (index >= 0 && index < persistence.variants.value.length) {
      persistence.variants.value[index] = { ...persistence.variants.value[index]!, ...updates }
      void persistence.saveToDB()
    }
  }

  const addCustomVariant = (name: string) => {
    const newVariant = createDefaultVariant(name, false)
    persistence.variants.value.push(newVariant)
    persistence.selectedVariantIndex.value = persistence.variants.value.length - 1
    void persistence.saveToDB()
  }

  const deleteVariant = (index: number) => {
    const variant = persistence.variants.value[index]
    if (variant && !variant.isFixed) {
      persistence.variants.value.splice(index, 1)
      if (persistence.selectedVariantIndex.value >= persistence.variants.value.length) {
        persistence.selectedVariantIndex.value = persistence.variants.value.length - 1
      }
      void persistence.saveToDB()
    }
  }

  const updateGlobalConfig = (updates: Partial<TypographyGlobalConfig>) => {
    persistence.globalConfig.value = { ...persistence.globalConfig.value, ...updates }
    void persistence.saveToDB()
  }

  const resetToDefaults = () => {
    const defaults = getTypographyDefaults()
    persistence.globalConfig.value = defaults.globalConfig
    persistence.variants.value = defaults.variants
    persistence.selectedVariantIndex.value = 0
    void persistence.saveToDB()
  }

  return {
    globalConfig: persistence.globalConfig,
    variants: persistence.variants,
    sortedVariants,
    selectedVariantIndex: persistence.selectedVariantIndex,
    selectedVariant,
    fixedVariants,
    customVariants,
    effectiveFontFamily,
    effectiveColor,
    effectiveDarkColor,
    getVariantFontFamily,
    getVariantColor,
    isLoaded: persistence.isLoaded,
    loadFromDB: persistence.loadFromDB,
    clearFromMemory: persistence.clearFromMemory,
    resetToDefaults,
    selectVariant,
    updateVariant,
    addCustomVariant,
    deleteVariant,
    updateGlobalConfig
  }
})
