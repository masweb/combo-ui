<script setup lang="ts">
import type { BorderValue, UnitNumber } from '@/types/generics'

const { t } = useI18n()

const props = defineProps<{
  hoverBackground?: string
  hoverColor?: string
  hoverBorder?: BorderValue
  activeBackground?: string
  activeColor?: string
  activeBorder?: BorderValue
  focusColor?: string
  focusOffset?: UnitNumber
  disabledBackground?: string
  disabledColor?: string
  disabledBorder?: BorderValue
  disabledOpacity?: number
  showFocus?: boolean
  showDisabled?: boolean
}>()

const emit = defineEmits<{
  'update:hoverBackground': [value: string]
  'update:hoverColor': [value: string]
  'update:hoverBorder': [value: BorderValue]
  'update:activeBackground': [value: string]
  'update:activeColor': [value: string]
  'update:activeBorder': [value: BorderValue]
  'update:focusColor': [value: string]
  'update:focusOffset': [value: UnitNumber]
  'update:disabledBackground': [value: string]
  'update:disabledColor': [value: string]
  'update:disabledBorder': [value: BorderValue]
  'update:disabledOpacity': [value: number]
  'update:showFocus': [value: boolean]
  'update:showDisabled': [value: boolean]
}>()

const updateFocusOffsetValue = (value: number) => {
  if (props.focusOffset) {
    emit('update:focusOffset', { ...props.focusOffset, value } as UnitNumber)
  }
}

const updateFocusOffsetUnit = (unit: string) => {
  if (props.focusOffset) {
    emit('update:focusOffset', { ...props.focusOffset, unit } as UnitNumber)
  }
}

const updateOpacity = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value)
  emit('update:disabledOpacity', Math.max(0, Math.min(1, value)))
}
</script>

<template>
  <SettingsSection :title="t('common.hover')" :initial-open="false">
    <ColorField
      v-if="hoverBackground !== undefined"
      :label="t('common.background')"
      :model-value="hoverBackground"
      @update:model-value="emit('update:hoverBackground', $event)"
    />
    <ColorField
      v-if="hoverColor !== undefined"
      :label="t('common.textColor')"
      :model-value="hoverColor"
      @update:model-value="emit('update:hoverColor', $event)"
    />
    <BorderField
      v-if="hoverBorder !== undefined"
      :label="t('common.border')"
      :model-value="hoverBorder"
      @update:model-value="emit('update:hoverBorder', $event)"
    />
  </SettingsSection>

  <SettingsSection :title="t('common.active')" :initial-open="false">
    <ColorField
      v-if="activeBackground !== undefined"
      :label="t('common.background')"
      :model-value="activeBackground"
      @update:model-value="emit('update:activeBackground', $event)"
    />
    <ColorField
      v-if="activeColor !== undefined"
      :label="t('common.textColor')"
      :model-value="activeColor"
      @update:model-value="emit('update:activeColor', $event)"
    />
    <BorderField
      v-if="activeBorder !== undefined"
      :label="t('common.border')"
      :model-value="activeBorder"
      @update:model-value="emit('update:activeBorder', $event)"
    />
  </SettingsSection>

  <SettingsSection v-if="focusColor !== undefined" :title="t('common.focus')" :initial-open="false">
    <div class="mb-2">
      <SwitchField
        :label="t('common.showFocus')"
        :model-value="showFocus ?? false"
        @update:model-value="emit('update:showFocus', $event)"
      />
    </div>
    <ColorField
      :label="t('common.focusColor')"
      :model-value="focusColor"
      @update:model-value="emit('update:focusColor', $event)"
    />
    <NumberUnitField
      v-if="focusOffset"
      :label="t('common.focusOffset')"
      :model-value="focusOffset.value"
      :unit="focusOffset.unit"
      :units="['px', 'em', 'rem']"
      @update:model-value="updateFocusOffsetValue"
      @update:unit="updateFocusOffsetUnit"
    />
  </SettingsSection>

  <SettingsSection
    v-if="disabledBackground !== undefined || disabledColor !== undefined"
    :title="t('common.disabled')"
    :initial-open="false"
  >
    <div class="mb-2">
      <SwitchField
        :label="t('common.showDisabled')"
        :model-value="showDisabled ?? false"
        @update:model-value="emit('update:showDisabled', $event)"
      />
    </div>
    <ColorField
      v-if="disabledBackground !== undefined"
      :label="t('common.background')"
      :model-value="disabledBackground"
      @update:model-value="emit('update:disabledBackground', $event)"
    />
    <ColorField
      v-if="disabledColor !== undefined"
      :label="t('common.textColor')"
      :model-value="disabledColor"
      @update:model-value="emit('update:disabledColor', $event)"
    />
    <div v-if="disabledOpacity !== undefined" class="field-group">
      <label class="field-label">{{ t('common.opacity') }}</label>
      <input
        v-wheel-number
        type="number"
        class="form-control form-control-sm"
        step="0.01"
        min="0"
        max="1"
        :value="disabledOpacity"
        @input="updateOpacity"
      />
    </div>
    <BorderField
      v-if="disabledBorder !== undefined"
      :label="t('common.border')"
      :model-value="disabledBorder"
      @update:model-value="emit('update:disabledBorder', $event)"
    />
  </SettingsSection>
</template>
