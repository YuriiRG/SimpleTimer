<script setup lang="ts">
import Preset from './PresetItem.vue';

import type { IPreset, stateType } from "../types";

const props = defineProps<{
  presets: Array<IPreset>,
  state: stateType
}>();

const emit = defineEmits<{
  (e: "deletePreset", id: number): void;
  (e: "openPreset", id: number): void;
}>();

function deletePreset(id: number): void {
  emit("deletePreset", id);
}

function openPreset(id: number): void {
  emit("openPreset", id);
}

</script>

<template>
  <div class="presets">
    <TransitionGroup>
      <Preset v-for="p in presets" :data="p" @delete="deletePreset" :state="props.state" @open="openPreset" :key="p.id"/>
    </TransitionGroup>
    <div class="placeholder">No presets</div>
  </div>
</template>

<style scoped>
.presets {
  position: relative;
  --p-top: 0.4em;
  --p-bottom: 0.4em;
  --p-left: 0.8em;
  --p-right: 0.8em;
  width: 6.5rem;
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
  min-height: 10em;
}

.dark .presets {
  box-shadow: none;
  background-color: #333;
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
  position: absolute;
  z-index: 0;
  padding-top: 0.4em;
  color: gray;
  user-select: none;
  width: 100%;
  left: 0;
  text-align: center;
}

</style>