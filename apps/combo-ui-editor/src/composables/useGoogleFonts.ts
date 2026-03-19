/**
 * useGoogleFonts
 *
 * Seeds IndexedDB with local googleFontsInfo.json on first run.
 * Provides fuzzy search and variant lookup.
 * Injects <link> tags to fonts.googleapis.com for live preview.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GoogleFont {
  family: string
  category: string
  variants: string[] // e.g. ['regular', 'italic', '700', '700italic']
}

// ─── IndexedDB ────────────────────────────────────────────────────────────────

const DB_NAME = 'uxcombo-fonts'
const DB_VERSION = 1
const STORE_NAME = 'fonts'

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = e => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'family' })
        store.createIndex('category', 'category', { unique: false })
      }
    }
    req.onsuccess = e => resolve((e.target as IDBOpenDBRequest).result)
    req.onerror = e => reject((e.target as IDBOpenDBRequest).error)
  })

const countFonts = (db: IDBDatabase): Promise<number> =>
  new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).count()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })

const seedFonts = (db: IDBDatabase, fonts: GoogleFont[]): Promise<void> =>
  new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    for (const font of fonts) store.put(font)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })

const getAllFonts = (db: IDBDatabase): Promise<GoogleFont[]> =>
  new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).getAll()
    req.onsuccess = () => resolve(req.result as GoogleFont[])
    req.onerror = () => reject(req.error)
  })

export const loadGoogleFont = (family: string, style: 'normal' | 'italic' = 'normal', weight: string = '400') => {
  if (!family) return

  const w =
    weight === '400' || weight === ''
      ? style === 'italic'
        ? 'italic'
        : 'regular'
      : `${weight}${style === 'italic' ? 'italic' : ''}`

  injectFontLink(family, [w])
}

export const loadFontsFromVariant = (
  variant: Record<string, unknown>,
  fontKeys: string[] = ['fontFamily', 'headerFontFamily']
) => {
  for (const key of fontKeys) {
    const family = variant[key] as string | undefined | null
    if (family && typeof family === 'string') {
      const style = variant[`${key === 'fontFamily' ? 'font' : 'headerFont'}Style`] as 'normal' | 'italic' | undefined
      const weight = variant[`${key === 'fontFamily' ? 'font' : 'headerFont'}Weight`] as string | undefined
      loadGoogleFont(family, style ?? 'normal', weight ?? '400')
    }
  }
}

export const loadFontsFromVariants = (
  variants: Array<Record<string, unknown>>,
  fontKeys: string[] = ['fontFamily', 'headerFontFamily'],
  loadAll: boolean = true,
  selectedIndex: number = 0
) => {
  if (loadAll) {
    for (const variant of variants) {
      loadFontsFromVariant(variant, fontKeys)
    }
  } else if (variants[selectedIndex]) {
    loadFontsFromVariant(variants[selectedIndex], fontKeys)
  }
}

// ─── Composable ───────────────────────────────────────────────────────────────

let allFonts: GoogleFont[] = []
let initialized = false
const initPromise: { current: Promise<void> | null } = { current: null }

const useGoogleFonts = () => {
  const ready = ref(false)
  const results = ref<GoogleFont[]>([])

  const init = async () => {
    if (initialized) {
      ready.value = true
      return
    }
    if (initPromise.current) {
      await initPromise.current
      ready.value = true
      return
    }

    initPromise.current = (async () => {
      const db = await openDB()
      const count = await countFonts(db)

      if (count === 0) {
        // Seed from bundled JSON
        const raw = await import('../json/googleFontsInfo.json')
        const items = (raw.default as { items: Array<{ family: string; category: string; variants: string[] }> }).items
        const fonts: GoogleFont[] = items.map(item => ({
          family: item.family,
          category: item.category,
          variants: item.variants
        }))
        await seedFonts(db, fonts)
        allFonts = fonts
      } else {
        allFonts = await getAllFonts(db)
      }
      db.close()
      initialized = true
    })()

    await initPromise.current
    ready.value = true
  }

  // Debounced search across family names
  let searchTimer: ReturnType<typeof setTimeout>

  const search = (query: string) => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      if (!query.trim()) {
        results.value = allFonts.slice(0, 50)
        return
      }
      const q = query.toLowerCase()
      results.value = allFonts.filter(f => f.family.toLowerCase().includes(q)).slice(0, 50)
    }, 150)
  }

  const getFont = (family: string): GoogleFont | undefined => allFonts.find(f => f.family === family)

  // Injects the Google Fonts link for a single style+weight combination
  const loadPreview = (family: string, style: 'normal' | 'italic', weight: string) => {
    const w =
      weight === '400' || weight === ''
        ? style === 'italic'
          ? 'italic'
          : 'regular'
        : `${weight}${style === 'italic' ? 'italic' : ''}`
    injectFontLink(family, [w])
  }

  return { ready, results, init, search, getFont, loadPreview }
}

export default useGoogleFonts
