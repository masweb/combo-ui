export interface CardVariant {
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
  shadows?: {
    offset?: ShadowValue
    inset?: ShadowValue
    insetHighlight?: ShadowValue
  }
  dark: DarkCard
}

export interface DarkCard extends DarkModeShadows {
  background: string
  color: string
  borderColor: string
  headerBackground: string
  headerColor: string
  headerBorderBottomColor: string
}
