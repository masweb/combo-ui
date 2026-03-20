<script setup lang="ts">
type FontSizeValue = UnitNumber

const props = defineProps<{
  label: string
  modelValue: FontSizeValue
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FontSizeValue]
}>()

const UNITS: TreeUnit[] = ['px', 'em', 'rem']

const isRelative = computed(() => props.modelValue.unit !== 'px')
const step = computed(() => (isRelative.value ? 0.1 : 1))
const min = computed(() => (isRelative.value ? 0.1 : 1))

const round = (v: number) => (isRelative.value ? Math.round(v * 10) / 10 : Math.round(v))

const patch = (partial: Partial<FontSizeValue>) => emit('update:modelValue', { ...props.modelValue, ...partial })

const onInput = (e: Event) => {
  const raw = Number((e.target as HTMLInputElement).value)
  patch({ value: Math.max(min.value, round(raw)) })
}

const onUnitChange = (e: Event) => {
  const unit = (e.target as HTMLSelectElement).value as TreeUnit
  // Convert value when switching between px ↔ em/rem to keep roughly the same visual size
  const current = props.modelValue.value
  const wasRelative = props.modelValue.unit !== 'px'
  const nowRelative = unit !== 'px'
  let value = current
  if (!wasRelative && nowRelative) value = Math.round((current / 16) * 10) / 10 // px → em (base 16)
  if (wasRelative && !nowRelative) value = Math.round(current * 16) // em → px
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
        :min="min"
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
