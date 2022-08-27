<script setup lang="ts">
defineProps<{
  text: string
}>();
</script>

<template>
  <div class="string">{{text}}</div>
</template>

<style scoped>
.string {
  border-radius: 0.3em;
  padding: 0.3em 1em;
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);
}
</style>