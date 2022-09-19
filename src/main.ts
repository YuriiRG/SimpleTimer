import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import { createI18n } from "vue-i18n"
import en from "./locales/en.json"
import ru from "./locales/ru.json"

let locale = "en";

if (localStorage.getItem("lang")) {
  locale = localStorage.getItem("lang")!;
} else {
  // TODO: replace with a smarter algorithm,
  // which should check navigator.languages
  // also probably move to separate file
  ["en", "ru"].forEach((lang) => {
    if (navigator.language.startsWith(lang)) {
      locale = lang;
    }
  });
}

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "en",
  messages: {
    en, ru
  }
});

createApp(App).use(i18n).mount("#app");