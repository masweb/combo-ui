<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'

const chipStore = useChipStore()
const { typographyStore, buildBorderRadius, buildPadding, buildShadow, buildBorderCSS, resolveColor, isDark } =
  usePreviewGrid()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)

const getChipStyles = (variant: ChipVariant) => {
  const fontFamily = variant.fontFamily ?? typographyStore.effectiveFontFamily

  return {
    backgroundColor: resolveColor(variant.background, variant.dark.background),
    color: resolveColor(variant.color, variant.dark.color),
    ...buildBorderCSS(variant.border, variant.dark.borderColor),
    borderRadius: buildBorderRadius(variant.borderRadius),
    padding: buildPadding(variant.padding),
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
  const colors = {
    default: resolveColor(variant.closeColor, variant.dark.closeColor),
    hover: resolveColor(variant.closeHoverColor, variant.dark.closeHoverColor),
    active: resolveColor(variant.closeActiveColor, variant.dark.closeActiveColor)
  }

  return {
    color: colors[state],
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
          :style="getCompensation()"
          :class="{ 'border-primary': chipStore.selectedVariantIndex === index }"
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
          <div class="card-footer text-center" :style="[getCompensation(), getFooterCompensation()]">
            <small :style="{ color: labelColor }">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
