export type TypographyVariantName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'display5'
  | 'display6'
  | 'body'
  | 'small'
  | 'caption'
  | 'link'

export interface TypographyValue {
  fontFamily: string | null
  fontStyle: FontStyle
  fontWeight: string
  fontSize: { value: number; unit: TreeUnit }
  letterSpacing: { value: number; unit: TreeUnit }
  lineHeight: { value: number; unit: LineHeightUnit }
  textTransform: TextTransform
  textDecoration: TextDecoration
  color: string | null
}

export interface DarkTypographyValue {
  color: string | null
}

export interface TypographyGlobalConfig {
  fontFamily: string
  color: string
  backgroundColor: string
  dark: { color: string; backgroundColor: string }
}

export interface TypographyVariant extends TypographyValue {
  id: string
  name: string
  isFixed: boolean
  dark: DarkTypographyValue
}

export type TypographyVariants = TypographyVariant[]
