<script setup lang="ts">
import Presets from "./components/Presets.vue";
import Timer from "./components/Timer.vue";
import Button from "./components/Button.vue";
import type { stateType, IPreset } from "./types";
import { ref } from "vue";
import DarkModeSwitch from "./components/DarkModeSwitch.vue";

let idCounter = 0;

const time = ref(0);

const timeLeft = ref(0);

const timerState = ref("idle" as stateType);

const presetsList = ref([] as IPreset[]);

if (localStorage.getItem("data")) {
  let localStorageData = JSON.parse(localStorage.getItem("data")!);
  presetsList.value = localStorageData.presets;
  idCounter = localStorageData.idCounter;
}

function deletePreset(id: number): void {
  presetsList.value = presetsList.value.filter(p => p.id !== id);
  savePresets();
}

function openPreset(id: number): void {
  if (timerState.value === "idle") {
    time.value = presetsList.value.filter(p => p.id === id)[0].time;
  }
}

function addPreset() {
  presetsList.value.push({ id: idCounter++, time: time.value });
  savePresets();
}

function savePresets(): void {
  localStorage.setItem("data", JSON.stringify({
    "presets": presetsList.value,
    "idCounter": idCounter
  }));
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
      <Presets v-model:presets="presetsList" @delete-preset="deletePreset" :state="timerState" @open-preset="openPreset"/>
      <div class="buttons">
        <Button :text="timerState === 'running' ? 'Pause' : 'Start'"
                @click="onStartPauseClick"
                :disabled="!['idle', 'paused', 'running'].includes(timerState)"/>
        <Button text="Reset"
                @click="onResetClick"
                :disabled="!['finished', 'paused'].includes(timerState)"/>
        <Button text="Add preset"
                @click="addPreset"
                :disabled="!(timerState === 'idle')"/>
      </div>
      <div class="timer">
        <Timer v-model:time="time" v-model:timeLeft="timeLeft" v-model:state="timerState"/>
      </div>
    </div>
    <div class="dark-mode-switch">
      <DarkModeSwitch/>
    </div>
  </div>
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
  gap: 0.5em;
  flex-direction: row;
}

.dark-mode-switch {
  --width: 4rem;
  position: absolute;
  left: calc(100vw - var(--width));
  width: var(--width);
  top: 0;
}

@media screen and (min-width: 460px) {
  .app {
    border-radius: 1em;
    box-shadow: 1rem 1rem 3rem 1.4rem #bbb;
    flex-direction: row;
    align-items: center;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .buttons {
    flex-direction: column;
    gap: 1em;
  }
}
</style>