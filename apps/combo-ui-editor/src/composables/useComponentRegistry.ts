const previewModules = import.meta.glob<{ default: Component }>('/src/components/previews/*.vue')
const settingsModules = import.meta.glob<{ default: Component }>('/src/components/settings/*.vue')

const extractComponentName = (path: string, folder: 'previews' | 'settings'): string => {
  const match = path.match(new RegExp(`/src/components/${folder}/(.+)\\.vue$`))
  return match?.[1]?.toLowerCase() ?? ''
}

const normalizeSettingsName = (filename: string): string => {
  return filename.replace(/settings$/i, '').toLowerCase()
}

export const useComponentRegistry = () => {
  const previewComponents = Object.fromEntries(
    Object.entries(previewModules).map(([path, loader]) => {
      const name = extractComponentName(path, 'previews')
      return [name, defineAsyncComponent(loader)]
    })
  )

  const settingsComponents = Object.fromEntries(
    Object.entries(settingsModules).map(([path, loader]) => {
      const rawName = extractComponentName(path, 'settings')
      const name = normalizeSettingsName(rawName)
      return [name, defineAsyncComponent(loader)]
    })
  )

  const componentList = Object.keys(previewComponents)

  const hasSettings = (componentId: string): boolean => {
    return componentId in settingsComponents
  }

  return {
    previewComponents,
    settingsComponents,
    componentList,
    hasSettings
  }
}
