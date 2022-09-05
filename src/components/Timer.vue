<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';

import { stateType } from '../types';

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

let pauseStartTime = -1;
let startTime = -1;

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
}

function animateTimer(now: number) {
  if (props.state === "running") {
    if (startTime === -1) {
      startTime = now;
      requestAnimationFrame(animateTimer);
      return;
    }
    if (pauseStartTime !== -1) {
      console.log("pause ended");
      startTime += (now-pauseStartTime);
      pauseStartTime = -1;
    }
    const targetTimeLeft = (props.time-(now-startTime)/1000);
    if (targetTimeLeft <= 0) {
      emit("update:timeLeft", 0);
      emit("update:state", "finished");
      startTime = -1;
      return;
    }
    emit("update:timeLeft", targetTimeLeft);
    requestAnimationFrame(animateTimer);
  } else if (props.state === "paused") {
    console.log("pause started");
    pauseStartTime = now;
  } else {
    startTime = -1;
    emit("update:timeLeft", props.time);
  }
}


function TimeToString(t: number): string {
  t = Math.ceil(t);
  const seconds = t % 60;
  const secondsString = AddZeroToNumberString(seconds);
  const minutes = ((t - seconds) / 60) % 60;
  const minutesString = AddZeroToNumberString(minutes);
  const hours = (t - (minutes * 60) - seconds) / (60 * 60);
  const hoursString = AddZeroToNumberString(hours);
  return `${hoursString}:${minutesString}:${secondsString}`;
}

function AddZeroToNumberString(num: number): string {
  return (num >= 10) ? `${num}` : `0${num}`;
}

const timeLeftString = computed(() => TimeToString(props.timeLeft));

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

</script>

<template>
  <div class="timer">
    <div class="text">
      {{timeLeftString}}
    </div>
  </div>
</template>

<style scoped>
.timer {
  width: 15em;
  height: 15em;
  position: relative;
  border-radius: 50%;
  background: conic-gradient(green v-bind('`${degree}deg`'), lightgrey v-bind('`${degree}deg`') 360deg);
}
.text {
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
</style>