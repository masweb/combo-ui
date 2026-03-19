<script setup lang="ts">
import { IconChevronDown, IconChevronRight } from '@tabler/icons-vue'

const props = withDefaults(
  defineProps<{
    title: string
    initialOpen?: boolean
  }>(),
  {
    initialOpen: true
  }
)

const open = ref(props.initialOpen)
</script>

<template>
  <div class="card border-end-0 border-start-0 border-bottom border-top-0">
    <div
      class="card-header d-flex align-items-center justify-content-between user-select-none"
      style="cursor: pointer"
      @click="open = !open"
      :class="{ ' border-bottom-0': !open }"
    >
      <span class="small fw-bold text-uppercase text-body-secondary">{{ title }}</span>
      <IconChevronDown v-if="open" :size="16" />
      <IconChevronRight v-else :size="16" />
    </div>
    <div v-if="open" class="d-flex flex-column gap-3 p-2 mt-1 mb-4">
      <slot />
    </div>
  </div>
</template>
