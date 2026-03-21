import { createComponentStore } from '@/composables/useComponentStoreFactory'
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
    shadowInsetColor: 'rgba(0,0,0,0.2)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useBadgeStore = defineStore('badge', () =>
  createComponentStore<BadgeVariant>({
    componentId: 'badge',
    createDefault: createDefaultVariant
  })
)
