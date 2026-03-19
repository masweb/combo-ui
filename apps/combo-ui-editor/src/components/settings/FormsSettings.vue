<script setup lang="ts">
import { useFormsStore } from '@/stores/forms'
import { useTypographyStore } from '@/stores/typography'
import { useComponentTheme } from '@/composables/useComponentTheme'
import useGoogleFonts from '@/composables/useGoogleFonts'

const { t } = useI18n()
const formsStore = useFormsStore()
const typographyStore = useTypographyStore()
const { isDark } = useComponentTheme()
const { getFont, init } = useGoogleFonts()

onMounted(() => {
  init()
})

const config = computed(() => formsStore.globalConfig)

const effectiveFontFamily = computed(() => {
  return config.value.fontFamily ?? typographyStore.effectiveFontFamily
})

const currentFont = computed(() => {
  return effectiveFontFamily.value ? getFont(effectiveFontFamily.value) : null
})

const availableLabelWeights = computed(() => {
  if (!currentFont.value) return ['400']
  const variants = currentFont.value.variants
  return variants.filter(v => !v.endsWith('italic')).map(v => (v === 'regular' ? '400' : parseInt(v).toString()))
})

const patchGlobal = (updates: Partial<typeof formsStore.globalConfig>) => {
  formsStore.updateGlobalConfig(updates)
}

const patchGlobalDark = (updates: Partial<(typeof formsStore.globalConfig)['dark']>) => {
  formsStore.updateGlobalConfigDark(updates)
}
</script>

