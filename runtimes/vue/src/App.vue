<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useComboUX, getComboUX } from 'combo-ui-vue'

const { isDark, toggleDarkMode } = useComboUX()

interface ThemeData {
  name: string
  buttons?: { variants: Array<{ name: string }> }
  cards?: { variants: Array<{ name: string }> }
  alerts?: { variants: Array<{ name: string; position?: string }> }
  avatars?: { variants: Array<{ name: string; size?: string }> }
  progress?: { variants: Array<{ name: string; type?: string }> }
  spinners?: { variants: Array<{ name: string; type?: string }> }
  badges?: { variants: Array<{ name: string }> }
  chips?: { variants: Array<{ name: string }> }
}

const themeName = ref('Loading...')
const buttonVariants = ref<Array<{ name: string }>>([])
const cardVariants = ref<Array<{ name: string }>>([])
const alertVariants = ref<Array<{ name: string; position?: string }>>([])
const avatarVariants = ref<Array<{ name: string; size?: string }>>([])
const progressVariants = ref<Array<{ name: string; type?: string }>>([])
const spinnerVariants = ref<Array<{ name: string; type?: string }>>([])
const badgeVariants = ref<Array<{ name: string }>>([])
const chipVariants = ref<Array<{ name: string }>>([])

onMounted(async () => {
  const res = await fetch('./theme.json')
  const theme: ThemeData = await res.json()
  updateThemeData(theme)

  const cux = getComboUX()
  cux?.onSyncThemeUpdate(updateThemeData)
  cux?.onSyncConnect(() => {
    console.log('%c✦ Realtime sync connected', 'color: #22c55e; font-weight: bold;')
  })
  cux?.onSyncDisconnect(() => {
    console.log('%c✦ Realtime sync disconnected', 'color: #ef4444; font-weight: bold;')
  })
})

function updateThemeData(theme: ThemeData) {
  themeName.value = theme.name || 'Unknown'
  buttonVariants.value = theme.buttons?.variants || []
  cardVariants.value = theme.cards?.variants || [{ name: 'Default' }]
  alertVariants.value = theme.alerts?.variants || [
    { name: 'Info' },
    { name: 'Success' },
    { name: 'Warning' }
  ]
  avatarVariants.value = theme.avatars?.variants || [
    { name: 'Small', size: 'sm' },
    { name: 'Medium', size: 'md' },
    { name: 'Large', size: 'lg' }
  ]
  progressVariants.value = theme.progress?.variants || [
    { name: 'Default', type: 'default' },
    { name: 'Striped', type: 'striped' },
    { name: 'Animated', type: 'animated' }
  ]
  spinnerVariants.value = theme.spinners?.variants || [
    { name: 'Ring', type: 'ring' },
    { name: 'Pulse', type: 'pulse' },
    { name: 'Dots', type: 'dots' },
    { name: 'Bars', type: 'bars' },
    { name: 'Dual', type: 'dual' }
  ]
  badgeVariants.value = theme.badges?.variants || [
    { name: 'Primary' },
    { name: 'Secondary' },
    { name: 'Success' },
    { name: 'Danger' }
  ]
  chipVariants.value = theme.chips?.variants || [{ name: 'Tag' }, { name: 'Category' }]
}

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function getSpinnerHTML(type?: string): string {
  switch (type) {
    case 'ring':
      return `<svg class="cux-spinner-ring" viewBox="0 0 24 24" fill="none">
        <circle class="cux-spinner-ring-track" cx="12" cy="12" r="10" stroke-width="2.5" />
        <circle class="cux-spinner-ring-arc" cx="12" cy="12" r="10" stroke-width="2.5" stroke-dasharray="43.98" stroke-dashoffset="32.99" />
      </svg>`
    case 'pulse':
      return `<svg class="cux-spinner-pulse" viewBox="0 0 24 24">
        <circle class="cux-spinner-pulse-bg" cx="12" cy="12" r="10" />
        <circle class="cux-spinner-pulse-fg" cx="12" cy="12" r="10" />
      </svg>`
    case 'dots':
      return `<div class="cux-spinner-dots">
        <div class="cux-spinner-dot"></div>
        <div class="cux-spinner-dot"></div>
        <div class="cux-spinner-dot"></div>
      </div>`
    case 'bars':
      return `<div class="cux-spinner-bars">
        <div class="cux-spinner-bar"></div>
        <div class="cux-spinner-bar"></div>
        <div class="cux-spinner-bar"></div>
        <div class="cux-spinner-bar"></div>
        <div class="cux-spinner-bar"></div>
      </div>`
    case 'dual':
      return `<svg class="cux-spinner-dual" viewBox="0 0 24 24" fill="none">
        <g class="cux-spinner-dual-outer">
          <circle cx="12" cy="12" r="10" stroke-width="2.5" stroke-dasharray="40.84 62.83" stroke-dashoffset="10.99" />
        </g>
        <g class="cux-spinner-dual-inner">
          <circle cx="12" cy="12" r="5.5" stroke-width="2.5" stroke-dasharray="22.46 34.56" stroke-dashoffset="6.05" />
        </g>
      </svg>`
    default:
      return ''
  }
}
</script>

