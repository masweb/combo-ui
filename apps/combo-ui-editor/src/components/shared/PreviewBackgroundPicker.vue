<script setup lang="ts">
import { IconColorPicker } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isDark, lightBackground, darkBackground, setLightBackground, setDarkBackground } = useComponentTheme()

const currentBackground = computed({
  get: () => (isDark.value ? darkBackground.value : lightBackground.value),
  set: (value: string) => {
    if (isDark.value) {
      setDarkBackground(value)
    } else {
      setLightBackground(value)
    }
  }
})

const isOpen = ref(false)
const pickerRef = ref<HTMLElement | null>(null)

const handleColorChange = (color: string) => {
  if (isDark.value) {
    setDarkBackground(color)
  } else {
    setLightBackground(color)
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

<style scoped>
.preview-bg-picker {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1000;
}

.picker-trigger {
  background: var(--cui-body-bg);
  border-color: var(--cui-border-color);
}

.picker-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: var(--cui-body-bg);
  border: 1px solid var(--cui-border-color);
  border-radius: 0.375rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  min-width: 280px;
}

.picker-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
</style>
