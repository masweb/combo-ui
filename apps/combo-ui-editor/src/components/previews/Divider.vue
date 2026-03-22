<script setup lang="ts">
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import type { DividerVariant } from '@/types/divider'

const dividerStore = useDividerStore()
const { typographyStore, isDark } = usePreviewGrid()

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)

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
          :class="{ 'border-primary': dividerStore.selectedVariantIndex === index }"
          style="cursor: pointer"
          @click="dividerStore.selectVariant(index)"
        >
          <div class="card-body">
            <div class="d-flex flex-column gap-2">
              <p class="mb-0" :style="{ color: labelColor, opacity: 0.8 }">Content above divider</p>
              <hr class="preview-divider" :style="getDividerStyles(variant)" />
              <p class="mb-0" :style="{ color: labelColor, opacity: 0.8 }">Content below divider</p>
            </div>
          </div>
          <div class="card-footer text-center">
            <small :style="{ color: labelColor }">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
