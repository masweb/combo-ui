<script setup lang="ts">
import { usePreviewContrast } from '@/composables/usePreviewContrast'
import { useStyleBuilder } from '@/composables/useStyleBuilder'

const avatarStore = useAvatarStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()
const { cardClass, contrastClass } = usePreviewContrast()
const { buildBorderRadius, buildShadow, buildBorderCSS, resolveColor } = useStyleBuilder(isDark)

const getAvatarStyles = (variant: AvatarVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
    backgroundColor: resolveColor(variant.background, variant.dark.background),
    color: resolveColor(variant.color, variant.dark.color),
    ...buildBorderCSS(variant.border, variant.dark.borderColor),
    borderRadius: buildBorderRadius(variant.borderRadius),
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: `${variant.letterSpacing.value}${variant.letterSpacing.unit}`,
    boxShadow: buildShadow(variant)
  }
}
</script>

<template>
  <div class="avatar-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in avatarStore.variants" :key="index" class="col-md-6 col-lg-4 col-xl-3">
        <div
          class="card"
          :class="[cardClass, { 'border-primary': avatarStore.selectedVariantIndex === index }]"
          style="cursor: pointer"
          @click="avatarStore.selectVariant(index)"
        >
          <div class="card-body d-flex align-items-center justify-content-center">
            <div class="preview-avatar" :style="getAvatarStyles(variant)">AB</div>
          </div>
          <div class="card-footer text-center">
            <small :class="contrastClass">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
