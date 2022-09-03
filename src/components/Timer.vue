<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  time: number,
  running: boolean
}>();

const emit = defineEmits<{
  (e: "update:running", newValue: boolean): void;
}>();

const timeLeft = ref(props.time);

if (props.running) {
  initTimer();
}

watch(() => props.running, newValue => {
  if (newValue) {
    initTimer();
  }
})

watch(() => props.time, newValue => {
  timeLeft.value = newValue
});

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

const timeLeftString = computed(() => TimeToString(timeLeft.value));

const degree = computed(() => {
  if (props.time === 0) {
    return 360;
  } else {
    return (timeLeft.value/props.time)*360;
  }
});

let startTime: number = -1;

function initTimer() {
  requestAnimationFrame(animateTimer);
}

function animateTimer(now: number) {
  if (startTime === -1) {
    startTime = now;
    requestAnimationFrame(animateTimer);
    return;
  }
  const targetTimeLeft = (props.time-(now-startTime)/1000);
  if (targetTimeLeft <= 0) {
    timeLeft.value = 0;
    startTime = -1;
    emit("update:running", false);
    return;
  }
  timeLeft.value = targetTimeLeft;
  requestAnimationFrame(animateTimer);
}

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