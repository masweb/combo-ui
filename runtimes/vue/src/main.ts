import { createApp } from "vue";
import { ComboUIPlugin } from "combo-ui-vue";

import App from "./App.vue";
const app = createApp(App);
app.use(ComboUIPlugin, {
  theme: "./theme.json",
  darkMode: "auto",
  ws: "ws://localhost:3001",
});
app.mount("#app");
