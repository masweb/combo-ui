<script setup lang="ts">
import { useFormsStore } from '@/stores/forms'
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'
import type { FormState } from '@/types/forms'

const formsStore = useFormsStore()
const { typographyStore, isDark } = usePreviewGrid()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const states: { value: FormState; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'focus', label: 'Focus' },
  { value: 'error', label: 'Error' },
  { value: 'disabled', label: 'Disabled' }
]

const getLabelStyles = () => {
  const config = formsStore.globalConfig

  return {
    fontFamily: config.fontFamily ?? typographyStore.effectiveFontFamily,
    fontSize: `${config.labelFontSize.value}${config.labelFontSize.unit}`,
    fontWeight: config.labelFontWeight,
    color: isDark.value ? config.dark.labelColor : config.labelColor,
    marginBottom: `${config.labelMarginBottom}px`,
    display: 'block'
  }
}

const getPlaceholderCssVars = () => {
  const config = formsStore.globalConfig
  return {
    '--placeholder-color': isDark.value ? config.dark.placeholderColor : config.placeholderColor
  }
}

const getInputBorderStyles = () => {
  const config = formsStore.globalConfig
  const state = formsStore.currentState

  let borderColor = isDark.value ? config.dark.borderColor : config.border.color
  let background = isDark.value ? config.dark.background : config.background
  let outline = ''
  let opacity = 1

  if (state === 'focus') {
    outline = `${config.focusOutlineWidth}px solid ${isDark.value ? config.dark.focusOutlineColor : config.focusOutlineColor}`
  } else if (state === 'error') {
    borderColor = isDark.value ? config.dark.errorBorderColor : config.errorBorderColor
  } else if (state === 'disabled') {
    opacity = config.disabledOpacity
    background = isDark.value ? config.dark.disabledBackground : config.disabledBackground
    borderColor = isDark.value ? config.dark.disabledBorderColor : config.disabledBorderColor
  }

  return {
    fontFamily: config.fontFamily ?? typographyStore.effectiveFontFamily,
    fontSize: `${config.fontSize.value}${config.fontSize.unit}`,
    color:
      state === 'disabled'
        ? isDark.value
          ? config.dark.disabledColor
          : config.disabledColor
        : isDark.value
          ? config.dark.color
          : config.color,
    background,
    borderStyle: config.border.style,
    borderWidth: `${config.border.width}${config.border.unit}`,
    borderColor,
    borderRadius: `${config.borderRadius.tl}${config.borderRadius.unit} ${config.borderRadius.tr}${config.borderRadius.unit} ${config.borderRadius.br}${config.borderRadius.unit} ${config.borderRadius.bl}${config.borderRadius.unit}`,
    padding: `${config.padding.top}${config.padding.unit} ${config.padding.right}${config.padding.unit} ${config.padding.bottom}${config.padding.unit} ${config.padding.left}${config.padding.unit}`,
    outline,
    outlineOffset: state === 'focus' ? '0' : undefined,
    opacity,
    transition: 'all 0.15s ease-in-out',
    height: `${config.fieldHeight}px`,
    width: '100%'
  }
}

const getTextareaStyles = () => {
  const inputStyles = getInputBorderStyles()
  const { height, ...rest } = inputStyles
  return rest
}

const getErrorStyles = () => {
  const config = formsStore.globalConfig
  return {
    fontFamily: config.fontFamily ?? typographyStore.effectiveFontFamily,
    fontSize: `${config.errorFontSize.value}${config.errorFontSize.unit}`,
    color: isDark.value ? config.dark.errorColor : config.errorColor,
    marginTop: `${config.errorMarginTop}px`
  }
}

