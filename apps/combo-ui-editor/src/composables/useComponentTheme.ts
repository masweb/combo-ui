import type { Ref, ComputedRef } from 'vue'

export interface ComponentThemeOptions {
  isDark: ComputedRef<boolean>
  isLight: ComputedRef<boolean>
  theme: ComputedRef<'light' | 'dark'>
  toggle: () => void
  setTheme: (theme: 'light' | 'dark') => void
  previewBackground: ComputedRef<string>
  previewTextColor: ComputedRef<string>
  lightBackground: Ref<string>
  darkBackground: Ref<string>
  setLightBackground: (color: string) => void
  setDarkBackground: (color: string) => void
}

const LIGHT_BG_KEY = 'combo-ux-preview-bg-light'
const DARK_BG_KEY = 'combo-ux-preview-bg-dark'

// Singleton refs - shared across all instances
const lightBackground = ref(localStorage.getItem(LIGHT_BG_KEY) || '#ffffff')
const darkBackground = ref(localStorage.getItem(DARK_BG_KEY) || '#222222')

export const useComponentTheme = (): ComponentThemeOptions => {
  const themeStore = useThemeStore()

  const isDark = computed(() => themeStore.isDarkComponents)
  const isLight = computed(() => themeStore.isLightComponents)
  const theme = computed(() => themeStore.componentTheme)

  const toggle = () => themeStore.toggleComponentTheme()
  const setTheme = (value: 'light' | 'dark') => themeStore.setComponentTheme(value)

  const setLightBackground = (color: string) => {
    lightBackground.value = color
    localStorage.setItem(LIGHT_BG_KEY, color)
  }

  const setDarkBackground = (color: string) => {
    darkBackground.value = color
    localStorage.setItem(DARK_BG_KEY, color)
  }

  const previewBackground = computed(() => (isDark.value ? darkBackground.value : lightBackground.value))

  const previewTextColor = computed(() => (isDark.value ? '#ffffff' : '#1a1a1a'))

  return {
    isDark,
    isLight,
    theme,
    toggle,
    setTheme,
    previewBackground,
    previewTextColor,
    lightBackground,
    darkBackground,
    setLightBackground,
    setDarkBackground
  }
}
