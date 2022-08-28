<script setup lang="ts">
import Presets from "./components/Presets.vue";
import Timer from "./components/Timer.vue";
import Button from "./components/Button.vue";
import { ref } from "vue";

function test() {
  alert("It works");
}

const dummyPresets = ref([
  { time: "1:12:34" },
  { time: "2:13:37" },
  { time: "2:13:37" },
  { time: "2:13:37" },
  { time: "2:13:37" },
  { time: "2:13:37" },
]);

</script>

<template>
  <div class="container">
    <div class="app">
      <Presets v-model:presets="dummyPresets"/>
      <div class="buttons">
        <Button text="Start/stop" @click="test"/>
        <Button text="Reset"/>
        <Button text="Save preset"/>
      </div>
      <div class="timer">
        <Timer/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.app {
  padding: 1.5em;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-direction: row;
}

@media screen and (min-width: 460px) {
  .app {
    border-radius: 1em;
    box-shadow: 1rem 1rem 3rem 1.4rem #bbb;
    flex-direction: row;
    align-items: center;
  }
  .test {
    width: 15em;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .buttons {
    flex-direction: column;
  }
}
</style>