const getRadioCheckboxStyles = () => {
  const config = formsStore.globalConfig
  const state = formsStore.currentState

  let borderColor = isDark.value ? config.dark.borderColor : config.border.color
  let background = isDark.value ? config.dark.background : config.background
  let opacity = 1
  let outline = ''

  if (state === 'focus') {
    outline = `${config.focusOutlineWidth}px solid ${isDark.value ? config.dark.focusOutlineColor : config.focusOutlineColor}`
  } else if (state === 'error') {
    borderColor = isDark.value ? config.dark.errorBorderColor : config.errorBorderColor
  } else if (state === 'disabled') {
    opacity = config.disabledOpacity
    background = isDark.value ? config.dark.disabledBackground : config.disabledBackground
    borderColor = isDark.value ? config.dark.disabledBorderColor : config.disabledBorderColor
  }

  return {
    width: `${config.checkRadioSize}px`,
    height: `${config.checkRadioSize}px`,
    borderStyle: 'solid',
    borderWidth: `${config.border.width}${config.border.unit}`,
    borderColor,
    background,
    opacity,
    outline,
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer'
  }
}

const getAccentColor = () => {
  const config = formsStore.globalConfig
  return isDark.value ? config.dark.checkRadioColor : config.checkRadioColor
}

const getOptionStyles = () => {
  const config = formsStore.globalConfig
  const fontFamily = config.optionFontFamily ?? config.fontFamily ?? typographyStore.effectiveFontFamily
  return {
    fontFamily,
    fontSize: `${config.optionFontSize.value}${config.optionFontSize.unit}`,
    fontWeight: config.optionFontWeight,
    color: isDark.value ? config.dark.optionColor : config.optionColor
  }
}

const getOptionsContainerStyles = () => {
  const config = formsStore.globalConfig
  const isVertical = config.optionOrientation === 'vertical'
  const spacing = isVertical
    ? isDark.value
      ? config.dark.optionSpacingVertical
      : config.optionSpacingVertical
    : isDark.value
      ? config.dark.optionSpacingHorizontal
      : config.optionSpacingHorizontal
  const checkColor = isDark.value ? '%23333333' : '%23fff'
  const radioInnerColor = isDark.value ? '#333333' : '#fff'
  return {
    gap: `${spacing.value}${spacing.unit}`,
    flexDirection: (isVertical ? 'column' : 'row') as 'column' | 'row',
    '--forms-accent-color': getAccentColor(),
    '--forms-check-size': `${Math.round(config.checkRadioSize * 0.66)}px`,
    '--forms-radio-inner-color': radioInnerColor,
    '--forms-check-mark': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='${checkColor}' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")`
  }
}

const getSelectStyles = () => {
  const config = formsStore.globalConfig
  const state = formsStore.currentState
  const borderColor = isDark.value ? config.dark.borderColor : config.border.color
  const background = isDark.value ? config.dark.background : config.background
  const arrowColor = isDark.value ? '%23f8f9fa' : '%23212529'

  let finalBorderColor = borderColor
  let finalBackground = background
  let outline = ''
  let opacity = 1

  if (state === 'focus') {
    outline = `${config.focusOutlineWidth}px solid ${isDark.value ? config.dark.focusOutlineColor : config.focusOutlineColor}`
  } else if (state === 'error') {
    finalBorderColor = isDark.value ? config.dark.errorBorderColor : config.errorBorderColor
  } else if (state === 'disabled') {
    opacity = config.disabledOpacity
    finalBackground = isDark.value ? config.dark.disabledBackground : config.disabledBackground
    finalBorderColor = isDark.value ? config.dark.disabledBorderColor : config.disabledBorderColor
  }

  return {
    fontFamily: config.fontFamily ?? typographyStore.effectiveFontFamily,
    fontSize: `${config.fontSize.value}${config.fontSize.unit}`,
    color:
      state === 'disabled'
        ? isDark.value
          ? config.dark.disabledColor
          : config.disabledColor
        : isDark.value
          ? config.dark.color
          : config.color,
    background: `${finalBackground} url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='${arrowColor}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e") no-repeat right ${config.padding.right}${config.padding.unit} center/12px 12px`,
    borderStyle: config.border.style,
    borderWidth: `${config.border.width}${config.border.unit}`,
    borderColor: finalBorderColor,
    borderRadius: `${config.borderRadius.tl}${config.borderRadius.unit} ${config.borderRadius.tr}${config.borderRadius.unit} ${config.borderRadius.br}${config.borderRadius.unit} ${config.borderRadius.bl}${config.borderRadius.unit}`,
    padding: `${config.padding.top}${config.padding.unit} ${config.padding.right + 20}${config.padding.unit} ${config.padding.bottom}${config.padding.unit} ${config.padding.left}${config.padding.unit}`,
    outline,
    outlineOffset: state === 'focus' ? '0' : undefined,
    opacity,
    transition: 'all 0.15s ease-in-out',
    height: `${config.fieldHeight}px`,
    width: '100%',
    appearance: 'none' as const,
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer'
  }
}

