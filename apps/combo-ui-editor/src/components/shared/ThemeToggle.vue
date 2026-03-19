<script setup lang="ts">
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-vue'
const { toggle, theme } = useComponentTheme()
</script>

<template>
  <div class="text-center border-bottom d-flex justify-space-between" style="height: 37px">
    <div
      @click="toggle"
      style="width: 50%; cursor: pointer"
      class="theme-toggler border-end"
      :class="theme === 'light' ? 'active' : ''"
    >
      <IconSunFilled :size="18" class="my-2" />
    </div>
    <div
      @click="toggle"
      style="width: 50%; cursor: pointer"
      class="theme-toggler"
      :class="theme === 'dark' ? 'active' : ''"
    >
      <IconMoonFilled :size="16" class="my-2" />
    </div>
  </div>
</template>
