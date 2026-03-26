import { useNavigationStore } from '@/stores/navigation'
import { COMPONENT_STORE_MAP } from '@/db'
import { loadFontsFromVariants } from './useGoogleFonts.js'
import type { Ref } from 'vue'

interface StoreInstance {
  isLoaded: Ref<boolean>
  loadFromDB: () => Promise<void>
  clearFromMemory: () => void
  variants?: Ref<unknown[]>
  selectedVariantIndex?: Ref<number>
}

const PERMANENT_STORES = ['typography', 'forms']

class StoreManager {
  private stores: Map<string, StoreInstance> = new Map()
  private pendingLoads: Set<string> = new Set()
  private initialized = false

  registerStore(componentId: string, store: StoreInstance) {
    this.stores.set(componentId, store)

    if (this.pendingLoads.has(componentId)) {
      this.pendingLoads.delete(componentId)
      if (!store.isLoaded.value) {
        void store.loadFromDB().then(() => {
          this.loadComponentFonts(componentId, store)
        })
      }
    }
  }

  async init() {
    if (this.initialized) return

    const navigationStore = useNavigationStore()

    watch(
      () => navigationStore.currentComponent,
      async (newComponent, oldComponent) => {
        if (oldComponent?.id && !PERMANENT_STORES.includes(oldComponent.id)) {
          await this.unloadComponent(oldComponent.id)
        }

        if (newComponent?.id) {
          await this.loadComponent(newComponent.id)
        }
      },
      { immediate: true }
    )

    this.initialized = true
  }

  private async loadComponent(componentId: string) {
    const store = this.stores.get(componentId)
    if (store) {
      if (!store.isLoaded.value) {
        await store.loadFromDB()
      }
      this.loadComponentFonts(componentId, store)
    } else {
      this.pendingLoads.add(componentId)
    }
  }

  private loadComponentFonts(_componentId: string, store: StoreInstance) {
    if (store.variants && Array.isArray(store.variants.value)) {
      const selectedIndex = store.selectedVariantIndex?.value ?? 0
      loadFontsFromVariants(
        store.variants.value as Array<Record<string, unknown>>,
        ['fontFamily', 'headerFontFamily'],
        false,
        selectedIndex
      )
    }
  }

  private async unloadComponent(componentId: string) {
    if (!COMPONENT_STORE_MAP[componentId]) return
    if (PERMANENT_STORES.includes(componentId)) return

    const store = this.stores.get(componentId)
    if (store && store.isLoaded.value) {
      store.clearFromMemory()
    }

    this.pendingLoads.delete(componentId)
  }

  async reloadAllStores() {
    // Reload all non-permanent stores
    for (const [componentId, store] of this.stores.entries()) {
      if (PERMANENT_STORES.includes(componentId)) continue

      store.clearFromMemory()
      await store.loadFromDB()
      this.loadComponentFonts(componentId, store)
    }
  }

  getStore(componentId: string): StoreInstance | undefined {
    return this.stores.get(componentId)
  }

  getAllStores(): Map<string, StoreInstance> {
    return this.stores
  }
}

export const storeManager = new StoreManager()

export const useStoreManager = () => {
  return storeManager
}
