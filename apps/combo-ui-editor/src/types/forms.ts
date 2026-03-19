import type { BorderValue, BorderRadiusValue, PaddingValue, TreeUnit } from './generics'

export type FormsVariantName = 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'slider'

export type OptionOrientation = 'horizontal' | 'vertical'

export type FormState = 'normal' | 'focus' | 'error' | 'disabled'

export interface FormsGlobalConfig {
  fontFamily: string | null
  color: string
  background: string
  border: BorderValue
  borderRadius: BorderRadiusValue
  padding: PaddingValue
  fontSize: { value: number; unit: TreeUnit }
  fieldHeight: number

  showLabel: boolean
  labelColor: string
  labelFontSize: { value: number; unit: TreeUnit }
  labelFontWeight: string
  labelMarginBottom: number

  showPlaceholder: boolean
  placeholderColor: string

  focusOutlineColor: string
  focusOutlineWidth: number

  errorBorderColor: string
  errorColor: string
  errorFontSize: { value: number; unit: TreeUnit }
  errorMarginTop: number

  disabledOpacity: number
  disabledColor: string
  disabledBackground: string
  disabledBorderColor: string

  checkRadioColor: string
  checkRadioSize: number
  optionColor: string
  optionFontFamily: string | null
  optionFontSize: { value: number; unit: TreeUnit }
  optionFontWeight: string
  optionSpacingHorizontal: { value: number; unit: TreeUnit }
  optionSpacingVertical: { value: number; unit: TreeUnit }
  optionOrientation: OptionOrientation

  dropzoneBackground: string
  dropzoneColor: string
  dropzoneBorder: BorderValue
  dropzoneBorderRadius: BorderRadiusValue

  dark: DarkFormsGlobalConfig
}

export interface DarkFormsGlobalConfig {
  color: string
  background: string
  borderColor: string
  labelColor: string
  placeholderColor: string
  focusOutlineColor: string
  errorBorderColor: string
  errorColor: string
  disabledColor: string
  disabledBackground: string
  disabledBorderColor: string
  checkRadioColor: string
  checkRadioSize: number
  optionColor: string
  optionSpacingHorizontal: { value: number; unit: TreeUnit }
  optionSpacingVertical: { value: number; unit: TreeUnit }
  dropzoneBackground: string
  dropzoneColor: string
  dropzoneBorderColor: string
}

export interface FormsVariant {
  id: string
  name: string
  type: FormsVariantName
  isFixed: boolean
}

export type FormsVariants = FormsVariant[]
