<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'

const alertStore = useAlertStore()
const { typographyStore, buildBorderRadius, buildPadding, buildShadow, buildBorderCSS, resolveColor, isDark } =
  usePreviewGrid()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const getAlertStyles = (variant: AlertVariant) => {
  return {
    backgroundColor: resolveColor(variant.background, variant.dark.background),
    ...buildBorderCSS(variant.border, variant.dark.borderColor),
    borderRadius: buildBorderRadius(variant.borderRadius),
    boxShadow: buildShadow(variant),
    maxWidth: `${variant.maxWidth.value}${variant.maxWidth.unit}`
  }
}

const getInsetOverlayStyles = (variant: AlertVariant) => {
  const shadows: string[] = []

  if (variant.shadows?.inset?.enabled) {
    const color = isDark.value ? variant.dark.shadowInsetColor : variant.shadows.inset.color
    shadows.push(
      `inset ${variant.shadows.inset.offsetX}px ${variant.shadows.inset.offsetY}px ${variant.shadows.inset.blur}px ${variant.shadows.inset.spread}px ${color}`
    )
  }

  if (variant.shadows?.insetHighlight?.enabled) {
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

const getHeaderStyles = (variant: AlertVariant) => {
  const fontFamily = variant.headerFontFamily ?? typographyStore.effectiveFontFamily

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
    borderBottomColor: resolveColor(variant.headerBorderBottom.color, variant.dark.headerBorderBottomColor)
  }
}

const getBodyStyles = (variant: AlertVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
    color: resolveColor(variant.color, variant.dark.color),
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: variant.letterSpacing ? `${variant.letterSpacing.value}${variant.letterSpacing.unit}` : undefined,
    textAlign: variant.textAlign,
    padding: buildPadding(variant.padding)
  }
}

const getCloseColor = (variant: AlertVariant) => resolveColor(variant.closeColor, variant.dark.closeColor)
const getCloseHoverColor = (variant: AlertVariant) =>
  resolveColor(variant.closeHoverColor, variant.dark.closeHoverColor)

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)
</script>

<template>
  <div class="alert-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in alertStore.variants" :key="index" class="col-12 col-xl-6">
        <div
          class="card"
          :style="getCompensation()"
          :class="{ 'border-primary': alertStore.selectedVariantIndex === index }"
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
          <div class="card-footer text-center" :style="[getCompensation(), getFooterCompensation()]">
            <small :style="{ color: labelColor }">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
