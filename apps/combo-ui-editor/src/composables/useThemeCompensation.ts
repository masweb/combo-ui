import type { Ref } from 'vue'

export interface ThemeCompensation {
  style: Record<string, string> | false
  footerStyle: Record<string, string> | false
}

export const useThemeCompensation = (componentTheme: Ref<string>, appTheme: Ref<'light' | 'dark' | 'auto'>) => {
  const getCompensation = (): Record<string, string> | false => {
    const componentValue = componentTheme.value
    const appValue = appTheme.value

    if (componentValue === 'light' && appValue === 'dark') {
      return { color: '#333333', borderColor: '#dfdfe0' }
    }
    if (componentValue === 'dark' && appValue === 'light') {
      return { color: '#dfdfe0', borderColor: '#383838' }
    }
    if (componentValue === 'light' && appValue === 'light') {
      return { color: '#333333', borderColor: '#dfdfe0' }
    }

    return false
  }

  const getFooterCompensation = (): Record<string, string> | false => {
    const componentValue = componentTheme.value
    const appValue = appTheme.value

    if (componentValue === 'light' && appValue === 'dark') {
      return { backgroundColor: '#f0f0f0' }
    }
    if (componentValue === 'dark' && appValue === 'light') {
      return { backgroundColor: '#2e2e2e' }
    }

    return false
  }

  return {
    getCompensation,
    getFooterCompensation
  }
}
