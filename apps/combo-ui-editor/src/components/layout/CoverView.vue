<script setup lang="ts">
import { COMPONENT_LIST } from '@/constants'
const { t } = useI18n()
const { cardClass, contrastClass } = usePreviewContrast()
const nav = useNavigationStore()
</script>

<template>
  <div class="cover-view">
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
