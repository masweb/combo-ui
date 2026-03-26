<script setup lang="ts">
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'

const { t } = useI18n()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const buttonStore = useButtonStore()
const { typographyStore, buildBorderRadius, buildPadding, buildShadow, buildBorderCSS, resolveColor } = usePreviewGrid()

const getButtonStyles = (variant: ButtonVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily
  const baseStyles: Record<string, string | number> = {
    backgroundColor: resolveColor(variant.background, variant.dark.background),
    color: resolveColor(variant.color, variant.dark.color),
    ...buildBorderCSS(variant.border, variant.dark.borderColor),
    borderRadius: buildBorderRadius(variant.borderRadius),
    padding: buildPadding(variant.padding),
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: `${variant.letterSpacing.value}${variant.letterSpacing.unit}`,
    boxShadow: buildShadow(variant),
    cursor: 'pointer'
  }

  if (variant.showFocus) {
    const offset = `${variant.focusOffset.value}${variant.focusOffset.unit}`
    baseStyles.outline = `${offset} solid ${resolveColor(variant.focusColor, variant.dark.focusColor)}`
    baseStyles.outlineOffset = offset
  }

  if (variant.showDisabled) {
    baseStyles.backgroundColor = resolveColor(variant.disabledBackground, variant.dark.disabledBackground)
    baseStyles.color = resolveColor(variant.disabledColor, variant.dark.disabledColor)
    baseStyles.borderStyle = variant.disabledBorder.style
    baseStyles.borderWidth = `${variant.disabledBorder.width}${variant.disabledBorder.unit}`
    baseStyles.borderColor = resolveColor(variant.disabledBorder.color, variant.dark.disabledBorderColor)
    baseStyles.opacity = variant.disabledOpacity
    baseStyles.cursor = 'not-allowed'
    baseStyles.pointerEvents = 'none'
  }

  return baseStyles
}

const getHoverStyles = (variant: ButtonVariant) => {
  if (variant.showDisabled) return {}
  const border = variant.hoverBorder
  const styles: Record<string, string | number> = {
    backgroundColor: resolveColor(variant.hoverBackground, variant.dark.hoverBackground),
    color: resolveColor(variant.hoverColor, variant.dark.hoverColor),
    borderStyle: border.style,
    borderWidth: `${border.width}${border.unit}`,
    borderColor: resolveColor(variant.hoverBorder.color, variant.dark.hoverBorderColor)
  }
  if (variant.showFocus) {
    const offset = `${variant.focusOffset.value}${variant.focusOffset.unit}`
    styles.outline = `${offset} solid ${resolveColor(variant.focusColor, variant.dark.focusColor)}`
    styles.outlineOffset = offset
  }
  return styles
}

const getActiveStyles = (variant: ButtonVariant) => {
  if (variant.showDisabled) return {}
  const border = variant.activeBorder
  const styles: Record<string, string | number> = {
    backgroundColor: resolveColor(variant.activeBackground, variant.dark.activeBackground),
    color: resolveColor(variant.activeColor, variant.dark.activeColor),
    borderStyle: border.style,
    borderWidth: `${border.width}${border.unit}`,
    borderColor: resolveColor(variant.activeBorder.color, variant.dark.activeBorderColor)
  }
  if (variant.showFocus) {
    const offset = `${variant.focusOffset.value}${variant.focusOffset.unit}`
    styles.outline = `${offset} solid ${resolveColor(variant.focusColor, variant.dark.focusColor)}`
    styles.outlineOffset = offset
  }
  return styles
}
</script>

<template>
  <div class="row">
    <div v-for="(variant, index) in buttonStore.variants" :key="index" class="col-md-6 col-lg-4 col-xl-3">
      <div
        class="card text-white mb-4"
        :style="getCompensation()"
        :class="{ 'border-primary': buttonStore.selectedVariantIndex === index }"
        style="cursor: pointer"
        @click="buttonStore.selectVariant(index)"
      >
        <div class="card-body d-flex align-items-center justify-content-center">
          <button
            class="preview-button"
            :style="getButtonStyles(variant)"
            @mouseenter="e => Object.assign((e.target as HTMLElement).style, getHoverStyles(variant))"
            @mouseleave="e => Object.assign((e.target as HTMLElement).style, getButtonStyles(variant))"
            @mousedown="e => Object.assign((e.target as HTMLElement).style, getActiveStyles(variant))"
            @mouseup="e => Object.assign((e.target as HTMLElement).style, getHoverStyles(variant))"
          >
            {{ t('components.button') }}
          </button>
        </div>
        <div class="card-footer text-center" :style="[getCompensation(), getFooterCompensation()]">
          <small>{{ variant.name }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
