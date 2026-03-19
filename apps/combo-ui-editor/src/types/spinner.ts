export interface SpinnerVariant {
  name: string
  type: SpinnerType
  color: string
  trackColor: string
  border: BorderValue
  size: UnitNumber
  speed: number
  dark: DarkSpinner
}

export interface DarkSpinner {
  color: string
  trackColor: string
  borderColor: string
}
