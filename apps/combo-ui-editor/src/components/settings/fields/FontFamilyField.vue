<script setup lang="ts">
const props = defineProps<{
  fontFamily: string
  fontStyle: 'normal' | 'italic'
  fontWeight: string
  allowInherit?: boolean
  hideStyleWeight?: boolean
}>()

const emit = defineEmits<{
  'update:fontFamily': [value: string]
  'update:fontStyle': [value: 'normal' | 'italic']
  'update:fontWeight': [value: string]
}>()

const typographyStore = useTypographyStore()

const isUsingGlobal = computed(() => !props.fontFamily && props.allowInherit)

const displayFamily = computed(() => {
  if (isUsingGlobal.value) {
    return typographyStore.globalConfig.fontFamily
      ? `(Global) ${typographyStore.globalConfig.fontFamily}`
      : '(Global) Heredar'
  }
  return props.fontFamily
})

// ─── Google Fonts ─────────────────────────────────────────────────────────────

const { ready, results, init, search, getFont, loadPreview } = useGoogleFonts()

onMounted(() => {
  init()
})

// ─── Search / dropdown ────────────────────────────────────────────────────────

const query = ref(props.fontFamily)
const isOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

watch(
  () => props.fontFamily,
  val => {
    query.value = val
  }
)

watch(isUsingGlobal, () => {
  query.value = ''
})

const onInput = (e: Event) => {
  query.value = (e.target as HTMLInputElement).value
  isOpen.value = true
  search(query.value)
}

const onFocus = () => {
  isOpen.value = true
  search(query.value)
}

const selectFamily = (family: string) => {
  emit('update:fontFamily', family)
  emit('update:fontStyle', 'normal')
  emit('update:fontWeight', '400')
  query.value = family
  isOpen.value = false
  loadPreview(family, 'normal', '400')
}

const selectInherit = () => {
  emit('update:fontFamily', '')
  query.value = ''
  isOpen.value = false
}

const clearFamily = () => {
  if (props.allowInherit) {
    emit('update:fontFamily', '')
  } else {
    emit('update:fontFamily', '')
    emit('update:fontStyle', 'normal')
    emit('update:fontWeight', '400')
  }
  query.value = ''
  isOpen.value = false
  nextTick(() => inputRef.value?.focus())
}

const onDocClick = (e: MouseEvent) => {
  if (!containerRef.value?.contains(e.target as Node)) {
    isOpen.value = false
    query.value = props.fontFamily
  }
}
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))

// ─── Style / weight selectors ─────────────────────────────────────────────────

const currentFont = computed(() => {
  const family = isUsingGlobal.value ? typographyStore.globalConfig.fontFamily : props.fontFamily
  return family ? getFont(family) : null
})

const allVariants = computed(() => currentFont.value?.variants ?? [])

const hasItalic = computed(() => allVariants.value.some(v => v.endsWith('italic')))

const availableWeights = computed(() => {
  const style = isUsingGlobal.value ? 'normal' : props.fontStyle
  const isItalic = style === 'italic'
  return allVariants.value
    .filter(v => (isItalic ? v.endsWith('italic') : !v.endsWith('italic')))
    .map(v => {
      const num = v === 'regular' || v === 'italic' ? '400' : parseInt(v).toString()
      return { key: v, label: num }
    })
})

const onStyleChange = (style: 'normal' | 'italic') => {
  emit('update:fontStyle', style)
  const weights = allVariants.value
    .filter(v => (style === 'italic' ? v.endsWith('italic') : !v.endsWith('italic')))
    .map(v => (v === 'regular' || v === 'italic' ? '400' : parseInt(v).toString()))
  const current = props.fontWeight
  const best = weights.includes(current) ? current : (weights[0] ?? '400')
  emit('update:fontWeight', best)
  const family = isUsingGlobal.value ? typographyStore.globalConfig.fontFamily : props.fontFamily
  if (family) loadPreview(family, style, best)
}

const onWeightChange = (weight: string) => {
  emit('update:fontWeight', weight)
  const family = isUsingGlobal.value ? typographyStore.globalConfig.fontFamily : props.fontFamily
  if (family) loadPreview(family, props.fontStyle, weight)
}

// Preview style for the weight selector labels
const weightLabelStyle = (weight: string): Record<string, string> => ({
  fontFamily: props.fontFamily ? `'${props.fontFamily}', sans-serif` : 'inherit',
  fontWeight: weight,
  fontStyle: props.fontStyle,
  fontSize: '13px'
})
</script>

<template>
  <div ref="containerRef" class="font-family-field field-group">
    <label class="field-label">Familia tipográfica</label>

    <!-- Search input -->
    <div class="font-search-row">
      <div class="font-search-input-wrap">
        <input
          ref="inputRef"
          class="form-control form-control-sm font-search-input"
          :class="{ 'font-search-input--inherit': isUsingGlobal && !isOpen }"
          type="text"
          :value="isOpen ? query : displayFamily"
          placeholder="Buscar fuente..."
          :disabled="!ready"
          autocomplete="off"
          @input="onInput"
          @focus="onFocus"
        />
        <button
          v-if="fontFamily && !isUsingGlobal"
          class="font-clear-btn"
          type="button"
          title="Quitar fuente"
          @click="clearFamily"
        >
          ×
        </button>
      </div>

      <!-- Dropdown -->
      <div v-if="isOpen" class="font-dropdown">
        <button
          v-if="allowInherit"
          type="button"
          class="font-dropdown-item font-dropdown-item--inherit"
          :class="{ active: isUsingGlobal }"
          @click="selectInherit"
        >
          <span class="font-dropdown-family">{{ `(Global) ${typographyStore.globalConfig.fontFamily}` }}</span>
          <span class="font-dropdown-category">Heredar</span>
        </button>
        <button
          v-for="font in results"
          :key="font.family"
          type="button"
          class="font-dropdown-item"
          :class="{ active: font.family === fontFamily }"
          @click="selectFamily(font.family)"
        >
          <span class="font-dropdown-family">{{ font.family }}</span>
          <span class="font-dropdown-category">{{ font.category }}</span>
        </button>
        <div v-if="!results.length && query.length > 1 && ready" class="font-dropdown-empty">Sin resultados</div>
      </div>
    </div>

    <!-- Style + weight pickers (when component has font OR using global) -->
    <div v-if="(fontFamily || isUsingGlobal) && currentFont && !hideStyleWeight" class="font-options">
      <!-- Italic toggle (only if the family has italic variants) -->
      <div v-if="hasItalic" class="font-style-toggle">
        <button
          type="button"
          class="font-style-btn"
          :class="{ active: fontStyle === 'normal' }"
          @click="onStyleChange('normal')"
        >
          Regular
        </button>
        <button
          type="button"
          class="font-style-btn font-style-btn--italic"
          :class="{ active: fontStyle === 'italic' }"
          @click="onStyleChange('italic')"
        >
          <em>Italic</em>
        </button>
      </div>

      <!-- Weight selector -->
      <div v-if="availableWeights.length > 1" class="font-weight-select-wrap">
        <label class="field-label">Peso</label>
        <select
          class="form-select form-select-sm"
          :value="fontWeight"
          @change="onWeightChange(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="w in availableWeights" :key="w.key" :value="w.label">
            {{ w.label }}
          </option>
        </select>
      </div>

      <!-- Live preview -->
      <div
        class="font-live-preview"
        :style="{
          fontFamily: currentFont ? `'${currentFont.family}', sans-serif` : 'inherit',
          fontWeight: fontWeight,
          fontStyle: fontStyle
        }"
      >
        The quick brown fox
      </div>
    </div>
  </div>
</template>
