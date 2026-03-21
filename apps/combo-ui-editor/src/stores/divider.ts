import { createComponentStore } from '@/composables/useComponentStoreFactory'
import type { BorderValue, UnitNumber } from '@/types/generics'
import type { DividerVariant, DividerWidthValue } from '@/types/divider'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 1,
  unit: 'px',
  color: '#333333'
}

const defaultWidth: DividerWidthValue = {
  value: 100,
  unit: '%'
}

const defaultSpacing: UnitNumber = {
  value: 16,
  unit: 'px'
}

const createDefaultVariant = (name: string): DividerVariant => ({
  name,
  border: { ...defaultBorder },
  width: { ...defaultWidth },
  spacing: { ...defaultSpacing },
  dark: {
    borderColor: '#aaaaaa'
  }
})

export const useDividerStore = defineStore('divider', () =>
  createComponentStore<DividerVariant>({
    componentId: 'divider',
    createDefault: createDefaultVariant
  })
)
