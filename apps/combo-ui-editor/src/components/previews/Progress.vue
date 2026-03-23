<script setup lang="ts">
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'
import { useProgressStore } from '@/stores/progress'

const progressStore = useProgressStore()
const { typographyStore, isDark } = usePreviewGrid()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const buildOffsetShadow = (variant: ProgressVariant): string => {
  if (!variant.shadows?.offset?.enabled) return 'none'
  const s = variant.shadows.offset
  return `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowColor : s.color}`
}

const buildInsetShadow = (variant: ProgressVariant): string => {
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

const getBorderRadiusCSS = (variant: ProgressVariant): string => {
  return variant.borderRadius.linked
    ? `${variant.borderRadius.tl}${variant.borderRadius.unit}`
    : `${variant.borderRadius.tl}${variant.borderRadius.unit} ${variant.borderRadius.tr}${variant.borderRadius.unit} ${variant.borderRadius.br}${variant.borderRadius.unit} ${variant.borderRadius.bl}${variant.borderRadius.unit}`
}

const getInsetOverlayStyles = (variant: ProgressVariant) => {
  return {
    borderRadius: getBorderRadiusCSS(variant),
    boxShadow: buildInsetShadow(variant)
  }
}

const getContainerStyles = (variant: ProgressVariant) => {
  return {
    backgroundColor: variant.background,
    padding: '20px',
    borderRadius: '8px'
  }
}

const getTrackStyles = (variant: ProgressVariant) => {
  const borderColor = isDark.value ? variant.dark.borderColor : variant.border.color

  return {
    backgroundColor: isDark.value ? variant.dark.trackColor : variant.trackColor,
    height: `${variant.height.value}${variant.height.unit}`,
    borderRadius: getBorderRadiusCSS(variant),
    overflow: 'hidden',
    position: 'relative' as const,
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderStyle: variant.border.style,
    borderWidth: `${variant.border.width}${variant.border.unit}`,
    borderColor,
    boxShadow: buildOffsetShadow(variant)
  }
}

const getFillStyles = (variant: ProgressVariant) => {
  const fillColor = isDark.value ? variant.dark.fillColor : variant.fillColor
  const stripeColor = isDark.value ? variant.dark.stripeColor : variant.stripeColor

  const styles: Record<string, string | number> = {
    '--fill-color': fillColor,
    '--stripe-color': stripeColor,
    '--stripe-speed': `${variant.speed}s`,
    width: '50%',
    height: '100%',
    position: 'absolute' as const,
    top: '0' as const,
    left: '0' as const,
    bottom: '0' as const
  }

  if (variant.type !== 'striped') {
    styles.backgroundColor = fillColor
    styles.transition = 'width 0.3s ease'
  }

  return styles
}

const getLabelStyles = (variant: ProgressVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily
  return {
    color: isDark.value ? variant.dark.labelColor : variant.labelColor,
    fontFamily,
    fontSize: `${variant.labelFontSize.value}${variant.labelFontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    textAlign: 'center' as const,
    position: 'absolute' as const,
    top: '50%' as const,
    left: '50%' as const,
    transform: 'translate(-50%, -50%)' as const,
    zIndex: 10 as const,
    pointerEvents: 'none' as const,
    display: variant.showLabel ? 'block' : 'none'
  }
}

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)
</script>

<template>
  <div class="progress-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in progressStore.variants" :key="index" class="col-12 col-xl-6">
        <div
          class="card"
          :style="getCompensation()"
          :class="{ 'border-primary': progressStore.selectedVariantIndex === index }"
          style="cursor: pointer"
          @click="progressStore.selectVariant(index)"
        >
          <div class="card-body">
            <div class="preview-progress-container" :style="getContainerStyles(variant)">
              <div class="preview-progress-track" :style="getTrackStyles(variant)">
                <div class="preview-progress-inset-overlay" :style="getInsetOverlayStyles(variant)"></div>
                <div
                  class="preview-progress-fill"
                  :class="{
                    'progress-fill--striped': variant.type === 'striped',
                    'progress-fill--animated': variant.type === 'striped' && variant.speed > 0
                  }"
                  :style="getFillStyles(variant)"
                />
                <div class="preview-progress-label" :style="getLabelStyles(variant)">50%</div>
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
