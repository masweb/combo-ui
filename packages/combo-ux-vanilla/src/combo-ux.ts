/**
 * ComboUX - Main class for the vanilla library
 */

import type {
  ComboUXOptions,
  ThemeData,
  DarkModeChangeCallback,
  ThemeLoadCallback,
  ControlsOptions,
  ButtonVariant,
  CardVariant,
  AlertVariant,
  AvatarVariant,
  ThemeButtonOptions,
  DarkToggleOptions
} from './types'

// Re-export types for consumers
export type {
  ComboUXOptions,
  ThemeData,
  DarkModeChangeCallback,
  ThemeLoadCallback,
  ControlsOptions,
  ButtonVariant,
  CardVariant,
  AlertVariant,
  AvatarVariant,
  ThemeButtonOptions,
  DarkToggleOptions
}
import { DarkMode } from './core/dark-mode'
import { CSSGenerator } from './core/css-generator'
import { ThemeLoader } from './core/theme-loader'
import { Controls } from './ui/controls'
import {
  loadFontsFromButtonVariants,
  loadFontsFromTypography,
  loadFontsFromForms,
  loadFontsFromAvatarVariants
} from './core/google-fonts'
import { injectBasscss } from './basscss'
import { injectBaseStyles } from './core/base-styles'
import { generateTypographyCSS } from './core/typography-generator'
import { generateFormsCSS } from './core/forms-generator'

export class ComboUX {
  private options: Required<Omit<ComboUXOptions, 'theme'>> & { theme: ThemeData | string }
  private darkMode: DarkMode
  private cssGenerator: CSSGenerator
  private themeLoader: ThemeLoader
  private controls: Controls | null = null
  private currentTheme: ThemeData | null = null

  constructor(options: ComboUXOptions) {
    this.options = {
      theme: options.theme,
      darkMode: options.darkMode ?? 'auto',
      persistDarkMode: options.persistDarkMode ?? true,
      darkModeStorageKey: options.darkModeStorageKey ?? 'cux-dark-mode'
    }

    this.darkMode = new DarkMode({
      persist: this.options.persistDarkMode,
      storageKey: this.options.darkModeStorageKey
    })

    this.cssGenerator = new CSSGenerator()
    this.themeLoader = new ThemeLoader()

    // Initialize
    void this.init()
  }

