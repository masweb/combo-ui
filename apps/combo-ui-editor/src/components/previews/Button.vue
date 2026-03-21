<script setup lang="ts">
import { usePreviewContrast } from '@/composables/usePreviewContrast'
import { useDarkStyles } from '@/composables/useDarkStyles'
const { t } = useI18n()

const buttonStore = useButtonStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()
const { cardClass, contrastClass } = usePreviewContrast()
const { getColor, getBorderStyles } = useDarkStyles<ButtonVariant>(isDark)

const buildShadow = (variant: ButtonVariant): string => {
  const shadows: string[] = []

  if (variant.shadows?.offset?.enabled) {
    const s = variant.shadows.offset
    shadows.push(
      `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowColor : s.color}`
    )
  }

  if (variant.shadows?.inset?.enabled) {
    const s = variant.shadows.inset
    shadows.push(
      `inset ${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowInsetColor : s.color}`
    )
  }

  if (variant.shadows?.insetHighlight?.enabled) {
    const s = variant.shadows.insetHighlight
    shadows.push(
      `inset ${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowInsetHighlightColor : s.color}`
    )
  }

  return shadows.length > 0 ? shadows.join(', ') : 'none'
}

const buildBorderRadius = (borderRadius: BorderRadiusValue): string => {
  if (borderRadius.linked) {
    return `${borderRadius.tl}${borderRadius.unit}`
  }
  return `${borderRadius.tl}${borderRadius.unit} ${borderRadius.tr}${borderRadius.unit} ${borderRadius.br}${borderRadius.unit} ${borderRadius.bl}${borderRadius.unit}`
}

const buildPadding = (padding: PaddingValue): string => {
  return `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`
}

const getButtonStyles = (variant: ButtonVariant) => {
  const bg = getColor(variant, 'background', 'background')
  const color = getColor(variant, 'color', 'color')
  const borderStyles = getBorderStyles(variant, 'border', 'borderColor')
  const radius = buildBorderRadius(variant.borderRadius)
  const padding = buildPadding(variant.padding)
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  const baseStyles: Record<string, string | number> = {
    backgroundColor: bg,
    color,
    ...borderStyles,
    borderRadius: radius,
    padding,
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
    baseStyles.outline = `${offset} solid ${getColor(variant, 'focusColor', 'focusColor')}`
    baseStyles.outlineOffset = offset
  }

  if (variant.showDisabled) {
    baseStyles.backgroundColor = getColor(variant, 'disabledBackground', 'disabledBackground')
    baseStyles.color = getColor(variant, 'disabledColor', 'disabledColor')
    baseStyles.borderStyle = variant.disabledBorder.style
    baseStyles.borderWidth = `${variant.disabledBorder.width}${variant.disabledBorder.unit}`
    baseStyles.borderColor = getColor(variant, 'disabledBorder' as keyof ButtonVariant, 'disabledBorderColor')
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
    backgroundColor: getColor(variant, 'hoverBackground', 'hoverBackground'),
    color: getColor(variant, 'hoverColor', 'hoverColor'),
    borderStyle: border.style,
    borderWidth: `${border.width}${border.unit}`,
    borderColor: getColor(variant, 'hoverBorder' as keyof ButtonVariant, 'hoverBorderColor')
  }
  if (variant.showFocus) {
    const offset = `${variant.focusOffset.value}${variant.focusOffset.unit}`
    styles.outline = `${offset} solid ${getColor(variant, 'focusColor', 'focusColor')}`
    styles.outlineOffset = offset
  }
  return styles
}

const getActiveStyles = (variant: ButtonVariant) => {
  if (variant.showDisabled) return {}
  const border = variant.activeBorder
  const styles: Record<string, string | number> = {
    backgroundColor: getColor(variant, 'activeBackground', 'activeBackground'),
    color: getColor(variant, 'activeColor', 'activeColor'),
    borderStyle: border.style,
    borderWidth: `${border.width}${border.unit}`,
    borderColor: getColor(variant, 'activeBorder' as keyof ButtonVariant, 'activeBorderColor')
  }
  if (variant.showFocus) {
    const offset = `${variant.focusOffset.value}${variant.focusOffset.unit}`
    styles.outline = `${offset} solid ${getColor(variant, 'focusColor', 'focusColor')}`
    styles.outlineOffset = offset
  }
  return styles
}
</script>

<template>
  <div class="row">
    <div v-for="(variant, index) in buttonStore.variants" :key="index" class="col-md-6 col-lg-4 col-xl-3">
      <div
        class="card mb-4"
        :class="[cardClass, { 'border-primary': buttonStore.selectedVariantIndex === index }]"
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
        <div class="card-footer text-center">
          <small :class="contrastClass">{{ variant.name }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
