/**
 * README Generator for Theme Export
 * Generates a README.md with usage examples for each component
 */

import type { ThemeData } from './useThemeIO'

import { COMPONENT_STORE_MAP } from '@/db'

/**
 * Convert string to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

interface ComponentInfo {
  name: string
  id: string
  description: string
  baseClass: string
  variantPattern: string
  darkPattern: string
  subComponents: string[]
  example: (variantName: string, variantNameKebab: string) => string
}

const COMPONENTS: ComponentInfo[] = [
  {
    name: 'Button',
    id: 'button',
    description: 'Interactive button component with hover, active, focus, and disabled states.',
    baseClass: 'cux-button',
    variantPattern: '.cux-button.--{variant-name}',
    darkPattern: '.dark .cux-button.--{variant-name}',
    subComponents: [],
    example: (_name, kebab) => `<button class="cux-button --${kebab}">Click me</button>
<button class="cux-button --${kebab}" disabled>Disabled</button>`
  },
  {
    name: 'Card',
    id: 'card',
    description: 'Container component with optional header, body, and footer sections.',
    baseClass: 'cux-card',
    variantPattern: '.cux-card.--{variant-name}',
    darkPattern: '.dark .cux-card.--{variant-name}',
    subComponents: ['cux-card-header', 'cux-card-body', 'cux-card-footer', 'cux-card-inset-overlay'],
    example: (_name, kebab) => `<div class="cux-card --${kebab}">
  <div class="cux-card-header">Header</div>
  <div class="cux-card-body">Content goes here</div>
  <div class="cux-card-footer">Footer</div>
</div>`
  },
  {
    name: 'Alert',
    id: 'alert',
    description: 'Notification component with header, body, close button, and position modifiers.',
    baseClass: 'cux-alert',
    variantPattern: '.cux-alert.--{variant-name}',
    darkPattern: '.dark .cux-alert.--{variant-name}',
    subComponents: ['cux-alert-header', 'cux-alert-body', 'cux-alert-close', 'cux-alert-inset-overlay'],
    example: (_name, kebab) => `<div class="cux-alert --${kebab}">
  <div class="cux-alert-header">
    Alert Title
    <button class="cux-alert-close">
      <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/></svg>
    </button>
  </div>
  <div class="cux-alert-body">Alert message content</div>
</div>

<!-- Positioned alert -->
<div class="cux-alert --${kebab} --top-right">...</div>`
  },
  {
    name: 'Badge',
    id: 'badge',
    description: 'Small label component for status or count indicators.',
    baseClass: 'cux-badge',
    variantPattern: '.cux-badge.--{variant-name}',
    darkPattern: '.dark .cux-badge.--{variant-name}',
    subComponents: [],
    example: (_name, kebab) => `<span class="cux-badge --${kebab}">New</span>
<span class="cux-badge --${kebab}">42</span>`
  },
  {
    name: 'Chip',
    id: 'chip',
    description: 'Interactive tag component with optional close button.',
    baseClass: 'cux-chip',
    variantPattern: '.cux-chip.--{variant-name}',
    darkPattern: '.dark .cux-chip.--{variant-name}',
    subComponents: ['cux-chip-close'],
    example: (_name, kebab) => `<span class="cux-chip --${kebab}">Tag</span>
<span class="cux-chip --${kebab}">
  Removable
  <button class="cux-chip-close">
    <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/></svg>
  </button>
</span>`
  }
]

// Get table name for a component ID
function getTableName(componentId: string): string {
  const tableName = COMPONENT_STORE_MAP[componentId]
  return tableName || `${componentId}s` // fallback for unknown components
}

/**
 * Check if a component has variants in the theme data
 */
function hasVariants(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false

  const d = data as Record<string, unknown>
  return 'variants' in d && Array.isArray(d.variants) && d.variants.length > 0
}

/**
 * Generate README.md content for a theme
 */
