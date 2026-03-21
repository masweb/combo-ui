import { createComponentStore } from '@/composables/useComponentStoreFactory'
import {
  createBorder,
  createBorderRadius,
  createPadding,
  createFontSize,
  DEFAULT_LETTER_SPACING
} from '@/utils/defaultValues'
import type { AvatarVariant } from '@/types/avatar'

const defaultBorder = createBorder('solid', 2, '#dee2e6')
const defaultBorderRadius = createBorderRadius(true, '%', 50)
const defaultPadding = createPadding(true, true, 'px', 0, 0, 0, 0)
const defaultFontSize = createFontSize(24)

const createDefaultVariant = (name: string): AvatarVariant => ({
  name,
  background: '#6c757d',
  color: '#ffffff',
  border: { ...defaultBorder },
  borderRadius: { ...defaultBorderRadius },
  padding: { ...defaultPadding },
  fontFamily: undefined,
  fontSize: { ...defaultFontSize },
  fontStyle: 'normal',
  fontWeight: '500',
  letterSpacing: { ...DEFAULT_LETTER_SPACING },
  shadows: undefined,
  dark: {
    background: '#3d3d3d',
    color: '#ffffff',
    borderColor: '#4d4d4d',
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowInsetColor: 'rgba(0,0,0,0.2)',
    shadowInsetHighlightColor: 'rgba(255,255,255,0.75)'
  }
})

export const useAvatarStore = defineStore('avatar', () =>
  createComponentStore<AvatarVariant>({
    componentId: 'avatar',
    createDefault: createDefaultVariant
  })
)
