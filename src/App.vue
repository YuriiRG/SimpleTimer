<script setup lang="ts">
import Presets from "./components/Presets.vue";
import Timer from "./components/Timer.vue";
import Button from "./components/Button.vue";
import type { stateType, IPreset } from "./types";
import { ref } from "vue";
import DarkModeSwitch from "./components/DarkModeSwitch.vue";
import LocaleChanger from "./components/LocaleChanger.vue";
import { useI18n } from "vue-i18n";
import EmojiAttribution from "./components/EmojiAttribution.vue";

const { t } = useI18n();

let idCounter = 0;

const time = ref(0);

const timeLeft = ref(0);

const timerState = ref("idle" as stateType);

const presetsList = ref([] as IPreset[]);

let prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;

const darkMode = ref(prefersDark);

if (localStorage.getItem("timerDarkMode")) {
  darkMode.value = JSON.parse(localStorage.getItem("timerDarkMode")!) as boolean;
}

if (localStorage.getItem("timerData")) {
  let localStorageData = JSON.parse(localStorage.getItem("timerData")!);
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
  localStorage.setItem("timerData", JSON.stringify({
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
    <div class="header">
      <h1>{{ t("simpleTimer") }}</h1>
      <div class="locale-changer-container">
        <LocaleChanger/>
      </div>
      <div class="dark-mode-switch">
        <DarkModeSwitch v-model:on="darkMode"/>
      </div>
    </div>
    <div class="sub-container">
      <div class="app">
        <Presets v-model:presets="presetsList" @delete-preset="deletePreset" :state="timerState" @open-preset="openPreset"/>
        <div class="buttons">
          <Button :text="timerState === 'running' ? t('pause') : t('start')"
                  @click="onStartPauseClick"
                  :disabled="!['idle', 'paused', 'running'].includes(timerState)"/>
          <Button :text="t('reset')"
                  @click="onResetClick"
                  :disabled="!['finished', 'paused'].includes(timerState)"/>
          <Button :text="t('savePreset')"
                  @click="addPreset"
                  :disabled="!(timerState === 'idle')"/>
        </div>
        <div class="timer">
          <Timer v-model:time="time" v-model:timeLeft="timeLeft" v-model:state="timerState"/>
        </div>
      </div>
    </div>
    <div>
      <EmojiAttribution/>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sub-container {
  flex-grow: 1;
}

.dark .header h1 {
  color: var(--dark-mode-text-color);
}

.header h1 {
  margin: 1rem;
  font-weight: 800;
  line-height: 1.5rem;
  flex-grow: 1;
}

.header {
  display: flex;
}

.locale-changer-container {
  display: flex;
  align-items: center;
}

.app {
  padding: 1.5em;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.dark .app {
  box-shadow: none;
  background-color: #222;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  flex-direction: row;
}

.dark-mode-switch {
  width: 4rem;
}

@media screen and (min-width: 460px) {
  .app {
    border-radius: 1em;
    box-shadow: 1rem 1rem 3rem 1.4rem #bbb;
    flex-direction: row;
    align-items: center;
  }
  .sub-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .buttons {
    flex-direction: column;
    gap: 1em;
  }
}
</style>