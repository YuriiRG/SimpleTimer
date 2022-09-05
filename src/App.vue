<script setup lang="ts">
import Presets from "./components/Presets.vue";
import Timer from "./components/Timer.vue";
import Button from "./components/Button.vue";
import SelectTimeModal from "./components/SelectTimeModal.vue";
import { stateType, IPreset } from "./types";
import { ref } from "vue";



let idCounter = 0;

const time = ref(0);

const timeLeft = ref(0);

const timerState = ref("idle" as stateType);

const showModal = ref(false);

const dummyPresets = ref([] as IPreset[]);

function deletePreset(id: number): void {
  dummyPresets.value = dummyPresets.value.filter(p => p.id !== id);
}

function addDummyPreset() {
  dummyPresets.value.push({ id: idCounter++, time: "2:77:37" });
}

function openSetTimeWindow() {
  showModal.value = true;
}

function onStartPauseClick() {
  if (timerState.value !== "running") {
    timerState.value = "running";
  } else {
    timerState.value = "paused";
  }
}

function onResetClick() {
  timerState.value = "idle";
  timeLeft.value = time.value;
}

</script>

<template>
  <div class="container">
    <div class="app">
      <Presets v-model:presets="dummyPresets" @delete-preset="deletePreset"/>
      <div class="buttons">
        <Button text="Set time"
                @click="openSetTimeWindow"
                :disabled="timerState !== 'idle'"/>
        <Button :text="timerState === 'running' ? 'Pause' : 'Start'"
                @click="onStartPauseClick"
                :disabled="!['idle', 'paused', 'running'].includes(timerState)"/>
        <Button text="Reset"
                @click="onResetClick"
                :disabled="!['finished', 'paused'].includes(timerState)"/>
        <Button text="Add preset"
                @click="addDummyPreset"
                :disabled="true"/>
      </div>
      <div class="timer">
        <Timer v-model:time="time" v-model:timeLeft="timeLeft" v-model:state="timerState"/>
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