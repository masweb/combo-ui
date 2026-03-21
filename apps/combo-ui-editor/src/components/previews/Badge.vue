<script setup lang="ts">
import { usePreviewGrid } from '@/composables/usePreviewGrid'

const badgeStore = useBadgeStore()
const {
  cardClass,
  contrastClass,
  typographyStore,
  buildBorderRadius,
  buildPadding,
  buildShadow,
  buildBorderCSS,
  resolveColor
} = usePreviewGrid()

const getBadgeStyles = (variant: BadgeVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
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
