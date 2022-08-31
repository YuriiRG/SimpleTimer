<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';

const emit = defineEmits<{
  (e: "close"): void
}>();

</script>

<template>
  <div class="modal">
    <div class="modal-window">
      <div class="time-input-container">
        <div>
          <label>Hours</label>
          <input type="number" class="time-input" placeholder="hh"/>
        </div> <span class="separator">:</span>
        <div>
          <label>Minutes</label>
          <input type="number" class="time-input" placeholder="mm"/>
        </div> <span class="separator">:</span>
        <div>
          <label>Seconds</label>
          <input type="number" class="time-input" placeholder="ss"/>
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