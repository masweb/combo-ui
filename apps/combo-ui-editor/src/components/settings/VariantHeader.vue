<script setup lang="ts">
import { IconPlus, IconTrash } from '@tabler/icons-vue'

interface Props {
  variantName: string | undefined
  canDelete: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:name': [name: string]
  delete: []
  add: []
}>()

function updateName(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:name', target.value)
}
</script>

<template>
  <div class="d-flex align-items-center">
    <input
      type="text"
      class="form-control form-control-lg border-start-0 border-0 border-bottom"
      :value="variantName"
      @input="updateName"
    />
    <div
      v-if="canDelete"
      class="px-3 border-start border-bottom cursor-pointer"
      style="height: 48px"
      @click="emit('delete')"
    >
      <IconTrash :size="18" class="mt-3" />
    </div>
    <div class="px-3 border-start border-bottom cursor-pointer" style="height: 48px" @click="emit('add')">
      <IconPlus :size="18" class="mt-3" />
    </div>
  </div>
</template>
