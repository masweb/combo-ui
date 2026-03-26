import { createApp } from 'vue'
import { ComboUXPlugin } from 'combo-ui-vue'
import App from './App.vue'

const app = createApp(App)

// Initialize ComboUX with WebSocket for realtime theme sync
app.use(ComboUXPlugin, {
  theme: './theme.json',
  darkMode: 'auto',
  ws: 'ws://localhost:3001'
})

app.mount('#app')
