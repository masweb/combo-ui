export type BorderStyle = 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'
export type TreeUnit = 'px' | 'em' | 'rem'
export type FourUnit = 'px' | '%' | 'em' | 'rem'
export type LineHeightUnit = '' | 'px' | 'em' | 'rem'
export type FontStyle = 'normal' | 'italic'
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'
export type TextDecoration = 'none' | 'underline' | 'line-through' | 'overline'
export type TextAlign = 'left' | 'center' | 'right'
export type ProgressType = 'bar' | 'striped'
export type SkeletonAnimation = 'pulse' | 'wave' | 'none'
export type SpinnerType = 'ring' | 'pulse' | 'dots' | 'bars' | 'dual'

export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center-center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface BorderValue {
  style: BorderStyle
  width: number
  unit: TreeUnit
  color: string
}

export interface BorderRadiusValue {
  linked: boolean
  unit: FourUnit
  tl: number
  tr: number
  br: number
  bl: number
}

export interface PaddingValue {
  linkedV: boolean
  linkedH: boolean
  unit: TreeUnit
  top: number
  right: number
  bottom: number
  left: number
}

export interface UnitNumber {
  value: number
  unit: TreeUnit
}

export interface LetterSpacingValue {
  value: number
  unit: TreeUnit
}

export interface ShadowValue {
  enabled: boolean
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
}

export interface ComponentShadows {
  offset?: ShadowValue
  inset?: ShadowValue
}
