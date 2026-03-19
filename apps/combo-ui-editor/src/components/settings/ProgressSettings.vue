<script setup lang="ts">
import { IconPlus, IconTrash } from '@tabler/icons-vue'
import { useProgressStore } from '@/stores/progress'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { ProgressType, TreeUnit, FontStyle } from '@/types/generics'
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

const updateHeightValue = (value: number) => {
  if (variant.value) {
    patch({ height: { ...variant.value.height, value } })
  }
}

const updateHeightUnit = (unit: string) => {
  if (variant.value) {
    patch({ height: { ...variant.value.height, unit: unit as TreeUnit } })
  }
}
</script>

<template>
  <div class="d-flex align-items-center">
    <input
      type="text"
      class="form-control form-control-lgborder-start-0 border-0 border-bottom"
      :value="variant?.name"
      @input="patch({ name: ($event.target as HTMLInputElement).value })"
    />
    <div
      v-if="progressStore.variants.length > 1"
      class="px-3 border-start border-bottom cursor-pointer"
      style="height: 37px"
      @click="progressStore.deleteVariant(progressStore.selectedVariantIndex)"
    >
      <IconTrash :size="16" class="mt-2" />
    </div>
    <div class="px-3 border-start border-bottom cursor-pointer" style="height: 37px" @click="progressStore.addVariant">
      <IconPlus :size="16" class="mt-2" />
    </div>
  </div>

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
          @update:model-value="updateHeightValue($event)"
          @update:unit="updateHeightUnit($event)"
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

      <SettingsSection :title="t('common.shadow')" :initial-open="false">
        <ColorField
          :label="t('settings.shadowOffset')"
          :model-value="variant.dark.shadowColor"
          @update:model-value="patchDark({ shadowColor: $event })"
        />
        <ColorField
          :label="t('settings.shadowInset')"
          :model-value="variant.dark.shadowInsetColor"
          @update:model-value="patchDark({ shadowInsetColor: $event })"
        />
      </SettingsSection>
    </template>
  </div>
</template>
