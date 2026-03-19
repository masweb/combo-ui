export interface DividerWidthValue {
  value: number
  unit: FourUnit
}

export interface DividerVariant {
  name: string
  border: BorderValue
  width: DividerWidthValue
  spacing: UnitNumber
  dark: DarkDivider
}

export interface DarkDivider {
  borderColor: string
}
