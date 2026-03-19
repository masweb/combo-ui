export const useThemeStore = defineStore('theme', () => {
  const componentTheme = ref<'light' | 'dark'>('light')

  const isDarkComponents = computed(() => componentTheme.value === 'dark')
  const isLightComponents = computed(() => componentTheme.value === 'light')

  const toggleComponentTheme = () => {
    componentTheme.value = componentTheme.value === 'light' ? 'dark' : 'light'
  }

  const setComponentTheme = (theme: 'light' | 'dark') => {
    componentTheme.value = theme
  }

  return {
    componentTheme,
    isDarkComponents,
    isLightComponents,
    toggleComponentTheme,
    setComponentTheme
  }
})
