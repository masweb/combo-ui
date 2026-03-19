import Dexie, { type EntityTable } from 'dexie'
import type { TypographyVariant, TypographyGlobalConfig } from '@/types/typography'
import type { ButtonVariant } from '@/types/button'
import type { CardVariant } from '@/types/card'
import type { AlertVariant } from '@/types/alert'
import type { BadgeVariant } from '@/types/badge'
import type { ChipVariant } from '@/types/chip'
import type { ProgressVariant } from '@/types/progress'
import type { SpinnerVariant } from '@/types/spinner'
import type { AvatarVariant } from '@/types/avatar'
import type { DividerVariant } from '@/types/divider'
import type { FormsVariant, FormsGlobalConfig } from '@/types/forms'

interface TypographyData {
  id: string
  globalConfig: TypographyGlobalConfig
  variants: TypographyVariant[]
  selectedVariantIndex: number
}

interface FormsData {
  id: string
  globalConfig: FormsGlobalConfig
  variants: FormsVariant[]
  selectedVariantIndex: number
  currentState: string
}

export interface ComponentData<T> {
  id: string
  variants: T[]
  selectedVariantIndex: number
}

export type { TypographyData }
export type { FormsData }

interface ThemeMetaData {
  id: string
  name: string
}

export type { ThemeMetaData }

export class ComboUXDatabase extends Dexie {
  typography!: EntityTable<TypographyData, 'id'>
  buttons!: EntityTable<ComponentData<ButtonVariant>, 'id'>
  cards!: EntityTable<ComponentData<CardVariant>, 'id'>
  alerts!: EntityTable<ComponentData<AlertVariant>, 'id'>
  badges!: EntityTable<ComponentData<BadgeVariant>, 'id'>
  chips!: EntityTable<ComponentData<ChipVariant>, 'id'>
  progress!: EntityTable<ComponentData<ProgressVariant>, 'id'>
  spinners!: EntityTable<ComponentData<SpinnerVariant>, 'id'>
  avatars!: EntityTable<ComponentData<AvatarVariant>, 'id'>
  dividers!: EntityTable<ComponentData<DividerVariant>, 'id'>
  forms!: EntityTable<FormsData, 'id'>
  themeMeta!: EntityTable<ThemeMetaData, 'id'>

  constructor() {
    super('ComboUIDB')

    this.version(1).stores({
      typography: 'id',
      buttons: 'id',
      cards: 'id',
      alerts: 'id',
      badges: 'id',
      chips: 'id',
      progress: 'id',
      spinners: 'id',
      avatars: 'id',
      dividers: 'id',
      forms: 'id'
    })

    this.version(2).stores({
      themeMeta: 'id'
    })
  }
}

export const db = new ComboUXDatabase()

export const COMPONENT_STORE_MAP: Record<string, keyof ComboUXDatabase> = {
  button: 'buttons',
  card: 'cards',
  alert: 'alerts',
  badge: 'badges',
  chip: 'chips',
  progress: 'progress',
  spinner: 'spinners',
  avatar: 'avatars',
  divider: 'dividers',
  forms: 'forms'
}
