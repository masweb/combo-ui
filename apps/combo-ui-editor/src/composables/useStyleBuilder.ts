import type { Ref } from 'vue'
import type { BorderRadiusValue, PaddingValue, ComponentShadows, ShadowValue, BorderValue } from '@/types/generics'

interface DarkShadowColors {
  shadowColor: string
  shadowInsetColor: string
  shadowInsetHighlightColor: string
}

interface VariantWithShadows<T extends DarkShadowColors = DarkShadowColors> {
  shadows?: ComponentShadows
  dark: T
}

export const useStyleBuilder = (isDark: Ref<boolean>) => {
  /**
   * Builds CSS border-radius string from BorderRadiusValue
   */
  const buildBorderRadius = (radius: BorderRadiusValue): string => {
    if (radius.linked) {
      return `${radius.tl}${radius.unit}`
    }
    return `${radius.tl}${radius.unit} ${radius.tr}${radius.unit} ${radius.br}${radius.unit} ${radius.bl}${radius.unit}`
  }

  /**
   * Builds CSS padding string from PaddingValue
   */
  const buildPadding = (padding: PaddingValue): string => {
    return `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`
  }

  /**
   * Builds a single shadow CSS string from ShadowValue
   */
  const buildSingleShadow = (shadow: ShadowValue, color: string, inset = false): string => {
    const insetPrefix = inset ? 'inset ' : ''
    return `${insetPrefix}${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.spread}px ${color}`
  }

  /**
   * Builds CSS box-shadow string from variant with shadows and dark mode colors
   */
  const buildShadow = <T extends DarkShadowColors>(variant: VariantWithShadows<T>): string => {
    if (!variant.shadows) return 'none'

    const shadows: string[] = []
    const useDark = isDark.value

    if (variant.shadows.offset?.enabled) {
      const color = useDark ? variant.dark.shadowColor : variant.shadows.offset.color
      shadows.push(buildSingleShadow(variant.shadows.offset, color))
    }

    if (variant.shadows.inset?.enabled) {
      const color = useDark ? variant.dark.shadowInsetColor : variant.shadows.inset.color
      shadows.push(buildSingleShadow(variant.shadows.inset, color, true))
    }

    if (variant.shadows.insetHighlight?.enabled) {
      const color = useDark ? variant.dark.shadowInsetHighlightColor : variant.shadows.insetHighlight.color
      shadows.push(buildSingleShadow(variant.shadows.insetHighlight, color, true))
    }

    return shadows.length > 0 ? shadows.join(', ') : 'none'
  }

  /**
   * Builds CSS border object from BorderValue with dark mode color support
   */
  const buildBorderCSS = (
    border: BorderValue,
    darkBorderColor?: string
  ): { borderStyle: string; borderWidth: string; borderColor: string } => {
    return {
      borderStyle: border.style,
      borderWidth: `${border.width}${border.unit}`,
      borderColor: isDark.value && darkBorderColor ? darkBorderColor : border.color
    }
  }

  /**
   * Resolves color based on dark mode
   */
  const resolveColor = (lightColor: string, darkColor?: string): string => {
    return isDark.value && darkColor ? darkColor : lightColor
  }

  return {
    buildBorderRadius,
    buildPadding,
    buildShadow,
    buildSingleShadow,
    buildBorderCSS,
    resolveColor
  }
}
