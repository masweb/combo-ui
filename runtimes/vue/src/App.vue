<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getComboUI, ThemeToggler, Spinner } from 'combo-ui-vue'
import { IconSun, IconMoon } from '@tabler/icons-vue'

onMounted(async () => {
  await fetch('./theme.json')
  const cux = getComboUI()
  cux?.onSyncConnect(() => {
    console.log('%c✦ Realtime sync connected', 'color: #22c55e; font-weight: bold;')
  })
  cux?.onSyncDisconnect(() => {
    console.log('%c✦ Realtime sync disconnected', 'color: #ef4444; font-weight: bold;')
  })
})
const accordion1 = ref(true)
const accordion2 = ref(false)
</script>

<template>
  <div style="position: sticky; top: 0; z-index: 100; display: flex; justify-content: flex-end">
    <ThemeToggler v-slot="{ isDark, toggleDarkMode }">
      <button class="cui-button --v1" @click="toggleDarkMode">
        <IconSun v-if="isDark" />
        <IconMoon v-else />
      </button>
    </ThemeToggler>
  </div>

  <div class="max-width-4 mx-auto p3">
    <!-- Button -->
    <section>
      <h2 class="cui-h3 mb1">Button</h2>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
        <button class="cui-button --v1">Primary</button>
        <button class="cui-button --v1" disabled>Disabled</button>
      </div>
    </section>

    <!-- Card -->
    <section>
      <h2 class="cui-h3 mt3 mb1">Card</h2>
      <div class="cui-card --v1">
        <div class="cui-card-header"><strong>Título</strong></div>
        <div class="cui-card-body">Contenido de la tarjeta.</div>
      </div>
    </section>

    <!-- Alert -->
    <div class="cui-alert --v2">
      <div class="cui-alert-header">
        <span>¡Éxito!</span>
        <button class="cui-alert-close">
          <svg>...</svg>
        </button>
      </div>
      <div class="cui-alert-body">Operación completada correctamente.</div>
    </div>

    <!-- Avatar -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Avatar</h3>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap">
        <div class="cui-avatar-wrapper">
          <div class="cui-avatar --v1">
            <img src="https://i.pravatar.cc/300" alt="" />
          </div>
          <div class="cui-avatar-online"></div>
        </div>

        <!-- Con iniciales -->
        <div class="cui-avatar-wrapper">
          <div class="cui-avatar --v2">
            <span class="cui-avatar-initials">AB</span>
          </div>
          <div class="cui-avatar-online"></div>
        </div>
        ```
      </div>
    </section>

    <!-- Badge -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Badge</h3>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
        <span class="cui-badge --v1">Nuevo</span>
        <span class="cui-badge --v1">42</span>
      </div>
    </section>

    <!-- ToolTip -->
    <section>
      <h3 class="cui-h3 mt3 mb1">ToolTip</h3>
      <span class="cui-tooltip-wrapper">
        <button class="cui-button --v1">Primary</button>
        <span class="cui-tooltip --v1">Texto</span>
      </span>

      <span class="cui-tooltip-wrapper">
        <button class="cui-button --v1">Primary</button>
        <span class="cui-tooltip --v2">Texto</span>
      </span>

      <!-- PopOver -->
      <h3 class="cui-h3 mb1 mt3">PopOver</h3>

      <span class="cui-popover-wrapper">
        <button class="cui-button --v1">Click me</button>
        <div class="cui-popover --v1">
          <div class="cui-popover-inset-overlay"></div>
          <div class="cui-popover-header">Título</div>
          <div class="cui-popover-body">Contenido del popover.</div>
        </div>
      </span>

      <span class="cui-popover-wrapper">
        <button class="cui-button --v2">Secondary</button>
        <div class="cui-popover --v2">
          <div class="cui-popover-inset-overlay"></div>
          <div class="cui-popover-header">Título</div>
          <div class="cui-popover-body">Contenido del popover.</div>
        </div>
      </span>
    </section>

    <!-- Chip -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Chip</h3>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap">
        <span class="cui-chip --v1">
          Etiqueta
          <button class="cui-chip-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
        <span class="cui-chip --v1">
          Vue
          <button class="cui-chip-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      </div>
    </section>

    <!-- Progress -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Progress</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div class="cui-progress --v1">
          <div class="cui-progress-fill" style="width: 60%"></div>
        </div>
        <div class="cui-progress --v1">
          <div class="cui-progress-fill" style="width: 75%"></div>
          <span class="cui-progress-label">75%</span>
        </div>
        <div class="cui-progress --v1">
          <div class="cui-progress-fill --striped --animated" style="width: 50%"></div>
        </div>
      </div>
    </section>

    <!-- Spinner -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Spinner</h3>
      <Spinner variant="v1" class="mr3" />
      <Spinner variant="v2" class="mr3" />
      <Spinner variant="v3" class="mr3" />
      <Spinner variant="v4" class="mr3" />
      <Spinner variant="v5" class="mr3" />
    </section>

    <!-- Table -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Table</h3>
      <div class="cui-table --v1 --striped-rows --hoverable">
        <table>
          <thead>
            <tr class="cui-table-header-row">
              <th class="cui-table-header">Nombre</th>
              <th class="cui-table-header">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr class="cui-table-row">
              <td class="cui-table-cell">Ana García</td>
              <td class="cui-table-cell">ana@ejemplo.com</td>
            </tr>
            <tr class="cui-table-row">
              <td class="cui-table-cell">Carlos López</td>
              <td class="cui-table-cell">carlos@ejemplo.com</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="cui-table-footer-row">
              <td class="cui-table-footer" colspan="2">2 usuarios</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <!-- ListGroup -->
    <section>
      <h3 class="cui-h3 mt3 mb1">ListGroup</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div class="cui-listgroup --v1">
          <ul class="cui-listgroup-items">
            <li class="cui-listgroup-item --active">Elemento activo</li>
            <li class="cui-listgroup-item">Elemento normal</li>
            <li class="cui-listgroup-item --disabled">Elemento deshabilitado</li>
          </ul>
        </div>
        <div class="cui-listgroup --v1">
          <ol class="cui-listgroup-items">
            <li class="cui-listgroup-item"><span class="cui-listgroup-item-number">1.</span> Primer paso</li>
            <li class="cui-listgroup-item"><span class="cui-listgroup-item-number">2.</span> Segundo paso</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Accordion -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Accordion</h3>
      <div class="cui-accordion --v1">
        <div class="cui-accordion-item">
          <button class="cui-accordion-button" :class="{ '--active': accordion1 }" @click="accordion1 = !accordion1">
            Sección 1
            <svg class="cui-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div class="cui-accordion-body" v-show="accordion1">Contenido de la sección 1.</div>
        </div>
        <div class="cui-accordion-item">
          <button class="cui-accordion-button" :class="{ '--active': accordion2 }" @click="accordion2 = !accordion2">
            Sección 2
            <svg class="cui-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div class="cui-accordion-body" v-show="accordion2">Contenido de la sección 2.</div>
        </div>
      </div>
    </section>

    <!-- Pagination -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Pagination</h3>
      <nav class="cui-pagination --v1">
        <span class="cui-pagination-item --disabled">&laquo;</span>
        <span class="cui-pagination-item --active">1</span>
        <span class="cui-pagination-item">2</span>
        <span class="cui-pagination-item">3</span>
        <span class="cui-pagination-item">&raquo;</span>
      </nav>
    </section>

    <!-- Typography -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Typography</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <h1 class="cui-h1">Título principal</h1>
        <h2 class="cui-h2">Subtítulo</h2>
        <h3 class="cui-h3">Sección</h3>
        <h4 class="cui-h4">Sección</h4>
        <h1 class="cui-display1">Título principal</h1>
        <h2 class="cui-display2">Subtítulo</h2>
        <h3 class="cui-display3">Sección</h3>
        <h4 class="cui-display4">Sección</h4>
        <p class="cui-body">Texto del cuerpo del documento.</p>
        <span class="cui-small">Texto pequeño</span>
        <span class="cui-caption">Texto de pie de foto</span>
        <a class="cui-link" href="#">Enlace</a>
      </div>
    </section>

    <!-- Forms -->
    <section>
      <h3 class="cui-h3 mt3 mb1">Forms</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px">
        <div class="cui-field">
          <label class="cui-label">Nombre</label>
          <input class="cui-input" placeholder="Introduce tu nombre" />
        </div>
        <div class="cui-field">
          <label class="cui-label">Email</label>
          <input class="cui-input cui-error" aria-invalid="true" />
          <div class="cui-error-message">El email es obligatorio</div>
        </div>
        <div class="cui-field">
          <label class="cui-label">País</label>
          <select class="cui-select">
            <option>España</option>
            <option>México</option>
          </select>
        </div>
        <div class="cui-field">
          <label class="cui-label">Mensaje</label>
          <textarea class="cui-textarea" rows="4"></textarea>
        </div>
        <div class="cui-field">
          <div class="cui-option-group">
            <label class="cui-checkbox">
              <input type="checkbox" />
              <span class="cui-option-label">Acepto los términos</span>
            </label>
          </div>
        </div>
        <div class="cui-field">
          <label class="cui-label">Plan</label>
          <div class="cui-option-group">
            <label class="cui-radio">
              <input type="radio" name="plan" />
              <span class="cui-option-label">Básico</span>
            </label>
            <label class="cui-radio">
              <input type="radio" name="plan" />
              <span class="cui-option-label">Premium</span>
            </label>
          </div>
        </div>
        <div class="cui-field">
          <div class="cui-dropzone">Arrastra archivos aquí o haz clic</div>
        </div>
      </div>
    </section>
  </div>
</template>
