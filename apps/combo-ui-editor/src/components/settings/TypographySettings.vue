<script setup lang="ts">
import { IconPlus, IconTrash } from '@tabler/icons-vue'

const { t } = useI18n()
const typographyStore = useTypographyStore()
const { isDark } = useComponentTheme()

const { patch } = useVariantPatch({
  selectedVariant: computed(() => typographyStore.selectedVariant),
  selectedVariantIndex: computed(() => typographyStore.selectedVariantIndex),
  updateVariant: typographyStore.updateVariant
})

const variant = computed(() => typographyStore.selectedVariant)

const patchDark = (updates: { color?: string | null }) => {
  if (!variant.value) return
  patch({ dark: { ...variant.value.dark, ...updates } })
}

const patchGlobal = (updates: Partial<typeof typographyStore.globalConfig>) => {
  typographyStore.updateGlobalConfig(updates)
}

const patchGlobalDark = (updates: { color?: string; backgroundColor?: string }) => {
  typographyStore.updateGlobalConfig({
    dark: { ...typographyStore.globalConfig.dark, ...updates }
  })
}

const newVariantName = ref('')

const addCustomVariant = () => {
  if (newVariantName.value.trim()) {
    typographyStore.addCustomVariant(newVariantName.value.trim())
    newVariantName.value = ''
  }
}

const textTransformOptions = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'UPPERCASE' },
  { value: 'lowercase', label: 'lowercase' },
  { value: 'capitalize', label: 'Capitalize' }
]

const textDecorationOptions = [
  { value: 'none', label: 'None' },
  { value: 'underline', label: 'Underline' },
  { value: 'line-through', label: 'Line Through' },
  { value: 'overline', label: 'Overline' }
]
</script>

