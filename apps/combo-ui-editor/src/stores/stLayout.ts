export const stLayout = defineStore('stLayout', () => {
  const componentLoaded = ref(null as ListComponentMeta | null)
  return { componentLoaded }
})
