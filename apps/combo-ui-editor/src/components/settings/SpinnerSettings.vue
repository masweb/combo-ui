<script setup lang="ts">
import VariantHeader from './VariantHeader.vue'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { DarkSpinner } from '@/types/spinner'

const { t } = useI18n()
const spinnerStore = useSpinnerStore()
const { isDark } = useComponentTheme()

const { patch, patchDark } = useDualModePatch<SpinnerVariant, DarkSpinner>({
  selectedVariant: computed(() => spinnerStore.selectedVariant),
  selectedVariantIndex: computed(() => spinnerStore.selectedVariantIndex),
  updateVariant: spinnerStore.updateVariant
})

const variant = computed(() => spinnerStore.selectedVariant)

const SPINNER_TYPES = ['ring', 'pulse', 'dots', 'bars', 'dual'] as const

const showTrackColor = computed(() => {
  const v = variant.value
  if (!v) return false
  return ['ring', 'pulse', 'dual'].includes(v.type)
})

const onSpeedInput = (e: Event) => {
  const raw = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(raw) && raw > 0) {
    patch({ speed: Math.round(raw * 10) / 10 })
  }
}
</script>

<template>
  <VariantHeader
    :variant-name="variant?.name"
    :can-delete="spinnerStore.variants.length > 1"
    @update:name="patch({ name: $event })"
    @delete="spinnerStore.deleteVariant(spinnerStore.selectedVariantIndex)"
    @add="spinnerStore.addVariant"
  />

  <div v-if="variant">
    <template v-if="!isDark">
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <div class="mb-3">
          <label class="form-label">{{ t('settings.type') }}</label>
          <div class="btn-group btn-group-sm w-100">
            <button
              v-for="type in SPINNER_TYPES"
              :key="type"
              class="btn btn-sm"
              :class="variant.type === type ? 'btn-secondary' : 'btn-outline-secondary'"
              @click="patch({ type })"
            >
              {{ type }}
            </button>
          </div>
        </div>
        <ColorField
          :label="t('settings.color')"
          :model-value="variant.color"
          @update:model-value="patch({ color: $event })"
        />
        <ColorField
          v-if="showTrackColor"
          :label="t('settings.trackColor')"
          :model-value="variant.trackColor"
          @update:model-value="patch({ trackColor: $event })"
        />
        <FontSizeField
          :label="t('common.size')"
          :model-value="variant.size"
          @update:model-value="patch({ size: $event })"
        />
        <div class="mb-3">
          <label class="form-label">{{ t('settings.speed') }}</label>
          <div class="input-group input-group-sm">
            <input
              type="number"
              class="form-control"
              :value="variant.speed"
              min="0.1"
              max="10"
              step="0.1"
              v-wheel-number="0.1"
              @input="onSpeedInput"
            />
            <span class="input-group-text">s</span>
          </div>
        </div>
      </SettingsSection>
    </template>

    <template v-else>
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <ColorField
          :label="t('settings.color')"
          :model-value="variant.dark.color"
          @update:model-value="patchDark({ color: $event })"
        />
        <ColorField
          v-if="showTrackColor"
          :label="t('settings.trackColor')"
          :model-value="variant.dark.trackColor"
          @update:model-value="patchDark({ trackColor: $event })"
        />
      </SettingsSection>
    </template>
  </div>
</template>
