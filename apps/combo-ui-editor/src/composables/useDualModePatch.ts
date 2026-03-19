export interface DualModePatchOptions<T> {
  selectedVariant: Ref<T | null | undefined>
  selectedVariantIndex: Ref<number>
  updateVariant: (index: number, updates: Partial<T>) => void
  darkKey?: keyof T
}

export const useDualModePatch = <T extends object, D extends object>(options: DualModePatchOptions<T>) => {
  const { selectedVariant, selectedVariantIndex, updateVariant, darkKey = 'dark' as keyof T } = options

  const patch = (updates: Partial<T>) => {
    if (selectedVariant.value) {
      updateVariant(selectedVariantIndex.value, updates)
    }
  }

  const patchDark = (updates: Partial<D>) => {
    if (!selectedVariant.value) return

    const currentDark = selectedVariant.value[darkKey] as D | undefined
    if (currentDark) {
      patch({
        [darkKey]: { ...currentDark, ...updates }
      } as Partial<T>)
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

  return {
    patch,
    patchDark,
    patchNested
  }
}
