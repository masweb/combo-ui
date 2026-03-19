<script setup lang="ts">
import { IconArrowBigLeftLineFilled } from '@tabler/icons-vue'
const { t } = useI18n()
const nav = useNavigationStore()
</script>

<template>
  <div
    @click="() => (nav.currentComponent = null)"
    class="btn btn-sm btn-outline w-100 border-top-0 border-end-0 border-start-0"
  >
    <IconArrowBigLeftLineFilled v-if="nav.currentComponent" stroke-width="1.2" />
    <span class="ms-2">{{ t('sidebar.backToAll') }}</span>
  </div>
</template>
