import { createComponentStore } from '@/composables/useComponentStoreFactory'
import {
  createBorder,
  createBorderRadius,
  createPadding,
  createFontSize,
  DEFAULT_LETTER_SPACING
} from '@/utils/defaultValues'
import type { BadgeVariant } from '@/types/badge'

const defaultBorder = createBorder('none', 1, '#0d6efd')
const defaultBorderRadius = createBorderRadius(true, 'px', 20)
const defaultPadding = createPadding(true, true, 'px', 6, 12, 6, 12)
const defaultFontSize = createFontSize(12)

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
  letterSpacing: { ...DEFAULT_LETTER_SPACING },
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
