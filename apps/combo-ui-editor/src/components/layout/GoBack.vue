<script setup lang="ts">
import { IconArrowBigLeftLineFilled } from '@tabler/icons-vue'
const { t } = useI18n()
const layout = stLayout()
</script>

<template>
  <div
    @click="() => (layout.componentLoaded = null)"
    class="btn btn-sm btn-outline w-100 border-top-0 border-end-0 border-start-0"
  >
    <IconArrowBigLeftLineFilled v-if="layout.componentLoaded" stroke-width="1.2" />
    <span class="ms-2">{{ t('sidebar.backToAll') }}</span>
  </div>
</template>
