<script setup lang="ts">
import { usePreviewContrast } from '@/composables/usePreviewContrast'

const badgeStore = useBadgeStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()
const { cardClass, contrastClass } = usePreviewContrast()

const buildShadow = (variant: BadgeVariant): string => {
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

  return shadows.length > 0 ? shadows.join(', ') : 'none'
}

const getBadgeStyles = (variant: BadgeVariant) => {
  const bg = isDark.value ? variant.dark.background : variant.background
  const color = isDark.value ? variant.dark.color : variant.color
  const borderColor = isDark.value ? variant.dark.borderColor : variant.border.color

  const radius = variant.borderRadius.linked
    ? `${variant.borderRadius.tl}${variant.borderRadius.unit}`
    : `${variant.borderRadius.tl}${variant.borderRadius.unit} ${variant.borderRadius.tr}${variant.borderRadius.unit} ${variant.borderRadius.br}${variant.borderRadius.unit} ${variant.borderRadius.bl}${variant.borderRadius.unit}`

  const padding = `${variant.padding.top}${variant.padding.unit} ${variant.padding.right}${variant.padding.unit} ${variant.padding.bottom}${variant.padding.unit} ${variant.padding.left}${variant.padding.unit}`

  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
    backgroundColor: bg,
    color,
    borderStyle: variant.border.style,
    borderWidth: `${variant.border.width}${variant.border.unit}`,
    borderColor,
    borderRadius: radius,
    padding,
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: `${variant.letterSpacing.value}${variant.letterSpacing.unit}`,
    boxShadow: buildShadow(variant),
    display: 'inline-block',
    verticalAlign: 'baseline'
  }
}
</script>

<template>
  <div class="badge-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in badgeStore.variants" :key="index" class="col-md-6 col-lg-4 col-xl-3">
        <div
          class="card"
          :class="[cardClass, { 'border-primary': badgeStore.selectedVariantIndex === index }]"
          style="cursor: pointer"
          @click="badgeStore.selectVariant(index)"
        >
          <div class="card-body d-flex align-items-center justify-content-center">
            <span class="preview-badge" :style="getBadgeStyles(variant)"> Badge </span>
          </div>
          <div class="card-footer text-center">
            <small :class="contrastClass">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
