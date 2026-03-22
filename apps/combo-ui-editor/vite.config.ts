import { type Plugin, defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { URL, fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin.vite({
      include: [resolve(__dirname, './locales/**')],
      runtimeOnly: false
    }),
    AutoImport({
      dts: 'auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vee-validate', 'vue-i18n'],
      include: [/\.vue$/, /\.vue\?vue/, /\.ts$/],
      dirs: [
        'src/composables/**',
        'src/stores/**',
        'src/constants/**',
        'src/types/**',
        'src/directives/**',
        'src/db/**'
      ]
    }) as Plugin,
    Components({
      dirs: ['src/components/**']
    }) as Plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin']
      }
    }
  }
})
