<script setup lang="ts">
import { IconColorPicker } from '@tabler/icons-vue'

const { t } = useI18n()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()

const currentBackground = computed({
  get: () =>
    isDark.value ? typographyStore.globalConfig.dark.backgroundColor : typographyStore.globalConfig.backgroundColor,
  set: (value: string) => {
    if (isDark.value) {
      typographyStore.updateGlobalConfig({
        dark: { ...typographyStore.globalConfig.dark, backgroundColor: value }
      })
    } else {
      typographyStore.updateGlobalConfig({ backgroundColor: value })
    }
  }
})

const isOpen = ref(false)
const pickerRef = ref<HTMLElement | null>(null)

const handleColorChange = (color: string) => {
  if (isDark.value) {
    typographyStore.updateGlobalConfig({
      dark: { ...typographyStore.globalConfig.dark, backgroundColor: color }
    })
  } else {
    typographyStore.updateGlobalConfig({ backgroundColor: color })
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, open => {
  if (open) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const togglePicker = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div ref="pickerRef" class="preview-bg-picker">
    <button
      class="picker-trigger btn btn-sm btn-outline-secondary"
      :title="t('common.previewBackground')"
      @click="togglePicker"
    >
      <IconColorPicker :size="16" />
    </button>
    <div v-if="isOpen" class="picker-dropdown">
      <div class="picker-header">
        <small class="text-body-secondary">{{ t('common.previewBackground') }}</small>
        <small class="text-body-secondary ms-2">({{ isDark ? 'Dark' : 'Light' }})</small>
      </div>
      <ColorField :label="''" :model-value="currentBackground" @update:model-value="handleColorChange" />
    </div>
  </div>
</template>
