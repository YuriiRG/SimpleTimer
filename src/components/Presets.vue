<script setup lang="ts">
import Preset from './Preset.vue';

interface Preset {
  time: string,
  id: number
}

const props = defineProps<{
  presets: Array<Preset>
}>();

const emit = defineEmits<{
  (e: "deletePreset", id: number): void
}>();

function deletePreset(id: number): void {
  emit("deletePreset", id);
}

</script>

<template>
  <div class="presets">
    <TransitionGroup>
      <Preset v-for="p in presets" :data="p" @delete="deletePreset" :key="p.id"/>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.presets {
  width: 6rem;
  border-radius: var(--sm-border-radius);
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  padding-left: 0.8em;
  padding-right: 0.8em;
  

  display: flex;
  flex-direction: column;
  align-self: center;
}

@media screen and (min-width: 460px) {
  .presets {
    align-self: stretch;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 0.4em;
    padding-right: 0.4em;
  }
}
</style>