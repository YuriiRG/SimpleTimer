<script setup lang="ts">
import Presets from "./components/Presets.vue";
import Timer from "./components/Timer.vue";
import Button from "./components/Button.vue";
import SelectTimeModal from "./components/SelectTimeModal.vue";
import { ref } from "vue";

interface Preset {
  time: string,
  id: number
}

let idCounter = 0;

const time = ref(0);

const isRunning = ref(false);

const showModal = ref(false);

const dummyPresets = ref([] as Preset[]);

function deletePreset(id: number): void {
  dummyPresets.value = dummyPresets.value.filter(p => p.id !== id);
}

function addDummyPreset() {
  dummyPresets.value.push({ id: idCounter++, time: "2:77:37" });
}

function openSetTimeWindow() {
  showModal.value = true;
}

</script>

<template>
  <div class="container">
    <div class="app">
      <Presets v-model:presets="dummyPresets" @delete-preset="deletePreset"/>
      <div class="buttons">
        <Button text="Set time" @click="openSetTimeWindow" :disabled="isRunning"/>
        <Button text="Start" @click="isRunning = true" :disabled="isRunning"/>
        <Button text="Reset" :disabled="true"/>
        <Button text="Save preset" @click="addDummyPreset" :disabled="true"/>
      </div>
      <div class="timer">
        <Timer :time="time" v-model:running="isRunning"/>
      </div>
    </div>
  </div>
  <Transition>
    <SelectTimeModal v-model:time="time" v-if="showModal" @close="showModal = false"/>
  </Transition>
</template>

<style scoped>

.app {
  padding: 1.5em;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-direction: row;
}



@media screen and (min-width: 460px) {
  .app {
    border-radius: 1em;
    box-shadow: 1rem 1rem 3rem 1.4rem #bbb;
    flex-direction: row;
    align-items: center;
  }
  .test {
    width: 15em;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .buttons {
    flex-direction: column;
  }
}
</style>