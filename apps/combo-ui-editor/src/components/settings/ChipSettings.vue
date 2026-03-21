<script setup lang="ts">
import { BaseFields, TypographyFields } from '@/components/shared'
import VariantHeader from './VariantHeader.vue'
import DarkModeShadowsSettings from './DarkModeShadowsSettings.vue'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { DarkChip } from '@/types/chip'

const { t } = useI18n()
const chipStore = useChipStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()

const { patch, patchDark } = useDualModePatch<ChipVariant, DarkChip>({
  selectedVariant: computed(() => chipStore.selectedVariant),
  selectedVariantIndex: computed(() => chipStore.selectedVariantIndex),
  updateVariant: chipStore.updateVariant
})

const variant = computed(() => chipStore.selectedVariant)
</script>

<template>
  <VariantHeader
    :variant-name="variant?.name"
    :can-delete="chipStore.variants.length > 1"
    @update:name="patch({ name: $event })"
    @delete="chipStore.deleteVariant(chipStore.selectedVariantIndex)"
    @add="chipStore.addVariant"
  />

  <div v-if="variant">
    <template v-if="!isDark">
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <BaseFields
          :background="variant.background"
          :color="variant.color"
          :border="variant.border"
          :border-radius="variant.borderRadius"
          :padding="variant.padding"
          @update:background="patch({ background: $event })"
          @update:color="patch({ color: $event })"
          @update:border="patch({ border: $event })"
          @update:border-radius="patch({ borderRadius: $event })"
          @update:padding="patch({ padding: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.typography')" :initial-open="false">
        <TypographyFields
          :font-family="variant.fontFamily ?? null"
          :font-style="variant.fontStyle"
          :font-weight="variant.fontWeight"
          :font-size="variant.fontSize"
          :letter-spacing="variant.letterSpacing"
          :global-font-family="typographyStore.effectiveFontFamily"
          @update:font-family="patch({ fontFamily: $event })"
          @update:font-style="patch({ fontStyle: $event })"
          @update:font-weight="patch({ fontWeight: $event })"
          @update:font-size="patch({ fontSize: $event })"
          @update:letter-spacing="patch({ letterSpacing: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('settings.closeButton')" :initial-open="false">
        <ColorField
          :label="t('settings.closeColor')"
          :model-value="variant.closeColor"
          @update:model-value="patch({ closeColor: $event })"
        />
        <ColorField
          :label="t('settings.closeHoverColor')"
          :model-value="variant.closeHoverColor"
          @update:model-value="patch({ closeHoverColor: $event })"
        />
        <ColorField
          :label="t('settings.closeActiveColor')"
          :model-value="variant.closeActiveColor"
          @update:model-value="patch({ closeActiveColor: $event })"
        />
        <FontSizeField
          :label="t('settings.closeSize')"
          :model-value="variant.closeSize"
          @update:model-value="patch({ closeSize: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.shadow')" :initial-open="false">
        <ShadowField :model-value="variant.shadows" @update:model-value="patch({ shadows: $event })" />
      </SettingsSection>
    </template>

    <template v-else>
      <SettingsSection :title="t('common.base')" :initial-open="false">
        <ColorField
          :label="t('common.background')"
          :model-value="variant.dark.background"
          @update:model-value="patchDark({ background: $event })"
        />
        <ColorField
          :label="t('common.color')"
          :model-value="variant.dark.color"
          @update:model-value="patchDark({ color: $event })"
        />
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.borderColor"
          @update:model-value="patchDark({ borderColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('settings.closeButton')" :initial-open="false">
        <ColorField
          :label="t('settings.closeColor')"
          :model-value="variant.dark.closeColor"
          @update:model-value="patchDark({ closeColor: $event })"
        />
        <ColorField
          :label="t('settings.closeHoverColor')"
          :model-value="variant.dark.closeHoverColor"
          @update:model-value="patchDark({ closeHoverColor: $event })"
        />
        <ColorField
          :label="t('settings.closeActiveColor')"
          :model-value="variant.dark.closeActiveColor"
          @update:model-value="patchDark({ closeActiveColor: $event })"
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
