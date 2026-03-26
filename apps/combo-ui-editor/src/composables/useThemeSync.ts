/**
 * Theme Sync - Editor side composable
 *
 * Connects to the theme-sync-server and broadcasts theme changes.
 */

import { db, COMPONENT_STORE_MAP } from '@/db'
import { useThemeIO } from './useThemeIO.js'
import { storeManager } from './useStoreManager.js'
import { useThemeSyncLog } from './useThemeSyncLog'

const { log } = useThemeSyncLog()

const THEME_VERSION = '1.0'
const WS_URL = 'ws://localhost:3001'
const DEBOUNCE_MS = 300

// Singleton state
let instance: ReturnType<typeof createThemeSyncInstance> | null = null

export const useThemeSync = () => {
  if (!instance) {
    instance = createThemeSyncInstance()
  }
  return instance
}

function createThemeSyncInstance() {
  // State
  const isConnected = ref(false)
  const isBroadcasting = ref(false)
  const error = ref<string | null>(null)

  // WebSocket
  let ws: WebSocket | null = null
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null
  let isIntentionallyClosed = false
  let dbUnsubscribe: (() => void) | null = null

  // Get theme name from useThemeIO
  const { themeName } = useThemeIO()

  /**
   * Connect to WebSocket server
   */
  const connect = (): Promise<boolean> => {
    return new Promise(resolve => {
      if (ws?.readyState === WebSocket.OPEN) {
        resolve(true)
        return
      }

      isIntentionallyClosed = false
      error.value = null

      try {
        ws = new WebSocket(WS_URL)

        ws.onopen = () => {
          isConnected.value = true
          error.value = null
          console.log('[ThemeSync] Connected to server')
          resolve(true)
        }

        ws.onclose = () => {
          isConnected.value = false
          if (!isIntentionallyClosed) {
            log('[ThemeSync] Disconnected from server')
          }
        }

        ws.onerror = () => {
          error.value = 'No se puede conectar al servidor. ¿Está corriendo?'
          isConnected.value = false
          resolve(false)
        }

        // Handle incoming messages (if needed for future features)
        ws.onmessage = event => {
          try {
            const message = JSON.parse(event.data)
            // Currently we only send, but could receive theme requests
            log(`[ThemeSync] Received: ${message.type}`)
          } catch (_e) {
            // Ignore parse errors
          }
        }
      } catch (_e) {
        error.value = 'Error al crear conexión WebSocket'
        resolve(false)
      }
    })
  }

  /**
   * Disconnect from WebSocket server
   */
  const disconnect = () => {
    isIntentionallyClosed = true

    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
      debounceTimeout = null
    }

    // Unsubscribe from DB changes
    if (dbUnsubscribe) {
      dbUnsubscribe()
      dbUnsubscribe = null
    }

    if (ws) {
      ws.close()
      ws = null
    }

    isConnected.value = false
    isBroadcasting.value = false
  }

  /**
   * Build theme data from all stores (tries live stores first, falls back to DB)
   */
  const buildThemeData = async (): Promise<ThemeData> => {
    const themeData: ThemeData = {
      name: themeName.value,
      version: THEME_VERSION
    }

    const allStores = storeManager.getAllStores()

    // Export typography (try live store first, then DB)
    const typographyStore = allStores.get('typography')
    if (typographyStore?.variants) {
      const globalConfigRef = (typographyStore as { globalConfig?: Ref<unknown> }).globalConfig
      themeData.typography = {
        globalConfig: (globalConfigRef?.value as Record<string, unknown>) || {},
        variants: typographyStore.variants.value as unknown[],
        selectedVariantIndex: typographyStore.selectedVariantIndex?.value ?? 0
      }
    } else {
      const typographyData = await db.typography.get('main')
      if (typographyData) {
        themeData.typography = {
          globalConfig: typographyData.globalConfig,
          variants: typographyData.variants,
          selectedVariantIndex: typographyData.selectedVariantIndex
        }
      }
    }

    // Export forms (try live store first, then DB)
    const formsStore = allStores.get('forms')
    if (formsStore?.variants) {
      const globalConfigRef = (formsStore as { globalConfig?: Ref<unknown> }).globalConfig
      themeData.forms = {
        globalConfig: (globalConfigRef?.value as Record<string, unknown>) || {},
        variants: formsStore.variants.value as unknown[],
        selectedVariantIndex: formsStore.selectedVariantIndex?.value ?? 0,
        currentState: (formsStore as { currentState?: Ref<string> }).currentState?.value
      }
    } else {
      const formsData = await db.forms.get('main')
      if (formsData) {
        themeData.forms = {
          globalConfig: formsData.globalConfig,
          variants: formsData.variants,
          selectedVariantIndex: formsData.selectedVariantIndex,
          currentState: formsData.currentState
        }
      }
    }

    // Export component variants (try live stores first, then DB)
    for (const [componentId, tableName] of Object.entries(COMPONENT_STORE_MAP)) {
      if (componentId === 'forms') continue

      const store = allStores.get(componentId)
      if (store?.variants) {
        // Use live store data
        Object.assign(themeData, {
          [tableName]: {
            variants: store.variants.value as unknown[],
            selectedVariantIndex: store.selectedVariantIndex?.value ?? 0
          }
        })
      } else {
        // Fallback to DB
        const table = db[tableName] as unknown as {
          get: (id: string) => Promise<{ variants: unknown[]; selectedVariantIndex: number } | undefined>
        }
        const data = await table.get('main')

        if (data && data.variants && data.variants.length > 0) {
          Object.assign(themeData, {
            [tableName]: {
              variants: data.variants,
              selectedVariantIndex: data.selectedVariantIndex
            }
          })
        }
      }
    }

    return themeData
  }

  /**
   * Broadcast theme to connected clients
   * IMPORTANT: Called AFTER debounce, so we get the freshest data
   */
  const broadcastTheme = async () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return
    }

    try {
      // Build theme data NOW (not before debounce) to avoid stale data
      const themeData = await buildThemeData()

      const message = {
        type: 'theme-update',
        payload: themeData,
        timestamp: Date.now()
      }

      ws.send(JSON.stringify(message))
      console.log('[ThemeSync] Sent theme update with keys:', Object.keys(themeData))
    } catch (e) {
      console.error('[ThemeSync] Error broadcasting theme:', e)
    }
  }

  /**
   * Debounced broadcast - cancels previous pending broadcast
   */
  const debouncedBroadcast = () => {
    // Cancel previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    // Schedule new broadcast
    debounceTimeout = setTimeout(() => {
      debounceTimeout = null
      void broadcastTheme()
    }, DEBOUNCE_MS)
  }

  /**
   * Subscribe to database changes using table hooks
   */
  const subscribeToDBChanges = () => {
    // Subscribe to all relevant table hooks
    const relevantTables = ['typography', 'forms', ...Object.values(COMPONENT_STORE_MAP)]

    relevantTables.forEach(tableName => {
      const table = db[tableName as keyof ComboUXDatabase]
      if (table && table.hook) {
        // Hook into create/update/delete events
        table.hook('creating', () => debouncedBroadcast())
        table.hook('updating', () => debouncedBroadcast())
        table.hook('deleting', () => debouncedBroadcast())
      }
    })

    // Store unsubscribe function
    dbUnsubscribe = () => {
      relevantTables.forEach(tableName => {
        const table = db[tableName as keyof ComboUXDatabase]
        if (table && table.hook) {
          table.hook('creating').unsubscribe()
          table.hook('updating').unsubscribe()
          table.hook('deleting').unsubscribe()
        }
      })
    }
  }

  /**
   * Toggle realtime broadcasting
   */
  const toggleRealtime = async () => {
    if (isBroadcasting.value) {
      // Stop broadcasting
      disconnect()
    } else {
      // Start broadcasting
      const connected = await connect()
      if (connected) {
        isBroadcasting.value = true
        // Subscribe to DB changes
        subscribeToDBChanges()
        // Send initial theme immediately
        await broadcastTheme()
      }
    }
  }

  /**
   * Broadcast immediately (for real-time updates like color changes)
   */
  const broadcastImmediate = async () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return
    }

    try {
      // Build theme data NOW
      const themeData = await buildThemeData()

      const message = {
        type: 'theme-update',
        payload: themeData,
        timestamp: Date.now()
      }

      ws.send(JSON.stringify(message))
      console.log('[ThemeSync] Sent immediate theme update')
    } catch (e) {
      console.error('[ThemeSync] Error broadcasting theme:', e)
    }
  }

  return {
    isConnected,
    isBroadcasting,
    error,
    connect,
    disconnect,
    toggleRealtime,
    broadcastImmediate
  }
}

// Type for ThemeData (should match the one in types)
interface ThemeData {
  name: string
  version: string
  typography?: {
    globalConfig: unknown
    variants: unknown[]
    selectedVariantIndex: number
  }
  forms?: {
    globalConfig: unknown
    variants: unknown[]
    selectedVariantIndex: number
    currentState?: string
  }
  [key: string]: unknown
}