const getFileStyles = () => {
  const config = formsStore.globalConfig
  const state = formsStore.currentState

  let borderColor = isDark.value ? config.dark.dropzoneBorderColor : config.dropzoneBorder.color
  let background = isDark.value ? config.dark.dropzoneBackground : config.dropzoneBackground
  let color = isDark.value ? config.dark.dropzoneColor : config.dropzoneColor
  let outline = ''
  let opacity = 1

  if (state === 'focus') {
    outline = `${config.focusOutlineWidth}px solid ${isDark.value ? config.dark.focusOutlineColor : config.focusOutlineColor}`
  } else if (state === 'error') {
    borderColor = isDark.value ? config.dark.errorBorderColor : config.errorBorderColor
  } else if (state === 'disabled') {
    opacity = config.disabledOpacity
    background = isDark.value ? config.dark.disabledBackground : config.disabledBackground
    borderColor = isDark.value ? config.dark.disabledBorderColor : config.disabledBorderColor
    color = isDark.value ? config.dark.disabledColor : config.disabledColor
  }

  return {
    fontFamily: config.fontFamily ?? typographyStore.effectiveFontFamily,
    fontSize: `${config.fontSize.value}${config.fontSize.unit}`,
    color,
    background,
    borderStyle: config.dropzoneBorder.style,
    borderWidth: `${config.dropzoneBorder.width}${config.dropzoneBorder.unit}`,
    borderColor,
    borderRadius: `${config.dropzoneBorderRadius.tl}${config.dropzoneBorderRadius.unit} ${config.dropzoneBorderRadius.tr}${config.dropzoneBorderRadius.unit} ${config.dropzoneBorderRadius.br}${config.dropzoneBorderRadius.unit} ${config.dropzoneBorderRadius.bl}${config.dropzoneBorderRadius.unit}`,
    padding: '32px 16px',
    outline,
    outlineOffset: state === 'focus' ? '0' : undefined,
    opacity,
    transition: 'all 0.15s ease-in-out',
    width: '100%',
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
    textAlign: 'center' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    gap: '8px'
  }
}

const getSliderStyles = () => {
  const config = formsStore.globalConfig
  const state = formsStore.currentState
  const accentColor = isDark.value ? config.dark.checkRadioColor : config.checkRadioColor
  const trackColor = isDark.value ? '#495057' : '#dee2e6'

  let opacity = 1
  let outline = ''

  if (state === 'focus') {
    const focusColor = isDark.value ? config.dark.focusOutlineColor : config.focusOutlineColor
    outline = `${config.focusOutlineWidth}px solid ${focusColor}`
  } else if (state === 'disabled') {
    opacity = config.disabledOpacity
  }

  return {
    width: '100%',
    height: `${config.checkRadioSize}px`,
    opacity,
    outline,
    outlineOffset: '2px',
    cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
    '--slider-accent': accentColor,
    '--slider-track': trackColor,
    '--slider-thumb-size': `${config.checkRadioSize + 4}px`
  }
}
</script>

