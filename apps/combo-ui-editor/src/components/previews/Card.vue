<script setup lang="ts">
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'

const cardStore = useCardStore()
const { typographyStore, buildBorderRadius, buildPadding, buildShadow, buildBorderCSS, resolveColor, isDark } =
  usePreviewGrid()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const getCardStyles = (variant: CardVariant) => {
  return {
    backgroundColor: resolveColor(variant.background, variant.dark.background),
    ...buildBorderCSS(variant.border, variant.dark.borderColor),
    borderRadius: buildBorderRadius(variant.borderRadius),
    boxShadow: buildShadow(variant)
  }
}

const getInsetOverlayStyles = (variant: CardVariant) => {
  if (!variant.shadows?.inset?.enabled && !variant.shadows?.insetHighlight?.enabled) {
    return { borderRadius: buildBorderRadius(variant.borderRadius), boxShadow: 'none' }
  }

  const shadows: string[] = []

  if (variant.shadows.inset?.enabled) {
    const color = isDark.value ? variant.dark.shadowInsetColor : variant.shadows.inset.color
    shadows.push(
      `inset ${variant.shadows.inset.offsetX}px ${variant.shadows.inset.offsetY}px ${variant.shadows.inset.blur}px ${variant.shadows.inset.spread}px ${color}`
    )
  }

  if (variant.shadows.insetHighlight?.enabled) {
    const color = isDark.value ? variant.dark.shadowInsetHighlightColor : variant.shadows.insetHighlight.color
    shadows.push(
      `inset ${variant.shadows.insetHighlight.offsetX}px ${variant.shadows.insetHighlight.offsetY}px ${variant.shadows.insetHighlight.blur}px ${variant.shadows.insetHighlight.spread}px ${color}`
    )
  }

  return {
    borderRadius: buildBorderRadius(variant.borderRadius),
    boxShadow: shadows.length > 0 ? shadows.join(', ') : 'none'
  }
}

const getHeaderStyles = (variant: CardVariant) => {
  const fontFamily = variant.headerFontFamily ?? typographyStore.effectiveFontFamily
  const borderColor = resolveColor(variant.headerBorderBottom.color, variant.dark.headerBorderBottomColor)

  return {
    backgroundColor: resolveColor(variant.headerBackground, variant.dark.headerBackground),
    color: resolveColor(variant.headerColor, variant.dark.headerColor),
    fontFamily,
    fontSize: `${variant.headerFontSize.value}${variant.headerFontSize.unit}`,
    fontStyle: variant.headerFontStyle,
    fontWeight: variant.headerFontWeight,
    letterSpacing: `${variant.headerLetterSpacing.value}${variant.headerLetterSpacing.unit}`,
    textAlign: variant.headerTextAlign,
    padding: buildPadding(variant.headerPadding),
    borderBottomStyle: variant.headerBorderBottom.style,
    borderBottomWidth: `${variant.headerBorderBottom.width}${variant.headerBorderBottom.unit}`,
    borderBottomColor: borderColor
  }
}

const getBodyStyles = (variant: CardVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
    color: resolveColor(variant.color, variant.dark.color),
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: `${variant.letterSpacing.value}${variant.letterSpacing.unit}`,
    textAlign: variant.textAlign,
    padding: buildPadding(variant.padding)
  }
}

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)
</script>

<template>
  <div class="card-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in cardStore.variants" :key="index" class="col-12 col-xl-6">
        <div
          class="card"
          :style="getCompensation()"
          :class="{ 'border-primary': cardStore.selectedVariantIndex === index }"
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
          <div class="card-footer text-center" :style="[getCompensation(), getFooterCompensation()]">
            <small :style="{ color: labelColor }">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
