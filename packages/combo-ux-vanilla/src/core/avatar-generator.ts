/**
 * Avatar CSS Generator
 * Generates CSS for avatar variants with custom properties
 */

import type { AvatarVariant, TypographyGlobalConfig } from '../types'
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
 * Generate complete CSS for avatar component
 */
export function generateAvatarCSS(variants: AvatarVariant[], globalConfig?: TypographyGlobalConfig): string {
  const css: string[] = []

  // Base avatar styles (shared by all variants)
  css.push(generateAvatarBase())

  // Generate CSS for each variant
  variants.forEach(variant => {
    const variantName = toKebabCase(variant.name)
    css.push(generateAvatarVariant(variant, variantName, globalConfig))

    // Generate dark mode override if exists
    if (variant.dark) {
      css.push(generateAvatarVariantDark(variant, variantName))
    }
  })

  return css.join('\n\n')
}

/**
 * Generate base avatar styles
 */
function generateAvatarBase(): string {
  return `/* Avatar Base Styles */
.cux-avatar {
  /* CSS Custom Properties (set by variants) */
  --cux-avatar-bg: transparent;
  --cux-avatar-color: inherit;
  --cux-avatar-border: none;
  --cux-avatar-radius: 50%;
  --cux-avatar-padding: 0;
  --cux-avatar-shadow: none;

  /* Base styles */
  background: var(--cux-avatar-bg);
  color: var(--cux-avatar-color);
  border: var(--cux-avatar-border);
  border-radius: var(--cux-avatar-radius);
  padding: var(--cux-avatar-padding);
  box-shadow: var(--cux-avatar-shadow);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
}

/* Image inside avatar */
.cux-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Initials text */
.cux-avatar-initials {
  text-transform: uppercase;
  user-select: none;
}

/* Size modifiers */
.cux-avatar.--xs { width: 24px; height: 24px; }
.cux-avatar.--sm { width: 32px; height: 32px; }
.cux-avatar.--md { width: 40px; height: 40px; }
.cux-avatar.--lg { width: 48px; height: 48px; }
.cux-avatar.--xl { width: 64px; height: 64px; }
.cux-avatar.--xxl { width: 96px; height: 96px; }

/* Status indicator */
.cux-avatar-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  border: 2px solid white;
  background: #6c757d;
}

.cux-avatar-status.--online { background: #28a745; }
.cux-avatar-status.--offline { background: #6c757d; }
.cux-avatar-status.--busy { background: #dc3545; }
.cux-avatar-status.--away { background: #ffc107; }`
}

/**
 * Generate CSS for a specific avatar variant
 */
function generateAvatarVariant(
  variant: AvatarVariant,
  variantName: string,
  globalConfig?: TypographyGlobalConfig
): string {
  const lines: string[] = []
  lines.push(`/* Variant: ${variant.name} */`)
  lines.push(`.cux-avatar.--${variantName} {`)

  // Get effective font family (fallback to global)
  const effectiveFontFamily = getEffectiveFontFamily(variant.fontFamily, globalConfig?.fontFamily)

  // Basic properties
  lines.push(`  --cux-avatar-bg: ${variant.background};`)
  lines.push(`  --cux-avatar-color: ${variant.color};`)

  if (variant.border) {
    lines.push(`  --cux-avatar-border: ${buildBorder(variant.border)};`)
  }

  if (variant.borderRadius) {
    lines.push(`  --cux-avatar-radius: ${buildBorderRadius(variant.borderRadius)};`)
  }

  if (variant.padding) {
    lines.push(`  --cux-avatar-padding: ${buildPadding(variant.padding)};`)
  }

  // Shadow
  if (variant.shadows) {
    const shadowValue = buildShadows(variant.shadows)
    if (shadowValue) {
      lines.push(`  --cux-avatar-shadow: ${shadowValue};`)
    }
  }

  lines.push('}')

  // Typography for initials
  const typographyStyles: string[] = []
  if (effectiveFontFamily) {
    typographyStyles.push(`  font-family: '${effectiveFontFamily}', sans-serif;`)
  }
  typographyStyles.push(`  font-size: ${buildFontSize(variant.fontSize)};`)
  typographyStyles.push(`  font-weight: ${variant.fontWeight};`)
  typographyStyles.push(`  font-style: ${variant.fontStyle};`)
  typographyStyles.push(`  letter-spacing: ${buildLetterSpacing(variant.letterSpacing)};`)

  lines.push('')
  lines.push(`.cux-avatar.--${variantName} .cux-avatar-initials {`)
  lines.push(typographyStyles.join('\n'))
  lines.push('}')

  return lines.join('\n')
}

/**
 * Generate dark mode CSS for an avatar variant
 */
function generateAvatarVariantDark(variant: AvatarVariant, variantName: string): string {
  const dark = variant.dark
  if (!dark) return ''

  const lines: string[] = []
  lines.push(`/* Dark Mode Variant: ${variant.name} */`)
  lines.push(`.dark .cux-avatar.--${variantName} {`)

  // Basic properties
  if (dark.background) {
    lines.push(`  --cux-avatar-bg: ${dark.background};`)
  }
  if (dark.color) {
    lines.push(`  --cux-avatar-color: ${dark.color};`)
  }

  // Override border color for dark mode
  if (dark.borderColor && variant.border) {
    lines.push(
      `  --cux-avatar-border: ${variant.border.width}${variant.border.unit} ${variant.border.style} ${dark.borderColor};`
    )
  }

  // Shadow for dark mode
  if (variant.shadows) {
    const shadowValue = buildShadowsDark(variant.shadows, dark)
    if (shadowValue) {
      lines.push(`  --cux-avatar-shadow: ${shadowValue};`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}
