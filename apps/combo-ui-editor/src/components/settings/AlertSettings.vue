<script setup lang="ts">
import { BaseFields, TypographyFields } from '@/components/shared'
import VariantHeader from './VariantHeader.vue'
import DarkModeShadowsSettings from './DarkModeShadowsSettings.vue'
import { useUnitNumberUpdates } from '@/composables/useUnitNumberUpdates'

const { t } = useI18n()
const alertStore = useAlertStore()
const { isDark } = useComponentTheme()

const { patch } = useVariantPatch({
  selectedVariant: computed(() => alertStore.selectedVariant),
  selectedVariantIndex: computed(() => alertStore.selectedVariantIndex),
  updateVariant: alertStore.updateVariant
})

const variant = computed(() => alertStore.selectedVariant)

const patchDark = (updates: Partial<DarkAlert>) => {
  if (!variant.value) return
  patch({ dark: { ...variant.value.dark, ...updates } })
}

const maxWidthUpdates = useUnitNumberUpdates(patch, variant, 'maxWidth')
const offsetUpdates = useUnitNumberUpdates(patch, variant, 'offset')
</script>

<template>
  <VariantHeader
    :variant-name="variant?.name"
    :can-delete="alertStore.variants.length > 1"
    @update:name="patch({ name: $event })"
    @delete="alertStore.deleteVariant(alertStore.selectedVariantIndex)"
    @add="alertStore.addVariant"
  />

  <div v-if="variant">
    <!-- LIGHT MODE SETTINGS -->
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

      <SettingsSection :title="t('common.closeButton')" :initial-open="false">
        <SwitchField
          :label="t('common.showClose')"
          :model-value="variant.showClose"
          @update:model-value="patch({ showClose: $event })"
        />
        <div class="field-group">
          <label class="field-label">{{ t('common.autoDismiss') }}</label>
          <div class="d-flex align-items-center gap-1">
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :value="variant.autoDismiss"
              min="0"
              @input="patch({ autoDismiss: Number(($event.target as HTMLInputElement).value) })"
            />
            <span class="text-muted small">s</span>
          </div>
        </div>
        <FontSizeField
          :label="t('common.closeSize')"
          :model-value="variant.closeSize"
          @update:model-value="patch({ closeSize: $event })"
        />
        <ColorField
          :label="t('common.closeColor')"
          :model-value="variant.closeColor"
          @update:model-value="patch({ closeColor: $event })"
        />
        <ColorField
          :label="t('common.closeHoverColor')"
          :model-value="variant.closeHoverColor"
          @update:model-value="patch({ closeHoverColor: $event })"
        />
        <ColorField
          :label="t('common.closeActiveColor')"
          :model-value="variant.closeActiveColor"
          @update:model-value="patch({ closeActiveColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.layout')" :initial-open="false">
        <NumberUnitField
          :label="t('common.maxWidth')"
          :model-value="variant.maxWidth.value"
          :unit="variant.maxWidth.unit"
          :units="['px', 'em', 'rem']"
          @update:model-value="maxWidthUpdates.updateValue"
          @update:unit="maxWidthUpdates.updateUnit"
        />
        <NumberUnitField
          :label="t('common.offset')"
          :model-value="variant.offset.value"
          :unit="variant.offset.unit"
          :units="['px', 'em', 'rem']"
          @update:model-value="offsetUpdates.updateValue"
          @update:unit="offsetUpdates.updateUnit"
        />
        <AlertPositionField
          :label="t('common.position')"
          :model-value="variant.position"
          @update:model-value="patch({ position: $event })"
        />
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

      <SettingsSection :title="t('common.closeButton')" :initial-open="false">
        <ColorField
          :label="t('common.closeColor')"
          :model-value="variant.dark.closeColor"
          @update:model-value="patchDark({ closeColor: $event })"
        />
        <ColorField
          :label="t('common.closeHoverColor')"
          :model-value="variant.dark.closeHoverColor"
          @update:model-value="patchDark({ closeHoverColor: $event })"
        />
        <ColorField
          :label="t('common.closeActiveColor')"
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
