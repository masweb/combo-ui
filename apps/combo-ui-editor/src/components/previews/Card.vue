<script setup lang="ts">
import { usePreviewContrast } from '@/composables/usePreviewContrast'

const cardStore = useCardStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()
const { cardClass, contrastClass } = usePreviewContrast()

const buildOffsetShadow = (variant: CardVariant): string => {
  if (!variant.shadows?.offset?.enabled) return 'none'
  const s = variant.shadows.offset
  return `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowColor : s.color}`
}

const buildInsetShadow = (variant: CardVariant): string => {
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

const getBorderRadiusCSS = (variant: CardVariant): string => {
  return variant.borderRadius.linked
    ? `${variant.borderRadius.tl}${variant.borderRadius.unit}`
    : `${variant.borderRadius.tl}${variant.borderRadius.unit} ${variant.borderRadius.tr}${variant.borderRadius.unit} ${variant.borderRadius.br}${variant.borderRadius.unit} ${variant.borderRadius.bl}${variant.borderRadius.unit}`
}

const getInsetOverlayStyles = (variant: CardVariant) => {
  return {
    borderRadius: getBorderRadiusCSS(variant),
    boxShadow: buildInsetShadow(variant)
  }
}

const getCardStyles = (variant: CardVariant) => {
  const bg = isDark.value ? variant.dark.background : variant.background
  const borderColor = isDark.value ? variant.dark.borderColor : variant.border.color

  return {
    backgroundColor: bg,
    borderStyle: variant.border.style,
    borderWidth: `${variant.border.width}${variant.border.unit}`,
    borderColor,
    borderRadius: getBorderRadiusCSS(variant),
    boxShadow: buildOffsetShadow(variant)
  }
}

const getHeaderStyles = (variant: CardVariant) => {
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

const getBodyStyles = (variant: CardVariant) => {
  const color = isDark.value ? variant.dark.color : variant.color
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily
  const padding = `${variant.padding.top}${variant.padding.unit} ${variant.padding.right}${variant.padding.unit} ${variant.padding.bottom}${variant.padding.unit} ${variant.padding.left}${variant.padding.unit}`

  return {
    color,
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: `${variant.letterSpacing.value}${variant.letterSpacing.unit}`,
    textAlign: variant.textAlign,
    padding
  }
}
</script>

<template>
  <div class="card-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in cardStore.variants" :key="index" class="col-12 col-xl-6">
        <div
          class="card"
          :class="[cardClass, { 'border-primary': cardStore.selectedVariantIndex === index }]"
          style="cursor: pointer"
          @click="cardStore.selectVariant(index)"
        >
          <div class="card-body">
            <div class="preview-card" :style="getCardStyles(variant)">
              <div class="preview-card-inset-overlay" :style="getInsetOverlayStyles(variant)"></div>
              <div class="preview-card-header" :style="getHeaderStyles(variant)">Card Header</div>
              <div class="preview-card-body" :style="getBodyStyles(variant)">
                Some quick example text to build on the card title and make up the bulk of the card's content.
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
