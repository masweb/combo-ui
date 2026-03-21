/**
 * Chip CSS Generator
 * Generates CSS for chip variants with custom properties
 * Supports 3 shadow layers: offset, inset, and insetHighlight (no overlay)
 */

import type { ChipVariant, TypographyGlobalConfig, ComponentShadows } from '../types'
import {
  toKebabCase,
  buildBorder,
  buildBorderRadius,
  buildPadding,
  buildShadows,
  buildFontSize,
  buildLetterSpacing
} from './utils'

/**
 * Generate complete CSS for chip component
 */
export function generateChipCSS(variants: ChipVariant[], globalConfig?: TypographyGlobalConfig): string {
  const css: string[] = []

  // Base chip styles (shared by all variants)
  css.push(generateChipBase())

  // Generate CSS for each variant
  variants.forEach(variant => {
    const variantName = toKebabCase(variant.name)
    css.push(generateChipVariant(variant, variantName, globalConfig))

    // Generate dark mode override if exists
    if (variant.dark) {
      css.push(generateChipVariantDark(variant, variantName))
    }
  })

  return css.join('\n\n')
}

/**
 * Generate base chip styles
 */
function generateChipBase(): string {
  return `/* Chip Base Styles */
.cux-chip {
  /* CSS Custom Properties (set by variants) */
  --cux-chip-bg: #e9ecef;
  --cux-chip-color: #212529;
  --cux-chip-border: none;
  --cux-chip-radius: 16px;
  --cux-chip-padding: 4px 12px;
  --cux-chip-shadow: none;

  /* Close button properties */
  --cux-chip-close-size: 16px;
  --cux-chip-close-color: #495057;
  --cux-chip-close-hover-color: #212529;
  --cux-chip-close-active-color: #000000;

  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--cux-chip-bg);
  color: var(--cux-chip-color);
  border: var(--cux-chip-border);
  border-radius: var(--cux-chip-radius);
  padding: var(--cux-chip-padding);
  box-shadow: var(--cux-chip-shadow);
  white-space: nowrap;
  vertical-align: middle;
}

.cux-chip-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--cux-chip-close-size);
  height: var(--cux-chip-close-size);
  background: transparent;
  border: none;
  color: var(--cux-chip-close-color);
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s ease;
  padding: 0;
  flex-shrink: 0;
}

.cux-chip-close:hover {
  color: var(--cux-chip-close-hover-color);
}

.cux-chip-close:active {
  color: var(--cux-chip-close-active-color);
}

.cux-chip-close svg {
  width: 100%;
  height: 100%;
}`
}

/**
 * Build shadows with dark mode color overrides
 */
function buildShadowsDark(shadows: ComponentShadows, dark?: ChipVariant['dark']): string {
  const shadowParts: string[] = []

  // Offset shadow with dark color
  if (shadows.offset?.enabled) {
    const { offsetX, offsetY, blur, spread, color } = shadows.offset
    const darkColor = dark?.shadowColor || color
    shadowParts.push(`${offsetX}px ${offsetY}px ${blur}px ${spread}px ${darkColor}`)
  }

  // Inset shadow with dark color
  if (shadows.inset?.enabled) {
    const { offsetX, offsetY, blur, spread, color } = shadows.inset
    const darkColor = dark?.shadowInsetColor || color
    shadowParts.push(`inset ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${darkColor}`)
  }

  // Inset highlight shadow with dark color
  if (shadows.insetHighlight?.enabled) {
    const { offsetX, offsetY, blur, spread, color } = shadows.insetHighlight
    const darkColor = dark?.shadowInsetHighlightColor || color
    shadowParts.push(`inset ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${darkColor}`)
  }

  return shadowParts.join(', ')
}

/**
 * Get effective font family for chip (fallback to global)
 */
function getEffectiveFontFamily(variant: ChipVariant, globalConfig?: TypographyGlobalConfig): string | null {
  if (variant.fontFamily !== null && variant.fontFamily !== undefined) {
    return variant.fontFamily
  }
  return globalConfig?.fontFamily || null
}

