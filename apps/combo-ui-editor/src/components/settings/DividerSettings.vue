<script setup lang="ts">
import VariantHeader from './VariantHeader.vue'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { TreeUnit, FourUnit } from '@/types/generics'
import type { DividerVariant, DarkDivider } from '@/types/divider'

const { t } = useI18n()
const dividerStore = useDividerStore()
const { isDark } = useComponentTheme()

const { patch, patchDark } = useDualModePatch<DividerVariant, DarkDivider>({
  selectedVariant: computed(() => dividerStore.selectedVariant),
  selectedVariantIndex: computed(() => dividerStore.selectedVariantIndex),
  updateVariant: dividerStore.updateVariant
})

const variant = computed(() => dividerStore.selectedVariant)

const updateWidthValue = (value: number) => {
  if (variant.value) {
    patch({ width: { ...variant.value.width, value } })
  }
}

const updateWidthUnit = (unit: string) => {
  if (variant.value) {
    patch({ width: { ...variant.value.width, unit: unit as FourUnit } })
  }
}

const updateSpacingValue = (value: number) => {
  if (variant.value) {
    patch({ spacing: { ...variant.value.spacing, value } })
  }
}

const updateSpacingUnit = (unit: string) => {
  if (variant.value) {
    patch({ spacing: { ...variant.value.spacing, unit: unit as TreeUnit } })
  }
}
</script>

<template>
  <VariantHeader
    :variant-name="variant?.name"
    :can-delete="dividerStore.variants.length > 1"
    @update:name="patch({ name: $event })"
    @delete="dividerStore.deleteVariant(dividerStore.selectedVariantIndex)"
    @add="dividerStore.addVariant"
  />

  <div v-if="variant">
    <!-- LIGHT MODE SETTINGS -->
    <template v-if="!isDark">
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <BorderField
          :label="t('common.border')"
          :model-value="variant.border"
          @update:model-value="patch({ border: $event })"
        />
        <NumberUnitField
          :label="t('common.width')"
          :model-value="variant.width.value"
          :unit="variant.width.unit"
          :units="['px', '%', 'em', 'rem']"
          @update:model-value="updateWidthValue"
          @update:unit="updateWidthUnit"
        />
        <NumberUnitField
          :label="t('common.spacing')"
          :model-value="variant.spacing.value"
          :unit="variant.spacing.unit"
          :units="['px', 'em', 'rem']"
          @update:model-value="updateSpacingValue"
          @update:unit="updateSpacingUnit"
        />
      </SettingsSection>
    </template>

    <!-- DARK MODE SETTINGS -->
    <template v-else>
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.borderColor"
          @update:model-value="patchDark({ borderColor: $event })"
        />
      </SettingsSection>
    </template>
  </div>
</template>
