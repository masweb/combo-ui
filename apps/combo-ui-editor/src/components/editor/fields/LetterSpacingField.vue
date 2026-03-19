<script setup lang="ts">
import type { LetterSpacingValue, TreeUnit } from '@/types/generics'

const props = defineProps<{
  label: string
  modelValue: LetterSpacingValue
}>()

const emit = defineEmits<{
  'update:modelValue': [value: LetterSpacingValue]
}>()

const UNITS: TreeUnit[] = ['px', 'em']

const isRelative = computed(() => props.modelValue.unit !== 'px')
const step = computed(() => (isRelative.value ? 0.01 : 1))

const round = (v: number) => (isRelative.value ? Math.round(v * 100) / 100 : Math.round(v))

const patch = (partial: Partial<LetterSpacingValue>) => emit('update:modelValue', { ...props.modelValue, ...partial })

const onInput = (e: Event) => {
  const raw = Number((e.target as HTMLInputElement).value)
  patch({ value: round(raw) })
}

const onUnitChange = (e: Event) => {
  const unit = (e.target as HTMLSelectElement).value as TreeUnit
  const current = props.modelValue.value
  const wasRelative = props.modelValue.unit !== 'px'
  const nowRelative = unit !== 'px'
  let value = current
  if (!wasRelative && nowRelative) value = Math.round((current / 16) * 100) / 100
  if (wasRelative && !nowRelative) value = Math.round(current * 16)
  patch({ unit, value })
}
</script>

<template>
  <div class="field-group">
    <label class="field-label">{{ label }}</label>
    <div class="border-field-row">
      <input
        v-wheel-number
        type="number"
        class="form-control form-control-sm"
        :step="step"
        :value="modelValue.value"
        @input="onInput"
      />
      <select class="form-select form-select-sm border-unit-select" :value="modelValue.unit" @change="onUnitChange">
        <option v-for="u in UNITS" :key="u" :value="u">{{ u }}</option>
      </select>
    </div>
  </div>
</template>