/**
 * Generate CSS for a specific chip variant
 */
function generateChipVariant(variant: ChipVariant, variantName: string, globalConfig?: TypographyGlobalConfig): string {
  const lines: string[] = []
  lines.push(`/* Variant: ${variant.name} */`)
  lines.push(`.cux-chip.--${variantName} {`)

  const effectiveFontFamily = getEffectiveFontFamily(variant, globalConfig)

  // Basic properties
  lines.push(`  --cux-chip-bg: ${variant.background};`)
  lines.push(`  --cux-chip-color: ${variant.color};`)

  if (variant.border) {
    lines.push(`  --cux-chip-border: ${buildBorder(variant.border)};`)
  }

  if (variant.borderRadius) {
    lines.push(`  --cux-chip-radius: ${buildBorderRadius(variant.borderRadius)};`)
  }

  if (variant.padding) {
    lines.push(`  --cux-chip-padding: ${buildPadding(variant.padding)};`)
  }

  // Shadow
  if (variant.shadows) {
    const shadowValue = buildShadows(variant.shadows)
    if (shadowValue) {
      lines.push(`  --cux-chip-shadow: ${shadowValue};`)
    }
  }

  // Close button properties
  if (variant.closeSize) {
    lines.push(`  --cux-chip-close-size: ${variant.closeSize.value}${variant.closeSize.unit};`)
  }
  lines.push(`  --cux-chip-close-color: ${variant.closeColor};`)
  lines.push(`  --cux-chip-close-hover-color: ${variant.closeHoverColor};`)
  lines.push(`  --cux-chip-close-active-color: ${variant.closeActiveColor};`)

  lines.push('}')

  // Typography styles
  const typographyStyles: string[] = []
  if (effectiveFontFamily) {
    typographyStyles.push(`  font-family: '${effectiveFontFamily}', sans-serif;`)
  }
  typographyStyles.push(`  font-size: ${buildFontSize(variant.fontSize)};`)
  typographyStyles.push(`  font-weight: ${variant.fontWeight};`)
  typographyStyles.push(`  font-style: ${variant.fontStyle};`)
  if (variant.letterSpacing) {
    typographyStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.letterSpacing)};`)
  }

  lines.push('')
  lines.push(`.cux-chip.--${variantName} {`)
  lines.push(typographyStyles.join('\n'))
  lines.push('}')

  return lines.join('\n')
}

/**
 * Generate dark mode CSS for a chip variant
 */
function generateChipVariantDark(variant: ChipVariant, variantName: string): string {
  const dark = variant.dark
  if (!dark) return ''

  const lines: string[] = []
  lines.push(`/* Dark Mode Variant: ${variant.name} */`)
  lines.push(`.dark .cux-chip.--${variantName} {`)

  // Basic properties
  if (dark.background) {
    lines.push(`  --cux-chip-bg: ${dark.background};`)
  }
  if (dark.color) {
    lines.push(`  --cux-chip-color: ${dark.color};`)
  }

  // Override border color for dark mode
  if (dark.borderColor && variant.border) {
    lines.push(
      `  --cux-chip-border: ${variant.border.width}${variant.border.unit} ${variant.border.style} ${dark.borderColor};`
    )
  }

  // Close button colors for dark mode
  if (dark.closeColor) {
    lines.push(`  --cux-chip-close-color: ${dark.closeColor};`)
  }
  if (dark.closeHoverColor) {
    lines.push(`  --cux-chip-close-hover-color: ${dark.closeHoverColor};`)
  }
  if (dark.closeActiveColor) {
    lines.push(`  --cux-chip-close-active-color: ${dark.closeActiveColor};`)
  }

  // Shadow for dark mode
  if (variant.shadows) {
    const shadowValue = buildShadowsDark(variant.shadows, dark)
    if (shadowValue) {
      lines.push(`  --cux-chip-shadow: ${shadowValue};`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}
