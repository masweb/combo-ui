/**
 * Alert CSS Generator
 * Generates CSS for alert variants with custom properties
 * Supports 3 shadow layers: offset, inset, and insetHighlight
 * Inset shadows are applied via an overlay layer for uniform coverage
 */

import type { AlertVariant, TypographyGlobalConfig } from '../types'
import {
  toKebabCase,
  buildBorder,
  buildBorderRadius,
  buildPadding,
  buildFontSize,
  buildLetterSpacing,
  buildOffsetShadow,
  buildInsetShadows,
  getEffectiveFontFamily,
  buildOffsetShadowDark,
  buildInsetShadowsDark
} from './utils'

/**
 * Generate complete CSS for alert component
 */
export function generateAlertCSS(variants: AlertVariant[], globalConfig?: TypographyGlobalConfig): string {
  const css: string[] = []

  // Base alert styles (shared by all variants)
  css.push(generateAlertBase())

  // Generate CSS for each variant
  variants.forEach(variant => {
    const variantName = toKebabCase(variant.name)
    css.push(generateAlertVariant(variant, variantName, globalConfig))

    // Generate dark mode override if exists
    if (variant.dark) {
      css.push(generateAlertVariantDark(variant, variantName))
    }
  })

  return css.join('\n\n')
}

/**
 * Generate base alert styles
 */
function generateAlertBase(): string {
  return `/* Alert Base Styles */
.cux-alert {
  /* CSS Custom Properties (set by variants) */
  --cux-alert-bg: transparent;
  --cux-alert-color: inherit;
  --cux-alert-border: none;
  --cux-alert-radius: 0;
  --cux-alert-padding: 0;
  --cux-alert-shadow: none;

  /* Inset shadow overlay properties */
  --cux-alert-inset-shadow: none;

  /* Header properties */
  --cux-alert-header-bg: transparent;
  --cux-alert-header-color: inherit;
  --cux-alert-header-padding: 0;
  --cux-alert-header-border-bottom: none;

  /* Close button properties */
  --cux-alert-close-size: 20px;
  --cux-alert-close-color: #6c757d;
  --cux-alert-close-hover-color: #495057;
  --cux-alert-close-active-color: #212529;

  /* Layout */
  --cux-alert-max-width: 500px;
  --cux-alert-offset: 16px;

  /* Base styles */
  position: relative;
  background: var(--cux-alert-bg);
  color: var(--cux-alert-color);
  border: var(--cux-alert-border);
  border-radius: var(--cux-alert-radius);
  box-shadow: var(--cux-alert-shadow);
  max-width: var(--cux-alert-max-width);
  overflow: hidden;
}

/* Inset shadow overlay - covers entire alert for uniform shadow effect */
.cux-alert-inset-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--cux-alert-radius);
  box-shadow: var(--cux-alert-inset-shadow);
  pointer-events: none;
}

.cux-alert-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: var(--cux-alert-header-bg);
  color: var(--cux-alert-header-color);
  padding: var(--cux-alert-header-padding);
  border-bottom: var(--cux-alert-header-border-bottom);
}

.cux-alert-body {
  position: relative;
  z-index: 1;
  padding: var(--cux-alert-padding);
}

.cux-alert-close {
  flex-shrink: 0;
  width: var(--cux-alert-close-size);
  height: var(--cux-alert-close-size);
  background: transparent;
  border: none;
  color: var(--cux-alert-close-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.cux-alert-close:hover {
  color: var(--cux-alert-close-hover-color);
}

.cux-alert-close:active {
  color: var(--cux-alert-close-active-color);
}

.cux-alert-close svg {
  width: 100%;
  height: 100%;
}

/* Position modifiers */
.cux-alert.--top-left { position: fixed; top: var(--cux-alert-offset); left: var(--cux-alert-offset); z-index: 9999; }
.cux-alert.--top-center { position: fixed; top: var(--cux-alert-offset); left: 50%; transform: translateX(-50%); z-index: 9999; }
.cux-alert.--top-right { position: fixed; top: var(--cux-alert-offset); right: var(--cux-alert-offset); z-index: 9999; }
.cux-alert.--center-left { position: fixed; top: 50%; left: var(--cux-alert-offset); transform: translateY(-50%); z-index: 9999; }
.cux-alert.--center-center { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; }
.cux-alert.--center-right { position: fixed; top: 50%; right: var(--cux-alert-offset); transform: translateY(-50%); z-index: 9999; }
.cux-alert.--bottom-left { position: fixed; bottom: var(--cux-alert-offset); left: var(--cux-alert-offset); z-index: 9999; }
.cux-alert.--bottom-center { position: fixed; bottom: var(--cux-alert-offset); left: 50%; transform: translateX(-50%); z-index: 9999; }
.cux-alert.--bottom-right { position: fixed; bottom: var(--cux-alert-offset); right: var(--cux-alert-offset); z-index: 9999; }`
}

