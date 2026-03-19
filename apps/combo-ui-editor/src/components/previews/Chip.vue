<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { usePreviewContrast } from '@/composables/usePreviewContrast'
import { useChipStore } from '@/stores/chip'

const chipStore = useChipStore()
const { isDark } = useComponentTheme()
const typographyStore = useTypographyStore()
const { cardClass, contrastClass } = usePreviewContrast()

const buildShadow = (variant: ChipVariant): string => {
  const shadows: string[] = []

  if (variant.shadows?.offset?.enabled) {
    const s = variant.shadows.offset
    shadows.push(
      `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowColor : s.color}`
    )
  }

  if (variant.shadows?.inset?.enabled) {
    const s = variant.shadows.inset
    shadows.push(
      `inset ${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${isDark.value ? variant.dark.shadowInsetColor : s.color}`
    )
  }

  return shadows.length > 0 ? shadows.join(', ') : 'none'
}

const getChipStyles = (variant: ChipVariant) => {
  const bg = isDark.value ? variant.dark.background : variant.background
  const color = isDark.value ? variant.dark.color : variant.color
  const borderColor = isDark.value ? variant.dark.borderColor : variant.border.color

  const radius = variant.borderRadius.linked
    ? `${variant.borderRadius.tl}${variant.borderRadius.unit}`
    : `${variant.borderRadius.tl}${variant.borderRadius.unit} ${variant.borderRadius.tr}${variant.borderRadius.unit} ${variant.borderRadius.br}${variant.borderRadius.unit} ${variant.borderRadius.bl}${variant.borderRadius.unit}`

  const padding = `${variant.padding.top}${variant.padding.unit} ${variant.padding.right}${variant.padding.unit} ${variant.padding.bottom}${variant.padding.unit} ${variant.padding.left}${variant.padding.unit}`

  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
    backgroundColor: bg,
    color,
    borderStyle: variant.border.style,
    borderWidth: `${variant.border.width}${variant.border.unit}`,
    borderColor,
    borderRadius: radius,
    padding,
    fontFamily,
    fontSize: `${variant.fontSize.value}${variant.fontSize.unit}`,
    fontStyle: variant.fontStyle,
    fontWeight: variant.fontWeight,
    letterSpacing: variant.letterSpacing ? `${variant.letterSpacing.value}${variant.letterSpacing.unit}` : undefined,
    boxShadow: buildShadow(variant),
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  }
}

const getCloseButtonStyles = (variant: ChipVariant, state: 'default' | 'hover' | 'active') => {
  let color: string
  if (state === 'default') color = isDark.value ? variant.dark.closeColor : variant.closeColor
  else if (state === 'hover') color = isDark.value ? variant.dark.closeHoverColor : variant.closeHoverColor
  else color = isDark.value ? variant.dark.closeActiveColor : variant.closeActiveColor

  return {
    color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'color 0.15s ease-in-out',
    padding: '2px',
    borderRadius: '4px'
  }
}
</script>

<template>
  <div class="chip-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in chipStore.variants" :key="index" class="col-md-6 col-lg-4 col-xl-3">
        <div
          class="card"
          :class="[cardClass, { 'border-primary': chipStore.selectedVariantIndex === index }]"
          style="cursor: pointer"
          @click="chipStore.selectVariant(index)"
        >
          <div class="card-body d-flex align-items-center justify-content-center">
            <span class="preview-chip" :style="getChipStyles(variant)">
              Chip
              <span
                :style="getCloseButtonStyles(variant, 'default')"
                @mouseenter="
                  e => Object.assign((e.currentTarget as HTMLElement).style, getCloseButtonStyles(variant, 'hover'))
                "
                @mouseleave="
                  e => Object.assign((e.currentTarget as HTMLElement).style, getCloseButtonStyles(variant, 'default'))
                "
                @mousedown="
                  e => Object.assign((e.currentTarget as HTMLElement).style, getCloseButtonStyles(variant, 'active'))
                "
                @mouseup="
                  e => Object.assign((e.currentTarget as HTMLElement).style, getCloseButtonStyles(variant, 'hover'))
                "
              >
                <IconX :size="variant.closeSize.value" />
              </span>
            </span>
          </div>
          <div class="card-footer text-center">
            <small :class="contrastClass">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
