<script setup lang="ts">
const layout = stLayout()
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="side-panel border-end">
    <GoBack />
    <h4 class="mt-2 text-center mb-0" v-if="layout.componentLoaded">
      {{ t(`components.${layout.componentLoaded.id}`) }}
    </h4>
    <p class="text-center" v-if="layout.componentLoaded">{{ t(`components.${layout.componentLoaded.description}`) }}</p>
  </div>
</template>
