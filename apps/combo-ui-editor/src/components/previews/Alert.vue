<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { usePreviewContrast } from '@/composables/usePreviewContrast'

const alertStore = useAlertStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()
const { cardClass, contrastClass } = usePreviewContrast()

const buildOffsetShadow = (variant: AlertVariant): string => {
  if (!variant.shadows?.offset?.enabled) return 'none'
  const s = variant.shadows.offset
  return `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowColor : s.color}`
}

const buildInsetShadow = (variant: AlertVariant): string => {
  const shadows: string[] = []

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

const getBorderRadiusCSS = (variant: AlertVariant): string => {
  return variant.borderRadius.linked
    ? `${variant.borderRadius.tl}${variant.borderRadius.unit}`
    : `${variant.borderRadius.tl}${variant.borderRadius.unit} ${variant.borderRadius.tr}${variant.borderRadius.unit} ${variant.borderRadius.br}${variant.borderRadius.unit} ${variant.borderRadius.bl}${variant.borderRadius.unit}`
}

const getInsetOverlayStyles = (variant: AlertVariant) => {
  return {
    borderRadius: getBorderRadiusCSS(variant),
    boxShadow: buildInsetShadow(variant)
  }
}

const getAlertStyles = (variant: AlertVariant) => {
  const bg = isDark.value ? variant.dark.background : variant.background
  const borderColor = isDark.value ? variant.dark.borderColor : variant.border.color

  return {
    backgroundColor: bg,
    borderStyle: variant.border.style,
    borderWidth: `${variant.border.width}${variant.border.unit}`,
    borderColor,
    borderRadius: getBorderRadiusCSS(variant),
    boxShadow: buildOffsetShadow(variant),
    maxWidth: `${variant.maxWidth.value}${variant.maxWidth.unit}`
  }
}

const getHeaderStyles = (variant: AlertVariant) => {
  const bg = isDark.value ? variant.dark.headerBackground : variant.headerBackground
  const color = isDark.value ? variant.dark.headerColor : variant.headerColor
  const borderColor = isDark.value ? variant.dark.headerBorderBottomColor : variant.headerBorderBottom.color
  const fontFamily = variant.headerFontFamily ?? typographyStore.effectiveFontFamily
  const padding = `${variant.headerPadding.top}${variant.headerPadding.unit} ${variant.headerPadding.right}${variant.headerPadding.unit} ${variant.headerPadding.bottom}${variant.headerPadding.unit} ${variant.headerPadding.left}${variant.headerPadding.unit}`

  return {
    backgroundColor: bg,
    color,
    fontFamily,
    fontSize: `${variant.headerFontSize.value}${variant.headerFontSize.unit}`,
    fontStyle: variant.headerFontStyle,
    fontWeight: variant.headerFontWeight,
    letterSpacing: `${variant.headerLetterSpacing.value}${variant.headerLetterSpacing.unit}`,
    textAlign: variant.headerTextAlign,
    padding,
    borderBottomStyle: variant.headerBorderBottom.style,
    borderBottomWidth: `${variant.headerBorderBottom.width}${variant.headerBorderBottom.unit}`,
    borderBottomColor: borderColor
  }
}

const getBodyStyles = (variant: AlertVariant) => {
  const color = isDark.value ? variant.dark.color : variant.color
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily
  const padding = `${variant.padding.top}${variant.padding.unit} ${variant.padding.right}${variant.padding.unit} ${variant.padding.bottom}${variant.padding.unit} ${variant.padding.left}${variant.padding.unit}`

  return {
    color,
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: variant.letterSpacing ? `${variant.letterSpacing.value}${variant.letterSpacing.unit}` : undefined,
    textAlign: variant.textAlign,
    padding
  }
}

const getCloseColor = (variant: AlertVariant) => (isDark.value ? variant.dark.closeColor : variant.closeColor)

const getCloseHoverColor = (variant: AlertVariant) =>
  isDark.value ? variant.dark.closeHoverColor : variant.closeHoverColor
</script>

<template>
  <div class="alert-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in alertStore.variants" :key="index" class="col-12 col-xl-6">
        <div
          class="card"
          :class="[cardClass, { 'border-primary': alertStore.selectedVariantIndex === index }]"
          style="cursor: pointer"
          @click="alertStore.selectVariant(index)"
        >
          <div class="card-body">
            <div class="preview-alert" :style="getAlertStyles(variant)">
              <div class="preview-alert-inset-overlay" :style="getInsetOverlayStyles(variant)"></div>
              <div class="preview-alert-header" :style="getHeaderStyles(variant)">
                <span>Alert Header</span>
                <button
                  v-if="variant.showClose"
                  class="preview-close-btn"
                  :style="{
                    color: getCloseColor(variant),
                    fontSize: `${variant.closeSize.value}${variant.closeSize.unit}`
                  }"
                  @mouseenter.stop="e => ((e.target as HTMLElement).style.color = getCloseHoverColor(variant))"
                  @mouseleave.stop="e => ((e.target as HTMLElement).style.color = getCloseColor(variant))"
                >
                  <IconX :size="variant.closeSize.value" />
                </button>
              </div>
              <div class="preview-alert-body" :style="getBodyStyles(variant)">
                This is an alert message. It provides important information to the user.
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <small :class="contrastClass">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