/**
 * Generate CSS for a specific alert variant
 */
function generateAlertVariant(
  variant: AlertVariant,
  variantName: string,
  globalConfig?: TypographyGlobalConfig
): string {
  const lines: string[] = []
  lines.push(`/* Variant: ${variant.name} */`)
  lines.push(`.cux-alert.--${variantName} {`)

  // Get effective font family (fallback to global)
  const effectiveFontFamily = getEffectiveFontFamily(variant.fontFamily, globalConfig?.fontFamily)
  const effectiveHeaderFontFamily = getEffectiveFontFamily(variant.headerFontFamily, globalConfig?.fontFamily)

  // Basic properties
  lines.push(`  --cux-alert-bg: ${variant.background};`)
  lines.push(`  --cux-alert-color: ${variant.color};`)

  if (variant.border) {
    lines.push(`  --cux-alert-border: ${buildBorder(variant.border)};`)
  }

  if (variant.borderRadius) {
    lines.push(`  --cux-alert-radius: ${buildBorderRadius(variant.borderRadius)};`)
  }

  if (variant.padding) {
    lines.push(`  --cux-alert-padding: ${buildPadding(variant.padding)};`)
  }

  // Offset shadow (external) - applied to the alert itself
  if (variant.shadows) {
    const offsetShadowValue = buildOffsetShadow(variant.shadows)
    if (offsetShadowValue !== 'none') {
      lines.push(`  --cux-alert-shadow: ${offsetShadowValue};`)
    }

    // Inset shadows - applied to the overlay layer
    const insetShadowValue = buildInsetShadows(variant.shadows)
    if (insetShadowValue !== 'none') {
      lines.push(`  --cux-alert-inset-shadow: ${insetShadowValue};`)
    }
  }

  // Header properties
  lines.push(`  --cux-alert-header-bg: ${variant.headerBackground};`)
  lines.push(`  --cux-alert-header-color: ${variant.headerColor};`)

  if (variant.headerPadding) {
    lines.push(`  --cux-alert-header-padding: ${buildPadding(variant.headerPadding)};`)
  }

  if (variant.headerBorderBottom) {
    lines.push(`  --cux-alert-header-border-bottom: ${buildBorder(variant.headerBorderBottom)};`)
  }

  // Close button properties
  if (variant.closeSize) {
    lines.push(`  --cux-alert-close-size: ${variant.closeSize.value}${variant.closeSize.unit};`)
  }
  lines.push(`  --cux-alert-close-color: ${variant.closeColor};`)
  lines.push(`  --cux-alert-close-hover-color: ${variant.closeHoverColor};`)
  lines.push(`  --cux-alert-close-active-color: ${variant.closeActiveColor};`)

  // Layout
  lines.push(`  --cux-alert-max-width: ${variant.maxWidth.value}${variant.maxWidth.unit};`)
  lines.push(`  --cux-alert-offset: ${variant.offset.value}${variant.offset.unit};`)

  lines.push('}')

  // Alert body typography
  const bodyStyles: string[] = []
  if (effectiveFontFamily) {
    bodyStyles.push(`  font-family: '${effectiveFontFamily}', sans-serif;`)
  }
  bodyStyles.push(`  font-size: ${buildFontSize(variant.fontSize)};`)
  bodyStyles.push(`  font-weight: ${variant.fontWeight};`)
  bodyStyles.push(`  font-style: ${variant.fontStyle};`)
  if (variant.letterSpacing) {
    bodyStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.letterSpacing)};`)
  }
  bodyStyles.push(`  text-align: ${variant.textAlign};`)

  lines.push('')
  lines.push(`.cux-alert.--${variantName} .cux-alert-body {`)
  lines.push(bodyStyles.join('\n'))
  lines.push('}')

  // Alert header typography
  const headerStyles: string[] = []
  if (effectiveHeaderFontFamily) {
    headerStyles.push(`  font-family: '${effectiveHeaderFontFamily}', sans-serif;`)
  }
  headerStyles.push(`  font-size: ${buildFontSize(variant.headerFontSize)};`)
  headerStyles.push(`  font-weight: ${variant.headerFontWeight};`)
  headerStyles.push(`  font-style: ${variant.headerFontStyle};`)
  headerStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.headerLetterSpacing)};`)
  headerStyles.push(`  text-align: ${variant.headerTextAlign};`)

  lines.push('')
  lines.push(`.cux-alert.--${variantName} .cux-alert-header {`)
  lines.push(headerStyles.join('\n'))
  lines.push('}')

  return lines.join('\n')
}

