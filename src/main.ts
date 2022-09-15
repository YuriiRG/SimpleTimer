import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { createI18n } from "vue-i18n"

const messages = {
  en: {
    message: {
      hello: "{0} World"
    }
  }
};

const i18n = createI18n({
  locale: "en",
  messages
});

createApp(App).use(i18n).mount("#app");
