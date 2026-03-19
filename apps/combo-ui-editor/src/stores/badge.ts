import { usePersistence } from '@/composables/usePersistence'
import type { BadgeVariant } from '@/types/badge'
import type { BorderValue, BorderRadiusValue, PaddingValue, UnitNumber, LetterSpacingValue } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'none',
  width: 1,
  unit: 'px',
  color: '#0d6efd'
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
  value: 12,
  unit: 'px'
}

const defaultLetterSpacing: LetterSpacingValue = {
  value: 0,
  unit: 'px'
}

const createDefaultVariant = (name: string): BadgeVariant => ({
  name,
  background: '#0d6efd',
  color: '#ffffff',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '600',
  letterSpacing: { ...defaultLetterSpacing },
  shadows: undefined,
  dark: {
    background: '#0d6efd',
    color: '#ffffff',
    borderColor: '#0d6efd',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowInsetColor: 'rgba(0,0,0,0.2)'
  }
})

export const useBadgeStore = defineStore('badge', () => {
  const persistence = usePersistence<BadgeVariant>({
    componentId: 'badge',
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
