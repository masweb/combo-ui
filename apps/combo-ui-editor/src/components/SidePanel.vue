<script setup lang="ts">
const layout = stLayout()
const { t } = useI18n()
</script>

<template>
  <div class="side-panel border-end">
    <GoBack />
    <h4 class="mt-2 text-center mb-0 pb-2 border-bottom" v-if="layout.componentLoaded">
      {{ t(`components.${layout.componentLoaded.id}`) }}
    </h4>
  </div>
</template>
