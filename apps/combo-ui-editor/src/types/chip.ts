export interface ChipVariant {
  name: string
  background: string
  color: string
  border: BorderValue
  borderRadius: BorderRadiusValue
  padding: PaddingValue
  fontFamily?: string | null
  fontSize: UnitNumber
  fontStyle: FontStyle
  fontWeight: string
  letterSpacing?: LetterSpacingValue
  closeSize: UnitNumber
  closeColor: string
  closeHoverColor: string
  closeActiveColor: string
  shadows?: {
    offset?: ShadowValue
    inset?: ShadowValue
    insetHighlight?: ShadowValue
  }
  dark: DarkChip
}

export interface DarkChip extends DarkModeShadows {
  background: string
  color: string
  borderColor: string
  closeColor: string
  closeHoverColor: string
  closeActiveColor: string
}
