<script setup lang="ts">
import SettingsSection from './fields/SettingsSection.vue'

interface Props {
  shadowColor: string
  shadowInsetColor: string
  shadowInsetHighlightColor: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:shadowColor': [value: string]
  'update:shadowInsetColor': [value: string]
  'update:shadowInsetHighlightColor': [value: string]
}>()

const { t } = useI18n()
</script>

<template>
  <SettingsSection :title="t('common.shadow')" :initial-open="false">
    <ColorField
      :label="t('settings.shadowOffset')"
      :model-value="props.shadowColor"
      @update:model-value="emit('update:shadowColor', $event)"
    />
    <ColorField
      :label="t('settings.shadowInset')"
      :model-value="props.shadowInsetColor"
      @update:model-value="emit('update:shadowInsetColor', $event)"
    />
    <ColorField
      :label="t('settings.shadowInsetHighlight')"
      :model-value="props.shadowInsetHighlightColor"
      @update:model-value="emit('update:shadowInsetHighlightColor', $event)"
    />
  </SettingsSection>
</template>
