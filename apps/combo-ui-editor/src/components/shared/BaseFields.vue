<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  background: string
  color: string
  border: BorderValue
  borderRadius: BorderRadiusValue
  padding: PaddingValue
}>()

const emit = defineEmits<{
  'update:background': [value: string]
  'update:color': [value: string]
  'update:border': [value: BorderValue]
  'update:borderRadius': [value: BorderRadiusValue]
  'update:padding': [value: PaddingValue]
}>()
</script>

<template>
  <ColorField
    :label="t('common.background')"
    :model-value="background"
    @update:model-value="emit('update:background', $event)"
  />
  <ColorField :label="t('common.textColor')" :model-value="color" @update:model-value="emit('update:color', $event)" />
  <BorderField :label="t('common.border')" :model-value="border" @update:model-value="emit('update:border', $event)" />
  <BorderRadiusField
    :label="t('common.borderRadius')"
    :model-value="borderRadius"
    @update:model-value="emit('update:borderRadius', $event)"
  />
  <PaddingField
    :label="t('common.padding')"
    :model-value="padding"
    @update:model-value="emit('update:padding', $event)"
  />
</template>
