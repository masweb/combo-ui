<script setup lang="ts">
import type { ShadowValue, ComponentShadows } from '@/types/generics'

const { t } = useI18n()

const props = defineProps<{
  modelValue: ComponentShadows | undefined
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ComponentShadows | undefined]
}>()

const defaultShadow = (): ShadowValue => ({
  enabled: true,
  offsetX: 0,
  offsetY: 4,
  blur: 12,
  spread: 0,
  color: 'rgba(0,0,0,0.15)'
})

const hasOffset = computed(() => props.modelValue?.offset?.enabled ?? false)
const hasInset = computed(() => props.modelValue?.inset?.enabled ?? false)

const offsetShadow = computed(() => props.modelValue?.offset ?? defaultShadow())
const insetShadow = computed(() => props.modelValue?.inset ?? defaultShadow())

const toggleOffset = (enabled: boolean) => {
  const current = props.modelValue ?? {}
  if (enabled) {
    emit('update:modelValue', {
      ...current,
      offset: { ...defaultShadow(), enabled: true }
    })
  } else {
    // Emitir undefined explícitamente para offset para que deepMerge lo elimine
    emit('update:modelValue', {
      ...current,
      offset: undefined
    } as ComponentShadows | undefined)
  }
}

const toggleInset = (enabled: boolean) => {
  const current = props.modelValue ?? {}
  if (enabled) {
    emit('update:modelValue', {
      ...current,
      inset: { ...defaultShadow(), enabled: true }
    })
  } else {
    // Emitir undefined explícitamente para inset para que deepMerge lo elimine
    emit('update:modelValue', {
      ...current,
      inset: undefined
    } as ComponentShadows | undefined)
  }
}

const updateOffset = (patch: Partial<ShadowValue>) => {
  const current = props.modelValue ?? {}
  emit('update:modelValue', {
    ...current,
    offset: { ...offsetShadow.value, ...patch }
  })
}

const updateInset = (patch: Partial<ShadowValue>) => {
  const current = props.modelValue ?? {}
  emit('update:modelValue', {
    ...current,
    inset: { ...insetShadow.value, ...patch }
  })
}
</script>

<template>
  <div class="shadow-field">
    <div class="mb-2">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <label class="field-label mb-0">{{ t('settings.shadowOffset') }}</label>
        <SwitchField :model-value="hasOffset" @update:model-value="toggleOffset" />
      </div>
      <div v-if="hasOffset" class="shadow-slot">
        <div class="shadow-slot-body">
          <div class="shadow-row">
            <label class="field-label-inline">X</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="offsetShadow.offsetX"
              @input="updateOffset({ offsetX: Number(($event.target as HTMLInputElement).value) })"
            />
            <label class="field-label-inline">Y</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="offsetShadow.offsetY"
              @input="updateOffset({ offsetY: Number(($event.target as HTMLInputElement).value) })"
            />
          </div>
          <div class="shadow-row">
            <label class="field-label-inline">{{ t('settings.blur') }}</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              min="0"
              :value="offsetShadow.blur"
              @input="updateOffset({ blur: Math.max(0, Number(($event.target as HTMLInputElement).value)) })"
            />
            <label class="field-label-inline">{{ t('settings.spread') }}</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="offsetShadow.spread"
              @input="updateOffset({ spread: Number(($event.target as HTMLInputElement).value) })"
            />
          </div>
          <ColorField
            :label="t('settings.color')"
            :model-value="offsetShadow.color"
            @update:model-value="updateOffset({ color: $event })"
          />
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex align-items-center justify-content-between mb-2">
        <label class="field-label mb-0">{{ t('settings.shadowInset') }}</label>
        <SwitchField :model-value="hasInset" @update:model-value="toggleInset" />
      </div>
      <div v-if="hasInset" class="shadow-slot">
        <div class="shadow-slot-body">
          <div class="shadow-row">
            <label class="field-label-inline">X</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="insetShadow.offsetX"
              @input="updateInset({ offsetX: Number(($event.target as HTMLInputElement).value) })"
            />
            <label class="field-label-inline">Y</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="insetShadow.offsetY"
              @input="updateInset({ offsetY: Number(($event.target as HTMLInputElement).value) })"
            />
          </div>
          <div class="shadow-row">
            <label class="field-label-inline">{{ t('settings.blur') }}</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              min="0"
              :value="insetShadow.blur"
              @input="updateInset({ blur: Math.max(0, Number(($event.target as HTMLInputElement).value)) })"
            />
            <label class="field-label-inline">{{ t('settings.spread') }}</label>
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="insetShadow.spread"
              @input="updateInset({ spread: Number(($event.target as HTMLInputElement).value) })"
            />
          </div>
          <ColorField
            :label="t('settings.color')"
            :model-value="insetShadow.color"
            @update:model-value="updateInset({ color: $event })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
