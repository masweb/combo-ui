/**
 * Base styles for ComboUX
 */

const BASE_STYLES_ID = 'cux-base-styles'

const BASE_CSS = `
/* Base styles */
:root {
  --cux-bg: #ffffff;
  --cux-text: #212529;
  --cux-text-muted: #6c757d;
  --cux-border: #dee2e6;
  --cux-surface: #f8f9fa;
}

.dark {
  --cux-bg: #333333;
  --cux-text: #f8f9fa;
  --cux-text-muted: #adb5bd;
  --cux-border: #495057;
  --cux-surface: #212631;
}

body {
  background-color: var(--cux-bg);
  color: var(--cux-text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: background-color 0.2s ease, color 0.2s ease;
}
`

let injected = false

/**
 * Inject base styles
 */
export function injectBaseStyles(): void {
  if (injected) return
  if (typeof document === 'undefined') return

  const existing = document.getElementById(BASE_STYLES_ID)
  if (existing) {
    injected = true
    return
  }

  const style = document.createElement('style')
  style.id = BASE_STYLES_ID
  style.textContent = BASE_CSS
  document.head.insertBefore(style, document.head.firstChild)
  injected = true
}
