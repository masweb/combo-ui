import type { BorderValue, BorderRadiusValue, PaddingValue, UnitNumber, LetterSpacingValue } from '@/types/generics'

/**
 * Common default value creators for component variants
 * Eliminates code duplication across stores
 */

/**
 * Common letter spacing (always 0px)
 */
export const DEFAULT_LETTER_SPACING: LetterSpacingValue = { value: 0, unit: 'px' }

/**
 * Create a border value
 */
export function createBorder(style: BorderValue['style'], width: number, color: string): BorderValue {
  return { style, width, unit: 'px', color }
}

/**
 * Create a border radius value (all corners same when linked)
 */
export function createBorderRadius(linked: true, unit: '%' | 'px', value: number): BorderRadiusValue
export function createBorderRadius(
  linked: false,
  unit: '%' | 'px',
  tl: number,
  tr: number,
  br: number,
  bl: number
): BorderRadiusValue
export function createBorderRadius(
  linked: boolean,
  unit: '%' | 'px',
  valueOrTl: number,
  tr?: number,
  br?: number,
  bl?: number
): BorderRadiusValue {
  if (linked) {
    return { linked, unit, tl: valueOrTl, tr: valueOrTl, br: valueOrTl, bl: valueOrTl }
  }
  return { linked, unit, tl: valueOrTl, tr: tr!, br: br!, bl: bl! }
}

/**
 * Create a padding value
 */
export function createPadding(
  linkedV: boolean,
  linkedH: boolean,
  unit: 'px' | 'em' | 'rem',
  top: number,
  right: number,
  bottom: number,
  left: number
): PaddingValue {
  return { linkedV, linkedH, unit, top, right, bottom, left }
}

/**
 * Create a font size value
 */
export function createFontSize(value: number, unit: 'px' | 'em' | 'rem' = 'px'): UnitNumber {
  return { value, unit }
}

/**
 * Create a unit number value (for width, height, offset, etc.)
 */
export function createUnitNumber(value: number, unit: 'px' | 'em' | 'rem' = 'px'): UnitNumber {
  return { value, unit }
}
