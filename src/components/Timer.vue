<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  time: number
}>();

function TimeToString(t: number): string {
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

const timeString = computed(() => TimeToString(props.time));

const percent = ref(123);
</script>

<template>
  <div class="timer">
    <div class="text">
      {{timeString}}
    </div>
  </div>
</template>

<style scoped>
.timer {
  width: 15em;
  height: 15em;
  position: relative;
  border-radius: 50%;
  background: conic-gradient(green v-bind('`${percent}deg`'), lightgrey v-bind('`${percent}deg`') 360deg);
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