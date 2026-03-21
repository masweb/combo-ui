/**
 * Card CSS Generator
 * Generates CSS for card variants with custom properties
 * Supports 3 shadow layers: offset, inset, and insetHighlight
 * Inset shadows are applied via an overlay layer for uniform coverage
 */

import type { CardVariant, TypographyGlobalConfig } from '../types'
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
 * Generate complete CSS for card component
 */
export function generateCardCSS(variants: CardVariant[], globalConfig?: TypographyGlobalConfig): string {
  const css: string[] = []

  // Base card styles (shared by all variants)
  css.push(generateCardBase())

  // Generate CSS for each variant
  variants.forEach(variant => {
    const variantName = toKebabCase(variant.name)
    css.push(generateCardVariant(variant, variantName, globalConfig))

    // Generate dark mode override if exists
    if (variant.dark) {
      css.push(generateCardVariantDark(variant, variantName))
    }
  })

  return css.join('\n\n')
}

/**
 * Generate base card styles
 */
function generateCardBase(): string {
  return `/* Card Base Styles */
.cux-card {
  /* CSS Custom Properties (set by variants) */
  --cux-card-bg: #ffffff;
  --cux-card-color: inherit;
  --cux-card-border: none;
  --cux-card-radius: 0;
  --cux-card-padding: 0;
  --cux-card-shadow: none;

  /* Inset shadow overlay properties */
  --cux-card-inset-shadow: none;

  /* Header properties */
  --cux-card-header-bg: transparent;
  --cux-card-header-color: inherit;
  --cux-card-header-padding: 0;
  --cux-card-header-border-bottom: none;

  /* Base styles */
  position: relative;
  background: var(--cux-card-bg);
  color: var(--cux-card-color);
  border: var(--cux-card-border);
  border-radius: var(--cux-card-radius);
  box-shadow: var(--cux-card-shadow);
  overflow: hidden;
}

/* Inset shadow overlay - covers entire card for uniform shadow effect */
.cux-card-inset-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--cux-card-radius);
  box-shadow: var(--cux-card-inset-shadow);
  pointer-events: none;
}

.cux-card-header {
  position: relative;
  z-index: 1;
  background: var(--cux-card-header-bg);
  color: var(--cux-card-header-color);
  padding: var(--cux-card-header-padding);
  border-bottom: var(--cux-card-header-border-bottom);
}

.cux-card-body {
  position: relative;
  z-index: 1;
  padding: var(--cux-card-padding);
}

.cux-card-footer {
  position: relative;
  z-index: 1;
  padding: var(--cux-card-padding);
  border-top: var(--cux-card-header-border-bottom);
}`
}

/**
 * Generate CSS for a specific card variant
 */
