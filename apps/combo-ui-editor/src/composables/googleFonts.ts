// utils/googleFonts.ts
// -------------------------------------------
// Generación de URLs de Google Fonts y inyección de <link>.
// El conjunto `injectedFamilies` se mantiene dentro del módulo para evitar duplicados.

const injectedFamilies = new Set<string>()

/**
 * Construye la URL de Google Fonts para la familia y variantes indicadas.
 */
export const generateFontUrl = (family: string, variants: string[]): string => {
  const regulars: number[] = []
  const italics: number[] = []

  for (const v of variants) {
    if (v === 'regular') {
      regulars.push(400)
      continue
    }
    if (v === 'italic') {
      italics.push(400)
      continue
    }
    if (v.endsWith('italic')) {
      italics.push(parseInt(v) || 400)
      continue
    }
    const n = parseInt(v)
    if (!isNaN(n)) regulars.push(n)
  }

  let url: string
  if (italics.length === 0) {
    const wghtParam = regulars.map(w => `0,${w}`).join(';')
    url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:ital,wght@${wghtParam}&display=swap`
  } else if (regulars.length === 0) {
    const wghtParam = italics.map(w => `1,${w}`).join(';')
    url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:ital,wght@${wghtParam}&display=swap`
  } else {
    const pairs = [...regulars.map(w => `0,${w}`), ...italics.map(w => `1,${w}`)].join(';')
    url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:ital,wght@${pairs}&display=swap`
  }

  return url
}

/**
 * Inyecta un <link> en el <head> y evita duplicados.
 */
export const injectFontLink = (family: string, variants: string[]): void => {
  if (!variants.length) return
  if (injectedFamilies.has(family)) return

  const url = generateFontUrl(family, variants)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  document.head.appendChild(link)
  injectedFamilies.add(family)
}
