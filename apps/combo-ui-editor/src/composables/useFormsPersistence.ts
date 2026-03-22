import { db } from '@/db'
import type { FormsGlobalConfig, FormsVariant } from '@/types/forms'
import { deepClone } from './useVariantManager.js'
import { storeManager } from './useStoreManager.js'
import { loadGoogleFont } from './useGoogleFonts.js'
import { watch } from 'vue'

interface FormsData {
  id: string
  globalConfig: FormsGlobalConfig
  variants: FormsVariant[]
  selectedVariantIndex: number
  currentState: string
}

let formsInstance: {
  globalConfig: Ref<FormsGlobalConfig>
  variants: Ref<FormsVariant[]>
  selectedVariantIndex: Ref<number>
  currentState: Ref<string>
  isLoaded: Ref<boolean>
  isLoading: Ref<boolean>
  loadFromDB: () => Promise<void>
  saveToDB: () => Promise<void>
  clearFromMemory: () => void
} | null = null

export const useFormsPersistence = (defaultGlobalConfig: FormsGlobalConfig, defaultVariants: FormsVariant[]) => {
  if (formsInstance) {
    return formsInstance
  }

  const globalConfig = ref<FormsGlobalConfig>({ ...defaultGlobalConfig })
  const variants = ref<FormsVariant[]>([...defaultVariants])
  const selectedVariantIndex = ref(0)
  const currentState = ref('normal')
  const isLoaded = ref(false)
  const isLoading = ref(false)
  let loadPromise: Promise<void> | null = null

  const loadFromDB = async (): Promise<void> => {
    if (isLoading.value || isLoaded.value) return
    if (loadPromise) return loadPromise

    isLoading.value = true
    loadPromise = (async () => {
      try {
        const data = await db.forms.get('main')
        if (data) {
          globalConfig.value = data.globalConfig
          variants.value = data.variants
          selectedVariantIndex.value = data.selectedVariantIndex ?? 0
          currentState.value = data.currentState ?? 'normal'

          if (data.globalConfig.fontFamily) {
            loadGoogleFont(data.globalConfig.fontFamily)
          }
          if (data.globalConfig.optionFontFamily) {
            loadGoogleFont(data.globalConfig.optionFontFamily)
          }
        }
        isLoaded.value = true
      } catch (error) {
        console.error('Error loading forms from DB:', error)
      } finally {
        isLoading.value = false
        loadPromise = null
      }
    })()

    return loadPromise
  }

  const saveToDB = async () => {
    if (loadPromise) {
      await loadPromise
    }

    if (!isLoaded.value) return

    try {
      const data: FormsData = {
        id: 'main',
        globalConfig: deepClone(globalConfig.value),
        variants: deepClone(variants.value),
        selectedVariantIndex: selectedVariantIndex.value,
        currentState: currentState.value
      }
      await db.forms.put(data)
    } catch (error) {
      console.error('Error saving forms to DB:', error)
    }
  }

  const clearFromMemory = () => {
    // Forms is permanent, but we need to reset isLoaded for theme import
    isLoaded.value = false
    loadPromise = null
  }

  formsInstance = {
    globalConfig,
    variants,
    selectedVariantIndex,
    currentState,
    isLoaded,
    isLoading,
    loadFromDB,
    saveToDB,
    clearFromMemory
  }

  storeManager.registerStore('forms', {
    isLoaded,
    loadFromDB,
    clearFromMemory,
    variants,
    selectedVariantIndex
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
    () => globalConfig.value.optionFontFamily,
    newFont => {
      if (newFont) {
        loadGoogleFont(newFont)
      }
    }
  )

  return formsInstance
}
