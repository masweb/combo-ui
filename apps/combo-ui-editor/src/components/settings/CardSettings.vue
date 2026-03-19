<script setup lang="ts">
import { IconPlus, IconTrash } from '@tabler/icons-vue'
import { BaseFields, TypographyFields, ThemeToggle } from '@/components/shared'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { DarkCard } from '@/types/card'

const { t } = useI18n()
const cardStore = useCardStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()

const { patch, patchDark } = useDualModePatch<CardVariant, DarkCard>({
  selectedVariant: computed(() => cardStore.selectedVariant),
  selectedVariantIndex: computed(() => cardStore.selectedVariantIndex),
  updateVariant: cardStore.updateVariant
})

const variant = computed(() => cardStore.selectedVariant)
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
      v-if="cardStore.variants.length > 1"
      class="px-3 border-start border-bottom cursor-pointer"
      style="height: 37px"
      @click="cardStore.deleteVariant(cardStore.selectedVariantIndex)"
    >
      <IconTrash :size="16" class="mt-2" />
    </div>
    <div class="px-3 border-start border-bottom cursor-pointer" style="height: 37px" @click="cardStore.addVariant">
      <IconPlus :size="16" class="mt-2" />
    </div>
  </div>

  <div v-if="variant">
    <!-- LIGHT MODE SETTINGS -->
    <template v-if="!isDark">
      <SettingsSection :title="t('common.base')" :initial-open="true">
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
        <TextAlignField
          :label="t('common.textAlign')"
          :model-value="variant.textAlign"
          @update:model-value="patch({ textAlign: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.header')" :initial-open="false">
        <ColorField
          :label="t('common.headerBackground')"
          :model-value="variant.headerBackground"
          @update:model-value="patch({ headerBackground: $event })"
        />
        <ColorField
          :label="t('common.headerColor')"
          :model-value="variant.headerColor"
          @update:model-value="patch({ headerColor: $event })"
        />
        <PaddingField
          :label="t('common.headerPadding')"
          :model-value="variant.headerPadding"
          @update:model-value="patch({ headerPadding: $event })"
        />
        <BorderField
          :label="t('common.headerBorder')"
          :model-value="variant.headerBorderBottom"
          @update:model-value="patch({ headerBorderBottom: $event })"
        />
        <TypographyFields
          :font-family="variant.headerFontFamily ?? null"
          :font-style="variant.headerFontStyle"
          :font-weight="variant.headerFontWeight"
          :font-size="variant.headerFontSize"
          :letter-spacing="variant.headerLetterSpacing"
          :global-font-family="typographyStore.effectiveFontFamily"
          @update:font-family="patch({ headerFontFamily: $event })"
          @update:font-style="patch({ headerFontStyle: $event })"
          @update:font-weight="patch({ headerFontWeight: $event })"
          @update:font-size="patch({ headerFontSize: $event })"
          @update:letter-spacing="patch({ headerLetterSpacing: $event })"
        />
        <TextAlignField
          :label="t('common.textAlign')"
          :model-value="variant.headerTextAlign"
          @update:model-value="patch({ headerTextAlign: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.shadow')" :initial-open="false">
        <ShadowField :model-value="variant.shadows" @update:model-value="patch({ shadows: $event })" />
      </SettingsSection>
    </template>

    <!-- DARK MODE SETTINGS -->
    <template v-else>
      <SettingsSection :title="t('common.base')" :initial-open="true">
        <ColorField
          :label="t('common.background')"
          :model-value="variant.dark.background"
          @update:model-value="patchDark({ background: $event })"
        />
        <ColorField
          :label="t('common.textColor')"
          :model-value="variant.dark.color"
          @update:model-value="patchDark({ color: $event })"
        />
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.borderColor"
          @update:model-value="patchDark({ borderColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.header')" :initial-open="false">
        <ColorField
          :label="t('common.headerBackground')"
          :model-value="variant.dark.headerBackground"
          @update:model-value="patchDark({ headerBackground: $event })"
        />
        <ColorField
          :label="t('common.headerColor')"
          :model-value="variant.dark.headerColor"
          @update:model-value="patchDark({ headerColor: $event })"
        />
        <ColorField
          :label="t('common.headerBorder')"
          :model-value="variant.dark.headerBorderBottomColor"
          @update:model-value="patchDark({ headerBorderBottomColor: $event })"
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
