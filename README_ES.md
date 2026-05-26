# Combo UI

Un sistema de diseño visual con un editor de temas de escritorio, sincronización en tiempo real y paquetes de ejecución específicos por framework.

Diseñá tus componentes UI de forma visual, exportá un JSON de tema y consumilo en tu aplicación. Editá en vivo y observá los cambios al instante vía WebSocket, sin necesidad de recargar la página.

## Cómo funciona

```
1. Diseñar  — Editor visual (aplicación de escritorio Tauri 2)
2. Exportar — JSON de tema (colores, tipografía, bordes, sombras, modo oscuro)
3. Instalar — Paquete npm para tu framework
4. Construir — Usá clases CSS en tus plantillas, los estilos se aplican automáticamente
5. Sincronizar — Conectá el editor a tu app vía WebSocket para edición en vivo
6. Publicar  — Incluí el JSON de tema final en tu build de producción
```

## Repositorios

| Repo                                                             | Descripción                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **[combo-ui](https://github.com/masweb/combo-ui)**               | Monorepo — docs, runtimes, servidor de sincronización de temas, temas          |
| **[combo-ui-editor](https://github.com/masweb/combo-ui-editor)** | Editor visual de temas — Tauri 2 + Vue 3 + IndexedDB                           |
| **[combo-ui-vue](https://github.com/masweb/combo-ui-vue)**       | Paquete runtime para Vue 3 — [npm](https://www.npmjs.com/package/combo-ui-vue) |

## Inicio rápido (Vue 3)

```bash
npm install combo-ui-vue
```

```ts
// main.ts
import { createApp } from 'vue'
import { ComboUIPlugin } from 'combo-ui-vue'
import theme from './theme.json'

const app = createApp(App)
app.use(ComboUIPlugin, {
  theme,
  darkMode: 'auto',
  ws: 'ws://localhost:3001' // opcional: sincronización en vivo con el editor
})
```

```html
<button class="cui-button --primary">Primario</button>
<div class="cui-card --default">
  <div class="cui-card-header">Título</div>
  <div class="cui-card-body">Contenido</div>
</div>
```

Documentación completa de la API: [combo-ui-vue README](https://github.com/masweb/combo-ui-vue#readme)

## Sincronización en vivo

El editor se conecta a tu aplicación mediante un servidor WebSocket relay:

```
Editor (Tauri 2)
  │  Hooks de Dexie → buildThemeData() con debounce → WebSocket
  ▼
theme-sync-server (puerto 3001)
  │  Almacena el tema, lo difunde a todos los clientes
  └──► Tu app → ComboUI regenera el CSS en tiempo real
```

Los cambios aplican debounce de 300ms. Ejecutá el servidor:

```bash
cd servers/theme-sync-server && npm start
```

## Componentes soportados

Tipografía, Formularios, Button, Card, Alert, Avatar, Progress, Spinner, Badge, Chip, Tooltip, Popover, Table, ListGroup, Accordion, Pagination — todos con variantes ilimitadas y soporte para modo oscuro.

## Stack tecnológico

- **Editor**: Tauri 2, Vue 3, Pinia, Dexie (IndexedDB), CoreUI, Vue I18n
- **Paquetes**: TypeScript, CSS Custom Properties, WebSocket
- **Build**: Vite+, workspaces de pnpm, Oxlint, oxfmt
- **Servidor**: Node.js, ws

## Temas

Temas preconstruidos disponibles en `themes/`:

- `Bootstrap.json` — Tema inspirado en Bootstrap con modo oscuro

Exportá el tuyo desde el editor o generá uno a partir de pares de colores usando el generador de temas integrado.

## Demo

<!-- TODO: Agregar capturas de pantalla y URL de demo -->

## Licencia

[MIT](LICENSE)
