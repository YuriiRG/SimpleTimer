<script setup lang="ts">
import Presets from "./components/Presets.vue";
import Timer from "./components/Timer.vue";
import Button from "./components/Button.vue";

function test() {
  alert("It works");
}
</script>

<template>
  <div class="container">
    <div class="app">
      <div class="presets">
        <Presets/>
      </div>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

@media screen and (min-width: 460px) {
  .app {
    border-radius: 1em;
    box-shadow: 1rem 1rem 3rem 1.4rem #bbb;
    flex-direction: row;
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
}
</style>