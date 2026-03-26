import { db, type TypographyData } from '@/db'
import type { TypographyGlobalConfig, TypographyVariant } from '@/types/typography'
import { loadGoogleFont } from './useGoogleFonts.js'
import { storeManager } from './useStoreManager.js'
import { deepClone } from './useVariantManager.js'

interface TypographyPersistenceInstance {
  globalConfig: Ref<TypographyGlobalConfig>
  variants: Ref<TypographyVariant[]>
  selectedVariantIndex: Ref<number>
  isLoaded: Ref<boolean>
  loadFromDB: () => Promise<void>
  saveToDB: () => Promise<void>
  clearFromMemory: () => void
}

let typographyInstance: TypographyPersistenceInstance | null = null

export const useTypographyPersistence = (
  defaultGlobalConfig: TypographyGlobalConfig,
  defaultVariants: TypographyVariant[]
): TypographyPersistenceInstance => {
  if (typographyInstance) {
    return typographyInstance
  }

  const globalConfig = ref<TypographyGlobalConfig>({ ...defaultGlobalConfig })
  const variants = ref<TypographyVariant[]>(structuredClone(defaultVariants))
  const selectedVariantIndex = ref(0)
  const isLoaded = ref(false)
  const isLoading = ref(false)
  let loadPromise: Promise<void> | null = null

  const loadFromDB = async (): Promise<void> => {
    if (isLoading.value || isLoaded.value) return
    if (loadPromise) return loadPromise

    isLoading.value = true
    loadPromise = (async () => {
      try {
        const data = await db.typography.get('main')
        if (data) {
          globalConfig.value = data.globalConfig
          variants.value = data.variants
          selectedVariantIndex.value = data.selectedVariantIndex ?? 0

          if (data.globalConfig.fontFamily) {
            loadGoogleFont(data.globalConfig.fontFamily)
          }
          for (const v of data.variants) {
            if (v.fontFamily) {
              loadGoogleFont(v.fontFamily, v.fontStyle, v.fontWeight)
            }
          }
        }
        isLoaded.value = true
      } catch (error) {
        console.error('Error loading typography from DB:', error)
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
      const data: TypographyData = {
        id: 'main',
        globalConfig: deepClone(globalConfig.value),
        variants: deepClone(variants.value),
        selectedVariantIndex: selectedVariantIndex.value
      }
      await db.typography.put(data)
    } catch (error) {
      console.error('Error saving typography to DB:', error)
    }
  }

  const clearFromMemory = () => {
    // Typography is permanent, but we need to reset isLoaded for theme import
    isLoaded.value = false
    loadPromise = null
  }

  typographyInstance = {
    globalConfig,
    variants,
    selectedVariantIndex,
    isLoaded,
    loadFromDB,
    saveToDB,
    clearFromMemory
  }

  storeManager.registerStore('typography', {
    isLoaded,
    loadFromDB,
    clearFromMemory,
    variants,
    selectedVariantIndex,
    globalConfig
  })

  void loadFromDB()

  watch(
    () => globalConfig.value.fontFamily,
    newFont => {
      if (newFont) {
        loadGoogleFont(newFont)
      }
    }
  )

  watch(
    variants,
    newVariants => {
      for (const v of newVariants) {
        if (v.fontFamily) {
          loadGoogleFont(v.fontFamily, v.fontStyle, v.fontWeight)
        }
      }
    },
    { deep: true }
  )

  return typographyInstance
}
