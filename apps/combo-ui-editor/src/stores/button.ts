import { createComponentStore } from '@/composables/useComponentStoreFactory'
import {
  createBorder,
  createBorderRadius,
  createPadding,
  createFontSize,
  DEFAULT_LETTER_SPACING
} from '@/utils/defaultValues'
import type { ButtonVariant } from '@/types/button'

const defaultBorder = createBorder('solid', 1, '#0d6efd')
const defaultBorderRadius = createBorderRadius(true, 'px', 6)
const defaultPadding = createPadding(true, true, 'px', 10, 20, 10, 20)
const defaultFontSize = createFontSize(14)

const createDefaultVariant = (name: string): ButtonVariant => ({
  name,
  background: '#0d6efd',
  color: '#ffffff',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '400',
  letterSpacing: { ...DEFAULT_LETTER_SPACING },
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
    shadowInsetColor: 'rgba(0,0,0,0.2)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useButtonStore = defineStore('button', () =>
  createComponentStore<ButtonVariant>({
    componentId: 'button',
    createDefault: createDefaultVariant
  })
)
