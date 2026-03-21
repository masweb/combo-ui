/**
 * CSS Generator with Custom Properties
 */

import type {
  ButtonVariant,
  CardVariant,
  AlertVariant,
  AvatarVariant,
  ProgressVariant,
  BadgeVariant,
  ChipVariant,
  TypographyGlobalConfig
} from '../types'
import { generateButtonCSS as generateButtonCSSFn } from './button-generator'
import { generateCardCSS as generateCardCSSFn } from './card-generator'
import { generateAlertCSS as generateAlertCSSFn } from './alert-generator'
import { generateAvatarCSS as generateAvatarCSSFn } from './avatar-generator'
import { generateProgressCSS as generateProgressCSSFn } from './progress-generator'
import { generateBadgeCSS as generateBadgeCSSFn } from './badge-generator'
import { generateChipCSS as generateChipCSSFn } from './chip-generator'

const STYLE_ID = 'cux-styles'

export class CSSGenerator {
  private styleElement: HTMLStyleElement | null = null

  /**
   * Get or create the style element in the document head
   */
  private getStyleElement(): HTMLStyleElement {
    if (this.styleElement) return this.styleElement

    let element = document.getElementById(STYLE_ID) as HTMLStyleElement | null

    if (!element) {
      element = document.createElement('style')
      element.id = STYLE_ID
      document.head.appendChild(element)
    }

    this.styleElement = element
    return element
  }

  /**
   * Inject CSS into the document
   */
  inject(css: string): void {
    const element = this.getStyleElement()
    element.textContent = css
  }

  /**
   * Generate complete CSS for button component
   */
  generateButtonCSS(variants: ButtonVariant[]): string {
    return generateButtonCSSFn(variants)
  }

  /**
   * Generate complete CSS for card component
   */
  generateCardCSS(variants: CardVariant[], globalConfig?: TypographyGlobalConfig): string {
    return generateCardCSSFn(variants, globalConfig)
  }

  /**
   * Generate complete CSS for alert component
   */
  generateAlertCSS(variants: AlertVariant[], globalConfig?: TypographyGlobalConfig): string {
    return generateAlertCSSFn(variants, globalConfig)
  }

  /**
   * Generate complete CSS for avatar component
   */
  generateAvatarCSS(variants: AvatarVariant[], globalConfig?: TypographyGlobalConfig): string {
    return generateAvatarCSSFn(variants, globalConfig)
  }

  /**
   * Generate complete CSS for progress component
   */
  generateProgressCSS(variants: ProgressVariant[], globalConfig?: TypographyGlobalConfig): string {
    return generateProgressCSSFn(variants, globalConfig)
  }

  /**
   * Generate complete CSS for badge component
   */
  generateBadgeCSS(variants: BadgeVariant[], globalConfig?: TypographyGlobalConfig): string {
    return generateBadgeCSSFn(variants, globalConfig)
  }

  /**
   * Generate complete CSS for chip component
   */
  generateChipCSS(variants: ChipVariant[], globalConfig?: TypographyGlobalConfig): string {
    return generateChipCSSFn(variants, globalConfig)
  }

  /**
   * Remove injected styles from the document
   */
  destroy(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement)
    }
    this.styleElement = null
  }
}
