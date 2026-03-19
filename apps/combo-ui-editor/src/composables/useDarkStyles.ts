import type { Ref } from 'vue'

export interface DarkStyleConfig<T> {
  variant: T
  isDark: boolean
  lightKey: keyof T
  darkKey: keyof T
}

export const useDarkStyles = <T extends { dark?: unknown }>(isDarkRef: Ref<boolean>) => {
  const getDarkValue = (variant: T, darkKey: string): unknown => {
    if (!variant.dark || typeof variant.dark !== 'object') return undefined
    return (variant.dark as Record<string, unknown>)[darkKey]
  }

  const getValue = (variant: T, lightKey: keyof T, darkKey?: string): unknown => {
    if (!isDarkRef.value || !variant.dark || darkKey === undefined) {
      return variant[lightKey]
    }
    return getDarkValue(variant, darkKey)
  }

  const getColor = (variant: T, lightKey: keyof T, darkKey?: string): string => {
    const value = getValue(variant, lightKey, darkKey)
    return typeof value === 'string' ? value : ''
  }

  const getBorderStyles = (variant: T, borderKey: keyof T, darkBorderKey?: string) => {
    const border = variant[borderKey] as { style: string; width: number; unit: string; color: string }
    const borderColor =
      isDarkRef.value && variant.dark && darkBorderKey ? getDarkValue(variant, darkBorderKey) : border.color

    return {
      borderStyle: border.style,
      borderWidth: `${border.width}${border.unit}`,
      borderColor: borderColor as string
    }
  }

  const getShadowColor = (variant: T, shadowPath?: string, darkShadowKey?: string): string => {
    if (!shadowPath) return 'transparent'

    const shadowValue = shadowPath.split('.').reduce((obj: unknown, key) => {
      if (obj && typeof obj === 'object') {
        return (obj as Record<string, unknown>)[key]
      }
      return undefined
    }, variant as unknown)

    if (isDarkRef.value && variant.dark && darkShadowKey) {
      return getDarkValue(variant, darkShadowKey) as string
    }

    return (shadowValue as { color: string })?.color || 'transparent'
  }

  return {
    getValue,
    getColor,
    getBorderStyles,
    getShadowColor,
    isDark: isDarkRef
  }
}
