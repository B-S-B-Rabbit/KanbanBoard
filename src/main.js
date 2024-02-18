import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import components from "@/components/UI";
loadFonts();
const app = createApp(App);
components.forEach((component) => app.component(component.name, component));
app.use(vuetify).mount("#app");
