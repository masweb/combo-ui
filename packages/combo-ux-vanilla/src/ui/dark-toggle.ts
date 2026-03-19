/**
 * Dark Toggle - Button to toggle dark/light mode
 */

import type { ComboUX, DarkToggleOptions } from '../combo-ux'

// Tabler Icons: sun (light mode icon)
const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/>
</svg>`

// Tabler Icons: moon (dark mode icon)
const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
</svg>`

export function createDarkToggle(cux: ComboUX, options?: DarkToggleOptions): HTMLButtonElement {
  const button = document.createElement('button')
  button.className = 'cux-btn cux-dark-toggle'
  button.title = 'Toggle dark mode'
  button.setAttribute('aria-label', 'Toggle dark mode')

  const sunIcon = options?.iconLight ?? SUN_ICON
  const moonIcon = options?.iconDark ?? MOON_ICON

  // Update icon based on current mode
  const updateIcon = () => {
    button.innerHTML = cux.isDark ? moonIcon : sunIcon
  }

  // Initial icon
  updateIcon()

  // Listen for dark mode changes
  cux.onDarkModeChange(updateIcon)

  // Toggle on click
  button.addEventListener('click', () => {
    cux.toggleDarkMode()
  })

  return button
}
