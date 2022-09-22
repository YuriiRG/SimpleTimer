<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n();

// useHead({
//   title: locale
// });

function saveCurrentLocale(): void {
  localStorage.setItem("lang", locale.value as string);
}
</script>
<template>
  <div class="locale-changer">
    <select v-model="locale" @change="saveCurrentLocale">
      <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>
</template>
<style scoped>
.locale-changer {
  margin: 1rem;
}
.locale-changer select {
  padding: 0.3rem;
  font-size: inherit;
  background-color: #fff;
  border: none;
  border-radius: 0.3rem;
  box-shadow: var(--sm-shadow-x) var(--sm-shadow-y) var(--sm-shadow-blur) var(--sm-shadow-color);
}

.dark .locale-changer select {
  padding: 0.3rem;
  font-size: inherit;
  background-color: var(--dark-mode-background-color);
  color: var(--dark-mode-text-color);
  border: none;
  border-radius: 0.3rem;
  box-shadow: none;
}
</style>