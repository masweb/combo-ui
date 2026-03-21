import { createComponentStore } from '@/composables/useComponentStoreFactory'
import {
  createBorder,
  createBorderRadius,
  createPadding,
  createFontSize,
  DEFAULT_LETTER_SPACING
} from '@/utils/defaultValues'
import type { CardVariant } from '@/types/card'

const defaultBorder = createBorder('solid', 1, '#dee2e6')
const defaultBorderRadius = createBorderRadius(true, 'px', 8)
const defaultPadding = createPadding(true, true, 'px', 16, 16, 16, 16)
const defaultHeaderPadding = createPadding(true, true, 'px', 12, 16, 12, 16)
const defaultHeaderBorderBottom = createBorder('solid', 1, '#dee2e6')
const defaultFontSize = createFontSize(14)
const defaultHeaderFontSize = createFontSize(16)

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
  letterSpacing: { ...DEFAULT_LETTER_SPACING },
  textAlign: 'left',
  headerBackground: '#f8f9fa',
  headerColor: '#212529',
  headerPadding: { ...defaultHeaderPadding },
  headerBorderBottom: { ...defaultHeaderBorderBottom },
  headerFontFamily: undefined,
  headerFontStyle: 'normal',
  headerFontWeight: '600',
  headerFontSize: { ...defaultHeaderFontSize },
  headerLetterSpacing: { ...DEFAULT_LETTER_SPACING },
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
    shadowInsetColor: 'rgba(0,0,0,0.2)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useCardStore = defineStore('card', () =>
  createComponentStore<CardVariant>({
    componentId: 'card',
    createDefault: createDefaultVariant
  })
)
