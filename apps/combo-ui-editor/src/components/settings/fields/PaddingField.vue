<script setup lang="ts">
import { IconLock, IconLockOpen } from '@tabler/icons-vue'

const props = defineProps<{
  label: string
  modelValue: PaddingValue
}>()

const emit = defineEmits<{
  'update:modelValue': [value: PaddingValue]
}>()

const PADDING_UNITS: TreeUnit[] = ['px', 'em', 'rem']

const isRelative = computed(() => props.modelValue.unit !== 'px')
const step = computed(() => (isRelative.value ? 0.1 : 1))

const round = (v: number) => (isRelative.value ? Math.round(v * 10) / 10 : Math.round(v))
const clamp = (v: number) => Math.max(0, round(v))

const patch = (partial: Partial<PaddingValue>) => emit('update:modelValue', { ...props.modelValue, ...partial })

const setUnit = (unit: TreeUnit) => patch({ unit })

const toggleV = () => {
  const linkedV = !props.modelValue.linkedV
  patch(linkedV ? { linkedV, bottom: props.modelValue.top } : { linkedV })
}

const toggleH = () => {
  const linkedH = !props.modelValue.linkedH
  patch(linkedH ? { linkedH, left: props.modelValue.right } : { linkedH })
}

const setTop = (v: number) => (props.modelValue.linkedV ? patch({ top: v, bottom: v }) : patch({ top: v }))
const setBottom = (v: number) => (props.modelValue.linkedV ? patch({ top: v, bottom: v }) : patch({ bottom: v }))
const setRight = (v: number) => (props.modelValue.linkedH ? patch({ right: v, left: v }) : patch({ right: v }))
const setLeft = (v: number) => (props.modelValue.linkedH ? patch({ right: v, left: v }) : patch({ left: v }))

const onInput = (fn: (v: number) => void) =>  (e: Event) => fn(clamp(Number((e.target as HTMLInputElement).value)))
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-1">
      <label class="field-label mb-0">{{ label }}</label>
      <select
        class="form-select form-select-sm radius-unit-select"
        :value="modelValue.unit"
        @change="setUnit(($event.target as HTMLSelectElement).value as TreeUnit)"
      >
        <option v-for="u in PADDING_UNITS" :key="u" :value="u">{{ u }}</option>
      </select>
    </div>

    <!-- Vertical: Top + Bottom -->
    <div class="padding-axis-row">
      <button
        class="btn btn-sm"
        :class="modelValue.linkedV ? 'btn-secondary' : 'btn-outline-secondary'"
        title="Sincronizar vertical"
        @click="toggleV"
      >
        <IconLock v-if="modelValue.linkedV" :size="13" :stroke-width="2" />
        <IconLockOpen v-else :size="13" :stroke-width="2" />
      </button>
      <div class="padding-axis-inputs">
        <div class="padding-input-wrap">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            min="0"
            :step="step"
            :value="modelValue.top"
            @input="onInput(setTop)($event)"
          />
          <span class="padding-input-label">T</span>
        </div>
        <div class="padding-input-wrap">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            min="0"
            :step="step"
            :value="modelValue.bottom"
            :disabled="modelValue.linkedV"
            @input="onInput(setBottom)($event)"
          />
          <span class="padding-input-label">B</span>
        </div>
      </div>

      <button
        class="btn btn-sm"
        :class="modelValue.linkedH ? 'btn-secondary' : 'btn-outline-secondary'"
        title="Sincronizar horizontal"
        @click="toggleH"
      >
        <IconLock v-if="modelValue.linkedH" :size="13" :stroke-width="2" />
        <IconLockOpen v-else :size="13" :stroke-width="2" />
      </button>
      <div class="padding-axis-inputs">
        <div class="padding-input-wrap">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            min="0"
            :step="step"
            :value="modelValue.right"
            @input="onInput(setRight)($event)"
          />
          <span class="padding-input-label">R</span>
        </div>
        <div class="padding-input-wrap">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            min="0"
            :step="step"
            :value="modelValue.left"
            :disabled="modelValue.linkedH"
            @input="onInput(setLeft)($event)"
          />
          <span class="padding-input-label">L</span>
        </div>
      </div>
    </div>
  </div>
</template>
