<script setup lang="ts">
import { COMPONENT_LIST, COMPONENT_TYPOGRAPHY_META, COMPONENT_FORM_META } from '@/constants'
const { t } = useI18n()
const { cardClass, contrastClass } = usePreviewContrast()
const nav = useNavigationStore()
const { previewBackground } = useComponentTheme()
</script>

<template>
  <div class="cover-view" :style="{ backgroundColor: previewBackground }">
    <div class="row">
      <div class="col-12 col-xl-6 mb-5">
        <div class="card" :class="cardClass" @click="() => (nav.currentComponent = COMPONENT_TYPOGRAPHY_META)">
          <div class="card-header">{{ t('components.typography') }}</div>
          <div class="card-body">{{ t('typography.description') }}</div>
          <div class="card-footer">{{ t('typography.footer') }}</div>
        </div>
      </div>

      <div class="col-12 col-xl-6 mb-4">
        <div class="card" :class="cardClass" @click="() => (nav.currentComponent = COMPONENT_FORM_META)">
          <div class="card-header">{{ t('components.forms') }}</div>
          <div class="card-body">{{ t('forms.description') }}</div>
          <div class="card-footer">{{ t('forms.footer') }}</div>
        </div>
      </div>
    </div>
    <h5 :class="contrastClass" class="mb-4 text-center">{{ t('components.uiComponents') }}</h5>

    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in COMPONENT_LIST" :key="item.id">
        <div
          class="card mb-4 user-select-none"
          :class="cardClass"
          style="cursor: pointer"
          @click="() => (nav.currentComponent = item)"
        >
          <div class="card-header text-center">{{ t(`components.${item.id}`) }}</div>
          <div class="card-body text-center">{{ item.id }}</div>
          <div class="card-footer text-center">{{ t(`components.${item.id}-descr`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
