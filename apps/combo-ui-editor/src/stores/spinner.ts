import { createComponentStore } from '@/composables/useComponentStoreFactory'
import { createBorder, createUnitNumber } from '@/utils/defaultValues'
import type { SpinnerVariant } from '@/types/spinner'

const defaultBorder = createBorder('solid', 4, '#0d6efd')
const defaultSize = createUnitNumber(40)

const createDefaultVariant = (name: string): SpinnerVariant => ({
  name,
  type: 'ring',
  color: '#0d6efd',
  trackColor: '#95b6d8',
  border: { ...defaultBorder },
  size: { ...defaultSize },
  speed: 1,
  dark: {
    color: '#0d6efd',
    trackColor: '#527e9d',
    borderColor: '#495057'
  }
})

export const useSpinnerStore = defineStore('spinner', () =>
  createComponentStore<SpinnerVariant>({
    componentId: 'spinner',
    createDefault: createDefaultVariant
  })
)
