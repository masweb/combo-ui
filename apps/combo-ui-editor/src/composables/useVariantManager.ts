export interface BaseVariant {
  name: string
}

const deepMerge = <T>(target: T, source: Partial<T>): T => {
  if (!source) return target

  const result = { ...target }

  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (sourceValue === null) {
      ;(result as Record<string, unknown>)[key] = undefined
    } else if (sourceValue === undefined) {
      // Eliminar la propiedad cuando el valor es undefined
      delete (result as Record<string, unknown>)[key]
    } else if (
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue !== null &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(targetValue, sourceValue)
    } else {
      result[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }

  return result
}

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T
  }
  const cloned = { ...obj } as T
  for (const key in obj) {
    const value = (obj as Record<string, unknown>)[key]
    if (value !== null && typeof value === 'object') {
      ;(cloned as Record<string, unknown>)[key] = deepClone(value)
    }
  }
  return cloned
}

export const useVariantManager = <T extends BaseVariant>(initialVariants: T[], createDefault: (name: string) => T) => {
  const variants = ref<T[]>(structuredClone(initialVariants)) as Ref<T[]>
  const selectedVariantIndex = ref(0)

  const addVariant = () => {
    const count = variants.value.length + 1
    const newName = `variante-${count}`

    let newVariant: T
    if (variants.value.length > 0) {
      const lastVariant = variants.value[variants.value.length - 1]
      newVariant = deepClone({ ...lastVariant, name: newName }) as T
    } else {
      newVariant = createDefault(newName)
    }

    variants.value.push(newVariant)
    selectedVariantIndex.value = variants.value.length - 1
  }

  const updateVariant = (index: number, updates: Partial<T>) => {
    if (index >= 0 && index < variants.value.length) {
      variants.value[index] = deepMerge(variants.value[index]!, updates)
    }
  }

  const deleteVariant = (index: number) => {
    if (variants.value.length > 1 && index >= 0 && index < variants.value.length) {
      variants.value.splice(index, 1)
      if (selectedVariantIndex.value >= variants.value.length) {
        selectedVariantIndex.value = variants.value.length - 1
      }
    }
  }

  const selectVariant = (index: number) => {
    if (index >= 0 && index < variants.value.length) {
      selectedVariantIndex.value = index
    }
  }

  const selectedVariant = computed(() => variants.value[selectedVariantIndex.value])

  return {
    variants,
    selectedVariantIndex,
    selectedVariant,
    addVariant,
    updateVariant,
    deleteVariant,
    selectVariant
  }
}
