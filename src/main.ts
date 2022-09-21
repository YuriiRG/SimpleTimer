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
  let availableLangs = ["ru", "en"];
  let isFound = false;
  for (let i = 0; i < navigator.languages.length; i++) {
    for (let j = 0; j < availableLangs.length; j++) {
      if (navigator.languages[i].startsWith(availableLangs[j])) {
        locale = availableLangs[j];
        isFound = true;
        break;
      }
    }
    if (isFound) {
      break;
    }
  }
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