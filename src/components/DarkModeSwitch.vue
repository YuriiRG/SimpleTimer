<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  on: boolean
}>();

const emit = defineEmits<{
  (e: "update:on", newValue: boolean): void;
}>();

function toggle() {
  localStorage.setItem("timerDarkMode", JSON.stringify(!props.on));
  emit("update:on", !props.on);
}

watchEffect(() => {
  if (props.on) {
    document.querySelector("html")?.classList.add("dark");
  } else {
    document.querySelector("html")?.classList.remove("dark");
  }
});

</script>

<template>
  <div class="switch" @click="toggle">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="1em" height="1em"
         preserveAspectRatio="xMidYMid meet"
         viewBox="0 0 24 24"
         class="svg-icon"
         v-if="!props.on">
      <g fill="none"
         stroke="currentColor"
         stroke-linecap="round"
         stroke-linejoin="round"
         stroke-width="2">
        <circle cx="12"
                cy="12"
                r="4"/>
        <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6
                 5.6l.7.7m12.1-.7l-.7.7m0
                 11.4l.7.7m-12.1-.7l-.7.7"/>
      </g>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg"
         width="1em" height="1em"
         preserveAspectRatio="xMidYMid meet"
         viewBox="0 0 24 24"
         class="svg-icon moon"
         v-else>
      <path fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3h.393a7.5 7.5 0 0 0 7.92
               12.446A9 9 0 1 1 12 2.992z"/>
    </svg>
  </div>
</template>

<style>
.switch {
  width: 3rem;
  height: 3rem;
  transition: all 0.2s;
  margin: 0.5rem;
}
.svg-icon {
  width: 100%;
  height: 100%;
}
.dark .svg-icon {
  color: #a0a0a0;
}
</style>