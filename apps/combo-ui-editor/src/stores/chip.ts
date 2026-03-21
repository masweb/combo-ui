import { createComponentStore } from '@/composables/useComponentStoreFactory'
import {
  createBorder,
  createBorderRadius,
  createPadding,
  createFontSize,
  createUnitNumber,
  DEFAULT_LETTER_SPACING
} from '@/utils/defaultValues'
import type { ChipVariant } from '@/types/chip'

const defaultBorder = createBorder('none', 1, '#dee2e6')
const defaultBorderRadius = createBorderRadius(true, 'px', 20)
const defaultPadding = createPadding(true, true, 'px', 6, 12, 6, 12)
const defaultFontSize = createFontSize(14)
const defaultCloseSize = createUnitNumber(16)

const createDefaultVariant = (name: string): ChipVariant => ({
  name,
  background: '#e9ecef',
  color: '#333333',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: { ...DEFAULT_LETTER_SPACING },
  closeSize: { ...defaultCloseSize },
  closeColor: '#6c757d',
  closeHoverColor: '#495057',
  closeActiveColor: '#343a40',
  shadows: undefined,
  dark: {
    background: '#343a40',
    color: '#ffffff',
    borderColor: '#495057',
    closeColor: '#adb5bd',
    closeHoverColor: '#ced4da',
    closeActiveColor: '#dee2e6',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowInsetColor: 'rgba(0,0,0,0.3)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useChipStore = defineStore('chip', () =>
  createComponentStore<ChipVariant>({
    componentId: 'chip',
    createDefault: createDefaultVariant
  })
)
