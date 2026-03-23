import { usePersistence } from '@/composables/usePersistence'
import type { BaseVariant } from '@/composables/useVariantManager'

/**
 * Configuration for creating a component store
 */
interface ComponentStoreConfig<T extends BaseVariant> {
  /**
   * Unique identifier for the component (e.g., 'button', 'alert')
   */
  componentId: string

  /**
   * Function to create a default variant with the given name
   */
  createDefault: (name: string) => T

  /**
   * Initial variants to load if no persisted data exists
   * @default [createDefault('variante-1')]
   */
  initialVariants?: T[]
}

/**
 * Factory function to create standardized component stores
 *
 * This eliminates code duplication across all component stores by providing
 * a consistent pattern for store creation.
 *
 * @example
 * ```ts
 * export const useButtonStore = defineStore('button', () =>
 *   createComponentStore<ButtonVariant>({
 *     componentId: 'button',
 *     createDefault: createDefaultVariant
 *   })
 * )
 * ```
 */
export function createComponentStore<T extends BaseVariant>(config: ComponentStoreConfig<T>) {
  const { componentId, createDefault, initialVariants } = config

  const persistence = usePersistence<T>({
    componentId,
    initialVariants: initialVariants ?? [],
    createDefault
  })

  return {
    variants: persistence.variants,
    selectedVariantIndex: persistence.selectedVariantIndex,
    selectedVariant: persistence.selectedVariant,
    isLoaded: persistence.isLoaded,
    isLoading: persistence.isLoading,
    hasChanges: persistence.hasChanges,
    saveError: persistence.saveError,
    addVariant: persistence.addVariant,
    updateVariant: persistence.updateVariant,
    deleteVariant: persistence.deleteVariant,
    selectVariant: persistence.selectVariant
  }
}