function generateCardVariant(variant: CardVariant, variantName: string, globalConfig?: TypographyGlobalConfig): string {
  const lines: string[] = []
  lines.push(`/* Variant: ${variant.name} */`)
  lines.push(`.cux-card.--${variantName} {`)

  // Get effective font family (fallback to global)
  const effectiveFontFamily = getEffectiveFontFamily(variant.fontFamily, globalConfig?.fontFamily)
  const effectiveHeaderFontFamily = getEffectiveFontFamily(variant.headerFontFamily, globalConfig?.fontFamily)

  // Basic properties
  lines.push(`  --cux-card-bg: ${variant.background};`)
  lines.push(`  --cux-card-color: ${variant.color};`)

  if (variant.border) {
    lines.push(`  --cux-card-border: ${buildBorder(variant.border)};`)
  }

  if (variant.borderRadius) {
    lines.push(`  --cux-card-radius: ${buildBorderRadius(variant.borderRadius)};`)
  }

  if (variant.padding) {
    lines.push(`  --cux-card-padding: ${buildPadding(variant.padding)};`)
  }

  // Offset shadow (external) - applied to the card itself
  if (variant.shadows) {
    const offsetShadowValue = buildOffsetShadow(variant.shadows)
    if (offsetShadowValue !== 'none') {
      lines.push(`  --cux-card-shadow: ${offsetShadowValue};`)
    }

    // Inset shadows - applied to the overlay layer
    const insetShadowValue = buildInsetShadows(variant.shadows)
    if (insetShadowValue !== 'none') {
      lines.push(`  --cux-card-inset-shadow: ${insetShadowValue};`)
    }
  }

  // Header properties
  lines.push(`  --cux-card-header-bg: ${variant.headerBackground};`)
  lines.push(`  --cux-card-header-color: ${variant.headerColor};`)

  if (variant.headerPadding) {
    lines.push(`  --cux-card-header-padding: ${buildPadding(variant.headerPadding)};`)
  }

  if (variant.headerBorderBottom) {
    lines.push(`  --cux-card-header-border-bottom: ${buildBorder(variant.headerBorderBottom)};`)
  }

  lines.push('}')

  // Card body typography
  const bodyStyles = []
  if (effectiveFontFamily) {
    bodyStyles.push(`  font-family: '${effectiveFontFamily}', sans-serif;`)
  }
  if (variant.fontSize) {
    bodyStyles.push(`  font-size: ${buildFontSize(variant.fontSize)};`)
  }
  if (variant.fontWeight) {
    bodyStyles.push(`  font-weight: ${variant.fontWeight};`)
  }
  if (variant.fontStyle) {
    bodyStyles.push(`  font-style: ${variant.fontStyle};`)
  }
  if (variant.letterSpacing) {
    bodyStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.letterSpacing)};`)
  }
  if (variant.textAlign) {
    bodyStyles.push(`  text-align: ${variant.textAlign};`)
  }

  if (bodyStyles.length > 0) {
    lines.push('')
    lines.push(`.cux-card.--${variantName} .cux-card-body {`)
    lines.push(bodyStyles.join('\n'))
    lines.push('}')
  }

  // Card header typography
  const headerStyles = []
  if (effectiveHeaderFontFamily) {
    headerStyles.push(`  font-family: '${effectiveHeaderFontFamily}', sans-serif;`)
  }
  if (variant.headerFontSize) {
    headerStyles.push(`  font-size: ${buildFontSize(variant.headerFontSize)};`)
  }
  if (variant.headerFontWeight) {
    headerStyles.push(`  font-weight: ${variant.headerFontWeight};`)
  }
  if (variant.headerFontStyle) {
    headerStyles.push(`  font-style: ${variant.headerFontStyle};`)
  }
  if (variant.headerLetterSpacing) {
    headerStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.headerLetterSpacing)};`)
  }
  if (variant.headerTextAlign) {
    headerStyles.push(`  text-align: ${variant.headerTextAlign};`)
  }

  if (headerStyles.length > 0) {
    lines.push('')
    lines.push(`.cux-card.--${variantName} .cux-card-header {`)
    lines.push(headerStyles.join('\n'))
    lines.push('}')
  }

  return lines.join('\n')
}

/**
 * Generate dark mode CSS for a card variant
 */
function generateCardVariantDark(variant: CardVariant, variantName: string): string {
  const dark = variant.dark
  if (!dark) return ''

  const lines: string[] = []
  lines.push(`/* Dark Mode Variant: ${variant.name} */`)
  lines.push(`.dark .cux-card.--${variantName} {`)

  // Basic properties
  if (dark.background) {
    lines.push(`  --cux-card-bg: ${dark.background};`)
  }
  if (dark.color) {
    lines.push(`  --cux-card-color: ${dark.color};`)
  }

  // Override border color for dark mode
  if (dark.borderColor && variant.border) {
    lines.push(
      `  --cux-card-border: ${variant.border.width}${variant.border.unit} ${variant.border.style} ${dark.borderColor};`
    )
  }

  // Header properties
  if (dark.headerBackground) {
    lines.push(`  --cux-card-header-bg: ${dark.headerBackground};`)
  }
  if (dark.headerColor) {
    lines.push(`  --cux-card-header-color: ${dark.headerColor};`)
  }

  // Override header border bottom color for dark mode
  if (dark.headerBorderBottomColor && variant.headerBorderBottom) {
    lines.push(
      `  --cux-card-header-border-bottom: ${variant.headerBorderBottom.width}${variant.headerBorderBottom.unit} ${variant.headerBorderBottom.style} ${dark.headerBorderBottomColor};`
    )
  }

  // Shadows for dark mode
  if (variant.shadows) {
    // Offset shadow with dark color
    const offsetShadow = buildOffsetShadowDark(variant.shadows, dark.shadowColor)
    if (offsetShadow !== 'none') {
      lines.push(`  --cux-card-shadow: ${offsetShadow};`)
    }

    // Inset shadows with dark colors
    const insetShadow = buildInsetShadowsDark(variant.shadows, dark.shadowInsetColor, dark.shadowInsetHighlightColor)
    if (insetShadow !== 'none') {
      lines.push(`  --cux-card-inset-shadow: ${insetShadow};`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}
