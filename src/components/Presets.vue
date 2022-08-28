<script setup lang="ts">
import Preset from './Preset.vue';

interface Preset {
  time: string
}

defineProps<{
  presets: Array<Preset>
}>();

</script>

<template>
  <div class="presets">
    <Preset v-for="p in presets" :text="p.time"/>
  </div>
</template>

<style scoped>
.presets {
  border-radius: var(--sm-border-radius);
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  align-self: center;
}

@media screen and (min-width: 460px) {
  .presets {
    align-self: stretch;
    gap: 0.4em;
    padding: 0.4em;
  }
}

</style>