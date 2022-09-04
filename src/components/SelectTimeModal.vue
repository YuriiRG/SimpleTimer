<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from './Button.vue';

const props = defineProps<{
  time: number
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update:time", newValue: number): void;
}>();

const seconds = ref(props.time % 60);
const minutes = ref(((props.time - seconds.value) / 60) % 60);
const hours   = ref((props.time - (minutes.value * 60) - seconds.value) / (60 * 60));

function onInput(): void {
  if (!isValidTime(seconds.value)) {
    return;
  }
  if (!isValidTime(minutes.value)) {
    return;
  }
  if (!isValidTime(hours.value)) {
    return;
  }
  emit("update:time", hours.value*60*60 + minutes.value*60 + seconds.value);
}

function isValidTime(num: number): boolean {
  if (Math.round(num) !== num || num < 0 || num >= 60) {
    return false;
  }
  return true;
}

watch(seconds, onInput);
watch(minutes, onInput);
watch(hours,   onInput);
</script>

<template>
  <div class="modal">
    <div class="modal-window">
      <div class="time-input-container">
        <div>
          <label>Hours</label>
          <input type="number"
                 class="time-input"
                 placeholder="hh"
                 min="0" max="59"
                 v-model="hours"/>
        </div>
        <span class="separator">:</span>
        <div>
          <label>Minutes</label>
          <input type="number"
                 class="time-input"
                 placeholder="mm"
                 min="0" max="59"
                 v-model="minutes"/>
        </div>
        <span class="separator">:</span>
        <div>
          <label>Seconds</label>
          <input type="number"
                 class="time-input"
                 placeholder="ss"
                 min="0" max="59"
                 v-model="seconds"/>
        </div>
      </div>
      <Button text="Close" @click="emit('close')"/>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #0005;
  z-index: 999;
}
.modal-window {
  background: #fff;
  border-radius: 1em;
  padding: 2em;
}

.time-input-container {
  padding-bottom: 1em;
  display: flex;
}

.time-input-container > div {
  display: flex;
  flex-direction: column;
}

.separator {
  align-self: flex-end;
  margin-bottom: 0.2rem;
}

.time-input {
  width: 3.5em;
  font-size: inherit;
}

.v-enter-active, .v-leave-active {
  transition: all 0.3s;
}

.v-enter-active  .modal-window, .v-leave-active .modal-window {
  transition: all 0.3s;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}

.v-enter-from .modal-window, .v-leave-to .modal-window {
  transform: scale(0);
}
</style>