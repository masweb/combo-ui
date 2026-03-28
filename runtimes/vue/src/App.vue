<script setup lang="ts">
import { onMounted } from 'vue'
import { getComboUX } from 'combo-ui-vue'

onMounted(async () => {
  await fetch('./theme.json')
  const cux = getComboUX()
  cux?.onSyncConnect(() => {
    console.log('%c✦ Realtime sync connected', 'color: #22c55e; font-weight: bold;')
  })
  cux?.onSyncDisconnect(() => {
    console.log('%c✦ Realtime sync disconnected', 'color: #ef4444; font-weight: bold;')
  })
})
</script>

<template>
  <div class="cux-alert --variante-1">
    <div class="cux-alert-header">
      Alert Titleweewe
      <button class="cux-alert-close">
        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" /></svg>
      </button>
    </div>
    <div class="cux-alert-body">Alert message content</div>
  </div>
</template>
