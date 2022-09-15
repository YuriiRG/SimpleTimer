<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n();

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
  /*Style the select*/
</style>