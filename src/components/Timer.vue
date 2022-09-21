<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { secondsToString } from '../timeConvert';
import SelectTimeModal from "./SelectTimeModal.vue";
import type { stateType } from '../types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  time: number,
  timeLeft: number,
  state: stateType
}>();

const emit = defineEmits<{
  (e: "update:time", newValue: number): void;
  (e: "update:timeLeft", newValue: number): void;
  (e: "update:state", newValue: stateType): void;
}>();

let audio = new Audio('/SimpleTimer/ring.mp3');

let pauseStartTime = -1;
let startTime = -1;
let timeoutId = -1;
const showModal = ref(false);

watchEffect(() => {
  if (props.state === "running") {
    initTimer();
  } else if (props.state === "idle") {
    startTime = -1;
    pauseStartTime = -1;
  }
})

watch(() => props.time, newValue => {
  emit("update:timeLeft", newValue);
});

function initTimer() {
  requestAnimationFrame(animateTimer);
  if (pauseStartTime === -1) {
    timeoutId = setTimeout(finishTimer, props.time*1000);
  }
}

function requestNotificationPermission() {
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

requestNotificationPermission();

function finishNotify() {
  if (Notification.permission === "granted") {
    new Notification(t("timerFinished"));
  }
}

function finishTimer(): void {
  emit("update:timeLeft", 0);
  emit("update:state", "finished");
  if (startTime !== -1) {
    playRing();
    finishNotify();
  }
  startTime = -1;
  
}

function animateTimer(now: number) {
  if (props.state === "running") {
    if (startTime === -1) {
      startTime = now;
      requestAnimationFrame(animateTimer);
      return;
    }
    if (pauseStartTime !== -1) {
      startTime += (now-pauseStartTime);
      pauseStartTime = -1;
      timeoutId = setTimeout(finishTimer, props.time*1000-(now-startTime));
    }
    const targetTimeLeft = (props.time-(now-startTime)/1000);
    if (targetTimeLeft <= 0) {
      finishTimer();
      return;
    }
    emit("update:timeLeft", targetTimeLeft);
    requestAnimationFrame(animateTimer);
  } else if (props.state === "paused") {
    pauseStartTime = now;
    clearTimeout(timeoutId);
  }
}

function playRing() {
  audio.play();
}

const timeLeftString = computed(() => secondsToString(props.timeLeft));

const degree = computed(() => {
  if (props.time === 0) {
    if (props.state === "idle") {
      return 360;
    } else {
      return 0;
    }
  } else {
    return (props.timeLeft/props.time)*360;
  }
});

function openSetTimeWindow() {
  if (props.state === "idle") {
    showModal.value = true;
  }
}

const enteredTime = ref(0);
watchEffect(() => {
  emit("update:time", enteredTime.value);
});
watchEffect(() => {
  enteredTime.value = props.time;
});

</script>

<template>
  <div class="timer">
    <div class="text-block">
      <span class="text" @click="openSetTimeWindow" :aria-disabled="props.state !== 'idle'">
        {{timeLeftString}}
      </span>
    </div>
  </div>
  <Transition>
    <SelectTimeModal v-model:time="enteredTime" v-if="showModal" @close="showModal = false"/>
  </Transition>
</template>

<style scoped>
.timer {
  width: 15em;
  height: 15em;
  position: relative;
  border-radius: 50%;
  background: conic-gradient(#6130E3 v-bind('`${degree}deg`'),lightgrey v-bind('`${degree}deg`') 360deg);
}

.dark .timer {
  background: conic-gradient(#3095E3 v-bind('`${degree}deg`'),#333 v-bind('`${degree}deg`') 360deg);
}

.text-block {
  user-select: none;
  --timer-line-width: 10%;
  position: absolute;
  display: flex;
  width: calc(100% - 2*var(--timer-line-width));
  height: calc(100% - 2*var(--timer-line-width));
  top: var(--timer-line-width);
  left: var(--timer-line-width);
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  font-size: 40px;
}

.dark .text-block {
  background-color: #222;
}

.text {
  transition: all 0.1s;
  cursor: pointer;
}

.text[aria-disabled=true] {
  color: #464646;
  cursor: default;
}

.dark .text {
  color: #ccc;
}

.dark .text[aria-disabled=true] {
  color: #aaa;
}

.text:hover:not([aria-disabled=true]) {
  font-size: 1.1em;
  transition: all 0.1s;
}

.text:hover:active:not([aria-disabled=true]) {
  font-size: 0.95em;
  transition: all 0.1s;
}
</style>