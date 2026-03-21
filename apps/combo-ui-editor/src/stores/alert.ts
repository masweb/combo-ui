import { createComponentStore } from '@/composables/useComponentStoreFactory'
import {
  createBorder,
  createBorderRadius,
  createPadding,
  createFontSize,
  createUnitNumber,
  DEFAULT_LETTER_SPACING
} from '@/utils/defaultValues'
import type { AlertVariant } from '@/types/alert'

const defaultBorder = createBorder('solid', 1, '#bee5eb')
const defaultBorderRadius = createBorderRadius(true, 'px', 4)
const defaultPadding = createPadding(true, true, 'px', 12, 16, 12, 16)
const defaultHeaderPadding = createPadding(true, true, 'px', 8, 16, 8, 16)
const defaultHeaderBorderBottom = createBorder('solid', 1, '#bee5eb')
const defaultFontSize = createFontSize(14)
const defaultHeaderFontSize = createFontSize(16)
const defaultCloseSize = createUnitNumber(20)
const defaultMaxWidth = createUnitNumber(500)
const defaultOffset = createUnitNumber(16)

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
  letterSpacing: { ...DEFAULT_LETTER_SPACING },
  textAlign: 'left',
  headerBackground: '#bee5eb',
  headerColor: '#0c5460',
  headerPadding: { ...defaultHeaderPadding },
  headerBorderBottom: { ...defaultHeaderBorderBottom },
  headerFontFamily: undefined,
  headerFontStyle: 'normal',
  headerFontWeight: '600',
  headerFontSize: { ...defaultHeaderFontSize },
  headerLetterSpacing: { ...DEFAULT_LETTER_SPACING },
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
    shadowInsetColor: 'rgba(0,0,0,0.2)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useAlertStore = defineStore('alert', () =>
  createComponentStore<AlertVariant>({
    componentId: 'alert',
    createDefault: createDefaultVariant
  })
)
