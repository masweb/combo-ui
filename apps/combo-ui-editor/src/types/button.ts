export interface ButtonVariant {
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
  hoverBackground: string
  hoverColor: string
  hoverBorder: BorderValue
  activeBackground: string
  activeColor: string
  activeBorder: BorderValue
  focusColor: string
  focusOffset: UnitNumber
  showFocus: boolean
  disabledBackground: string
  disabledColor: string
  disabledBorder: BorderValue
  disabledOpacity: number
  showDisabled: boolean
  shadows?: {
    offset?: ShadowValue
    inset?: ShadowValue
    insetHighlight?: ShadowValue
  }
  dark: DarkButton
}

export interface DarkButton extends DarkModeShadows {
  background: string
  color: string
  borderColor: string
  hoverBackground: string
  hoverColor: string
  hoverBorderColor: string
  activeBackground: string
  activeColor: string
  activeBorderColor: string
  focusColor: string
  disabledBackground: string
  disabledColor: string
  disabledBorderColor: string
}