<template>
  <SettingsSection title="Global" :initial-open="false">
    <template v-if="!isDark">
      <FontFamilyField
        :font-family="typographyStore.globalConfig.fontFamily"
        font-style="normal"
        font-weight="400"
        :hide-style-weight="true"
        @update:font-family="patchGlobal({ fontFamily: $event })"
      />
      <ColorField
        :label="t('common.textColor')"
        :model-value="typographyStore.globalConfig.color"
        @update:model-value="patchGlobal({ color: $event })"
      />
      <ColorField
        :label="t('common.backgroundColor')"
        :model-value="typographyStore.globalConfig.backgroundColor"
        @update:model-value="patchGlobal({ backgroundColor: $event })"
      />
    </template>
    <template v-else>
      <ColorField
        :label="t('common.textColor')"
        :model-value="typographyStore.globalConfig.dark.color"
        @update:model-value="patchGlobalDark({ color: $event })"
      />
      <ColorField
        :label="t('common.backgroundColor')"
        :model-value="typographyStore.globalConfig.dark.backgroundColor"
        @update:model-value="patchGlobalDark({ backgroundColor: $event })"
      />
    </template>
  </SettingsSection>

  <SettingsSection :title="t('common.variants')" :initial-open="false">
    <div class="variant-list mb-2" style="max-height: 200px; overflow-y: auto">
      <div
        v-for="(v, index) in typographyStore.sortedVariants"
        :key="v.id"
        class="variant-item d-flex justify-content-between align-items-center p-1 rounded"
        :class="{
          'bg-primary bg-opacity-25':
            typographyStore.variants.findIndex(variant => variant.id === v.id) === typographyStore.selectedVariantIndex,
          'text-muted': v.isFixed
        }"
        style="cursor: pointer; font-size: 0.85rem"
        @click="typographyStore.selectVariant(typographyStore.variants.findIndex(variant => variant.id === v.id))"
      >
        <span>{{ v.name }}</span>
        <span v-if="v.isFixed" class="badge bg-secondary">{{ t('common.fixed') }}</span>
        <button v-else class="btn btn-sm btn-link text-danger p-0" @click.stop="typographyStore.deleteVariant(index)">
          <IconTrash :size="14" />
        </button>
      </div>
    </div>
    <div class="d-flex gap-2">
      <input
        v-model="newVariantName"
        type="text"
        class="form-control form-control-sm"
        :placeholder="t('common.variantName')"
        @keyup.enter="addCustomVariant"
      />
      <button class="btn btn-sm btn-primary" @click="addCustomVariant" :disabled="!newVariantName.trim()">
        <IconPlus :size="16" />
      </button>
    </div>
  </SettingsSection>

  <div v-if="variant">
    <template v-if="!isDark">
      <SettingsSection :title="t('common.typography')" :initial-open="false">
        <FontFamilyField
          :font-family="variant.fontFamily || ''"
          :font-style="variant.fontStyle"
          :font-weight="variant.fontWeight"
          :allow-inherit="true"
          @update:font-family="patch({ fontFamily: $event || null })"
          @update:font-style="patch({ fontStyle: $event })"
          @update:font-weight="patch({ fontWeight: $event })"
        />
        <FontSizeField
          :label="t('common.fontSize')"
          :model-value="variant.fontSize"
          @update:model-value="patch({ fontSize: $event })"
        />
        <LetterSpacingField
          :label="t('common.letterSpacing')"
          :model-value="variant.letterSpacing"
          @update:model-value="patch({ letterSpacing: $event })"
        />
        <div class="field-group">
          <label class="field-label">{{ t('common.lineHeight') }}</label>
          <div class="border-field-row">
            <input
              v-wheel-number
              type="number"
              class="form-control form-control-sm"
              :step="variant.lineHeight.unit ? 0.1 : 0.1"
              :value="variant.lineHeight.value"
              @input="
                patch({
                  lineHeight: { ...variant.lineHeight, value: Number(($event.target as HTMLInputElement).value) }
                })
              "
            />
            <select
              class="form-select form-select-sm border-unit-select"
              :value="variant.lineHeight.unit"
              @change="
                patch({
                  lineHeight: {
                    ...variant.lineHeight,
                    unit: ($event.target as HTMLSelectElement).value as '' | 'px' | 'em' | 'rem'
                  }
                })
              "
            >
              <option value="">sin unidad</option>
              <option value="px">px</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
            </select>
          </div>
        </div>
        <div class="row g-2">
          <div class="col-6">
            <label class="field-label">{{ t('common.textTransform') }}</label>
            <select
              class="form-select form-select-sm"
              :value="variant.textTransform"
              @change="
                patch({ textTransform: ($event.target as HTMLSelectElement).value as typeof variant.textTransform })
              "
            >
              <option v-for="opt in textTransformOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div class="col-6">
            <label class="field-label">{{ t('common.textDecoration') }}</label>
            <select
              class="form-select form-select-sm"
              :value="variant.textDecoration"
              @change="
                patch({ textDecoration: ($event.target as HTMLSelectElement).value as typeof variant.textDecoration })
              "
            >
              <option v-for="opt in textDecorationOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
        <ColorField
          :label="t('common.textColor')"
          :model-value="variant.color || typographyStore.globalConfig.color"
          :placeholder="variant.color === null ? '(Global)' : undefined"
          @update:model-value="patch({ color: $event })"
        />
        <button
          v-if="variant.color !== null"
          class="btn btn-sm btn-link text-muted p-0 mb-2"
          @click="patch({ color: null as string | null })"
        >
          Reset to Global
        </button>
      </SettingsSection>
    </template>

    <template v-else>
      <SettingsSection :title="t('common.darkMode')" :initial-open="false">
        <ColorField
          :label="t('common.textColor')"
          :model-value="variant.dark.color || typographyStore.globalConfig.dark.color"
          :placeholder="variant.dark.color === null ? '(Global)' : undefined"
          @update:model-value="patchDark({ color: $event })"
        />
        <button
          v-if="variant.dark.color !== null"
          class="btn btn-sm btn-link text-muted p-0 mb-2"
          @click="patchDark({ color: null as string | null })"
        >
          Reset to Global
        </button>
      </SettingsSection>
    </template>
  </div>
</template>