<template>
  <div class="sg-styleguide">
    <header class="sg-header">
      <div class="sg-header-content">
        <div class="sg-logo">
          Combo<span class="sg-logo-accent">UX</span>
          <span class="sg-vue-badge">Vue</span>
        </div>
        <div class="sg-theme-badge">
          <span class="sg-theme-indicator"></span>
          <span>{{ themeName }}</span>
        </div>
      </div>
    </header>

    <main class="sg-main">
      <!-- Buttons Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">01</span>
          <h2 class="sg-section-title">Buttons</h2>
        </div>

        <div class="sg-subsection">
          <h3 class="sg-subsection-title">Variants</h3>
          <div class="sg-showcase-area">
            <button
              v-for="variant in buttonVariants"
              :key="variant.name"
              class="cux-button"
              :class="`--${toKebabCase(variant.name)}`"
            >
              {{ variant.name }}
            </button>
          </div>
        </div>

        <div class="sg-subsection">
          <h3 class="sg-subsection-title">Disabled</h3>
          <div class="sg-showcase-area">
            <button
              v-for="variant in buttonVariants"
              :key="variant.name"
              class="cux-button"
              :class="`--${toKebabCase(variant.name)}`"
              disabled
            >
              {{ variant.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- Cards Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">02</span>
          <h2 class="sg-section-title">Cards</h2>
        </div>
        <div class="sg-card-grid">
          <div
            v-for="variant in cardVariants"
            :key="variant.name"
            class="cux-card"
            :class="`--${toKebabCase(variant.name)}`"
          >
            <div class="cux-card-inset-overlay"></div>
            <div class="cux-card-header">
              <strong>{{ variant.name }}</strong>
            </div>
            <div class="cux-card-body">
              <p class="m0">This is a card with header and body content.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Alerts Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">03</span>
          <h2 class="sg-section-title">Alerts</h2>
        </div>
        <div class="sg-alerts-container">
          <div
            v-for="variant in alertVariants"
            :key="variant.name"
            class="cux-alert"
            :class="[`--${toKebabCase(variant.name)}`, `--${variant.position || 'left'}`]"
          >
            <div class="cux-alert-inset-overlay"></div>
            <div class="cux-alert-header">
              <span>{{ variant.name }}</span>
              <button class="cux-alert-close" aria-label="Close">×</button>
            </div>
            <div class="cux-alert-body">
              <p class="m0">This is an alert with header and body content.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Avatars Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">04</span>
          <h2 class="sg-section-title">Avatars</h2>
        </div>
        <div class="sg-showcase-area">
          <div
            v-for="variant in avatarVariants"
            :key="variant.name"
            class="cux-avatar"
            :class="[`--${toKebabCase(variant.name)}`, `--${variant.size || 'md'}`]"
          >
            <span class="cux-avatar-initials">JD</span>
          </div>
        </div>
      </section>

      <!-- Progress Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">05</span>
          <h2 class="sg-section-title">Progress</h2>
        </div>
        <div class="sg-progress-container">
          <div v-for="variant in progressVariants" :key="variant.name" class="sg-progress-item">
            <div class="sg-subsection-title">{{ variant.name }}</div>
            <div class="cux-progress" :class="`--${toKebabCase(variant.name)}`">
              <div class="cux-progress-inset-overlay"></div>
              <div
                class="cux-progress-fill"
                :class="{ '--striped': variant.type === 'striped' || variant.type === 'animated', '--animated': variant.type === 'striped' || variant.type === 'animated' }"
                style="width: 50%"
              ></div>
              <div class="cux-progress-label">50%</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Spinners Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">06</span>
          <h2 class="sg-section-title">Spinners</h2>
        </div>
        <div class="sg-showcase-area">
          <div
            v-for="variant in spinnerVariants"
            :key="variant.name"
            class="sg-spinner-item"
          >
            <div class="cux-spinner" :class="`--${toKebabCase(variant.name)}`" v-html="getSpinnerHTML(variant.type)"></div>
            <small>{{ variant.name }}</small>
          </div>
        </div>
      </section>

      <!-- Badges Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">07</span>
          <h2 class="sg-section-title">Badges</h2>
        </div>
        <div class="sg-showcase-area">
          <span
            v-for="variant in badgeVariants"
            :key="variant.name"
            class="cux-badge"
            :class="`--${toKebabCase(variant.name)}`"
          >
            {{ variant.name }}
          </span>
        </div>
      </section>

      <!-- Chips Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">08</span>
          <h2 class="sg-section-title">Chips</h2>
        </div>
        <div class="sg-showcase-area">
          <span
            v-for="variant in chipVariants"
            :key="variant.name"
            class="cux-chip"
            :class="`--${toKebabCase(variant.name)}`"
          >
            {{ variant.name }}
            <button class="cux-chip-close" aria-label="Remove">×</button>
          </span>
        </div>
      </section>

      <!-- Dark Mode Section -->
      <section class="sg-section">
        <div class="sg-section-header">
          <span class="sg-section-number">09</span>
          <h2 class="sg-section-title">Dark Mode</h2>
        </div>
        <div class="sg-showcase-area">
          <p>Current mode: <strong>{{ isDark ? 'Dark' : 'Light' }}</strong></p>
          <button class="cux-button --primary" @click="toggleDarkMode">Toggle Dark Mode</button>
        </div>
      </section>
    </main>

    <footer class="sg-footer">ComboUX Vue Demo · Built with distinctive design</footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

.sg-styleguide {
  font-family: var(--font-body);
  background: var(--cux-bg, #ffffff);
  color: var(--cux-text, #212529);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.sg-styleguide::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(128, 128, 128, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(128, 128, 128, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 1;
}

.dark .sg-styleguide::before {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}

.sg-header {
  position: relative;
  z-index: 10;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  background: var(--cux-bg, #ffffff);
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
}

.dark .sg-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.sg-header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sg-logo {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  color: var(--cux-text, #212529);
  transition: color 0.3s ease;
}

.sg-logo-accent {
  color: #ff6b35;
}

.sg-vue-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  background: #42b883;
  color: white;
  border-radius: 4px;
  vertical-align: middle;
}

.sg-theme-badge {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  background: rgba(128, 128, 128, 0.1);
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cux-text, #212529);
  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.sg-theme-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cux-primary, #0d6efd);
  animation: pulse 2s ease-in-out infinite;
}

.dark .sg-theme-badge {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}

.sg-main {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.sg-section {
  margin-bottom: 6rem;
  animation: fadeInUp 0.6s ease-out backwards;
}

.sg-section:nth-child(1) { animation-delay: 0.05s; }
.sg-section:nth-child(2) { animation-delay: 0.1s; }
.sg-section:nth-child(3) { animation-delay: 0.15s; }
.sg-section:nth-child(4) { animation-delay: 0.2s; }
.sg-section:nth-child(5) { animation-delay: 0.25s; }
.sg-section:nth-child(6) { animation-delay: 0.3s; }
.sg-section:nth-child(7) { animation-delay: 0.35s; }
.sg-section:nth-child(8) { animation-delay: 0.4s; }
.sg-section:nth-child(9) { animation-delay: 0.45s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sg-section-header {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(128, 128, 128, 0.2);
  transition: border-color 0.3s ease;
}

.dark .sg-section-header {
  border-bottom-color: rgba(255, 255, 255, 0.15);
}

.sg-section-number {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cux-text, #212529);
  opacity: 0.7;
}

.sg-section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--cux-text, #212529);
  transition: color 0.3s ease;
}

.sg-subsection {
  margin-bottom: 2rem;
}

.sg-subsection-title {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--cux-text, #212529);
  opacity: 0.5;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: color 0.3s ease;
}

.sg-subsection-title::before {
  content: '';
  width: 20px;
  height: 1px;
  background: rgba(128, 128, 128, 0.3);
}

.dark .sg-subsection-title::before {
  background: rgba(255, 255, 255, 0.2);
}

.sg-showcase-area {
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.15);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.dark .sg-showcase-area {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

.sg-showcase-area:hover {
  border-color: var(--cux-primary, #0d6efd);
  box-shadow: 0 0 30px rgba(13, 110, 253, 0.15);
}

.sg-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.sg-card-grid .cux-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.sg-card-grid .cux-card:hover {
  transform: translateY(-4px);
}

.sg-alerts-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sg-progress-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sg-progress-item .sg-subsection-title {
  margin-bottom: 0.5rem;
}

.sg-spinner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.sg-spinner-item small {
  opacity: 0.6;
  font-size: 0.75rem;
}

.sg-footer {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 3rem;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  font-family: var(--font-display);
  font-size: 0.875rem;
  color: var(--cux-text, #212529);
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;
}

.dark .sg-footer {
  border-top-color: rgba(255, 255, 255, 0.15);
}

.sg-showcase-area .cux-button {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.sg-showcase-area .cux-button:hover {
  transform: translateY(-2px);
}
</style>
