/**
 * UI Controls - Container for theme button and dark toggle
 */

import type { ComboUX, ControlsOptions } from '../combo-ux'
import { createThemeButton } from './theme-button'
import { createDarkToggle } from './dark-toggle'

export class Controls {
  private cux: ComboUX
  private container: HTMLDivElement | null = null
  private visible = false

  constructor(cux: ComboUX) {
    this.cux = cux
  }

  /**
   * Show controls
   */
  show(options?: ControlsOptions): void {
    if (this.visible) return

    const position = options?.position ?? 'top-right'

    // Create container
    this.container = document.createElement('div')
    this.container.className = 'cux-controls'
    this.applyPosition(position)

    // Add theme button if requested (or by default)
    if (options?.theme !== null) {
      const themeBtn = createThemeButton(this.cux, options?.theme)
      this.container.appendChild(themeBtn)
    }

    // Add dark toggle if requested (or by default)
    if (options?.darkToggle !== null) {
      const darkToggle = createDarkToggle(this.cux, options?.darkToggle)
      this.container.appendChild(darkToggle)
    }

    // Add base styles
    this.injectStyles()

    // Append to body
    document.body.appendChild(this.container)
    this.visible = true
  }

  /**
   * Apply position styles to container
   */
  private applyPosition(position: NonNullable<ControlsOptions['position']>): void {
    if (!this.container) return

    const positions: Record<string, string> = {
      'top-right': 'top: 16px; right: 16px;',
      'top-left': 'top: 16px; left: 16px;',
      'bottom-right': 'bottom: 16px; right: 16px;',
      'bottom-left': 'bottom: 16px; left: 16px;'
    }

    this.container.style.cssText = `
      position: fixed;
      ${positions[position]}
      display: flex;
      gap: 8px;
      z-index: 9999;
    `
  }

  /**
   * Inject base styles for controls
   */
  private injectStyles(): void {
    const styleId = 'cux-controls-styles'

    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .cux-controls {
        font-family: system-ui, -apple-system, sans-serif;
      }

      .cux-btn {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s, border-color 0.15s;
      }

      .cux-btn:hover {
        background: #f3f4f6;
        border-color: #d1d5db;
      }

      .cux-btn svg {
        width: 20px;
        height: 20px;
        stroke: #374151;
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .dark .cux-btn {
        background: #1f2937;
        border-color: #374151;
      }

      .dark .cux-btn:hover {
        background: #374151;
        border-color: #4b5563;
      }

      .dark .cux-btn svg {
        stroke: #e5e7eb;
      }
    `
    document.head.appendChild(style)
  }

  /**
   * Hide controls
   */
  hide(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
    this.container = null
    this.visible = false
  }

  /**
   * Destroy controls
   */
  destroy(): void {
    this.hide()
  }
}
