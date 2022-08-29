<script setup lang="ts">
import { watch, ref } from 'vue';
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

const showPlaceholder = ref(false);

function updateShowPlaceholder(length: number): void {
  if (length === 0) {
    setTimeout(() => {
      showPlaceholder.value = true;
    }, 100);
  } else {
    showPlaceholder.value = false;
  }
}

watch(props, (newProps) => {
  updateShowPlaceholder(newProps.presets.length);
});

</script>

<template>
  <div class="presets">
    <TransitionGroup v-if="!showPlaceholder">
      <Preset v-for="p in presets" :data="p" @delete="deletePreset" :key="p.id"/>
    </TransitionGroup>
    <div v-else class="placeholder">
      No presets
    </div>
  </div>
</template>

<style scoped>
.presets {
  --p-top: 0.4em;
  --p-bottom: 0.4em;
  --p-left: 0.8em;
  --p-right: 0.8em;
  width: 6rem;
  border-radius: var(--sm-border-radius);
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);
  padding-top: var(--p-top);
  padding-bottom: var(--p-bottom);
  padding-left: var(--p-left);
  padding-right: var(--p-right);
  

  display: flex;
  flex-direction: column;
  align-self: center;
}

@media screen and (min-width: 460px) {
  .presets {
    align-self: stretch;
    padding-top: calc(var(--p-top)/2);
    padding-bottom: calc(var(--p-bottom)/2);
    padding-left: calc(var(--p-left)/2);
    padding-right: calc(var(--p-right)/2);
  }
}

.placeholder {
  padding: 0.4em;
}

</style>