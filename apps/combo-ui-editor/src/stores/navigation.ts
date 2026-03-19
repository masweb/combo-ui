export const useNavigationStore = defineStore('navigation', () => {
  const currentComponent = ref<ListComponentMeta | null>(null)

  return {
    currentComponent
  }
})
