import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix'
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    singleAttributePerLine: false,
    importOrderSeparation: true,
    importOrderCombineAsImports: true,
    importOrderSortSpecifiers: true,
    overrides: [
      {
        files: ['*.html'],
        options: {
          tabWidth: 1
        }
      }
    ]
  }
})
