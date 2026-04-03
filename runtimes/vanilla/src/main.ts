import { ComboUX } from '@combo-ux/vanilla'

// Initialize ComboUX with WebSocket for realtime theme sync
const cux = new ComboUX({
  theme: './theme.json',
  darkMode: 'auto',
  ws: 'ws://localhost:3001' // Enable realtime sync
})

// Log WebSocket connection status
cux.onSyncConnect(() => {
  console.log('%c✦ Realtime sync connected', 'color: #22c55e; font-weight: bold;')
})

cux.onSyncDisconnect(() => {
  console.log('%c✦ Realtime sync disconnected', 'color: #ef4444; font-weight: bold;')
})

cux.onSyncThemeUpdate(theme => {
  console.log('%c✦ Theme updated:', 'color: #3b82f6; font-weight: bold;', theme.name)
  // Update theme name display
  const themeNameEl = document.getElementById('theme-name')
  if (themeNameEl) {
    themeNameEl.textContent = theme.name || 'Unknown'
  }
})

// Show controls
cux.showControls({
  position: 'top-right'
})

// Build styleguide UI
function buildStyleguide() {
  const app = document.getElementById('app')
  if (!app) return

  // Inject custom styles for the distinctive aesthetic
  const styleEl = document.createElement('style')
  styleEl.textContent = `
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
      transition: background 0.3s ease, color 0.3s ease;
    }

    /* Grid overlay - adapts to theme */
    .sg-styleguide::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(128,128,128,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(128,128,128,0.1) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
      z-index: 1;
    }

    /* Grain texture overlay */
    .sg-styleguide::after {
      content: '';
      position: fixed;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 2;
      opacity: 0.03;
    }

    .sg-header {
      position: relative;
      z-index: 10;
      padding: 2rem 0;
      border-bottom: 1px solid rgba(128,128,128,0.2);
      background: var(--cux-bg, #ffffff);
      backdrop-filter: blur(20px);
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    /* Dark mode adjustments */
    .dark .sg-styleguide::before {
      background-image:
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    }

    .dark .sg-header {
      border-bottom: 1px solid rgba(255,255,255,0.15);
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
      transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
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
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.9); }
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

    .sg-section:nth-child(1) { animation-delay: 0.1s; }
    .sg-section:nth-child(2) { animation-delay: 0.2s; }
    .sg-section:nth-child(3) { animation-delay: 0.3s; }
    .sg-section:nth-child(4) { animation-delay: 0.4s; }
    .sg-section:nth-child(5) { animation-delay: 0.5s; }
    .sg-section:nth-child(6) { animation-delay: 0.6s; }
    .sg-section:nth-child(7) { animation-delay: 0.7s; }
    .sg-section:nth-child(8) { animation-delay: 0.8s; }
    .sg-section:nth-child(9) { animation-delay: 0.9s; }
    .sg-section:nth-child(10) { animation-delay: 1s; }

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
      border-bottom: 2px solid rgba(128,128,128,0.2);
      transition: border-color 0.3s ease;
    }

    .dark .sg-section-header {
      border-bottom-color: rgba(255,255,255,0.15);
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
      background: rgba(128,128,128,0.3);
    }

    .dark .sg-subsection-title::before {
      background: rgba(255,255,255,0.2);
    }

    .sg-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .sg-grid-tight {
      gap: 0.75rem;
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
      transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    }

    .dark .sg-showcase-area {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.12);
    }

    .sg-showcase-area:hover {
      border-color: var(--cux-primary, #0d6efd);
      box-shadow: 0 0 30px rgba(13, 110, 253, 0.15);
    }

    .sg-typo-display {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .sg-typo-display .cux-display1 { font-size: 4rem; }
    .sg-typo-display .cux-display2 { font-size: 3.5rem; }
    .sg-typo-display .cux-display3 { font-size: 3rem; }
    .sg-typo-display .cux-display4 { font-size: 2.5rem; }
    .sg-typo-display .cux-display5 { font-size: 2rem; }
    .sg-typo-display .cux-display6 { font-size: 1.5rem; }

    .sg-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .sg-footer {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 3rem;
      border-top: 1px solid rgba(128,128,128,0.2);
      font-family: var(--font-display);
      font-size: 0.875rem;
      color: var(--cux-text, #212529);
      opacity: 0.5;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      transition: border-color 0.3s ease, color 0.3s ease;
    }

    .dark .sg-footer {
      border-top-color: rgba(255,255,255,0.15);
    }

    .sg-footer::before,
    .sg-footer::after {
      content: '✦';
      font-size: 0.625rem;
      opacity: 0.5;
    }

    /* Enhanced hover effects for components */
    .sg-showcase-area .cux-button {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .sg-showcase-area .cux-button:hover {
      transform: translateY(-2px);
    }

    .sg-card-grid .cux-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .sg-card-grid .cux-card:hover {
      transform: translateY(-4px);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(128,128,128,0.1);
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(128,128,128,0.3);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--cux-primary, #0d6efd);
    }

    .dark ::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.05);
    }

    .dark ::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.2);
    }
  `

  document.head.appendChild(styleEl)

  app.innerHTML = `
    <div class="sg-styleguide">
      <header class="sg-header">
        <div class="sg-header-content">
          <div class="sg-logo">
            Combo<span class="sg-logo-accent">UX</span>
          </div>
          <div class="sg-theme-badge">
            <span class="sg-theme-indicator"></span>
            <span id="theme-name">Loading...</span>
          </div>
        </div>
      </header>

      <main class="sg-main">
        <!-- Typography Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">01</span>
            <h2 class="sg-section-title">Typography</h2>
          </div>

          <div class="sg-subsection">
            <h3 class="sg-subsection-title">Headings</h3>
            <div class="sg-typo-display">
              <h1 class="cux-h1 m0">Heading 1</h1>
              <h2 class="cux-h2 m0">Heading 2</h2>
              <h3 class="cux-h3 m0">Heading 3</h3>
              <h4 class="cux-h4 m0">Heading 4</h4>
              <h5 class="cux-h5 m0">Heading 5</h5>
              <h6 class="cux-h6 m0">Heading 6</h6>
            </div>
          </div>

          <div class="sg-subsection">
            <h3 class="sg-subsection-title">Display</h3>
            <div class="sg-typo-display">
              <div class="cux-display1">Display 1</div>
              <div class="cux-display2">Display 2</div>
              <div class="cux-display3">Display 3</div>
              <div class="cux-display4">Display 4</div>
              <div class="cux-display5">Display 5</div>
              <div class="cux-display6">Display 6</div>
            </div>
          </div>

          <div class="sg-subsection">
            <h3 class="sg-subsection-title">Body Text</h3>
            <div class="sg-typo-display">
              <p class="cux-body m0">This is body text. The quick brown fox jumps over the lazy dog.</p>
              <p class="cux-small m0">This is small text. Used for secondary content.</p>
              <p class="cux-caption m0">This is caption text. Perfect for image captions and footnotes.</p>
              <a href="#" class="cux-link m0" onclick="event.preventDefault()">This is a link</a>
            </div>
          </div>
        </section>

        <!-- Buttons Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">02</span>
            <h2 class="sg-section-title">Buttons</h2>
          </div>

          <div class="sg-subsection">
            <h3 class="sg-subsection-title">Variants</h3>
            <div id="buttons-container" class="sg-showcase-area"></div>
          </div>

          <div class="sg-subsection">
            <h3 class="sg-subsection-title">Disabled</h3>
            <div id="buttons-disabled-container" class="sg-showcase-area"></div>
          </div>
        </section>

        <!-- Cards Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">03</span>
            <h2 class="sg-section-title">Cards</h2>
          </div>
          <div id="cards-container" class="sg-card-grid"></div>
        </section>

        <!-- Alerts Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">04</span>
            <h2 class="sg-section-title">Alerts</h2>
          </div>
          <div id="alerts-container" style="display: flex; flex-direction: column; gap: 1rem;"></div>
        </section>

        <!-- Avatars Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">05</span>
            <h2 class="sg-section-title">Avatars</h2>
          </div>
          <div id="avatars-container" class="sg-showcase-area"></div>
        </section>

        <!-- Progress Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">06</span>
            <h2 class="sg-section-title">Progress</h2>
          </div>
          <div id="progress-container" style="display: flex; flex-direction: column; gap: 1.5rem;"></div>
        </section>

        <!-- Spinners Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">07</span>
            <h2 class="sg-section-title">Spinners</h2>
          </div>
          <div id="spinners-container" class="sg-showcase-area"></div>
        </section>

        <!-- Badges Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">08</span>
            <h2 class="sg-section-title">Badges</h2>
          </div>
          <div id="badges-container" class="sg-showcase-area"></div>
        </section>

        <!-- Chips Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">09</span>
            <h2 class="sg-section-title">Chips</h2>
          </div>
          <div id="chips-container" class="sg-showcase-area"></div>
        </section>

        <!-- Forms Section -->
        <section class="sg-section">
          <div class="sg-section-header">
            <span class="sg-section-number">10</span>
            <h2 class="sg-section-title">Forms</h2>
          </div>

          <div class="sg-showcase-area" style="flex-direction: column; align-items: stretch; gap: 1.5rem;">
            <div class="cux-field">
              <label class="cux-label">Email Address</label>
              <input type="email" class="cux-input" placeholder="Enter your email">
            </div>

            <div class="cux-field">
              <label class="cux-label">Email with Error</label>
              <input type="email" class="cux-input cux-error" value="invalid-email" aria-invalid="true">
              <p class="cux-error-message">Please enter a valid email address</p>
            </div>

            <div class="cux-field">
              <label class="cux-label">Disabled Field</label>
              <input type="text" class="cux-input" value="Disabled value" disabled>
            </div>

            <div class="cux-field">
              <label class="cux-label">Message</label>
              <textarea class="cux-textarea" placeholder="Enter your message" rows="3"></textarea>
            </div>

            <div class="cux-field">
              <label class="cux-label">Country</label>
              <select class="cux-select">
                <option value="">Select a country</option>
                <option value="es">Spain</option>
                <option value="fr">France</option>
                <option value="de">Germany</option>
              </select>
            </div>

            <div class="cux-field">
              <label class="cux-label">Checkboxes</label>
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

            <div class="cux-field">
              <label class="cux-label">Radio Buttons</label>
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

            <div class="cux-field">
              <label class="cux-label">File Upload</label>
              <div class="cux-dropzone">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p class="m0">Drop files here or click to upload</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="sg-footer">
        ComboUX Styleguide · Built with distinctive design
      </footer>
    </div>
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

      // Generate card variants (use defaults if not in theme)
      const cardsContainer = document.getElementById('cards-container')
      const cardVariants = theme.cards?.variants || [{ name: 'Default' }]

      if (cardsContainer) {
        cardVariants.forEach((variant: { name: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Card element
          const card = document.createElement('div')
          card.className = `cux-card --${variantClass}`
          card.innerHTML = `
            <div class="cux-card-inset-overlay"></div>
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

      // Generate alert variants (use defaults if not in theme)
      const alertsContainer = document.getElementById('alerts-container')
      const alertVariants = theme.alerts?.variants || [
        { name: 'Info', position: 'left' },
        { name: 'Success', position: 'left' },
        { name: 'Warning', position: 'left' }
      ]

      if (alertsContainer) {
        alertVariants.forEach((variant: { name: string; position: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Alert element
          const alert = document.createElement('div')
          alert.className = `cux-alert --${variantClass} --${variant.position || 'left'}`
          alert.innerHTML = `
            <div class="cux-alert-inset-overlay"></div>
            <div class="cux-alert-header">
              <span>${variant.name}</span>
              <button class="cux-alert-close" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="cux-alert-body">
              <p class="m0">This is an alert with header and body content. Alerts can be positioned using the position property.</p>
            </div>
          `
          alertsContainer.appendChild(alert)
        })
      }

      // Generate avatar variants (use defaults if not in theme)
      const avatarsContainer = document.getElementById('avatars-container')
      const avatarVariants = theme.avatars?.variants || [
        { name: 'Small', size: 'sm' },
        { name: 'Medium', size: 'md' },
        { name: 'Large', size: 'lg' }
      ]

      if (avatarsContainer) {
        avatarVariants.forEach((variant: { name: string; size?: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Avatar element with initials
          const avatar = document.createElement('div')
          avatar.className = `cux-avatar --${variantClass} --${variant.size || 'md'}`
          avatar.innerHTML = `<span class="cux-avatar-initials">JD</span>`
          avatarsContainer.appendChild(avatar)
        })
      }

      // Generate progress variants (use defaults if not in theme)
      const progressContainer = document.getElementById('progress-container')
      const progressVariants = theme.progress?.variants || [
        { name: 'Default', type: 'default' },
        { name: 'Striped', type: 'striped' },
        { name: 'Animated', type: 'animated' }
      ]

      if (progressContainer) {
        progressVariants.forEach((variant: { name: string; type: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Progress wrapper with label
          const wrapper = document.createElement('div')
          wrapper.innerHTML = `
            <div class="sg-subsection-title" style="margin-bottom: 0.5rem;">${variant.name}</div>
            <div class="cux-progress --${variantClass}">
              <div class="cux-progress-inset-overlay"></div>
              <div class="cux-progress-fill ${variant.type === 'striped' ? '--striped' : ''} ${variant.type === 'animated' ? '--animated' : ''}" style="width: 50%"></div>
              <div class="cux-progress-label">50%</div>
            </div>
          `
          progressContainer.appendChild(wrapper)
        })
      }

      // Generate spinner variants (use defaults if not in theme)
      const spinnersContainer = document.getElementById('spinners-container')
      const spinnerVariants = theme.spinners?.variants || [
        { name: 'Ring', type: 'ring' },
        { name: 'Pulse', type: 'pulse' },
        { name: 'Dots', type: 'dots' },
        { name: 'Bars', type: 'bars' },
        { name: 'Dual', type: 'dual' }
      ]

      // Helper function to generate spinner HTML based on type
      const getSpinnerHTML = (type: string) => {
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

      if (spinnersContainer) {
        spinnerVariants.forEach((variant: { name: string; type: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Spinner wrapper with label
          const wrapper = document.createElement('div')
          wrapper.style.display = 'flex'
          wrapper.style.flexDirection = 'column'
          wrapper.style.alignItems = 'center'
          wrapper.style.gap = '0.5rem'
          wrapper.innerHTML = `
            <div class="cux-spinner --${variantClass}">
              ${getSpinnerHTML(variant.type)}
            </div>
            <small style="opacity: 0.6; font-size: 0.75rem;">${variant.name}</small>
          `
          spinnersContainer.appendChild(wrapper)
        })
      }

      // Generate badge variants (use defaults if not in theme)
      const badgesContainer = document.getElementById('badges-container')
      const badgeVariants = theme.badges?.variants || [
        { name: 'Primary' },
        { name: 'Secondary' },
        { name: 'Success' },
        { name: 'Danger' }
      ]

      if (badgesContainer) {
        badgeVariants.forEach((variant: { name: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Badge element
          const badge = document.createElement('span')
          badge.className = `cux-badge --${variantClass}`
          badge.textContent = variant.name
          badgesContainer.appendChild(badge)
        })
      }

      // Generate chip variants (use defaults if not in theme)
      const chipsContainer = document.getElementById('chips-container')
      const chipVariants = theme.chips?.variants || [{ name: 'Tag' }, { name: 'Category' }, { name: 'Filter' }]

      if (chipsContainer) {
        chipVariants.forEach((variant: { name: string }) => {
          const variantClass = variant.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

          // Chip element with close button
          const chip = document.createElement('span')
          chip.className = `cux-chip --${variantClass}`
          chip.innerHTML = `
            ${variant.name}
            <button class="cux-chip-close" aria-label="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          `
          chipsContainer.appendChild(chip)
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

console.log('%c✦ ComboUX Styleguide', 'font-family: Space Grotesk; font-size: 16px; font-weight: 700; color: #bef264;')
console.log('%cDistinctive design loaded', 'font-family: DM Sans; font-size: 12px; color: #71717a;')
