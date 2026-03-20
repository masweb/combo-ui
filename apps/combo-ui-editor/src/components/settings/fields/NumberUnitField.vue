<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: number
  unit: string
  units: string[]
  min?: number
  allowNegative?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'update:unit': [unit: string]
}>()

const isRelative = computed(() => props.unit !== 'px')
const step = computed(() => (isRelative.value ? 0.1 : 1))

const round = (v: number) => (isRelative.value ? Math.round(v * 10) / 10 : Math.round(v))

const clamp = (v: number) => {
  const rounded = round(v)
  if (props.allowNegative) return rounded
  const minimum = props.min ?? 0
  return Math.max(minimum, rounded)
}

const onInput = (e: Event) => {
  emit('update:modelValue', clamp(Number((e.target as HTMLInputElement).value)))
}

const onUnitChange = (e: Event) => {
  emit('update:unit', (e.target as HTMLSelectElement).value)
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
        :value="modelValue"
        @input="onInput"
      />
      <select class="form-select form-select-sm border-unit-select" :value="unit" @change="onUnitChange">
        <option v-for="u in units" :key="u" :value="u">{{ u }}</option>
      </select>
    </div>
  </div>
</template>
