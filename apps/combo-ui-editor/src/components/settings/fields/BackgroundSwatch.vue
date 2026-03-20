<script setup lang="ts">
const open = ref(false)
const currentColor = ref('#ffffff')

const setColor = (val: string) => {
  currentColor.value = val
}

const wrapperRef = ref<HTMLElement | null>(null)

const onClickOutside = (e: MouseEvent) => {
  if (!open.value) return
  const target = e.target as Node
  if (wrapperRef.value && !wrapperRef.value.contains(target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside, true)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside, true)
})
</script>

<template>
  <div ref="wrapperRef" class="bg-swatch-wrapper">
    <button class="bg-swatch-btn" :style="{ background: currentColor }" title="Fondo" @click="open = !open" />
    <div v-if="open" class="bg-swatch-popover">
      <div class="bg-swatch-popover-header">
        <span class="small text-body-secondary">Fondo</span>
      </div>
      <div class="bg-swatch-input">
        <input
          type="color"
          :value="currentColor"
          class="form-control form-control-color form-control-sm"
          @input="setColor(($event.target as HTMLInputElement).value)"
        />
        <input
          type="text"
          class="form-control form-control-sm"
          :value="currentColor"
          style="width: 90px"
          @input="setColor(($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>
