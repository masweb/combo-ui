<script setup lang="ts">
import { COMPONENT_LIST } from '../constants'
const { t } = useI18n()

const layout = stLayout()
</script>

<template>
  <div class="cover-view">
    <div class="row">
      <div class="col-md-6 col-lg-4 col-xl-3" v-for="item in COMPONENT_LIST" :key="item.id">
        <div class="card mb-4 user-select-none" style="cursor: pointer" @click="() => (layout.componentLoaded = item)">
          <div class="card-header">{{ t(`components.${item.id}`) }}</div>
          <div class="card-body">{{ item.id }}</div>
          <div class="card-footer">{{ t(`components.${item.id}-descr`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
