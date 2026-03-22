import type { EntityTable } from 'dexie'
import { db, COMPONENT_STORE_MAP, type ComponentData } from '@/db'
import type { BaseVariant } from './useVariantManager.js'
import { useVariantManager, deepClone } from './useVariantManager.js'
import { storeManager } from './useStoreManager.js'

interface PersistenceOptions<T extends BaseVariant> {
  componentId: string
  initialVariants: T[]
  createDefault: (name: string) => T
}

interface PersistenceInstance<T extends BaseVariant> {
  variants: Ref<T[]>
  selectedVariantIndex: Ref<number>
  selectedVariant: ComputedRef<T | undefined>
  isLoaded: Ref<boolean>
  isLoading: Ref<boolean>
  hasChanges: Ref<boolean>
  saveError: Ref<boolean>
  loadFromDB: () => Promise<void>
  saveToDB: () => Promise<void>
  clearFromMemory: () => void
  addVariant: () => void
  updateVariant: (index: number, updates: Partial<T>) => void
  deleteVariant: (index: number) => void
  selectVariant: (index: number) => void
}

const persistenceInstances = new Map<string, PersistenceInstance<BaseVariant>>()

export const getOrCreatePersistence = <T extends BaseVariant>(
  options: PersistenceOptions<T>
): PersistenceInstance<T> => {
  const { componentId, initialVariants, createDefault } = options

  const existing = persistenceInstances.get(componentId) as PersistenceInstance<T> | undefined
  if (existing) {
    return existing
  }

  const tableName = COMPONENT_STORE_MAP[componentId]

  if (!tableName) {
    throw new Error(`Unknown component: ${componentId}`)
  }

  const manager = useVariantManager<T>(initialVariants, createDefault)
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const hasChanges = ref(false)
  const saveError = ref(false)
  let loadPromise: Promise<void> | null = null
  const initialVariantsCopy = deepClone(initialVariants)
  let saveTimeout: ReturnType<typeof setTimeout> | null = null

  const table = db[tableName] as unknown as EntityTable<ComponentData<T>, 'id'>

  const loadFromDB = async (): Promise<void> => {
    if (isLoading.value || isLoaded.value) return
    if (loadPromise) return loadPromise

    isLoading.value = true
    loadPromise = (async () => {
      try {
        const data = await table.get('main')
        if (data) {
          manager.variants.value = data.variants
          manager.selectedVariantIndex.value = data.selectedVariantIndex ?? 0
        }
        isLoaded.value = true
        hasChanges.value = false
      } catch (error) {
        console.error(`Error loading ${componentId} from DB:`, error)
      } finally {
        isLoading.value = false
        loadPromise = null
      }
    })()

    return loadPromise
  }

  const saveToDB = async (): Promise<void> => {
    if (loadPromise) {
      await loadPromise
    }

    try {
      const data: ComponentData<T> = {
        id: 'main',
        variants: deepClone(manager.variants.value),
        selectedVariantIndex: manager.selectedVariantIndex.value
      }
      await table.put(data)
      hasChanges.value = false
      saveError.value = false
    } catch (error) {
      console.error(`Error saving ${componentId} to DB:`, error)
      saveError.value = true
    }
  }

  const debouncedSaveToDB = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }
    saveTimeout = setTimeout(() => {
      void saveToDB()
      saveTimeout = null
    }, 300)
  }

  const clearFromMemory = () => {
    manager.variants.value = deepClone(initialVariantsCopy)
    manager.selectedVariantIndex.value = 0
    isLoaded.value = false
    hasChanges.value = false
    saveError.value = false
    loadPromise = null
    if (saveTimeout) {
      clearTimeout(saveTimeout)
      saveTimeout = null
    }
  }

  const persistentAddVariant = () => {
    manager.addVariant()
    hasChanges.value = true
    debouncedSaveToDB()
  }

  const persistentUpdateVariant = (index: number, updates: Partial<T>) => {
    manager.updateVariant(index, updates)
    hasChanges.value = true
    debouncedSaveToDB()
  }

  const persistentDeleteVariant = (index: number) => {
    manager.deleteVariant(index)
    hasChanges.value = true
    debouncedSaveToDB()
  }

  const persistentSelectVariant = (index: number) => {
    manager.selectVariant(index)
    hasChanges.value = true
    debouncedSaveToDB()
  }

  const instance: PersistenceInstance<T> = {
    variants: manager.variants,
    selectedVariantIndex: manager.selectedVariantIndex,
    selectedVariant: manager.selectedVariant,
    isLoaded,
    isLoading,
    hasChanges,
    saveError,
    loadFromDB,
    saveToDB,
    clearFromMemory,
    addVariant: persistentAddVariant,
    updateVariant: persistentUpdateVariant,
    deleteVariant: persistentDeleteVariant,
    selectVariant: persistentSelectVariant
  }

  persistenceInstances.set(componentId, instance as unknown as PersistenceInstance<BaseVariant>)

  storeManager.registerStore(componentId, {
    isLoaded,
    loadFromDB,
    clearFromMemory,
    variants: manager.variants,
    selectedVariantIndex: manager.selectedVariantIndex
  })

  void loadFromDB()

  return instance
}

export const usePersistence = <T extends BaseVariant>(options: PersistenceOptions<T>): PersistenceInstance<T> => {
  return getOrCreatePersistence(options)
}
