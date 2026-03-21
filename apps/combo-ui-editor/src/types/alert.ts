export interface AlertVariant {
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
  textAlign: TextAlign
  headerBackground: string
  headerColor: string
  headerPadding: PaddingValue
  headerBorderBottom: BorderValue
  headerFontFamily?: string | null
  headerFontStyle: FontStyle
  headerFontWeight: string
  headerFontSize: UnitNumber
  headerLetterSpacing: LetterSpacingValue
  headerTextAlign: TextAlign
  showClose: boolean
  autoDismiss: number
  closeSize: UnitNumber
  closeColor: string
  closeHoverColor: string
  closeActiveColor: string
  maxWidth: UnitNumber
  offset: UnitNumber
  position: Position
  shadows?: {
    offset?: ShadowValue
    inset?: ShadowValue
    insetHighlight?: ShadowValue
  }
  dark: DarkAlert
}

export interface DarkAlert extends DarkModeShadows {
  background: string
  color: string
  borderColor: string
  headerBackground: string
  headerColor: string
  headerBorderBottomColor: string
  closeColor: string
  closeHoverColor: string
  closeActiveColor: string
}
