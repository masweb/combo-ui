<script setup lang="ts">
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-vue'
const { t } = useI18n()
import { useTheme } from '@/composables/useTheme'
const { theme, setTheme } = useTheme()
const { locale, availableLocales } = useI18n()

watch(locale, newLocale => localStorage.setItem('lang', newLocale))
</script>
<template>
  <div class="main-bar">
    <div class="d-flex align-items-center">
      <div class="ms-3 fw-light text-">COMBO-UI</div>
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
        <IconMoonFilled v-else :size="24" stroke-width="1.2" />
      </button>
    </div>
  </div>
</template>
