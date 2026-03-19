export interface BadgeVariant {
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
  letterSpacing: LetterSpacingValue
  shadows?: {
    offset?: ShadowValue
    inset?: ShadowValue
  }
  dark: DarkBadge
}

export interface DarkBadge {
  background: string
  color: string
  borderColor: string
  shadowColor: string
  shadowInsetColor: string
}
