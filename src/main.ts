import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { createI18n } from "vue-i18n"
import en from "./locales/en.json"
import ru from "./locales/ru.json"

const i18n = createI18n({
  locale: "en",
  messages: {
    en, ru
  }
});

createApp(App).use(i18n).mount("#app");
