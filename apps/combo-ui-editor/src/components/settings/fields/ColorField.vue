<script setup lang="ts">
import { IconColorPicker } from '@tabler/icons-vue'
import { useThemeSync } from '@/composables/useThemeSync'

// ─── Theme sync ───────────────────────────────────────────────────────────────

const { isBroadcasting, broadcastImmediate } = useThemeSync()

// ─── Props & emits ────────────────────────────────────────────────────────────

const props = defineProps<{
  label: string
  modelValue: string // any CSS color string: #rrggbb, #rrggbbaa, rgba(...)
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// ─── Scale mode ───────────────────────────────────────────────────────────────

const scaleMode = ref<'fixed' | 'proportional'>('fixed')

// ─── Color parsing helpers ────────────────────────────────────────────────────

// Parse any supported format → { h, s, l, a }
const parseColor = (raw: string): { h: number; s: number; l: number; a: number } => {
  let r = 0,
    g = 0,
    b = 0,
    a = 1

  const hex8 = raw.match(/^#([0-9a-f]{8})$/i)
  const hex6 = raw.match(/^#([0-9a-f]{6})$/i)
  const hex4 = raw.match(/^#([0-9a-f]{4})$/i)
  const hex3 = raw.match(/^#([0-9a-f]{3})$/i)
  const rgba = raw.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i)

  if (hex8) {
    const v = hex8[1]!
    r = parseInt(v.slice(0, 2), 16)
    g = parseInt(v.slice(2, 4), 16)
    b = parseInt(v.slice(4, 6), 16)
    a = parseInt(v.slice(6, 8), 16) / 255
  } else if (hex6) {
    const v = hex6[1]!
    r = parseInt(v.slice(0, 2), 16)
    g = parseInt(v.slice(2, 4), 16)
    b = parseInt(v.slice(4, 6), 16)
  } else if (hex4) {
    const v = hex4[1]!
    r = parseInt(v[0]!.repeat(2), 16)
    g = parseInt(v[1]!.repeat(2), 16)
    b = parseInt(v[2]!.repeat(2), 16)
    a = parseInt(v[3]!.repeat(2), 16) / 255
  } else if (hex3) {
    const v = hex3[1]!
    r = parseInt(v[0]!.repeat(2), 16)
    g = parseInt(v[1]!.repeat(2), 16)
    b = parseInt(v[2]!.repeat(2), 16)
  } else if (rgba) {
    r = Number(rgba[1])
    g = Number(rgba[2])
    b = Number(rgba[3])
    a = rgba[4] !== undefined ? Number(rgba[4]) : 1
  }

  // rgb → hsl
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }

  return { h: h * 360, s: s * 100, l: l * 100, a }
}

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360
  s /= 100
  l /= 100
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return {
    r: Math.round(r! * 255),
    g: Math.round(g! * 255),
    b: Math.round(b! * 255)
  }
}

const toHex2 = (n: number) => n.toString(16).padStart(2, '0')

// Build output string: hex if a=1, rgba otherwise
const buildOutput = (h: number, s: number, l: number, a: number) => {
  const { r, g, b } = hslToRgb(h, s, l)
  if (a >= 1) return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`
  return `rgba(${r}, ${g}, ${b}, ${Math.round(a * 100) / 100})`
}

// ─── State ────────────────────────────────────────────────────────────────────

const parsed = parseColor(props.modelValue || '#000000')
const hue = ref(parsed.h)
const sat = ref(parsed.s)
const lit = ref(parsed.l)
const alpha = ref(parsed.a)
const hexInput = ref(props.modelValue || '#000000')
const open = ref(false)

// Picker canvas refs
const gradientCanvas = ref<HTMLCanvasElement | null>(null)
const pickerWrapper = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)

// Cursor position on gradient (0..1)
const cursorX = ref(sat.value / 100)
const cursorY = ref(1 - lit.value / 100)

// ─── Sync from prop ───────────────────────────────────────────────────────────

watch(
  () => props.modelValue,
  val => {
    const p = parseColor(val)
    hue.value = p.h
    sat.value = p.s
    lit.value = p.l
    alpha.value = p.a
    hexInput.value = val
    cursorX.value = p.s / 100
    cursorY.value = 1 - p.l / 100
    drawGradient()
  }
)

// ─── Emit output ─────────────────────────────────────────────────────────────

const emitColor = () => {
  const out = buildOutput(hue.value, sat.value, lit.value, alpha.value)
  hexInput.value = out
  emit('update:modelValue', out)
  // Broadcast to connected clients when broadcasting is active
  if (isBroadcasting.value) {
    void broadcastImmediate()
  }
}

// ─── Gradient canvas ─────────────────────────────────────────────────────────

const drawGradient = () => {
  const canvas = gradientCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const { width, height } = canvas

  // White → hue gradient (left to right)
  const hueColor = `hsl(${hue.value}, 100%, 50%)`
  const gradH = ctx.createLinearGradient(0, 0, width, 0)
  gradH.addColorStop(0, 'white')
  gradH.addColorStop(1, hueColor)
  ctx.fillStyle = gradH
  ctx.fillRect(0, 0, width, height)

  // Transparent → black (top to bottom)
  const gradV = ctx.createLinearGradient(0, 0, 0, height)
  gradV.addColorStop(0, 'transparent')
  gradV.addColorStop(1, 'black')
  ctx.fillStyle = gradV
  ctx.fillRect(0, 0, width, height)
}

watch(hue, () => {
  drawGradient()
  emitColor()
})

// ─── Gradient drag ────────────────────────────────────────────────────────────

const isDraggingGradient = ref(false)

const pickFromCanvas = (e: MouseEvent | Touch) => {
  const canvas = gradientCanvas.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
  cursorX.value = x
  cursorY.value = y
  // Convert position to sat/lit
  // At x=0 y=0 → white (s=0, l=100); at x=1 y=0 → hue (s=100, l=50); at y=1 → black
  sat.value = x * 100
  lit.value = (1 - y) * (100 - x * 50)
  emitColor()
}

const onGradientMousedown = (e: MouseEvent) => {
  isDraggingGradient.value = true
  pickFromCanvas(e)
}

const onGlobalMousemove = (e: MouseEvent) => {
  if (isDraggingGradient.value) pickFromCanvas(e)
}

const onGlobalMouseup = () => {
  isDraggingGradient.value = false
}

// ─── Hue drag ─────────────────────────────────────────────────────────────────

const hueTrack = ref<HTMLElement | null>(null)
const isDraggingHue = ref(false)

const pickHue = (e: MouseEvent) => {
  const el = hueTrack.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  hue.value = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360))
}

const onHueMousedown = (e: MouseEvent) => {
  isDraggingHue.value = true
  pickHue(e)
}

// ─── Alpha drag ───────────────────────────────────────────────────────────────

const alphaTrack = ref<HTMLElement | null>(null)
const isDraggingAlpha = ref(false)

const pickAlpha = (e: MouseEvent) => {
  const el = alphaTrack.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  alpha.value = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  emitColor()
}

const onAlphaMousedown = (e: MouseEvent) => {
  isDraggingAlpha.value = true
  pickAlpha(e)
}

// ─── Global mouse handlers ────────────────────────────────────────────────────

const onGlobalMove = (e: MouseEvent) => {
  if (isDraggingGradient.value) pickFromCanvas(e)
  if (isDraggingHue.value) pickHue(e)
  if (isDraggingAlpha.value) pickAlpha(e)
}

const onGlobalUp = () => {
  isDraggingGradient.value = false
  isDraggingHue.value = false
  isDraggingAlpha.value = false
}

// ─── Click outside to close ───────────────────────────────────────────────────

const onClickOutside = (e: MouseEvent) => {
  if (!open.value) return
  const target = e.target as Node
  if (pickerWrapper.value && !pickerWrapper.value.contains(target)) {
    open.value = false
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onGlobalMove)
  window.addEventListener('mouseup', onGlobalUp)
  document.addEventListener('mousedown', onClickOutside, true)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onGlobalMove)
  window.removeEventListener('mouseup', onGlobalUp)
  document.removeEventListener('mousedown', onClickOutside, true)
})

// Draw on open
watch(open, val => {
  if (val) nextTick(() => drawGradient())
})

// ─── Hex input ────────────────────────────────────────────────────────────────

const onHexInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  hexInput.value = val
  const p = parseColor(val)
  if (p) {
    hue.value = p.h
    sat.value = p.s
    lit.value = p.l
    alpha.value = p.a
    cursorX.value = p.s / 100
    cursorY.value = 1 - p.l / 100
    drawGradient()
    emit('update:modelValue', val)
    // Broadcast to connected clients when broadcasting is active
    if (isBroadcasting.value) {
      void broadcastImmediate()
    }
  }
}

// ─── Alpha input ─────────────────────────────────────────────────────────────

const onAlphaInput = (e: Event) => {
  alpha.value = Math.max(0, Math.min(100, Number((e.target as HTMLInputElement).value))) / 100
  emitColor()
  // Broadcast to connected clients when broadcasting is active
  if (isBroadcasting.value) {
    void broadcastImmediate()
  }
}

// ─── EyeDropper ──────────────────────────────────────────────────────────────

const eyeDropperSupported = typeof window !== 'undefined' && 'EyeDropper' in window

const openEyeDropper = async () => {
  if (!eyeDropperSupported) return
  try {
    // @ts-expect-error EyeDropper not yet in TS lib
    const dropper = new window.EyeDropper()
    const result = await dropper.open()
    const picked = result.sRGBHex as string
    const p = parseColor(picked)
    hue.value = p.h
    sat.value = p.s
    lit.value = p.l
    alpha.value = p.a
    cursorX.value = p.s / 100
    cursorY.value = 1 - p.l / 100
    hexInput.value = picked
    drawGradient()
    emit('update:modelValue', picked)
    // Broadcast to connected clients when broadcasting is active
    if (isBroadcasting.value) {
      void broadcastImmediate()
    }
  } catch {
    // user cancelled — do nothing
  }
}

// ─── Derived styles ───────────────────────────────────────────────────────────

const swatchStyle = computed(() => ({
  background: buildOutput(hue.value, sat.value, lit.value, alpha.value)
}))

const hueThumbStyle = computed(() => ({
  left: `${(hue.value / 360) * 100}%`
}))

const alphaThumbStyle = computed(() => ({
  left: `${alpha.value * 100}%`
}))

const alphaTrackBg = computed(() => {
  const { r, g, b } = hslToRgb(hue.value, sat.value, lit.value)
  return `linear-gradient(to right, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))`
})

const cursorStyle = computed(() => ({
  left: `${cursorX.value * 100}%`,
  top: `${cursorY.value * 100}%`
}))

// ─── Color scale variations ───────────────────────────────────────────────────

// Determina si el color es claro (para ajustar color del texto)
const isLightColor = computed(() => {
  // Usamos luminosidad percibida: L > 55 se considera claro
  return lit.value > 55
})

// Genera las 10 variaciones de color (5 más oscuros, 5 más claros)
const colorVariations = computed(() => {
  const currentL = lit.value
  const h = hue.value
  const s = sat.value
  const a = alpha.value

  // 5 tonos más oscuros (de más oscuro a menos oscuro)
  const darker: Array<{ l: number; color: string }> = []
  // 5 tonos más claros (de menos claro a más claro)
  const lighter: Array<{ l: number; color: string }> = []

  if (scaleMode.value === 'fixed') {
    // Modo pasos fijos: ±10%, ±20%, ±30%, ±40%, ±50%
    for (let i = 5; i >= 1; i--) {
      const l = Math.max(0, currentL - i * 10)
      darker.push({ l, color: buildOutput(h, s, l, a) })
    }
    for (let i = 1; i <= 5; i++) {
      const l = Math.min(100, currentL + i * 10)
      lighter.push({ l, color: buildOutput(h, s, l, a) })
    }
  } else {
    // Modo proporcional: distribuir entre actual y extremos
    // Oscuros: del actual hacia 0
    for (let i = 5; i >= 1; i--) {
      const l = (currentL / 6) * i
      darker.push({ l: Math.round(l), color: buildOutput(h, s, l, a) })
    }
    // Claros: del actual hacia 100
    for (let i = 1; i <= 5; i++) {
      const l = currentL + ((100 - currentL) / 6) * i
      lighter.push({ l: Math.round(l), color: buildOutput(h, s, l, a) })
    }
  }

  return { darker, lighter }
})

// Selecciona una variación de color
const selectVariation = (newL: number) => {
  lit.value = newL
  cursorY.value = 1 - newL / 100
  emitColor()
  drawGradient()
  // Broadcast to connected clients when broadcasting is active
  if (isBroadcasting.value) {
    void broadcastImmediate()
  }
}

// Determina si un color de la variación es claro (para el texto del label)
const isVariationLight = (l: number) => l > 55
</script>

<template>
  <div ref="pickerWrapper" class="color-field">
    <label class="field-label">{{ label }}</label>

    <!-- Trigger row -->
    <div
      class="color-field-trigger"
      :class="{ 'is-light': isLightColor, 'is-dark': !isLightColor }"
      :style="swatchStyle"
      @click="open = !open"
    >
      <span class="color-field-value">{{ hexInput }}</span>
      <span class="color-field-chevron">{{ open ? '▲' : '▼' }}</span>
    </div>

    <!-- Popover -->
    <div v-if="open" ref="popoverRef" class="color-popover">
      <!-- Color scale variations -->
      <div class="cp-scale">
        <div class="cp-scale-header">
          <span class="cp-scale-title">Variations</span>
          <div class="cp-scale-switch">
            <button
              class="cp-scale-btn"
              :class="{ active: scaleMode === 'fixed' }"
              @click="scaleMode = 'fixed'"
            >
              Fixed
            </button>
            <button
              class="cp-scale-btn"
              :class="{ active: scaleMode === 'proportional' }"
              @click="scaleMode = 'proportional'"
            >
              Prop
            </button>
          </div>
        </div>
        <!-- Darker row -->
        <div class="cp-scale-row">
          <button
            v-for="(item, idx) in colorVariations.darker"
            :key="'d' + idx"
            class="cp-scale-swatch"
            :style="{ background: item.color }"
            :title="`${Math.round(item.l)}%`"
            @click="selectVariation(item.l)"
          >
            <span class="cp-scale-label" :class="{ light: !isVariationLight(item.l) }">
              {{ Math.round(item.l) }}%
            </span>
          </button>
        </div>
        <!-- Lighter row -->
        <div class="cp-scale-row">
          <button
            v-for="(item, idx) in colorVariations.lighter"
            :key="'l' + idx"
            class="cp-scale-swatch"
            :style="{ background: item.color }"
            :title="`${Math.round(item.l)}%`"
            @click="selectVariation(item.l)"
          >
            <span class="cp-scale-label" :class="{ light: !isVariationLight(item.l) }">
              {{ Math.round(item.l) }}%
            </span>
          </button>
        </div>
      </div>

      <!-- Gradient canvas -->
      <div class="cp-gradient-wrap" @mousedown="onGradientMousedown">
        <canvas ref="gradientCanvas" class="cp-gradient" width="240" height="150" />
        <span class="cp-cursor" :style="cursorStyle" />
      </div>

      <!-- Hue slider -->
      <div class="cp-sliders">
        <div ref="hueTrack" class="cp-track cp-track-hue" @mousedown="onHueMousedown">
          <span class="cp-thumb" :style="hueThumbStyle" />
        </div>

        <!-- Alpha slider -->
        <div
          ref="alphaTrack"
          class="cp-track cp-track-alpha"
          :style="{ background: alphaTrackBg }"
          @mousedown="onAlphaMousedown"
        >
          <span class="cp-thumb" :style="alphaThumbStyle" />
        </div>
      </div>

      <!-- Hex + alpha inputs + eyedropper -->
      <div class="cp-inputs">
        <div class="cp-input-group cp-input-hex">
          <div
            class="cp-hex-input-wrap"
            :style="{ background: swatchStyle.background }"
          >
            <input
              class="cp-hex-input"
              :class="{ 'text-dark': isLightColor, 'text-light': !isLightColor }"
              :value="hexInput"
              @input="onHexInput"
            />
          </div>
          <span class="cp-input-label">HEX</span>
        </div>
        <div class="cp-input-group cp-input-alpha">
          <input
            class="form-control form-control-sm"
            type="number"
            min="0"
            max="100"
            :value="Math.round(alpha * 100)"
            @input="onAlphaInput"
          />
          <span class="cp-input-label">A%</span>
        </div>
        <div v-if="eyeDropperSupported" class="cp-input-group cp-input-eyedropper">
          <button class="btn cp-eyedropper-btn" title="Pick color from screen" @click.stop="openEyeDropper">
            <IconColorPicker :size="14" :stroke-width="1.8" />
          </button>
          <span class="cp-input-label">Pick</span>
        </div>
      </div>
    </div>
  </div>
</template>
