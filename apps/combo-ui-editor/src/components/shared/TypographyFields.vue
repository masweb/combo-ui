<script setup lang="ts">
import type { UnitNumber, LetterSpacingValue, FontStyle } from '@/types/generics'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    fontFamily?: string | null
    fontStyle?: FontStyle
    fontWeight?: string
    fontSize: UnitNumber
    letterSpacing?: LetterSpacingValue
    globalFontFamily?: string
  }>(),
  {
    globalFontFamily: 'Inter'
  }
)

const emit = defineEmits<{
  'update:fontFamily': [value: string | null]
  'update:fontStyle': [value: FontStyle]
  'update:fontWeight': [value: string]
  'update:fontSize': [value: UnitNumber]
  'update:letterSpacing': [value: LetterSpacingValue]
}>()

const effectiveFontStyle = computed(() => props.fontStyle ?? 'normal')
const effectiveFontWeight = computed(() => props.fontWeight ?? '400')

const isUsingGlobal = computed(() => !props.fontFamily)
</script>

<template>
  <FontFamilyField
    :font-family="fontFamily || ''"
    :font-style="effectiveFontStyle"
    :font-weight="effectiveFontWeight"
    allow-inherit
    @update:font-family="emit('update:fontFamily', $event || null)"
    @update:font-style="emit('update:fontStyle', $event)"
    @update:font-weight="emit('update:fontWeight', $event)"
  />
  <button
    v-if="!isUsingGlobal"
    class="btn btn-sm btn-link text-muted p-0 mb-2"
    @click="emit('update:fontFamily', null)"
  >
    Reset to Global
  </button>
  <FontSizeField
    :label="t('common.fontSize')"
    :model-value="fontSize"
    @update:model-value="emit('update:fontSize', $event)"
  />
  <LetterSpacingField
    v-if="letterSpacing"
    :label="t('common.letterSpacing')"
    :model-value="letterSpacing"
    @update:model-value="emit('update:letterSpacing', $event)"
  />
</template>
