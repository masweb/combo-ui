import type { ComputedRef } from 'vue'
import type { UnitNumber } from '@/types/generics'

/**
 * Create update functions for a UnitNumber property
 * Eliminates boilerplate in settings components
 *
 * @example
 * ```ts
 * const { updateValue, updateUnit } = useUnitNumberUpdates(patch, variant, 'maxWidth')
 * // updateValue(100) -> patch({ maxWidth: { ...variant.value.maxWidth, value: 100 }})
 * // updateUnit('rem') -> patch({ maxWidth: { ...variant.value.maxWidth, unit: 'rem' }})
 * ```
 */
export function useUnitNumberUpdates<T extends object, K extends keyof T>(
  patch: (updates: Partial<T>) => void,
  variant: ComputedRef<T | undefined>,
  key: K
) {
  const updateValue = (value: number) => {
    if (!variant.value) return
    const currentValue = variant.value[key] as UnitNumber
    const updatedValue = { ...currentValue, value }
    patch({ [key]: updatedValue } as Partial<T>)
  }

  const updateUnit = (unit: string) => {
    if (!variant.value) return
    const currentValue = variant.value[key] as UnitNumber
    const updatedValue = { ...currentValue, unit } as UnitNumber
    patch({ [key]: updatedValue } as Partial<T>)
  }

  return { updateValue, updateUnit }
}
