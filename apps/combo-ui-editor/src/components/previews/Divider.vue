<script setup lang="ts">
import { usePreviewContrast } from '@/composables/usePreviewContrast'
import type { DividerVariant } from '@/types/divider'

const dividerStore = useDividerStore()
const { isDark } = useComponentTheme()
const { cardClass, contrastClass } = usePreviewContrast()

const getDividerStyles = (variant: DividerVariant) => {
  const borderColor = isDark.value ? variant.dark.borderColor : variant.border.color

  return {
    borderStyle: variant.border.style,
    borderWidth: `${variant.border.width}${variant.border.unit}`,
    borderColor,
    width: `${variant.width.value}${variant.width.unit}`,
    margin: `${variant.spacing.value}${variant.spacing.unit} auto`
  }
}
</script>

<template>
  <div class="divider-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in dividerStore.variants" :key="index" class="col-12">
        <div
          class="card"
          :class="[cardClass, { 'border-primary': dividerStore.selectedVariantIndex === index }]"
          style="cursor: pointer"
          @click="dividerStore.selectVariant(index)"
        >
          <div class="card-body">
            <div class="d-flex flex-column gap-2">
              <p class="mb-0" :class="contrastClass">Content above divider</p>
              <hr class="preview-divider" :style="getDividerStyles(variant)" />
              <p class="mb-0" :class="contrastClass">Content below divider</p>
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
