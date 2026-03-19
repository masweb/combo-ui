import type { Ref } from 'vue'

export interface VariantPatchOptions<T> {
  selectedVariant: Ref<T | null | undefined>
  selectedVariantIndex: Ref<number>
  updateVariant: (index: number, updates: Partial<T>) => void
}

export const useVariantPatch = <T extends object>(options: VariantPatchOptions<T>) => {
  const { selectedVariant, selectedVariantIndex, updateVariant } = options

  const patch = (updates: Partial<T>) => {
    if (selectedVariant.value) {
      updateVariant(selectedVariantIndex.value, updates)
    }
  }

  const patchNested = <K extends keyof T>(key: K, nestedKey: string, value: unknown) => {
    if (!selectedVariant.value) return

    const current = selectedVariant.value[key]
    if (current && typeof current === 'object') {
      patch({
        [key]: {
          ...current,
          [nestedKey]: value
        }
      } as Partial<T>)
    }
  }

  const patchShadow = <S extends object>(shadowKey: keyof T, shadowValue: S, nestedKey: string = 'offset') => {
    if (!selectedVariant.value) return

    const currentShadows = selectedVariant.value[shadowKey]
    patch({
      [shadowKey]: {
        ...currentShadows,
        [nestedKey]: shadowValue
      }
    } as Partial<T>)
  }

  return {
    patch,
    patchNested,
    patchShadow
  }
}
