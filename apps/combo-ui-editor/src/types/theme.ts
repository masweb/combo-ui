import type { TypographyGlobalConfig, TypographyVariant } from './typography'
import type { FormsGlobalConfig, FormsVariant } from './forms'

export interface ThemeComponentData {
  variants: unknown[]
  selectedVariantIndex: number
}

export interface ThemeTypographyData extends ThemeComponentData {
  globalConfig: TypographyGlobalConfig
  variants: TypographyVariant[]
}

export interface ThemeFormsData extends ThemeComponentData {
  globalConfig: FormsGlobalConfig
  variants: FormsVariant[]
  currentState: string
}

export type ThemeData = {
  name: string
  version: string
  typography?: ThemeTypographyData
  forms?: ThemeFormsData
} & Record<string, unknown>

export function isThemeComponentData(value: unknown): value is ThemeComponentData {
  return typeof value === 'object' && value !== null && 'variants' in value && 'selectedVariantIndex' in value
}
