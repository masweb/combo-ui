<script setup lang="ts">
const navigationStore = useNavigationStore()
const { previewComponents } = useComponentRegistry()
const { previewBackground } = useComponentTheme()
const currentPreviewComponent = computed(() => {
  if (!navigationStore.currentComponent) return null
  const id = navigationStore.currentComponent.id
  return id ? previewComponents[id] : null
})
</script>

<template>
  <div class="preview-view p-4" :style="{ backgroundColor: previewBackground }">
    <PreviewBackgroundPicker />
    <component :is="currentPreviewComponent" />
  </div>
</template>
s
