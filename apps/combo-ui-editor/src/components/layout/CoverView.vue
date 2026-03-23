<script setup lang="ts">
import { COMPONENT_LIST, COMPONENT_TYPOGRAPHY_META, COMPONENT_FORM_META } from '@/constants'

import {
  IconXboxB,
  IconCreditCard,
  IconAlertSquareRounded,
  IconUserCircle,
  IconCodeVariable,
  IconLineDashed,
  IconEqualDouble,
  IconInputX,
  IconInnerShadowTopRight,
  IconTypography,
  IconForms
} from '@tabler/icons-vue'
const icons: Record<string, Component> = {
  IconXboxB,
  IconCreditCard,
  IconAlertSquareRounded,
  IconUserCircle,
  IconCodeVariable,
  IconLineDashed,
  IconEqualDouble,
  IconInputX,
  IconInnerShadowTopRight
}
const { t } = useI18n()
const { isDark } = useTheme()
const nav = useNavigationStore()
const typographyStore = useTypographyStore()

const previewBackground = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.backgroundColor : typographyStore.globalConfig.backgroundColor
)

const textColor = computed(() =>
  isDark.value ? typographyStore.globalConfig.dark.color : typographyStore.globalConfig.color
)
</script>

<template>
  <div class="cover-view" :style="{ backgroundColor: previewBackground }">
    <div class="row">
      <div class="col-12 col-xl-6 mb-5">
        <div class="card" @click="() => (nav.currentComponent = COMPONENT_TYPOGRAPHY_META)">
          <div class="card-header" :style="{ color: textColor }">{{ t('components.typography') }}</div>
          <div class="card-body" :style="{ color: textColor, opacity: 0.8 }">
            <IconTypography :size="120" stroke-width=".5" />
            {{ t('typography.description') }}
          </div>
          <div class="card-footer" :style="{ color: textColor, opacity: 0.8 }">{{ t('typography.footer') }}</div>
        </div>
      </div>

      <div class="col-12 col-xl-6 mb-4">
        <div class="card" @click="() => (nav.currentComponent = COMPONENT_FORM_META)">
          <div class="card-header" :style="{ color: textColor }">{{ t('components.forms') }}</div>
          <div class="card-body" :style="{ color: textColor, opacity: 0.8 }">
            <IconForms :size="120" stroke-width=".5" />
            {{ t('forms.description') }}
          </div>
          <div class="card-footer" :style="{ color: textColor, opacity: 0.8 }">{{ t('forms.footer') }}</div>
        </div>
      </div>
    </div>
    <h5 class="mb-4 text-center" :style="{ color: textColor }">{{ t('components.uiComponents') }}</h5>

    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in COMPONENT_LIST" :key="item.id">
        <div class="card mb-4 user-select-none" style="cursor: pointer" @click="() => (nav.currentComponent = item)">
          <div class="card-header text-center" :style="{ color: textColor }">{{ t(`components.${item.id}`) }}</div>
          <div class="card-body text-center">
            <component :is="icons[item.icon ?? '']" :size="120" stroke-width=".5" />
          </div>
          <div class="card-footer text-center" :style="{ color: textColor, opacity: 0.8 }">
            {{ t(`components.${item.id}-descr`) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
