<script setup lang="ts">
import VariantHeader from './VariantHeader.vue'
import DarkModeShadowsSettings from './DarkModeShadowsSettings.vue'
import { useDualModePatch } from '@/composables/useDualModePatch'
import { useUnitNumberUpdates } from '@/composables/useUnitNumberUpdates'
import type { ProgressType, FontStyle } from '@/types/generics'
import type { ProgressVariant, DarkProgress } from '@/types/progress'

const { t } = useI18n()
const progressStore = useProgressStore()
const { isDark } = useComponentTheme()

const { patch, patchDark } = useDualModePatch<ProgressVariant, DarkProgress>({
  selectedVariant: computed(() => progressStore.selectedVariant),
  selectedVariantIndex: computed(() => progressStore.selectedVariantIndex),
  updateVariant: progressStore.updateVariant
})

const variant = computed(() => progressStore.selectedVariant)

const heightUpdates = useUnitNumberUpdates(patch, variant, 'height')
</script>

<template>
  <VariantHeader
    :variant-name="variant?.name"
    :can-delete="progressStore.variants.length > 1"
    @update:name="patch({ name: $event })"
    @delete="progressStore.deleteVariant(progressStore.selectedVariantIndex)"
    @add="progressStore.addVariant"
  />

  <div v-if="variant">
    <!-- LIGHT MODE SETTINGS -->
    <template v-if="!isDark">
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <ColorField
          :label="t('common.background')"
          :model-value="variant.background"
          @update:model-value="patch({ background: $event })"
        />
        <BorderField
          :label="t('common.border')"
          :model-value="variant.border"
          @update:model-value="patch({ border: $event })"
        />
        <NumberUnitField
          :label="t('common.height')"
          :model-value="variant.height.value"
          :unit="variant.height.unit"
          :units="['px', 'em', 'rem']"
          @update:model-value="heightUpdates.updateValue"
          @update:unit="heightUpdates.updateUnit"
        />
        <BorderRadiusField
          :label="t('common.borderRadius')"
          :model-value="variant.borderRadius"
          @update:model-value="patch({ borderRadius: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.progress')" :initial-open="false">
        <ColorField
          :label="t('common.trackColor')"
          :model-value="variant.trackColor"
          @update:model-value="patch({ trackColor: $event })"
        />
        <ColorField
          :label="t('common.fillColor')"
          :model-value="variant.fillColor"
          @update:model-value="patch({ fillColor: $event })"
        />
        <ColorField
          :label="t('common.stripeColor')"
          :model-value="variant.stripeColor"
          @update:model-value="patch({ stripeColor: $event })"
        />
        <div class="mb-2">
          <SwitchField
            :label="t('common.showLabel')"
            :model-value="variant.showLabel"
            @update:model-value="patch({ showLabel: $event })"
          />
        </div>
        <ColorField
          :label="t('common.labelColor')"
          :model-value="variant.labelColor"
          @update:model-value="patch({ labelColor: $event })"
        />
        <div class="mb-2">
          <label class="form-label">{{ t('common.speed') }}</label>
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="variant.speed"
            min="0.1"
            step="0.1"
            @input="patch({ speed: parseFloat(($event.target as HTMLInputElement).value) })"
          />
        </div>
        <div class="mb-2">
          <label class="form-label">{{ t('common.type') }}</label>
          <select
            class="form-select form-select-sm"
            :value="variant.type"
            @change="patch({ type: ($event.target as HTMLSelectElement).value as ProgressType })"
          >
            <option value="bar">Bar</option>
            <option value="striped">Striped</option>
          </select>
        </div>
      </SettingsSection>

      <SettingsSection :title="t('common.label')" :initial-open="false">
        <FontFamilyField
          :font-family="variant.fontFamily ?? ''"
          :font-style="variant.fontStyle"
          :font-weight="variant.fontWeight"
          :allow-inherit="true"
          @update:font-family="patch({ fontFamily: $event || null })"
          @update:font-style="patch({ fontStyle: $event })"
          @update:font-weight="patch({ fontWeight: $event })"
        />
        <FontSizeField
          :label="t('common.fontSize')"
          :model-value="variant.labelFontSize"
          @update:model-value="patch({ labelFontSize: $event })"
        />
        <div class="mb-2">
          <label class="form-label">{{ t('common.fontStyle') }}</label>
          <select
            class="form-select form-select-sm"
            :value="variant.fontStyle"
            @change="patch({ fontStyle: ($event.target as HTMLSelectElement).value as FontStyle })"
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="form-label">{{ t('common.fontWeight') }}</label>
          <select
            class="form-select form-select-sm"
            :value="variant.fontWeight"
            @change="patch({ fontWeight: ($event.target as HTMLSelectElement).value })"
          >
            <option value="100">100 (Thin)</option>
            <option value="200">200 (Extra Light)</option>
            <option value="300">300 (Light)</option>
            <option value="400">400 (Regular)</option>
            <option value="500">500 (Medium)</option>
            <option value="600">600 (Semi Bold)</option>
            <option value="700">700 (Bold)</option>
            <option value="800">800 (Extra Bold)</option>
            <option value="900">900 (Black)</option>
          </select>
        </div>
      </SettingsSection>

      <SettingsSection :title="t('common.shadow')" :initial-open="false">
        <ShadowField :model-value="variant.shadows" @update:model-value="patch({ shadows: $event })" />
      </SettingsSection>
    </template>

    <!-- DARK MODE SETTINGS -->
    <template v-else>
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <ColorField
          :label="t('common.background')"
          :model-value="variant.dark.background"
          @update:model-value="patchDark({ background: $event })"
        />
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.borderColor"
          @update:model-value="patchDark({ borderColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.progress')" :initial-open="false">
        <ColorField
          :label="t('common.trackColor')"
          :model-value="variant.dark.trackColor"
          @update:model-value="patchDark({ trackColor: $event })"
        />
        <ColorField
          :label="t('common.fillColor')"
          :model-value="variant.dark.fillColor"
          @update:model-value="patchDark({ fillColor: $event })"
        />
        <ColorField
          :label="t('common.stripeColor')"
          :model-value="variant.dark.stripeColor"
          @update:model-value="patchDark({ stripeColor: $event })"
        />
        <ColorField
          :label="t('common.labelColor')"
          :model-value="variant.dark.labelColor"
          @update:model-value="patchDark({ labelColor: $event })"
        />
      </SettingsSection>

      <DarkModeShadowsSettings
        :shadow-color="variant.dark.shadowColor"
        :shadow-inset-color="variant.dark.shadowInsetColor"
        :shadow-inset-highlight-color="variant.dark.shadowInsetHighlightColor"
        @update:shadow-color="patchDark({ shadowColor: $event })"
        @update:shadow-inset-color="patchDark({ shadowInsetColor: $event })"
        @update:shadow-inset-highlight-color="patchDark({ shadowInsetHighlightColor: $event })"
      />
    </template>
  </div>
</template>
