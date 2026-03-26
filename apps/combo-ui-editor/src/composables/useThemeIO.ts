import { db, COMPONENT_STORE_MAP } from '@/db'
import { storeManager } from './useStoreManager.js'
import { loadGoogleFont } from './useGoogleFonts.js'
import { useTypographyStore, getTypographyDefaults } from '@/stores/typography'
import { useFormsStore, getFormsDefaults } from '@/stores/forms'
import { generateReadme } from './useReadmeGenerator'
import JSZip from 'jszip'

const THEME_VERSION = '1.0'
const DEFAULT_THEME_NAME = 'NewTheme'

export const useThemeIO = () => {
  const isExporting = ref(false)
  const isImporting = ref(false)
  const isCreatingNew = ref(false)
  const error = ref<string | null>(null)
  const themeName = ref(DEFAULT_THEME_NAME)
  const isLoaded = ref(false)

  const loadThemeName = async () => {
    try {
      const meta = await db.themeMeta.get('main')
      if (meta) {
        themeName.value = meta.name
      }
      isLoaded.value = true
    } catch (err) {
      console.error('Error loading theme name:', err)
      isLoaded.value = true
    }
  }

  const saveThemeName = async (name: string) => {
    try {
      await db.themeMeta.put({ id: 'main', name })
      themeName.value = name
    } catch (err) {
      console.error('Error saving theme name:', err)
    }
  }

  const buildThemeData = async (name: string): Promise<ThemeData> => {
    const themeData: ThemeData = {
      name,
      version: THEME_VERSION
    }

    // Export typography (always included if exists)
    const typographyData = await db.typography.get('main')
    if (typographyData) {
      themeData.typography = {
        globalConfig: typographyData.globalConfig,
        variants: typographyData.variants,
        selectedVariantIndex: typographyData.selectedVariantIndex
      }
    }

    // Export forms (always included if exists)
    const formsData = await db.forms.get('main')
    if (formsData) {
      themeData.forms = {
        globalConfig: formsData.globalConfig,
        variants: formsData.variants,
        selectedVariantIndex: formsData.selectedVariantIndex,
        currentState: formsData.currentState
      }
    }

    // Export component variants (only if variants array is not empty)
    for (const [componentId, tableName] of Object.entries(COMPONENT_STORE_MAP)) {
      if (componentId === 'forms') continue // Already handled above

      const table = db[tableName] as unknown as {
        get: (id: string) => Promise<{ variants: unknown[]; selectedVariantIndex: number } | undefined>
      }
      const data = await table.get('main')

      if (data && data.variants && data.variants.length > 0) {
        Object.assign(themeData, {
          [tableName]: {
            variants: data.variants,
            selectedVariantIndex: data.selectedVariantIndex
          }
        })
      }
    }

    return themeData
  }

  const exportTheme = async (name: string): Promise<boolean> => {
    if (isExporting.value) return false

    isExporting.value = true
    error.value = null

    try {
      const themeData = await buildThemeData(name)
      const json = JSON.stringify(themeData, null, 2)
      const readme = generateReadme(themeData)

      // Create ZIP with JSON and README
      const zip = new JSZip()
      zip.file(`${name}.json`, json)
      zip.file('README.md', readme)

      // Generate ZIP blob and download
      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)

      // Create temporary link and trigger download
      const link = document.createElement('a')
      link.href = url
      link.download = `${name}.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      URL.revokeObjectURL(url)

      return true
    } catch (err) {
      console.error('Error exporting theme:', err)
      error.value = 'Error al exportar el tema'
      return false
    } finally {
      isExporting.value = false
    }
  }

  const importTheme = (): Promise<{ success: boolean; name?: string }> => {
    return new Promise(resolve => {
      if (isImporting.value) {
        resolve({ success: false })
        return
      }

      isImporting.value = true
      error.value = null

      // Create file input
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json,application/json'

      input.onchange = async event => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (!file) {
          isImporting.value = false
          resolve({ success: false })
          return
        }

        try {
          const content = await file.text()
          const themeData: ThemeData = JSON.parse(content)

          // Validate version
          if (!themeData.version) {
            throw new Error('Invalid theme file: missing version')
          }

          // Import typography
          if (themeData.typography) {
            await db.typography.put({
              id: 'main',
              globalConfig: themeData.typography.globalConfig,
              variants: themeData.typography.variants,
              selectedVariantIndex: themeData.typography.selectedVariantIndex
            })
          }

          // Import forms
          if (themeData.forms) {
            await db.forms.put({
              id: 'main',
              globalConfig: themeData.forms.globalConfig,
              variants: themeData.forms.variants,
              selectedVariantIndex: themeData.forms.selectedVariantIndex,
              currentState: themeData.forms.currentState
            })
          }

          // Import component variants
          for (const [componentId, tableName] of Object.entries(COMPONENT_STORE_MAP)) {
            if (componentId === 'forms') continue

            const componentData = themeData[tableName]
            if (isThemeComponentData(componentData)) {
              const table = db[tableName] as unknown as {
                put: (data: { id: string; variants: unknown[]; selectedVariantIndex: number }) => Promise<void>
              }
              await table.put({
                id: 'main',
                variants: componentData.variants,
                selectedVariantIndex: componentData.selectedVariantIndex ?? 0
              })
            } else {
              // If component not in theme file, clear it from DB
              const table = db[tableName] as unknown as {
                delete: (id: string) => Promise<void>
              }
              await table.delete('main')
            }
          }

          // Save theme name
          await saveThemeName(themeData.name)

          // Reload all stores from DB
          await reloadAllStores()

          isImporting.value = false
          resolve({ success: true, name: themeData.name })
        } catch (err) {
          console.error('Error importing theme:', err)
          error.value = 'Error al importar el tema'
          isImporting.value = false
          resolve({ success: false })
        }
      }

      input.oncancel = () => {
        isImporting.value = false
        resolve({ success: false })
      }

      input.click()
    })
  }

  const newTheme = async (name: string = DEFAULT_THEME_NAME): Promise<boolean> => {
    if (isCreatingNew.value) return false

    isCreatingNew.value = true
    error.value = null

    try {
      // Reset typography to defaults
      const typographyDefaults = getTypographyDefaults()
      await db.typography.put({
        id: 'main',
        globalConfig: typographyDefaults.globalConfig,
        variants: typographyDefaults.variants,
        selectedVariantIndex: 0
      })

      // Reset forms to defaults
      const formsDefaults = getFormsDefaults()
      await db.forms.put({
        id: 'main',
        globalConfig: formsDefaults.globalConfig,
        variants: formsDefaults.variants,
        selectedVariantIndex: 0,
        currentState: 'normal'
      })

      // Clear all component variants
      for (const [componentId, tableName] of Object.entries(COMPONENT_STORE_MAP)) {
        if (componentId === 'forms') continue

        const table = db[tableName] as unknown as {
          delete: (id: string) => Promise<void>
        }
        await table.delete('main')
      }

      // Save new theme name
      await saveThemeName(name)

      // Reload all stores from DB
      await reloadAllStores()

      return true
    } catch (err) {
      console.error('Error creating new theme:', err)
      error.value = 'Error al crear nuevo tema'
      return false
    } finally {
      isCreatingNew.value = false
    }
  }

  const reloadAllStores = async () => {
    // Reload typography store
    const typographyStore = useTypographyStore()
    typographyStore.clearFromMemory()
    await typographyStore.loadFromDB()

    // Load fonts from typography
    if (typographyStore.globalConfig.fontFamily) {
      loadGoogleFont(typographyStore.globalConfig.fontFamily)
    }
    for (const v of typographyStore.variants) {
      if (v.fontFamily) {
        loadGoogleFont(v.fontFamily, v.fontStyle, v.fontWeight)
      }
    }

    // Reload forms store
    const formsStore = useFormsStore()
    formsStore.clearFromMemory()
    await formsStore.loadFromDB()

    // Load fonts from forms
    if (formsStore.globalConfig.fontFamily) {
      loadGoogleFont(formsStore.globalConfig.fontFamily)
    }
    if (formsStore.globalConfig.optionFontFamily) {
      loadGoogleFont(formsStore.globalConfig.optionFontFamily)
    }

    // Reload other component stores via storeManager
    void storeManager.reloadAllStores()
  }

  // Load theme name on first use
  if (!isLoaded.value) {
    void loadThemeName()
  }

  return {
    exportTheme,
    importTheme,
    newTheme,
    saveThemeName,
    themeName,
    isExporting,
    isImporting,
    isCreatingNew,
    isLoaded,
    error
  }
}

/**
 * Theme data structure
 */
export interface ThemeData {
  name: string
  version: string
  typography?: {
    globalConfig: unknown
    variants: unknown[]
    selectedVariantIndex: number
  }
  forms?: {
    globalConfig: unknown
    variants: unknown[]
    selectedVariantIndex: number
    currentState?: string
  }
  [key: string]: unknown
}
