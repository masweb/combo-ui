<script setup lang="ts">
import { IconLock, IconLockOpen } from '@tabler/icons-vue'

const props = defineProps<{
  label: string
  modelValue: BorderRadiusValue
}>()

const emit = defineEmits<{
  'update:modelValue': [value: BorderRadiusValue]
}>()

const RADIUS_UNITS: FourUnit[] = ['px', '%', 'em', 'rem']

const isRelative = computed(() => props.modelValue.unit !== 'px')
const step = computed(() => (isRelative.value ? 0.1 : 1))

const round = (v: number) => (isRelative.value ? Math.round(v * 10) / 10 : Math.round(v))
const clamp = (v: number) => Math.max(0, round(v))

const patch = (partial: Partial<BorderRadiusValue>) => emit('update:modelValue', { ...props.modelValue, ...partial })

const toggleLinked = () => patch({ linked: !props.modelValue.linked })

const setCorner = (corner: 'tl' | 'tr' | 'br' | 'bl', raw: number) => {
  const value = clamp(raw)
  if (props.modelValue.linked) {
    patch({ tl: value, tr: value, br: value, bl: value })
  } else {
    patch({ [corner]: value })
  }
}

const setUnit = (unit: FourUnit) => patch({ unit })

// Simple debounce implementation to avoid rapid updates during wheel/input
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const DEBOUNCE_MS = 50

const debouncedSetCorner = (corner: 'tl' | 'tr' | 'br' | 'bl', raw: number) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => setCorner(corner, raw), DEBOUNCE_MS)
}

// Stable function reference - no recreation on each render
const onCornerInput = (corner: 'tl' | 'tr' | 'br' | 'bl', e: Event) => {
  debouncedSetCorner(corner, Number((e.target as HTMLInputElement).value))
}

// Stable function reference for unit change
const onUnitChange = (e: Event) => {
  setUnit((e.target as HTMLSelectElement).value as FourUnit)
}

// Clean up pending debounce on unmount
onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<template>
  <div class="border-radius-field field-group">
    <div class="d-flex align-items-center justify-content-between mb-1">
      <label class="field-label mb-0">{{ label }}</label>
      <div class="d-flex align-items-center">
        <select
          class="form-select form-select-sm radius-unit-select"
          :value="modelValue.unit"
          @change="onUnitChange"
        >
          <option v-for="u in RADIUS_UNITS" :key="u" :value="u">{{ u }}</option>
        </select>
        <button
          class="btn btn-sm radius-lock-btn"
          :class="modelValue.linked ? 'btn-secondary' : 'btn-outline-secondary'"
          :title="modelValue.linked ? 'Unlink corners' : 'Link all corners'"
          @click="toggleLinked"
        >
          <IconLock v-if="modelValue.linked" :size="13" :stroke-width="2" />
          <IconLockOpen v-else :size="13" :stroke-width="2" />
        </button>
      </div>
    </div>

    <div class="radius-grid">
      <div class="radius-cell">
        <input
          v-wheel-number
          type="number"
          class="form-control form-control-sm radius-input border-end-0"
          min="0"
          :step="step"
          :value="modelValue.tl"
          @input="(e) => onCornerInput('tl', e)"
        />
        <span class="radius-corner-label">TL</span>
      </div>
      <div class="radius-cell">
        <input
          v-wheel-number
          type="number"
          class="form-control form-control-sm radius-input border-end-0"
          min="0"
          :step="step"
          :value="modelValue.tr"
          @input="(e) => onCornerInput('tr', e)"
        />
        <span class="radius-corner-label">TR</span>
      </div>
      <div class="radius-cell">
        <input
          v-wheel-number
          type="number"
          class="form-control form-control-sm radius-input border-end-0"
          min="0"
          :step="step"
          :value="modelValue.bl"
          @input="(e) => onCornerInput('bl', e)"
        />
        <span class="radius-corner-label">BL</span>
      </div>
      <div class="radius-cell">
        <input
          v-wheel-number
          type="number"
          class="form-control form-control-sm radius-input"
          min="0"
          :step="step"
          :value="modelValue.br"
          @input="(e) => onCornerInput('br', e)"
        />
        <span class="radius-corner-label">BR</span>
      </div>
    </div>
  </div>
</template>
