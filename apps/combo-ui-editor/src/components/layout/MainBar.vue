<script setup lang="ts">
import { IconDeviceFloppy, IconFolderOpen, IconFileSpark, IconSunFilled, IconMoonFilled } from '@tabler/icons-vue'
import ThemeSyncToggle from './ThemeSyncToggle.vue'
import { useThemeSyncLog } from '@/composables/useThemeSyncLog'

const { exportTheme, importTheme, newTheme, saveThemeName, themeName, isExporting, isImporting, isCreatingNew } =
  useThemeIO()

const { logs } = useThemeSyncLog()

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const { t } = useI18n()
const { theme, setTheme } = useTheme()
const { locale, availableLocales } = useI18n()
const isEditingThemeName = ref(false)
const confirmOpen = ref(false)
const pendingAction = ref<'new' | 'open' | null>(null)
watch(locale, newLocale => localStorage.setItem('lang', newLocale))

const handleThemeNameBlur = () => {
  isEditingThemeName.value = false
  saveThemeName(themeName.value)
}

const handleThemeNameKeyup = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    isEditingThemeName.value = false
    saveThemeName(themeName.value)
  }
}

const handleOpenClick = () => {
  pendingAction.value = 'open'
  confirmOpen.value = true
}

const handleNewClick = () => {
  pendingAction.value = 'new'
  confirmOpen.value = true
}

const handleConfirm = async () => {
  confirmOpen.value = false
  const action = pendingAction.value
  pendingAction.value = null

  if (action === 'new') {
    await newTheme('NewTheme')
  } else if (action === 'open') {
    await importTheme()
  }
}

const handleCancel = () => {
  confirmOpen.value = false
  pendingAction.value = null
}

const handleSave = async () => {
  await exportTheme(themeName.value)
}
</script>
<template>
  <div class="main-bar d-flex">
    <div class="d-flex align-items-center">
      <div class="ms-3 fw-light text-">COMBO-UI</div>
    </div>
    <div class="d-flex align-items-center ms-3">
      <ThemeSyncToggle />
      <div class="ms-2 theme-sync-log" v-if="logs.length > 0">
        <div
          v-for="(entry, index) in logs.slice(-5)"
          :key="index"
          class="log-entry"
        >
          {{ formatTime(entry.timestamp) }} {{ entry.message }}
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <input
        v-if="isEditingThemeName"
        v-model="themeName"
        class="form-control form-control-sm border-end-0"
        style="width: 150px"
        @blur="handleThemeNameBlur"
        @keyup="handleThemeNameKeyup"
      />
      <span v-else class="fw-bold text-primary me-3" style="cursor: pointer" @click="isEditingThemeName = true">
        {{ themeName }}
      </span>
      <button
        class="btn btn-sm btn-outline-secondary border-end-0"
        :title="t('theme.new')"
        :disabled="isCreatingNew"
        @click="handleNewClick"
      >
        <IconFileSpark :size="16" :stroke-width="1.8" />
      </button>
      <button
        class="btn btn-sm btn-outline-secondary border-end-0"
        :title="t('theme.open')"
        :disabled="isImporting"
        @click="handleOpenClick"
      >
        <IconFolderOpen :size="16" :stroke-width="1.8" />
      </button>
      <button
        class="btn btn-sm btn-outline-secondary"
        :title="t('theme.save')"
        :disabled="isExporting"
        @click="handleSave"
      >
        <IconDeviceFloppy :size="16" :stroke-width="1.8" />
      </button>
    </div>
    <div class="d-flex align-items-center">
      <select v-model="locale" class="form-select form-select-sm">
        <option v-for="lang in availableLocales" :key="lang" :value="lang">{{ lang }}</option>
      </select>
      <button
        :title="theme === 'dark' ? t('settings.lightMode') : t('settings.darkMode')"
        class="btn btn-sm btn-link pe-3"
        @click="setTheme(theme === 'dark' ? 'light' : 'dark')"
      >
        <IconSunFilled v-if="theme === 'dark'" :size="24" stroke-width="1.2" />
        <IconMoonFilled v-else :size="22" stroke-width="1.2" />
      </button>
    </div>
  </div>
  <ConfirmModal
    :open="confirmOpen"
    :title="t('theme.new')"
    :message="t('theme.warningUnsaved')"
    :confirm-text="t('common.continue') || 'Continuar'"
    :cancel-text="t('common.cancel') || 'Cancelar'"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<style scoped>
.theme-sync-log {
  width: 280px;
  max-height: 32px;
  overflow-y: auto;
  background: var(--cui-tertiary-bg, #f8f9fa);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 9px;
  line-height: 1.3;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  opacity: 0.8;
}

.log-entry {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.log-entry:not(:last-child) {
  margin-bottom: 2px;
}
</style>