export function generateReadme(themeData: ThemeData): string {
  const lines: string[] = []

  // Header
  lines.push(`# ${themeData.name}`)
  lines.push('')
  lines.push(`Version: ${themeData.version || '1.0'}`)
  lines.push('')
  lines.push('---')
  lines.push('')

  // Table of Contents
  lines.push('## Table of Contents')
  lines.push('')

  // Always include Typography and Forms
  lines.push('- [Typography](#typography)')
  lines.push('- [Forms](#forms)')

  // Add components that exist in theme
  for (const component of COMPONENTS) {
    const tableName = getTableName(component.id)
    const componentData = themeData[tableName as keyof ThemeData]
    if (componentData && hasVariants(componentData)) {
      lines.push(`- [${component.name}](#${component.id})`)
    }
  }
  lines.push('')

  // Typography Section (always included)
  lines.push(generateTypographySection(themeData))
  lines.push('')

  // Forms Section (always included)
  lines.push(generateFormsSection(themeData))
  lines.push('')

  // Component Sections
  for (const component of COMPONENTS) {
    const tableName = getTableName(component.id)
    const componentData = themeData[tableName as keyof ThemeData]

    if (componentData && hasVariants(componentData)) {
      lines.push(generateComponentSection(component, componentData as { variants: { name: string }[] }))
      lines.push('')
    }
  }

  // Dark Mode Section
  lines.push(generateDarkModeSection())
  lines.push('')

  return lines.join('\n')
}

function generateTypographySection(themeData: ThemeData): string {
  const lines: string[] = []

  lines.push('## Typography')
  lines.push('')
  lines.push('Typography styles for headings, body text, and display text.')
  lines.push('')

  // Global config - type assertion
  const typography = themeData.typography as { globalConfig?: unknown; variants: unknown[] } | undefined
  const globalConfig = typography?.globalConfig as {
    fontFamily?: string
    color?: string
    background?: string
    dark?: {
      color?: string
      background?: string
    }
  } | undefined

  if (globalConfig) {
    lines.push('### Global Configuration')
    lines.push('')
    lines.push('| Property | Light Mode | Dark Mode |')
    lines.push('|----------|------------|-----------|')
    if (globalConfig.fontFamily) {
      lines.push(`| Font Family | \`${globalConfig.fontFamily}\` | - |`)
    }
    if (globalConfig.color) {
      lines.push(`| Text Color | \`${globalConfig.color}\` | \`${globalConfig.dark?.color || 'N/A'}\` |`)
    }
    if (globalConfig.background) {
      lines.push(`| Background | \`${globalConfig.background}\` | \`${globalConfig.dark?.background || 'N/A'}\` |`)
    }
    lines.push('')
  }

  // Available classes
  lines.push('### Available Classes')
  lines.push('')
  lines.push('```css')
  lines.push('.cux-typography { /* Base typography */ }')
  lines.push('')

  const variants = themeData.typography?.variants as { id: string; name?: string }[] | undefined
  if (variants) {
    for (const variant of variants) {
      lines.push(`.cux-${variant.id} { /* ${variant.name || variant.id} */ }`)
    }
  }

  lines.push('')
  lines.push('/* Dark mode */')
  lines.push('.dark .cux-h1, .dark .cux-h2, .dark .cux-h3,')
  lines.push('.dark .cux-h4, .dark .cux-h5, .dark .cux-h6,')
  lines.push('.dark .cux-body, .dark .cux-small, .dark .cux-caption { /* ... */ }')
  lines.push('```')
  lines.push('')

  // Examples
  lines.push('### Example')
  lines.push('')
  lines.push('```html')
  lines.push('<h1 class="cux-h1">Heading 1</h1>')
  lines.push('<h2 class="cux-h2">Heading 2</h2>')
  lines.push('<p class="cux-body">Body text content goes here.</p>')
  lines.push('<small class="cux-small">Small text</small>')
  lines.push('<span class="cux-caption">Caption text</span>')
  lines.push('```')

  return lines.join('\n')
}

