import { ComboUX } from '@combo-ux/vanilla'

// Initialize ComboUX
const cux = new ComboUX({
  theme: './theme.json',
  darkMode: 'auto'
})

// Show controls
cux.showControls({
  position: 'top-right'
})

// Build styleguide UI
function buildStyleguide() {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = `
    <header class="px4 py3 border-bottom">
      <div class="flex items-center justify-between max-width-4 mx-auto">
        <h1 class="cux-h2 m0">Combo UX Styleguide</h1>
        <div class="flex items-center gap2">
          <span class="cux-small" style="color: var(--cux-text-muted, #6c757d)">Theme: <span id="theme-name">Loading...</span></span>
        </div>
      </div>
    </header>

    <main class="px4 py3 max-width-4 mx-auto">
      <!-- Typography Section -->
      <section class="mb4">
        <h2 class="cux-h3 mb3 pb2 border-bottom">Typography</h2>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Headings</h3>
          <div class="flex flex-column gap2">
            <h1 class="cux-h1 m0">Heading 1</h1>
            <h2 class="cux-h2 m0">Heading 2</h2>
            <h3 class="cux-h3 m0">Heading 3</h3>
            <h4 class="cux-h4 m0">Heading 4</h4>
            <h5 class="cux-h5 m0">Heading 5</h5>
            <h6 class="cux-h6 m0">Heading 6</h6>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Display</h3>
          <div class="flex flex-column gap2">
            <div class="cux-display1">Display 1</div>
            <div class="cux-display2">Display 2</div>
            <div class="cux-display3">Display 3</div>
            <div class="cux-display4">Display 4</div>
            <div class="cux-display5">Display 5</div>
            <div class="cux-display6">Display 6</div>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Body Text</h3>
          <div class="flex flex-column gap2">
            <p class="cux-body m0">This is body text. The quick brown fox jumps over the lazy dog.</p>
            <p class="cux-small m0">This is small text. Used for secondary content.</p>
            <p class="cux-caption m0">This is caption text. Perfect for image captions and footnotes.</p>
            <a href="#" class="cux-link m0" onclick="event.preventDefault()">This is a link</a>
          </div>
        </div>
      </section>

      <!-- Buttons Section -->
      <section class="mb4">
        <h2 class="cux-h3 mb3 pb2 border-bottom">Buttons</h2>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Variants</h3>
          <div id="buttons-container" class="flex flex-wrap gap2"></div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Disabled</h3>
          <div id="buttons-disabled-container" class="flex flex-wrap gap2"></div>
        </div>
      </section>

      <!-- Cards Section -->
      <section class="mb4">
        <h2 class="cux-h3 mb3 mr3 pb2 border-bottom">Cards</h2>
        <div id="cards-container" class="flex flex-wrap gap3"></div>
      </section>

      <!-- Alerts Section -->
      <section class="mb4">
        <h2 class="cux-h3 mb3 pb2 border-bottom">Alerts</h2>
        <div id="alerts-container" class="flex flex-column gap2"></div>
      </section>

      <!-- Avatars Section -->
      <section class="mb4">
        <h2 class="cux-h3 mb3 pb2 border-bottom">Avatars</h2>
        <div id="avatars-container" class="flex flex-wrap gap2 items-center"></div>
      </section>

      <!-- Forms Section -->
      <section class="mb4">
        <h2 class="cux-h3 mb3 pb2 border-bottom">Forms</h2>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Input</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Email Address</label>
            <input type="email" class="cux-input" placeholder="Enter your email">
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Input with Error</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Email Address</label>
            <input type="email" class="cux-input cux-error" value="invalid-email" aria-invalid="true">
            <p class="cux-error-message">Please enter a valid email address</p>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Disabled Input</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Disabled Field</label>
            <input type="text" class="cux-input" value="Disabled value" disabled>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Textarea</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Message</label>
            <textarea class="cux-textarea" placeholder="Enter your message" rows="4"></textarea>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Select</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Country</label>
            <select class="cux-select">
              <option value="">Select a country</option>
              <option value="es">Spain</option>
              <option value="fr">France</option>
              <option value="de">Germany</option>
            </select>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Checkboxes</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Select options</label>
            <div class="cux-option-group">
              <label class="cux-checkbox">
                <input type="checkbox" checked>
                <span class="cux-option-label">Option 1</span>
              </label>
              <label class="cux-checkbox">
                <input type="checkbox">
                <span class="cux-option-label">Option 2</span>
              </label>
              <label class="cux-checkbox">
                <input type="checkbox">
                <span class="cux-option-label">Option 3</span>
              </label>
            </div>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">Radio Buttons</h3>
          <div class="cux-field" style="margin-bottom: 0;">
            <label class="cux-label">Choose one option</label>
            <div class="cux-option-group">
              <label class="cux-radio">
                <input type="radio" name="radio-group" checked>
                <span class="cux-option-label">Option A</span>
              </label>
              <label class="cux-radio">
                <input type="radio" name="radio-group">
                <span class="cux-option-label">Option B</span>
              </label>
              <label class="cux-radio">
                <input type="radio" name="radio-group">
                <span class="cux-option-label">Option C</span>
              </label>
            </div>
          </div>
        </div>

        <div class="mb3">
          <h3 class="cux-small mb2" style="color: var(--cux-text-muted, #6c757d)">File Dropzone</h3>
          <div class="cux-dropzone">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <p class="m0">Drop files here or click to upload</p>
          </div>
        </div>
      </section>
    </main>
  `

  // Load theme name
  fetch('./theme.json')
    .then(res => res.json())
    .then(theme => {
      const themeNameEl = document.getElementById('theme-name')
      if (themeNameEl) {
        themeNameEl.textContent = theme.name || 'Unknown'
      }

      // Generate button variants
      const buttonsContainer = document.getElementById('buttons-container')
      const buttonsDisabledContainer = document.getElementById('buttons-disabled-container')

      if (buttonsContainer && buttonsDisabledContainer && theme.buttons?.variants) {
        theme.buttons.variants.forEach((variant: { name: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Normal button
          const btn = document.createElement('button')
          btn.className = `cux-button --${variantClass}`
          btn.textContent = variant.name
          buttonsContainer.appendChild(btn)

          // Disabled button
          const btnDisabled = document.createElement('button')
          btnDisabled.className = `cux-button --${variantClass}`
          btnDisabled.textContent = variant.name
          btnDisabled.disabled = true
          buttonsDisabledContainer.appendChild(btnDisabled)
        })
      }

      // Generate card variants
      const cardsContainer = document.getElementById('cards-container')

      if (cardsContainer && theme.cards?.variants) {
        theme.cards.variants.forEach((variant: { name: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Card element
          const card = document.createElement('div')
          card.className = `cux-card --${variantClass} mr3`
          card.style.maxWidth = '320px'
          card.innerHTML = `
            <div class="cux-card-header">
              <strong>${variant.name}</strong>
            </div>
            <div class="cux-card-body">
              <p class="m0">This is a card with header and body content. Cards can contain any type of content.</p>
            </div>
          `
          cardsContainer.appendChild(card)
        })
      }

      // Generate alert variants
      const alertsContainer = document.getElementById('alerts-container')

      if (alertsContainer && theme.alerts?.variants) {
        theme.alerts.variants.forEach((variant: { name: string; position: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Alert element
          const alert = document.createElement('div')
          alert.className = `cux-alert --${variantClass} --${variant.position}`
          alert.innerHTML = `
            <div class="cux-alert-header">
              <strong>${variant.name}</strong>
            </div>
            <div class="cux-alert-body">
              <p class="m0">This is an alert with header and body content. Alerts can be positioned using the position property.</p>
            </div>
          `
          alertsContainer.appendChild(alert)
        })
      }

      // Generate avatar variants
      const avatarsContainer = document.getElementById('avatars-container')

      if (avatarsContainer && theme.avatars?.variants) {
        theme.avatars.variants.forEach((variant: { name: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Avatar element with initials
          const avatar = document.createElement('div')
          avatar.className = `cux-avatar --${variantClass} --md`
          avatar.innerHTML = `<span class="cux-avatar-initials">JD</span>`
          avatarsContainer.appendChild(avatar)
        })
      }
    })
    .catch(err => console.error('Error loading theme:', err))
}

// Build UI when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildStyleguide)
} else {
  buildStyleguide()
}

console.log('ComboUX Styleguide initialized')
