<script setup lang="ts">
// Save language in localstorage
</script>
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>
</template>
<style scoped>
  /*Style the select*/
</style>