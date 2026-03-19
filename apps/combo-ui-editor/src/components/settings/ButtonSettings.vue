<script setup lang="ts">
import { IconPlus, IconTrash } from '@tabler/icons-vue'
import { BaseFields, TypographyFields, InteractiveFields } from '@/components/shared'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { DarkButton } from '@/types/button'

const { t } = useI18n()
const buttonStore = useButtonStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()

const { patch, patchDark } = useDualModePatch<ButtonVariant, DarkButton>({
  selectedVariant: computed(() => buttonStore.selectedVariant),
  selectedVariantIndex: computed(() => buttonStore.selectedVariantIndex),
  updateVariant: buttonStore.updateVariant
})

const variant = computed(() => buttonStore.selectedVariant)
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
      v-if="buttonStore.variants.length > 1"
      class="px-3 border-start border-bottom cursor-pointer"
      style="height: 37px"
      @click="buttonStore.deleteVariant(buttonStore.selectedVariantIndex)"
    >
      <IconTrash :size="16" class="mt-2" />
    </div>
    <div class="px-3 border-start border-bottom cursor-pointer" style="height: 37px" @click="buttonStore.addVariant">
      <IconPlus :size="16" class="mt-2" />
    </div>
  </div>

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
          :font-family="variant.fontFamily"
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

      <InteractiveFields
        :hover-background="variant.hoverBackground"
        :hover-color="variant.hoverColor"
        :hover-border="variant.hoverBorder"
        :active-background="variant.activeBackground"
        :active-color="variant.activeColor"
        :active-border="variant.activeBorder"
        :focus-color="variant.focusColor"
        :focus-offset="variant.focusOffset"
        :show-focus="variant.showFocus"
        :disabled-background="variant.disabledBackground"
        :disabled-color="variant.disabledColor"
        :disabled-border="variant.disabledBorder"
        :disabled-opacity="variant.disabledOpacity"
        :show-disabled="variant.showDisabled"
        @update:hover-background="patch({ hoverBackground: $event })"
        @update:hover-color="patch({ hoverColor: $event })"
        @update:hover-border="patch({ hoverBorder: $event })"
        @update:active-background="patch({ activeBackground: $event })"
        @update:active-color="patch({ activeColor: $event })"
        @update:active-border="patch({ activeBorder: $event })"
        @update:focus-color="patch({ focusColor: $event })"
        @update:focus-offset="patch({ focusOffset: $event })"
        @update:show-focus="patch({ showFocus: $event })"
        @update:disabled-background="patch({ disabledBackground: $event })"
        @update:disabled-color="patch({ disabledColor: $event })"
        @update:disabled-border="patch({ disabledBorder: $event })"
        @update:disabled-opacity="patch({ disabledOpacity: $event })"
        @update:show-disabled="patch({ showDisabled: $event })"
      />

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

      <SettingsSection :title="t('common.hover')" :initial-open="false">
        <ColorField
          :label="t('common.background')"
          :model-value="variant.dark.hoverBackground"
          @update:model-value="patchDark({ hoverBackground: $event })"
        />
        <ColorField
          :label="t('common.textColor')"
          :model-value="variant.dark.hoverColor"
          @update:model-value="patchDark({ hoverColor: $event })"
        />
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.hoverBorderColor"
          @update:model-value="patchDark({ hoverBorderColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.active')" :initial-open="false">
        <ColorField
          :label="t('common.background')"
          :model-value="variant.dark.activeBackground"
          @update:model-value="patchDark({ activeBackground: $event })"
        />
        <ColorField
          :label="t('common.textColor')"
          :model-value="variant.dark.activeColor"
          @update:model-value="patchDark({ activeColor: $event })"
        />
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.activeBorderColor"
          @update:model-value="patchDark({ activeBorderColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.focus')" :initial-open="false">
        <div class="mb-2">
          <SwitchField
            :label="t('common.showFocus')"
            :model-value="variant.showFocus"
            @update:model-value="patch({ showFocus: $event })"
          />
        </div>
        <ColorField
          :label="t('common.focusColor')"
          :model-value="variant.dark.focusColor"
          @update:model-value="patchDark({ focusColor: $event })"
        />
      </SettingsSection>

      <SettingsSection :title="t('common.disabled')" :initial-open="false">
        <div class="mb-2">
          <SwitchField
            :label="t('common.showDisabled')"
            :model-value="variant.showDisabled"
            @update:model-value="patch({ showDisabled: $event })"
          />
        </div>
        <ColorField
          :label="t('common.background')"
          :model-value="variant.dark.disabledBackground"
          @update:model-value="patchDark({ disabledBackground: $event })"
        />
        <ColorField
          :label="t('common.textColor')"
          :model-value="variant.dark.disabledColor"
          @update:model-value="patchDark({ disabledColor: $event })"
        />
        <ColorField
          :label="t('common.borderColor')"
          :model-value="variant.dark.disabledBorderColor"
          @update:model-value="patchDark({ disabledBorderColor: $event })"
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
