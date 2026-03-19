<script setup lang="ts">
const nav = useNavigationStore()
const { previewComponents, settingsComponents } = useComponentRegistry()

const { t } = useI18n()

const currentSettingsComponent = computed(() => {
  if (!nav.currentComponent) return null
  const id = nav.currentComponent.id
  return id ? settingsComponents[id] : null
})
</script>

<template>
  <div class="side-panel border-end">
    <GoBack />
    <h4 class="mt-2 text-center mb-0 pb-2 border-bottom" v-if="nav.currentComponent">
      {{ t(`components.${nav.currentComponent.id}`) }}
    </h4>
    <ThemeToggle />
    <div class="sidebar-scroll-content">
      <component v-if="currentSettingsComponent" :is="currentSettingsComponent" />
    </div>
  </div>
</template>