<template>
  <div class="forms-preview p-4">
    <div class="state-selector mb-4 d-flex justify-content-center gap-2">
      <div class="btn-group" role="group">
        <button
          v-for="s in states"
          :key="s.value"
          type="button"
          class="btn"
          :class="formsStore.currentState === s.value ? 'btn-primary' : 'btn-outline-secondary'"
          @click="formsStore.setState(s.value)"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <div class="row">
      <div v-for="variant in formsStore.variants" :key="variant.id" class="col-md-12 col-lg-12 col-xl-6 mb-4">
        <div class="card" :style="getCompensation()">
          <div class="card-header" :style="[getCompensation(), getFooterCompensation()]">
            {{ variant.name.charAt(0).toUpperCase() + variant.name.slice(1) }}
          </div>
          <div class="card-body">
            <div class="input-wrapper">
              <label v-if="formsStore.globalConfig.showLabel" :style="getLabelStyles()"
                >Label {{ variant.name.charAt(0).toUpperCase() + variant.name.slice(1) }}</label
              >
              <div v-if="variant.type === 'input'" class="input-component">
                <input
                  type="text"
                  class="form-control forms-input"
                  :style="{ ...getInputBorderStyles(), ...getPlaceholderCssVars() }"
                  :placeholder="formsStore.globalConfig.showPlaceholder ? 'Placeholder text...' : undefined"
                  :disabled="formsStore.currentState === 'disabled'"
                  :readonly="formsStore.currentState !== 'normal'"
                />
              </div>
              <div v-else-if="variant.type === 'textarea'" class="input-component">
                <textarea
                  class="form-control forms-input"
                  :style="{ ...getTextareaStyles(), ...getPlaceholderCssVars() }"
                  :placeholder="formsStore.globalConfig.showPlaceholder ? 'Placeholder text...' : undefined"
                  rows="3"
                  :disabled="formsStore.currentState === 'disabled'"
                  :readonly="formsStore.currentState !== 'normal'"
                ></textarea>
              </div>
              <div v-else-if="variant.type === 'select'" class="input-component">
                <select
                  class="form-control forms-select"
                  :style="getSelectStyles()"
                  :disabled="formsStore.currentState === 'disabled'"
                >
                  <option value="">Select an option...</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                </select>
              </div>
              <div v-else-if="variant.type === 'file'" class="input-component">
                <div class="forms-dropzone" :style="getFileStyles()">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                    />
                    <path
                      d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
                    />
                  </svg>
                  <span>Drop files here or click to upload</span>
                </div>
              </div>
              <div v-else-if="variant.type === 'slider'" class="input-component">
                <input
                  type="range"
                  class="forms-slider"
                  :style="getSliderStyles()"
                  min="0"
                  max="100"
                  value="50"
                  :disabled="formsStore.currentState === 'disabled'"
                />
              </div>
              <div
                v-else-if="variant.type === 'radio'"
                class="forms-options-container"
                :style="getOptionsContainerStyles()"
              >
                <label v-for="i in 2" :key="i" class="forms-option">
                  <input
                    type="radio"
                    class="forms-radio"
                    :name="`radio-${variant.id}`"
                    :style="getRadioCheckboxStyles()"
                    :disabled="formsStore.currentState === 'disabled'"
                    :checked="i === 1 && formsStore.currentState !== 'error' && formsStore.currentState !== 'disabled'"
                  />
                  <span class="forms-option-label" :style="getOptionStyles()">Option {{ i }}</span>
                </label>
              </div>
              <div
                v-else-if="variant.type === 'checkbox'"
                class="forms-options-container"
                :style="getOptionsContainerStyles()"
              >
                <label v-for="i in 2" :key="i" class="forms-option">
                  <input
                    type="checkbox"
                    class="forms-checkbox"
                    :style="getRadioCheckboxStyles()"
                    :disabled="formsStore.currentState === 'disabled'"
                    :checked="i === 1 && formsStore.currentState !== 'error' && formsStore.currentState !== 'disabled'"
                  />
                  <span class="forms-option-label" :style="getOptionStyles()">Option {{ i }}</span>
                </label>
              </div>
              <div v-if="formsStore.currentState === 'error'" class="error-message" :style="getErrorStyles()">
                Error message
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
