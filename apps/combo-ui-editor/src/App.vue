<script setup lang="ts">
const layout = stLayout()
</script>

<template>
  <MainBar />
  <CoverView v-if="!layout.componentLoaded" />
  <div v-else class="d-flex">
    <SidePanel />
    <div class="preview-view">ewe</div>
  </div>
</template>
