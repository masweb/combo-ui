<script setup lang="ts">
import type { BorderStyle, TreeUnit, BorderValue } from '@/types/generics'

const props = defineProps<{
  label: string
  modelValue: BorderValue
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BorderValue]
}>()

const BORDER_STYLES: BorderStyle[] = [
  'none',
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset'
]
const BORDER_UNITS: TreeUnit[] = ['px', 'em', 'rem']

const patch = (partial: Partial<BorderValue>) => {
  emit('update:modelValue', { ...props.modelValue, ...partial })
}

const isDisabled = computed(() => props.modelValue.style === 'none')
</script>

<template>
  <div class="border-field field-group">
    <label class="field-label">{{ label }}</label>

    <!-- Style selector -->
    <div class="border-field-row">
      <select
        class="form-select form-select-sm border-end-0"
        :value="modelValue.style"
        @change="patch({ style: ($event.target as HTMLSelectElement).value as BorderStyle })"
      >
        <option v-for="s in BORDER_STYLES" :key="s" :value="s">{{ s }}</option>
      </select>

      <!-- Width + unit (hidden when none) -->
      <template v-if="!isDisabled">
        <input
          v-wheel-number
          type="number"
          class="form-control form-control-sm border-width-input border-end-0"
          min="0"
          max="99"
          :value="modelValue.width"
          @input="patch({ width: Math.max(0, Number(($event.target as HTMLInputElement).value)) })"
        />
        <select
          class="form-select form-select-sm border-unit-select border-end-0"
          :value="modelValue.unit"
          @change="patch({ unit: ($event.target as HTMLSelectElement).value as TreeUnit })"
        >
          <option v-for="u in BORDER_UNITS" :key="u" :value="u">{{ u }}</option>
        </select>
        <ColorField
          v-if="!isDisabled"
          label=" "
          :model-value="modelValue.color"
          @update:model-value="patch({ color: $event })"
        />
      </template>
    </div>

    <!-- Color (hidden when none) -->
  </div>
</template>
