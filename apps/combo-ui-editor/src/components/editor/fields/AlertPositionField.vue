<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: Position
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Position]
}>()

const POSITIONS: Position[][] = [
  ['top-left', 'top-center', 'top-right'],
  ['center-left', 'center-center', 'center-right'],
  ['bottom-left', 'bottom-center', 'bottom-right']
]
</script>

<template>
  <div class="field-group">
    <label class="field-label">{{ label }}</label>
    <div class="alert-position-grid">
      <button
        v-for="pos in POSITIONS.flat()"
        :key="pos"
        type="button"
        class="alert-position-cell"
        :class="{ active: modelValue === pos }"
        :title="pos"
        @click="emit('update:modelValue', pos)"
      />
    </div>
  </div>
</template>
