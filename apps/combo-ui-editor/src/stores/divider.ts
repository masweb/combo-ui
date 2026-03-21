import { createComponentStore } from '@/composables/useComponentStoreFactory'
import { createBorder, createUnitNumber } from '@/utils/defaultValues'
import type { DividerVariant, DividerWidthValue } from '@/types/divider'

const defaultBorder = createBorder('solid', 1, '#333333')
const defaultWidth: DividerWidthValue = { value: 100, unit: '%' }
const defaultSpacing = createUnitNumber(16)

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
