import { createComponentStore } from '@/composables/useComponentStoreFactory'
import type { SpinnerVariant } from '@/types/spinner'
import type { BorderValue, UnitNumber } from '@/types/generics'

const defaultBorder: BorderValue = {
  style: 'solid',
  width: 4,
  unit: 'px',
  color: '#0d6efd'
}

const defaultSize: UnitNumber = {
  value: 40,
  unit: 'px'
}

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
