export interface ProgressVariant {
  name: string
  background: string
  border: BorderValue
  type: ProgressType
  trackColor: string
  fillColor: string
  stripeColor: string
  height: UnitNumber
  borderRadius: BorderRadiusValue
  speed: number
  showLabel: boolean
  labelColor: string
  fontFamily?: string | null
  labelFontSize: UnitNumber
  fontStyle: FontStyle
  fontWeight: string
  shadows?: {
    offset?: ShadowValue
    inset?: ShadowValue
    insetHighlight?: ShadowValue
  }
  dark: DarkProgress
}

export interface DarkProgress extends DarkModeShadows {
  background: string
  borderColor: string
  trackColor: string
  fillColor: string
  stripeColor: string
  labelColor: string
}
