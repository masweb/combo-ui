import type { Directive } from 'vue'

export const vWheelNumber: Directive<HTMLInputElement> = {
  mounted(el) {
    el.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        if (document.activeElement !== el) return
        e.preventDefault()
        const step = Number(el.step) || 1
        const min = el.min !== '' ? Number(el.min) : -Infinity
        const max = el.max !== '' ? Number(el.max) : Infinity
        const current = Number(el.value) || 0
        const next = e.deltaY < 0 ? current + step : current - step
        el.value = String(Math.min(max, Math.max(min, next)))
        el.dispatchEvent(new Event('input', { bubbles: true }))
      },
      { passive: false }
    )
  }
}
