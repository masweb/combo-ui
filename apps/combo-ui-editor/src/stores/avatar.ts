import { createComponentStore } from '@/composables/useComponentStoreFactory'
import type { AvatarVariant } from '@/types/avatar'
import type { BorderValue, BorderRadiusValue, PaddingValue, UnitNumber, LetterSpacingValue } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 2,
  unit: 'px',
  color: '#dee2e6'
}

const defaultBorderRadius: BorderRadiusValue = {
  linked: true,
  unit: '%',
  tl: 50,
  tr: 50,
  br: 50,
  bl: 50
}

const defaultPadding: PaddingValue = {
  linkedV: true,
  linkedH: true,
  unit: 'px',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const defaultFontSize: UnitNumber = {
  value: 24,
  unit: 'px'
}

const defaultLetterSpacing: LetterSpacingValue = {
  value: 0,
  unit: 'px'
}

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
  letterSpacing: { ...defaultLetterSpacing },
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
