<script setup lang="ts">
import { useTypographyStore } from '@/stores/typography'
import { usePreviewGrid } from '@/composables/usePreviewGrid'

const typographyStore = useTypographyStore()
const { isDark } = usePreviewGrid()

const getStyles = (variant: (typeof typographyStore.variants)[0]) => {
  const baseStyles: Record<string, string | number> = {
    fontFamily: typographyStore.getVariantFontFamily(variant),
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    letterSpacing: `${variant.letterSpacing.value}${variant.letterSpacing.unit}`,
    lineHeight: variant.lineHeight.unit
      ? `${variant.lineHeight.value}${variant.lineHeight.unit}`
      : variant.lineHeight.value,
    textTransform: variant.textTransform,
    textDecoration: variant.textDecoration,
    color: typographyStore.getVariantColor(variant, isDark.value),
    marginBottom: '0.5rem'
  }
  return baseStyles
}

const getTag = (name: string): string => {
  if (name.startsWith('h') && name.length === 2) return name
  if (name === 'small' || name === 'caption') return 'small'
  if (name === 'link') return 'a'
  return 'div'
}

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)
</script>

<template>
  <div class="typography-preview p-4">
    <div class="typography-variants">
      <div
        v-for="(variant, index) in typographyStore.sortedVariants"
        :key="variant.id"
        class="typography-item d-flex align-items-start gap-3 py-2 border-bottom"
        :class="{
          'bg-primary bg-opacity-10':
            typographyStore.variants.findIndex(v => v.id === variant.id) === typographyStore.selectedVariantIndex
        }"
        @click="typographyStore.selectVariant(typographyStore.variants.findIndex(v => v.id === variant.id))"
        style="cursor: pointer"
      >
        <div class="variant-label small" :style="{ minWidth: '80px', color: labelColor }">
          {{ variant.name }}
        </div>
        <component
          :is="getTag(variant.name)"
          :style="getStyles(variant)"
          :href="variant.name === 'link' ? '#' : undefined"
        >
          The quick brown fox jumps over the lazy dog
        </component>
      </div>
    </div>
  </div>
</template>
