<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: TextAlign
}>()

const emit = defineEmits<{
  'update:modelValue': [value: TextAlign]
}>()
</script>

<template>
  <div class="field-group">
    <label class="field-label">{{ label }}</label>
    <div class="btn-group btn-group-sm">
      <button
        type="button"
        class="btn btn-sm"
        :class="modelValue === 'left' ? 'btn-secondary' : 'btn-outline-secondary'"
        @click="emit('update:modelValue', 'left')"
        title="Left"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="modelValue === 'center' ? 'btn-secondary' : 'btn-outline-secondary'"
        @click="emit('update:modelValue', 'center')"
        title="Center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="6" y1="12" x2="18" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      <button
        type="button"
        class="btn btn-sm"
        :class="modelValue === 'right' ? 'btn-secondary' : 'btn-outline-secondary'"
        @click="emit('update:modelValue', 'right')"
        title="Right"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="9" y1="12" x2="21" y2="12" />
          <line x1="6" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  </div>
</template>
