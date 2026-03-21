/**
 * Progress CSS Generator
 * Generates CSS for progress bar variants with custom properties
 * Supports 3 shadow layers: offset, inset, and insetHighlight
 * Inset shadows are applied via an overlay layer for uniform coverage
 */

import type { ProgressVariant, TypographyGlobalConfig } from '../types'
import {
  toKebabCase,
  buildBorder,
  buildBorderRadius,
  buildFontSize,
  buildOffsetShadow,
  buildInsetShadows,
  getEffectiveFontFamily,
  buildOffsetShadowDark,
  buildInsetShadowsDark
} from './utils'

/**
 * Generate complete CSS for progress component
 */
export function generateProgressCSS(variants: ProgressVariant[], globalConfig?: TypographyGlobalConfig): string {
  const css: string[] = []

  // Base progress styles (shared by all variants)
  css.push(generateProgressBase())

  // Generate CSS for each variant
  variants.forEach(variant => {
    const variantName = toKebabCase(variant.name)
    css.push(generateProgressVariant(variant, variantName, globalConfig))

    // Generate dark mode override if exists
    if (variant.dark) {
      css.push(generateProgressVariantDark(variant, variantName))
    }
  })

  return css.join('\n\n')
}

/**
 * Generate base progress styles
 */
function generateProgressBase(): string {
  return `/* Progress Base Styles */
.cux-progress {
  /* CSS Custom Properties (set by variants) */
  --cux-progress-track-color: #e9ecef;
  --cux-progress-fill-color: #0d6efd;
  --cux-progress-stripe-color: rgba(255, 255, 255, 0.15);
  --cux-progress-height: 16px;
  --cux-progress-radius: 4px;
  --cux-progress-border: none;
  --cux-progress-shadow: none;
  --cux-progress-inset-shadow: none;
  --cux-progress-stripe-speed: 1s;

  /* Label properties */
  --cux-progress-label-color: #212529;
  --cux-progress-label-font-size: 12px;

  /* Base styles */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--cux-progress-track-color);
  height: var(--cux-progress-height);
  border-radius: var(--cux-progress-radius);
  border: var(--cux-progress-border);
  box-shadow: var(--cux-progress-shadow);
  overflow: hidden;
}

/* Inset shadow overlay - covers entire progress for uniform shadow effect */
.cux-progress-inset-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: var(--cux-progress-radius);
  box-shadow: var(--cux-progress-inset-shadow);
  pointer-events: none;
}

/* Progress fill bar */
.cux-progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  background-color: var(--cux-progress-fill-color);
  transition: width 0.3s ease;
}

/* Striped fill variant */
.cux-progress-fill.--striped {
  background-image: linear-gradient(
    45deg,
    var(--cux-progress-stripe-color) 25%,
    transparent 25%,
    transparent 50%,
    var(--cux-progress-stripe-color) 50%,
    var(--cux-progress-stripe-color) 75%,
    transparent 75%,
    transparent
  );
  background-size: calc(var(--cux-progress-height) * 2) calc(var(--cux-progress-height) * 2);
  background-color: var(--cux-progress-fill-color);
}

/* Animated striped fill */
.cux-progress-fill.--animated {
  animation: cux-progress-stripes var(--cux-progress-stripe-speed) linear infinite;
}

@keyframes cux-progress-stripes {
  0% { background-position: 0 0; }
  100% { background-position: calc(var(--cux-progress-height) * 2) 0; }
}

/* Progress label */
.cux-progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  color: var(--cux-progress-label-color);
  font-size: var(--cux-progress-label-font-size);
  pointer-events: none;
}`
}

/**
 * Generate CSS for a specific progress variant
 */
