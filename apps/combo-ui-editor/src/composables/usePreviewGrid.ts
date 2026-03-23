import { useStyleBuilder } from '@/composables/useStyleBuilder'
import { useComponentTheme } from '@/composables/useComponentTheme'
import { useTypographyStore } from '@/stores/typography'

/**
 * Common setup for preview components.
 * Consolidates the repeated imports and initialization pattern.
 *
 * @example
 * ```ts
 * const { isDark, typographyStore, buildBorderRadius, buildPadding, buildShadow, buildBorderCSS, resolveColor } = usePreviewGrid()
 * ```
 */
export function usePreviewGrid() {
  const { isDark } = useComponentTheme()
  const typographyStore = useTypographyStore()
  const styleBuilder = useStyleBuilder(isDark)

  return {
    isDark,
    typographyStore,
    ...styleBuilder
  }
}
