<script setup lang="ts">
import { ref } from 'vue';

const percent = ref(123);
</script>

<template>
  <div class="timer">
    <div class="text">
      {{percent}}
    </div>
  </div>
</template>

<style scoped>
.timer {
  width: 10em;
  height: 10em;
  position: relative;
  border-radius: 50%;
  background: conic-gradient(green v-bind('`${percent}deg`'), lightgrey v-bind('`${percent}deg`') 360deg);
}
.text {
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
}
</style>