function generateFormsSection(themeData: ThemeData): string {
  const lines: string[] = []

  lines.push('## Forms')
  lines.push('')
  lines.push('Form field styles for inputs, selects, checkboxes, radios, and textareas.')
  lines.push('')

  // Global config - type assertion
  const forms = themeData.forms as { globalConfig?: unknown; variants: unknown[] } | undefined
  const globalConfig = forms?.globalConfig as {
    fontFamily?: string
    color?: string
    background?: string
    border?: { color?: string }
    dark?: {
      color?: string
      background?: string
      borderColor?: string
    }
  } | undefined

  if (globalConfig) {
    lines.push('### Global Configuration')
    lines.push('')
    lines.push('| Property | Light Mode | Dark Mode |')
    lines.push('|----------|------------|-----------|')
    if (globalConfig.background) {
      lines.push(`| Background | \`${globalConfig.background}\` | \`${globalConfig.dark?.background || 'N/A'}\` |`)
    }
    if (globalConfig.color) {
      lines.push(`| Text Color | \`${globalConfig.color}\` | \`${globalConfig.dark?.color || 'N/A'}\` |`)
    }
    if (globalConfig.border?.color) {
      lines.push(`| Border Color | \`${globalConfig.border.color}\` | \`${globalConfig.dark?.borderColor || 'N/A'}\` |`)
    }
    if (globalConfig.fontFamily) {
      lines.push(`| Font Family | \`${globalConfig.fontFamily}\` | - |`)
    }
    lines.push('')
  }

  // Available classes
  lines.push('### Available Classes')
  lines.push('')
  lines.push('```css')
  lines.push('/* Field container */')
  lines.push('.cux-field { }')
  lines.push('')
  lines.push('/* Label */')
  lines.push('.cux-label { }')
  lines.push('')
  lines.push('/* Input */')
  lines.push('.cux-input { }')
  lines.push('.cux-input:focus { }')
  lines.push('.cux-input:disabled { }')
  lines.push('.cux-input.cux-error { }')
  lines.push('')
  lines.push('/* Select */')
  lines.push('.cux-select { }')
  lines.push('')
  lines.push('/* Textarea */')
  lines.push('.cux-textarea { }')
  lines.push('')
  lines.push('/* Checkbox & Radio */')
  lines.push('.cux-checkbox { }')
  lines.push('.cux-radio { }')
  lines.push('.cux-option-label { }')
  lines.push('.cux-option-group { }')
  lines.push('')
  lines.push('/* Error message */')
  lines.push('.cux-error-message { }')
  lines.push('')
  lines.push('/* Dropzone */')
  lines.push('.cux-dropzone { }')
  lines.push('')
  lines.push('/* Dark mode */')
  lines.push('.dark .cux-input { }')
  lines.push('.dark .cux-select { }')
  lines.push('/* ... */')
  lines.push('```')
  lines.push('')

  // Examples
  lines.push('### Example')
  lines.push('')
  lines.push('```html')
  lines.push('<!-- Text input -->')
  lines.push('<div class="cux-field">')
  lines.push('  <label class="cux-label">Email</label>')
  lines.push('  <input type="email" class="cux-input" placeholder="Enter email">')
  lines.push('</div>')
  lines.push('')
  lines.push('<!-- Input with error -->')
  lines.push('<div class="cux-field">')
  lines.push('  <label class="cux-label">Password</label>')
  lines.push('  <input type="password" class="cux-input cux-error">')
  lines.push('  <span class="cux-error-message">Password is required</span>')
  lines.push('</div>')
    lines.push('')
    lines.push('<!-- Select -->')
    lines.push('<select class="cux-select">')
    lines.push('  <option>Option 1</option>')
    lines.push('  <option>Option 2</option>')
    lines.push('</select>')
    lines.push('')
    lines.push('<!-- Checkbox -->')
    lines.push('<label class="cux-checkbox">')
    lines.push('  <input type="checkbox">')
    lines.push('  <span class="cux-option-label">Accept terms</span>')
    lines.push('</label>')
    lines.push('')
    lines.push('<!-- Radio group -->')
    lines.push('<div class="cux-option-group">')
    lines.push('  <label class="cux-radio">')
    lines.push('    <input type="radio" name="choice">')
    lines.push('    <span class="cux-option-label">Option A</span>')
    lines.push('  </label>')
    lines.push('  <label class="cux-radio">')
    lines.push('    <input type="radio" name="choice">')
    lines.push('    <span class="cux-option-label">Option B</span>')
    lines.push('  </label>')
    lines.push('</div>')
    lines.push('')
    lines.push('<!-- Textarea -->')
    lines.push('<textarea class="cux-textarea" placeholder="Message"></textarea>')
    lines.push('')
    lines.push('<!-- Dropzone -->')
    lines.push('<div class="cux-dropzone">')
    lines.push('  Drop files here or click to upload')
    lines.push('</div>')
    lines.push('```')

    return lines.join('\n')
}