<template>
  <SettingsSection title="Global" :initial-open="false">
    <template v-if="!isDark">
      <FontFamilyField
        :font-family="config.fontFamily || ''"
        font-style="normal"
        font-weight="400"
        :hide-style-weight="true"
        :allow-inherit="true"
        @update:font-family="patchGlobal({ fontFamily: $event || null })"
      />
      <FontSizeField
        :label="t('common.fontSize')"
        :model-value="config.fontSize"
        @update:model-value="patchGlobal({ fontSize: $event })"
      />
      <ColorField
        :label="t('common.background')"
        :model-value="config.background"
        @update:model-value="patchGlobal({ background: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.color"
        @update:model-value="patchGlobal({ color: $event })"
      />
      <BorderField
        :label="t('common.border')"
        :model-value="config.border"
        @update:model-value="patchGlobal({ border: $event })"
      />
      <BorderRadiusField
        :label="t('common.borderRadius')"
        :model-value="config.borderRadius"
        @update:model-value="patchGlobal({ borderRadius: $event })"
      />

      <div class="field-group">
        <label class="field-label">{{ t('common.fieldHeight') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="config.fieldHeight"
            @input="patchGlobal({ fieldHeight: Number(($event.target as HTMLInputElement).value) })"
          />
          <span class="input-group-text">px</span>
        </div>
      </div>
    </template>
    <template v-else>
      <ColorField
        :label="t('common.background')"
        :model-value="config.dark.background"
        @update:model-value="patchGlobalDark({ background: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dark.color"
        @update:model-value="patchGlobalDark({ color: $event })"
      />
      <ColorField
        :label="t('common.borderColor')"
        :model-value="config.dark.borderColor"
        @update:model-value="patchGlobalDark({ borderColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Label" :initial-open="false">
    <SwitchField
      :label="t('common.showLabel')"
      :model-value="config.showLabel"
      @update:model-value="patchGlobal({ showLabel: $event })"
    />
    <template v-if="!isDark && config.showLabel">
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.labelColor"
        @update:model-value="patchGlobal({ labelColor: $event })"
      />
      <FontSizeField
        :label="t('common.fontSize')"
        :model-value="config.labelFontSize"
        @update:model-value="patchGlobal({ labelFontSize: $event })"
      />
      <div class="field-group">
        <label class="field-label">{{ t('common.fontWeight') }}</label>
        <select
          class="form-select form-select-sm"
          :value="config.labelFontWeight"
          @change="patchGlobal({ labelFontWeight: ($event.target as HTMLSelectElement).value })"
        >
          <option v-for="w in availableLabelWeights" :key="w" :value="w">
            {{ w }}
          </option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">{{ t('common.marginBottom') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="config.labelMarginBottom"
            @input="patchGlobal({ labelMarginBottom: Number(($event.target as HTMLInputElement).value) })"
          />
          <span class="input-group-text">px</span>
        </div>
      </div>
    </template>
    <template v-else-if="config.showLabel">
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dark.labelColor"
        @update:model-value="patchGlobalDark({ labelColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Placeholder" :initial-open="false">
    <SwitchField
      :label="t('common.showPlaceholder')"
      :model-value="config.showPlaceholder"
      @update:model-value="patchGlobal({ showPlaceholder: $event })"
    />
    <template v-if="!isDark && config.showPlaceholder">
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.placeholderColor"
        @update:model-value="patchGlobal({ placeholderColor: $event })"
      />
    </template>
    <template v-else-if="config.showPlaceholder">
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dark.placeholderColor"
        @update:model-value="patchGlobalDark({ placeholderColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Focus" :initial-open="false">
    <template v-if="!isDark">
      <ColorField
        :label="t('common.outlineColor')"
        :model-value="config.focusOutlineColor"
        @update:model-value="patchGlobal({ focusOutlineColor: $event })"
      />
      <div class="field-group">
        <label class="field-label">{{ t('common.outlineWidth') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="config.focusOutlineWidth"
            @input="patchGlobal({ focusOutlineWidth: Number(($event.target as HTMLInputElement).value) })"
          />
          <span class="input-group-text">px</span>
        </div>
      </div>
    </template>
    <template v-else>
      <ColorField
        :label="t('common.outlineColor')"
        :model-value="config.dark.focusOutlineColor"
        @update:model-value="patchGlobalDark({ focusOutlineColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Error" :initial-open="false">
    <template v-if="!isDark">
      <ColorField
        :label="t('common.borderColor')"
        :model-value="config.errorBorderColor"
        @update:model-value="patchGlobal({ errorBorderColor: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.errorColor"
        @update:model-value="patchGlobal({ errorColor: $event })"
      />
      <FontSizeField
        :label="t('common.fontSize')"
        :model-value="config.errorFontSize"
        @update:model-value="patchGlobal({ errorFontSize: $event })"
      />
      <div class="field-group">
        <label class="field-label">{{ t('common.marginTop') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="config.errorMarginTop"
            @input="patchGlobal({ errorMarginTop: Number(($event.target as HTMLInputElement).value) })"
          />
          <span class="input-group-text">px</span>
        </div>
      </div>
    </template>
    <template v-else>
      <ColorField
        :label="t('common.borderColor')"
        :model-value="config.dark.errorBorderColor"
        @update:model-value="patchGlobalDark({ errorBorderColor: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dark.errorColor"
        @update:model-value="patchGlobalDark({ errorColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Disabled" :initial-open="false">
    <template v-if="!isDark">
      <div class="field-group">
        <label class="field-label">{{ t('common.opacity') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number="0.05"
            type="number"
            class="form-control form-control-sm"
            step="0.05"
            min="0"
            max="1"
            :value="config.disabledOpacity"
            @input="patchGlobal({ disabledOpacity: Number(($event.target as HTMLInputElement).value) })"
          />
        </div>
      </div>
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.disabledColor"
        @update:model-value="patchGlobal({ disabledColor: $event })"
      />
      <ColorField
        :label="t('common.background')"
        :model-value="config.disabledBackground"
        @update:model-value="patchGlobal({ disabledBackground: $event })"
      />
      <ColorField
        :label="t('common.borderColor')"
        :model-value="config.disabledBorderColor"
        @update:model-value="patchGlobal({ disabledBorderColor: $event })"
      />
    </template>
    <template v-else>
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dark.disabledColor"
        @update:model-value="patchGlobalDark({ disabledColor: $event })"
      />
      <ColorField
        :label="t('common.background')"
        :model-value="config.dark.disabledBackground"
        @update:model-value="patchGlobalDark({ disabledBackground: $event })"
      />
      <ColorField
        :label="t('common.borderColor')"
        :model-value="config.dark.disabledBorderColor"
        @update:model-value="patchGlobalDark({ disabledBorderColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Check/Radio" :initial-open="false">
    <template v-if="!isDark">
      <ColorField
        :label="t('common.checkRadioColor')"
        :model-value="config.checkRadioColor"
        @update:model-value="patchGlobal({ checkRadioColor: $event })"
      />
      <ColorField
        :label="t('common.optionColor')"
        :model-value="config.optionColor"
        @update:model-value="patchGlobal({ optionColor: $event })"
      />
      <FontFamilyField
        :font-family="config.optionFontFamily || ''"
        font-style="normal"
        font-weight="400"
        :hide-style-weight="true"
        :allow-inherit="true"
        @update:font-family="patchGlobal({ optionFontFamily: $event || null })"
      />
      <FontSizeField
        :label="t('common.optionFontSize')"
        :model-value="config.optionFontSize"
        @update:model-value="patchGlobal({ optionFontSize: $event })"
      />
      <div class="field-group">
        <label class="field-label">{{ t('common.checkRadioSize') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="config.checkRadioSize"
            @input="patchGlobal({ checkRadioSize: Number(($event.target as HTMLInputElement).value) })"
          />
          <span class="input-group-text">px</span>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">{{ t('common.optionFontWeight') }}</label>
        <select
          class="form-select form-select-sm"
          :value="config.optionFontWeight"
          @change="patchGlobal({ optionFontWeight: ($event.target as HTMLSelectElement).value })"
        >
          <option v-for="w in availableLabelWeights" :key="w" :value="w">
            {{ w }}
          </option>
        </select>
      </div>
      <FontSizeField
        :label="t('common.optionSpacingHorizontal')"
        :model-value="config.optionSpacingHorizontal"
        @update:model-value="patchGlobal({ optionSpacingHorizontal: $event })"
      />
      <FontSizeField
        :label="t('common.optionSpacingVertical')"
        :model-value="config.optionSpacingVertical"
        @update:model-value="patchGlobal({ optionSpacingVertical: $event })"
      />
      <SwitchField
        :label="t('common.verticalOrientation')"
        :model-value="config.optionOrientation === 'vertical'"
        @update:model-value="patchGlobal({ optionOrientation: $event ? 'vertical' : 'horizontal' })"
      />
    </template>
    <template v-else>
      <ColorField
        :label="t('common.checkRadioColor')"
        :model-value="config.dark.checkRadioColor"
        @update:model-value="patchGlobalDark({ checkRadioColor: $event })"
      />
      <div class="field-group">
        <label class="field-label">{{ t('common.checkRadioSize') }}</label>
        <div class="border-field-row">
          <input
            v-wheel-number
            type="number"
            class="form-control form-control-sm"
            :value="config.checkRadioSize"
            @input="patchGlobal({ checkRadioSize: Number(($event.target as HTMLInputElement).value) })"
          />
          <span class="input-group-text">px</span>
        </div>
      </div>
      <ColorField
        :label="t('common.optionColor')"
        :model-value="config.dark.optionColor"
        @update:model-value="patchGlobalDark({ optionColor: $event })"
      />
      <FontSizeField
        :label="t('common.optionSpacingHorizontal')"
        :model-value="config.dark.optionSpacingHorizontal"
        @update:model-value="patchGlobalDark({ optionSpacingHorizontal: $event })"
      />
      <FontSizeField
        :label="t('common.optionSpacingVertical')"
        :model-value="config.dark.optionSpacingVertical"
        @update:model-value="patchGlobalDark({ optionSpacingVertical: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection title="Dropzone" :initial-open="false">
    <template v-if="!isDark">
      <ColorField
        :label="t('common.background')"
        :model-value="config.dropzoneBackground"
        @update:model-value="patchGlobal({ dropzoneBackground: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dropzoneColor"
        @update:model-value="patchGlobal({ dropzoneColor: $event })"
      />
      <BorderField
        :label="t('common.border')"
        :model-value="config.dropzoneBorder"
        @update:model-value="patchGlobal({ dropzoneBorder: $event })"
      />
      <BorderRadiusField
        :label="t('common.borderRadius')"
        :model-value="config.dropzoneBorderRadius"
        @update:model-value="patchGlobal({ dropzoneBorderRadius: $event })"
      />
    </template>
    <template v-else>
      <ColorField
        :label="t('common.background')"
        :model-value="config.dark.dropzoneBackground"
        @update:model-value="patchGlobalDark({ dropzoneBackground: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="config.dark.dropzoneColor"
        @update:model-value="patchGlobalDark({ dropzoneColor: $event })"
      />
      <ColorField
        :label="t('common.borderColor')"
        :model-value="config.dark.dropzoneBorderColor"
        @update:model-value="patchGlobalDark({ dropzoneBorderColor: $event })"
      />
    </template>
  </SettingsSection>
</template>
