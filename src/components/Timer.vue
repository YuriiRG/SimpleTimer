<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { secondsToString } from '../timeConvert';
import SelectTimeModal from "./SelectTimeModal.vue";
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

function finishTimer(): void {
  emit("update:timeLeft", 0);
  emit("update:state", "finished");
  startTime = -1;
  playRing();
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
  let audio = new Audio('/SimpleTimer/ring.mp3');
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

</script>

<template>
  <div class="timer">
    <div class="text" @click="openSetTimeWindow" :aria-disabled="props.state !== 'idle'">
      {{timeLeftString}}
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