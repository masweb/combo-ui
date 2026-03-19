/**
 * Theme Button - Button to open theme file picker
 */

import type { ComboUX, ThemeButtonOptions } from '../combo-ux'

// Tabler Icons: folder-open
const DEFAULT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M18 3a3 3 0 0 1 2.995 2.824l.005.176v12a3 3 0 0 1-2.824 2.995l-.176.005h-12a3 3 0 0 1-2.995-2.824l-.005-.176v-12a3 3 0 0 1 2.824-2.995l.176-.005h12z" stroke-width="0" fill="currentColor" opacity="0.1"/>
  <path d="M5 19h14a2 2 0 0 0 1.84-1.22l1.524-3.808a1 1 0 0 0 .063-.472l-.009-.06-.008-.06v-4.38a2 2 0 0 0-2-2h-7.172a2 2 0 0 1-1.414-.586l-.828-.828a2 2 0 0 0-1.414-.586h-4.172a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>
</svg>`

export function createThemeButton(cux: ComboUX, options?: ThemeButtonOptions): HTMLButtonElement {
  const button = document.createElement('button')
  button.className = 'cux-btn cux-theme-btn'
  button.title = 'Load theme'
  button.setAttribute('aria-label', 'Load theme')
  button.innerHTML = options?.icon ?? DEFAULT_ICON

  button.addEventListener('click', () => {
    if (options?.onClick) {
      options.onClick()
    } else {
      void cux.openThemePicker()
    }
  })

  return button
}