function generateProgressVariant(
  variant: ProgressVariant,
  variantName: string,
  globalConfig?: TypographyGlobalConfig
): string {
  const lines: string[] = []
  lines.push(`/* Variant: ${variant.name} */`)
  lines.push(`.cux-progress.--${variantName} {`)

  const effectiveFontFamily = getEffectiveFontFamily(variant.fontFamily, globalConfig?.fontFamily)

  // Track and fill colors
  lines.push(`  --cux-progress-track-color: ${variant.trackColor};`)
  lines.push(`  --cux-progress-fill-color: ${variant.fillColor};`)
  lines.push(`  --cux-progress-stripe-color: ${variant.stripeColor};`)

  // Height
  if (variant.height) {
    lines.push(`  --cux-progress-height: ${variant.height.value}${variant.height.unit};`)
  }

  // Border radius
  if (variant.borderRadius) {
    lines.push(`  --cux-progress-radius: ${buildBorderRadius(variant.borderRadius)};`)
  }

  // Border
  if (variant.border) {
    lines.push(`  --cux-progress-border: ${buildBorder(variant.border)};`)
  }

  // Stripe speed
  lines.push(`  --cux-progress-stripe-speed: ${variant.speed}s;`)

  // Offset shadow (external) - applied to the track
  if (variant.shadows) {
    const offsetShadowValue = buildOffsetShadow(variant.shadows)
    if (offsetShadowValue !== 'none') {
      lines.push(`  --cux-progress-shadow: ${offsetShadowValue};`)
    }

    // Inset shadows - applied to the overlay layer
    const insetShadowValue = buildInsetShadows(variant.shadows)
    if (insetShadowValue !== 'none') {
      lines.push(`  --cux-progress-inset-shadow: ${insetShadowValue};`)
    }
  }

  lines.push('}')

  // Label styles
  lines.push(``)
  lines.push(`.cux-progress.--${variantName} .cux-progress-label {`)
  lines.push(`  color: ${variant.labelColor};`)
  lines.push(`  font-size: ${buildFontSize(variant.labelFontSize)};`)
  lines.push(`  font-style: ${variant.fontStyle};`)
  lines.push(`  font-weight: ${variant.fontWeight};`)
  if (effectiveFontFamily) {
    lines.push(`  font-family: '${effectiveFontFamily}', sans-serif;`)
  }
  lines.push(`  display: ${variant.showLabel ? 'block' : 'none'};`)
  lines.push(`}`)

  return lines.join('\n')
}

/**
 * Generate dark mode CSS for a progress variant
 */
function generateProgressVariantDark(variant: ProgressVariant, variantName: string): string {
  const dark = variant.dark
  if (!dark) return ''

  const lines: string[] = []
  lines.push(`/* Dark Mode Variant: ${variant.name} */`)
  lines.push(`.dark .cux-progress.--${variantName} {`)

  // Track and fill colors
  if (dark.trackColor) {
    lines.push(`  --cux-progress-track-color: ${dark.trackColor};`)
  }
  if (dark.fillColor) {
    lines.push(`  --cux-progress-fill-color: ${dark.fillColor};`)
  }
  if (dark.stripeColor) {
    lines.push(`  --cux-progress-stripe-color: ${dark.stripeColor};`)
  }

  // Border color override
  if (dark.borderColor && variant.border) {
    lines.push(
      `  --cux-progress-border: ${variant.border.width}${variant.border.unit} ${variant.border.style} ${dark.borderColor};`
    )
  }

  // Shadows for dark mode
  if (variant.shadows) {
    const offsetShadow = buildOffsetShadowDark(variant.shadows, dark.shadowColor)
    if (offsetShadow !== 'none') {
      lines.push(`  --cux-progress-shadow: ${offsetShadow};`)
    }

    const insetShadow = buildInsetShadowsDark(variant.shadows, dark.shadowInsetColor, dark.shadowInsetHighlightColor)
    if (insetShadow !== 'none') {
      lines.push(`  --cux-progress-inset-shadow: ${insetShadow};`)
    }
  }

  lines.push('}')

  // Label color for dark mode
  if (dark.labelColor) {
    lines.push(``)
    lines.push(`.dark .cux-progress.--${variantName} .cux-progress-label {`)
    lines.push(`  color: ${dark.labelColor};`)
    lines.push(`}`)
  }

  return lines.join('\n')
}
