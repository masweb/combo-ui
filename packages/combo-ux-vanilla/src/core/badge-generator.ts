/**
 * Badge CSS Generator
 * Generates CSS for badge variants with custom properties
 * Supports 3 shadow layers: offset, inset, and insetHighlight (no overlay)
 */

import type { BadgeVariant, TypographyGlobalConfig } from '../types'
import {
  toKebabCase,
  buildBorder,
  buildBorderRadius,
  buildPadding,
  buildShadows,
  buildFontSize,
  buildLetterSpacing,
  buildShadowsDark,
  getEffectiveFontFamily
} from './utils'

/**
 * Generate complete CSS for badge component
 */
export function generateBadgeCSS(variants: BadgeVariant[], globalConfig?: TypographyGlobalConfig): string {
  const css: string[] = []

  // Base badge styles (shared by all variants)
  css.push(generateBadgeBase())

  // Generate CSS for each variant
  variants.forEach(variant => {
    const variantName = toKebabCase(variant.name)
    css.push(generateBadgeVariant(variant, variantName, globalConfig))

    // Generate dark mode override if exists
    if (variant.dark) {
      css.push(generateBadgeVariantDark(variant, variantName))
    }
  })

  return css.join('\n\n')
}

/**
 * Generate base badge styles
 */
function generateBadgeBase(): string {
  return `/* Badge Base Styles */
.cux-badge {
  /* CSS Custom Properties (set by variants) */
  --cux-badge-bg: #6c757d;
  --cux-badge-color: #ffffff;
  --cux-badge-border: none;
  --cux-badge-radius: 4px;
  --cux-badge-padding: 4px 8px;
  --cux-badge-shadow: none;

  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--cux-badge-bg);
  color: var(--cux-badge-color);
  border: var(--cux-badge-border);
  border-radius: var(--cux-badge-radius);
  padding: var(--cux-badge-padding);
  box-shadow: var(--cux-badge-shadow);
  white-space: nowrap;
  vertical-align: middle;
}`
}

/**
 * Generate CSS for a specific badge variant
 */
function generateBadgeVariant(
  variant: BadgeVariant,
  variantName: string,
  globalConfig?: TypographyGlobalConfig
): string {
  const lines: string[] = []
  lines.push(`/* Variant: ${variant.name} */`)
  lines.push(`.cux-badge.--${variantName} {`)

  const effectiveFontFamily = getEffectiveFontFamily(variant.fontFamily, globalConfig?.fontFamily)

  // Basic properties
  lines.push(`  --cux-badge-bg: ${variant.background};`)
  lines.push(`  --cux-badge-color: ${variant.color};`)

  if (variant.border) {
    lines.push(`  --cux-badge-border: ${buildBorder(variant.border)};`)
  }

  if (variant.borderRadius) {
    lines.push(`  --cux-badge-radius: ${buildBorderRadius(variant.borderRadius)};`)
  }

  if (variant.padding) {
    lines.push(`  --cux-badge-padding: ${buildPadding(variant.padding)};`)
  }

  // Shadow
  if (variant.shadows) {
    const shadowValue = buildShadows(variant.shadows)
    if (shadowValue) {
      lines.push(`  --cux-badge-shadow: ${shadowValue};`)
    }
  }

  lines.push('}')

  // Typography styles
  const typographyStyles: string[] = []
  if (effectiveFontFamily) {
    typographyStyles.push(`  font-family: '${effectiveFontFamily}', sans-serif;`)
  }
  typographyStyles.push(`  font-size: ${buildFontSize(variant.fontSize)};`)
  typographyStyles.push(`  font-weight: ${variant.fontWeight};`)
  typographyStyles.push(`  font-style: ${variant.fontStyle};`)
  typographyStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.letterSpacing)};`)

  lines.push('')
  lines.push(`.cux-badge.--${variantName} {`)
  lines.push(typographyStyles.join('\n'))
  lines.push('}')

  return lines.join('\n')
}

/**
 * Generate dark mode CSS for a badge variant
 */
function generateBadgeVariantDark(variant: BadgeVariant, variantName: string): string {
  const dark = variant.dark
  if (!dark) return ''

  const lines: string[] = []
  lines.push(`/* Dark Mode Variant: ${variant.name} */`)
  lines.push(`.dark .cux-badge.--${variantName} {`)

  // Basic properties
  if (dark.background) {
    lines.push(`  --cux-badge-bg: ${dark.background};`)
  }
  if (dark.color) {
    lines.push(`  --cux-badge-color: ${dark.color};`)
  }

  // Override border color for dark mode
  if (dark.borderColor && variant.border) {
    lines.push(
      `  --cux-badge-border: ${variant.border.width}${variant.border.unit} ${variant.border.style} ${dark.borderColor};`
    )
  }

  // Shadow for dark mode
  if (variant.shadows) {
    const shadowValue = buildShadowsDark(variant.shadows, dark)
    if (shadowValue) {
      lines.push(`  --cux-badge-shadow: ${shadowValue};`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}
