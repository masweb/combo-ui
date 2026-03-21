export const COMPONENT_LIST: ListComponentMeta[] = [
  { id: 'button', label: 'Button', description: 'Trigger actions', icon: 'IconXboxB' },
  { id: 'card', label: 'Card', description: 'Content container', icon: 'IconCreditCard' },
  { id: 'alert', label: 'Alert', description: 'Feedback messages', icon: 'IconAlertSquareRounded' },
  { id: 'avatar', label: 'Avatar', description: 'User representation', icon: 'IconUserCircle' },
  { id: 'badge', label: 'Badge', description: 'Status indicators', icon: 'IconCodeVariable' },
  { id: 'divider', label: 'Divider', description: 'Visual separator', icon: 'IconLineDashed' },
  { id: 'progress', label: 'Progress', description: 'Completion indicator', icon: 'IconEqualDouble' },
  { id: 'chip', label: 'Chip', description: 'Compact info', icon: 'IconInputX' },
  { id: 'spinner', label: 'Spinner', description: 'Loading state', icon: 'IconInnerShadowTopRight' }
]

export const COMPONENT_TYPOGRAPHY_META: ListComponentMeta = {
  id: 'typography',
  label: 'Typography',
  description: 'Text styles'
}

export const COMPONENT_TYPO: ListComponentMeta[] = [
  { id: 'h1', label: 'H1', description: 'Header 1 text styles' },
  { id: 'h2', label: 'H2', description: 'Header 2 text styles' },
  { id: 'h3', label: 'H3', description: 'Header 3 text styles' },
  { id: 'h4', label: 'H4', description: 'Header 4 text styles' },
  { id: 'h5', label: 'H5', description: 'Header 5 text styles' },
  { id: 'h6', label: 'H6', description: 'Header 6 text styles' },
  { id: 'd1', label: 'Display 1', description: 'Display 1 text styles' },
  { id: 'd2', label: 'Display 2', description: 'Display 2 text styles' },
  { id: 'd3', label: 'Display 3', description: 'Display 3 text styles' },
  { id: 'd4', label: 'Display 4', description: 'Display 4 text styles' },
  { id: 'd5', label: 'Display 5', description: 'Display 5 text styles' },
  { id: 'd6', label: 'Display 6', description: 'Display 6 text styles' },
  { id: 'p', label: 'Paragraph', description: 'Paragraph text styles' },
  { id: 'small', label: 'Small', description: 'Small text styles' },
  { id: 'caption', label: 'Caption', description: 'Caption text styles' },
  { id: 'link', label: 'Link', description: 'Link text styles' }
]

export const COMPONENT_FORM_META: ListComponentMeta = { id: 'forms', label: 'Input', description: 'Input form style' }

export const COMPONENT_FORM: ListComponentMeta[] = [
  { id: 'input', label: 'Input', description: 'Input form style' },
  { id: 'textarea', label: 'Textarea', description: 'Textarea form style' },
  { id: 'checkbox', label: 'Checkbox', description: 'Checkbox form style' },
  { id: 'radio', label: 'Radio', description: 'Radio form style' },
  { id: 'select', label: 'Select', description: 'Select form style' },
  { id: 'range', label: 'Range', description: 'Range form style' }
]

export type ListComponentMeta = {
  id: string
  label: string
  description: string
  icon?: string
}