function generateComponentSection(
  component: ComponentInfo,
  componentData: { variants: { name: string }[] }
): string {
  const lines: string[] = []

  lines.push(`## ${component.name}`)
  lines.push('')
  lines.push(component.description)
  lines.push('')

  // Available variants
  lines.push('### Available Variants')
  lines.push('')

  for (const variant of componentData.variants) {
    const variantNameKebab = toKebabCase(variant.name)
    lines.push(`#### \`${variant.name}\``)
    lines.push('')
    lines.push('**CSS Classes:**')
    lines.push('')
    lines.push('```css')
    lines.push(`${component.variantPattern.replace('{variant-name}', variantNameKebab)}`)

    if (component.subComponents.length > 0) {
      lines.push('')
      lines.push('/* Sub-components */')
      for (const sub of component.subComponents) {
        lines.push(`.${sub} { }`)
      }
    }

    lines.push('')
    lines.push('/* Dark mode */')
    lines.push(`${component.darkPattern.replace('{variant-name}', variantNameKebab)}`)
    lines.push('```')
    lines.push('')
  }

  // Example only for first variant
  if (componentData.variants.length > 0) {
    const firstVariant = componentData.variants[0]
    const firstVariantKebab = toKebabCase(firstVariant.name)
    lines.push('### Example')
    lines.push('')
    lines.push('```html')
    lines.push(component.example(firstVariant.name, firstVariantKebab))
    lines.push('```')
    lines.push('')
  }

  return lines.join('\n')
}

function generateDarkModeSection(): string {
  const lines: string[] = []

  lines.push('## Dark Mode')
  lines.push('')
  lines.push('All components support dark mode by adding the `.dark` class to an ancestor element.')
  lines.push('')
  lines.push('### Usage')
  lines.push('')
  lines.push('```html')
  lines.push('<!-- Add .dark to <html>, <body>, or any container -->')
  lines.push('<html class="dark">')
  lines.push('  <!-- All components will use dark mode styles -->')
  lines.push('</html>')
  lines.push('')
  lines.push('<!-- Or scope to a specific container -->')
  lines.push('<div class="dark">')
  lines.push('  <button class="cux-button --primary">Dark mode button</button>')
  lines.push('</div>')
  lines.push('```')
  lines.push('')
  lines.push('### With JavaScript')
  lines.push('')
  lines.push('```javascript')
  lines.push('// Toggle dark mode')
  lines.push("document.documentElement.classList.toggle('dark')")
  lines.push('')
  lines.push('// Check if dark mode is active')
  lines.push("const isDark = document.documentElement.classList.contains('dark')")
  lines.push('```')

  return lines.join('\n')
}
