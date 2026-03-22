<script setup lang="ts">
const navigationStore = useNavigationStore()
const typographyStore = useTypographyStore()
const { isDark } = useComponentTheme()
const { previewComponents } = useComponentRegistry()

const currentPreviewComponent = computed(() => {
  if (!navigationStore.currentComponent) return null
  const id = navigationStore.currentComponent.id
  return id ? previewComponents[id] : null
})

const previewBackground = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.backgroundColor : typographyStore.globalConfig.backgroundColor
)
</script>

<template>
  <div class="preview-view p-4" :style="{ backgroundColor: previewBackground }">
    <PreviewBackgroundPicker />
    <component :is="currentPreviewComponent" />
  </div>
</template>
