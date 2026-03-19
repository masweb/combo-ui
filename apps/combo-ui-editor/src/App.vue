<script setup lang="ts">
const nav = useNavigationStore()
</script>

<template>
  <MainBar />
  <CoverView v-if="!nav.currentComponent" />
  <div v-else class="d-flex">
    <SidePanel />
    <div class="preview-view">ewe</div>
  </div>
</template>
