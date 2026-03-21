<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const confirmBtnText = computed(() => props.confirmText || 'OK')
const cancelBtnText = computed(() => props.cancelText || 'Cancel')
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="settings-modal-wrapper">
        <div class="modal-backdrop" @click="emit('cancel')"></div>
        <div class="modal d-block" @click.stop>
          <div class="modal-dialog modal-dialog-top">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ title }}</h5>
                <button type="button" class="btn-close" @click="emit('cancel')"></button>
              </div>
              <div class="modal-body">
                <p class="mb-0">{{ message }}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="emit('cancel')">
                  {{ cancelBtnText }}
                </button>
                <button type="button" class="btn btn-primary" @click="emit('confirm')">
                  {{ confirmBtnText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