  /**
   * Initialize the library
   */
  private async init(): Promise<void> {
    // Inject base styles
    injectBaseStyles()

    // Inject Basscss utilities
    injectBasscss()

    // Initialize dark mode
    this.darkMode.init(this.options.darkMode)

    // Load theme
    try {
      await this.loadTheme(this.options.theme)
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
  }

  /**
   * Load theme from URL or object
   */
  async loadTheme(theme: ThemeData | string): Promise<void> {
    const themeData = await this.themeLoader.load(theme)
    this.currentTheme = themeData
    this.applyTheme(themeData)
  }

  /**
   * Apply theme by generating and injecting CSS
   */
  private applyTheme(theme: ThemeData): void {
    const cssParts: string[] = []

    console.log('[ComboUX] Applying theme:', theme.name)
    console.log('[ComboUX] Theme keys:', Object.keys(theme))
    console.log('[ComboUX] Typography:', theme.typography ? 'exists' : 'missing')
    console.log('[ComboUX] Forms:', theme.forms ? 'exists' : 'missing')
    console.log('[ComboUX] Buttons:', theme.buttons ? 'exists' : 'missing')

    // Load Google Fonts from typography
    if (theme.typography) {
      console.log('[ComboUX] Typography variants:', theme.typography.variants?.length || 0)
      loadFontsFromTypography(theme.typography)
      const typographyCSS = generateTypographyCSS(theme.typography)
      if (typographyCSS) {
        console.log('[ComboUX] Typography CSS generated:', typographyCSS.length, 'chars')
        cssParts.push(typographyCSS)
      }
    }

    // Generate forms CSS
    if (theme.forms?.globalConfig) {
      console.log('[ComboUX] Forms config exists')
      // Load Google Fonts from forms
      loadFontsFromForms(theme.forms)
      const formsCSS = generateFormsCSS(theme.forms, theme.typography)
      if (formsCSS) {
        console.log('[ComboUX] Forms CSS generated:', formsCSS.length, 'chars')
        cssParts.push(formsCSS)
      }
    }

    // Generate button CSS
    if (theme.buttons?.variants?.length) {
      console.log(
        '[ComboUX] Button variants:',
        theme.buttons.variants.map(v => v.name)
      )
      // Load Google Fonts from button variants
      loadFontsFromButtonVariants(theme.buttons.variants)
      const buttonCSS = this.cssGenerator.generateButtonCSS(theme.buttons.variants)
      cssParts.push(buttonCSS)
    }

    // Generate card CSS
    if (theme.cards?.variants?.length) {
      console.log(
        '[ComboUX] Card variants:',
        theme.cards.variants.map(v => v.name)
      )
      const cardCSS = this.cssGenerator.generateCardCSS(theme.cards.variants, theme.typography?.globalConfig)
      cssParts.push(cardCSS)
    }

    // Generate alert CSS
    if (theme.alerts?.variants?.length) {
      console.log(
        '[ComboUX] Alert variants:',
        theme.alerts.variants.map(v => v.name)
      )
      const alertCSS = this.cssGenerator.generateAlertCSS(theme.alerts.variants, theme.typography?.globalConfig)
      cssParts.push(alertCSS)
    }

    // Generate avatar CSS
    if (theme.avatars?.variants?.length) {
      console.log(
        '[ComboUX] Avatar variants:',
        theme.avatars.variants.map(v => v.name)
      )
      // Load Google Fonts from avatar variants
      loadFontsFromAvatarVariants(theme.avatars.variants)
      const avatarCSS = this.cssGenerator.generateAvatarCSS(theme.avatars.variants, theme.typography?.globalConfig)
      cssParts.push(avatarCSS)
    }

    // Inject combined CSS
    if (cssParts.length > 0) {
      const finalCSS = cssParts.join('\n\n')
      console.log('[ComboUX] Total CSS parts:', cssParts.length)
      console.log('[ComboUX] Injecting CSS...')
      this.cssGenerator.inject(finalCSS)
    }
  }

  /**
   * Update theme (for real-time updates via websockets)
   */
  updateTheme(theme: ThemeData): void {
    this.currentTheme = theme
    this.applyTheme(theme)
  }

  /**
   * Update a specific button variant
   */
  updateButtonVariant(variantName: string, updates: Partial<ButtonVariant>): void {
    if (!this.currentTheme?.buttons?.variants) return

    const variant = this.currentTheme.buttons.variants.find(v => v.name.toLowerCase() === variantName.toLowerCase())

    if (variant) {
      Object.assign(variant, updates)
      this.applyTheme(this.currentTheme)
    }
  }

  // ==================== Dark Mode API ====================

  /** Check if dark mode is active */
  get isDark(): boolean {
    return this.darkMode.isDark
  }

  /** Set dark mode */
  setDarkMode(value: boolean | 'auto'): void {
    this.darkMode.setDarkMode(value)
  }

  /** Toggle dark mode */
  toggleDarkMode(): void {
    this.darkMode.toggle()
  }

  /** Register callback for dark mode changes */
  onDarkModeChange(callback: DarkModeChangeCallback): () => void {
    return this.darkMode.onChange(callback)
  }

  // ==================== Theme Events ====================

  /** Register callback for theme load events */
  onThemeLoad(callback: ThemeLoadCallback): () => void {
    return this.themeLoader.onLoad(callback)
  }

  // ==================== UI Controls ====================

  /** Show theme button (for loading themes) */
  showThemeButton(options?: ControlsOptions['theme']): void {
    this.showControls({ theme: options })
  }

  /** Show dark mode toggle button */
  showDarkToggle(options?: ControlsOptions['darkToggle']): void {
    this.showControls({ darkToggle: options })
  }

  /** Show all controls */
  showControls(options?: ControlsOptions): void {
    if (!this.controls) {
      this.controls = new Controls(this)
    }

    this.controls.show(options)
  }

  /** Hide controls */
  hideControls(): void {
    if (this.controls) {
      this.controls.hide()
    }
  }

  /** Open file picker to load theme */
  async openThemePicker(): Promise<void> {
    const theme = await this.themeLoader.openFilePicker()
    if (theme) {
      this.currentTheme = theme
      this.applyTheme(theme)
    }
  }

  // ==================== Lifecycle ====================

  /** Destroy instance and clean up */
  destroy(): void {
    this.darkMode.destroy()
    this.cssGenerator.destroy()
    this.themeLoader.destroy()

    if (this.controls) {
      this.controls.destroy()
      this.controls = null
    }
  }
}
