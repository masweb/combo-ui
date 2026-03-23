<script setup lang="ts">
import { usePreviewGrid } from '@/composables/usePreviewGrid'
import { useThemeCompensation } from '@/composables/useThemeCompensation'
import { useSpinnerStore } from '@/stores/spinner'

const spinnerStore = useSpinnerStore()
const { typographyStore, isDark } = usePreviewGrid()

const componentTheme = useComponentTheme()
const { theme } = useTheme()
const { getCompensation, getFooterCompensation } = useThemeCompensation(componentTheme.theme, theme)

const labelColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)

const getVars = (variant: SpinnerVariant) => {
  const color = isDark.value ? variant.dark.color : variant.color
  const track = isDark.value ? variant.dark.trackColor : variant.trackColor
  const size = `${variant.size.value}${variant.size.unit}`
  const speed = `${variant.speed}s`
  const delay2 = `${Math.round(variant.speed * 0.2 * 100) / 100}s`
  const delay3 = `${Math.round(variant.speed * 0.4 * 100) / 100}s`
  const delay4 = `${Math.round(variant.speed * 0.6 * 100) / 100}s`
  const delay5 = `${Math.round(variant.speed * 0.8 * 100) / 100}s`

  return {
    '--color': color,
    '--track': track,
    '--size': size,
    '--speed': speed,
    '--delay2': delay2,
    '--delay3': delay3,
    '--delay4': delay4,
    '--delay5': delay5
  }
}
</script>

<template>
  <div class="spinner-preview p-4">
    <div class="row g-4">
      <div v-for="(variant, index) in spinnerStore.variants" :key="index" class="col-md-6 col-lg-4 col-xl-3">
        <div
          class="card"
          :style="getCompensation()"
          :class="{ 'border-primary': spinnerStore.selectedVariantIndex === index }"
          style="cursor: pointer"
          @click="spinnerStore.selectVariant(index)"
        >
          <div class="card-body d-flex align-items-center justify-content-center" style="min-height: 100px">
            <div class="preview-spinner-wrap" :style="getVars(variant)">
              <svg
                v-if="variant.type === 'ring'"
                class="sp-ring"
                :width="variant.size.value"
                :height="variant.size.value"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle class="sp-ring-track" cx="12" cy="12" r="10" stroke-width="2.5" />
                <circle
                  class="sp-ring-arc"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-dasharray="43.98"
                  stroke-dashoffset="32.99"
                />
              </svg>
              <svg
                v-else-if="variant.type === 'pulse'"
                class="sp-pulse"
                :width="variant.size.value"
                :height="variant.size.value"
                viewBox="0 0 24 24"
              >
                <circle class="sp-pulse-bg" cx="12" cy="12" r="10" />
                <circle class="sp-pulse-fg" cx="12" cy="12" r="10" />
              </svg>
              <div v-else-if="variant.type === 'dots'" class="sp-dots">
                <div class="sp-dot sp-dot-1" />
                <div class="sp-dot sp-dot-2" />
                <div class="sp-dot sp-dot-3" />
              </div>
              <div v-else-if="variant.type === 'bars'" class="sp-bars">
                <div class="sp-bar sp-bar-1" />
                <div class="sp-bar sp-bar-2" />
                <div class="sp-bar sp-bar-3" />
                <div class="sp-bar sp-bar-4" />
                <div class="sp-bar sp-bar-5" />
              </div>
              <svg
                v-else-if="variant.type === 'dual'"
                class="sp-dual"
                :width="variant.size.value"
                :height="variant.size.value"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g class="sp-dual-outer" style="transform-origin: 12px 12px">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-dasharray="40.84 62.83"
                    stroke-dashoffset="10.99"
                  />
                </g>
                <g class="sp-dual-inner" style="transform-origin: 12px 12px">
                  <circle
                    cx="12"
                    cy="12"
                    r="5.5"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-dasharray="22.46 34.56"
                    stroke-dashoffset="6.05"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div class="card-footer text-center" :style="[getCompensation(), getFooterCompensation()]">
            <small :style="{ color: labelColor }">{{ variant.name }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