/**
 * Generate dark mode CSS for an alert variant
 */
function generateAlertVariantDark(variant: AlertVariant, variantName: string): string {
  const dark = variant.dark
  if (!dark) return ''

  const lines: string[] = []
  lines.push(`/* Dark Mode Variant: ${variant.name} */`)
  lines.push(`.dark .cux-alert.--${variantName} {`)

  // Basic properties
  if (dark.background) {
    lines.push(`  --cux-alert-bg: ${dark.background};`)
  }
  if (dark.color) {
    lines.push(`  --cux-alert-color: ${dark.color};`)
  }

  // Override border color for dark mode
  if (dark.borderColor && variant.border) {
    lines.push(
      `  --cux-alert-border: ${variant.border.width}${variant.border.unit} ${variant.border.style} ${dark.borderColor};`
    )
  }

  // Header properties
  if (dark.headerBackground) {
    lines.push(`  --cux-alert-header-bg: ${dark.headerBackground};`)
  }
  if (dark.headerColor) {
    lines.push(`  --cux-alert-header-color: ${dark.headerColor};`)
  }

  // Override header border bottom color for dark mode
  if (dark.headerBorderBottomColor && variant.headerBorderBottom) {
    lines.push(
      `  --cux-alert-header-border-bottom: ${variant.headerBorderBottom.width}${variant.headerBorderBottom.unit} ${variant.headerBorderBottom.style} ${dark.headerBorderBottomColor};`
    )
  }

  // Close button colors for dark mode
  if (dark.closeColor) {
    lines.push(`  --cux-alert-close-color: ${dark.closeColor};`)
  }
  if (dark.closeHoverColor) {
    lines.push(`  --cux-alert-close-hover-color: ${dark.closeHoverColor};`)
  }
  if (dark.closeActiveColor) {
    lines.push(`  --cux-alert-close-active-color: ${dark.closeActiveColor};`)
  }

  // Shadows for dark mode
  if (variant.shadows) {
    // Offset shadow with dark color
    const offsetShadow = buildOffsetShadowDark(variant.shadows, dark.shadowColor)
    if (offsetShadow !== 'none') {
      lines.push(`  --cux-alert-shadow: ${offsetShadow};`)
    }

    // Inset shadows with dark colors
    const insetShadow = buildInsetShadowsDark(variant.shadows, dark.shadowInsetColor, dark.shadowInsetHighlightColor)
    if (insetShadow !== 'none') {
      lines.push(`  --cux-alert-inset-shadow: ${insetShadow};`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}
