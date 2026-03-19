<script setup lang="ts">
import { IconPlus, IconTrash } from '@tabler/icons-vue'
import { BaseFields, TypographyFields } from '@/components/shared'
import { useDualModePatch } from '@/composables/useDualModePatch'
import type { DarkAvatar } from '@/types/avatar'

const { t } = useI18n()
const avatarStore = useAvatarStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()

const { patch, patchDark } = useDualModePatch<AvatarVariant, DarkAvatar>({
  selectedVariant: computed(() => avatarStore.selectedVariant),
  selectedVariantIndex: computed(() => avatarStore.selectedVariantIndex),
  updateVariant: avatarStore.updateVariant
})

const variant = computed(() => avatarStore.selectedVariant)
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
      v-if="avatarStore.variants.length > 1"
      class="px-3 border-start border-bottom cursor-pointer"
      style="height: 37px"
      @click="avatarStore.deleteVariant(avatarStore.selectedVariantIndex)"
    >
      <IconTrash :size="16" class="mt-2" />
    </div>
    <div class="px-3 border-start border-bottom cursor-pointer" style="height: 37px" @click="avatarStore.addVariant">
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
