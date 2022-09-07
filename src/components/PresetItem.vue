<script setup lang="ts">
import { IPreset, stateType } from "../types";
import { secondsToString } from "../timeConvert";
defineProps<{
  data: IPreset,
  state: stateType
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void;
  (e: 'open',   id: number): void;
}>();
</script>

<template>
  <div class="string" @click="emit('open', data.id)" :aria-disabled="state !== 'idle'">
    <span>
      {{ secondsToString(data.time) }}
    </span>
    <svg xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          @click="state === 'idle' ? emit('delete', data.id) : undefined"
          class="delete-icon"
          viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 
      .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 
      0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  </div>
</template>

<style scoped>
.string {
  border-radius: 0.3em;
  padding: 0.6em 0.4em 0.6em 1em;
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);

  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
  z-index: 1;
  background: #fff;
  user-select: none;
}
.string:hover:not([aria-disabled=true]) {
  background-color: #eee;
  transition: all 0.2s;
}

.string:hover:active:not([aria-disabled=true]) {
  scale: 0.95;
}

.string[aria-disabled=true] {
  color: #555;
}

@media screen and (min-width: 460px) {
  .string {
    padding: 0.3em 0.2em 0.3em 0.5em;
  }
}

.v-enter-active, .v-leave-active {
  transition: all 0.2s ease !important;
}

.v-enter-from, .v-leave-to {
  font-size: 0;
  padding: 0;
  margin: 0;
}

.v-enter-active .delete-icon, .v-leave-active .delete-icon {
  width: 0;
  height: 0;
}


.delete-icon {
  max-width: 16px;
  max-height: 16px;
}

</style>