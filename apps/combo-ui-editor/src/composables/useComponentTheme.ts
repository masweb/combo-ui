import type { ComputedRef } from 'vue'

export interface ComponentThemeOptions {
  isDark: ComputedRef<boolean>
  isLight: ComputedRef<boolean>
  theme: ComputedRef<'light' | 'dark'>
  toggle: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useComponentTheme = (): ComponentThemeOptions => {
  const themeStore = useThemeStore()

  const isDark = computed(() => themeStore.isDarkComponents)
  const isLight = computed(() => themeStore.isLightComponents)
  const theme = computed(() => themeStore.componentTheme)

  const toggle = () => themeStore.toggleComponentTheme()
  const setTheme = (value: 'light' | 'dark') => themeStore.setComponentTheme(value)

  return {
    isDark,
    isLight,
    theme,
    toggle,
    setTheme
  }
}
