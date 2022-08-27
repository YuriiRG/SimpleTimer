<script setup lang='ts'>
defineProps<{
  text: string
}>();

const emit = defineEmits<{
  (e?: "click"): void
}>();

</script>

<template>
  <button @click="emit('click')" class="button">{{text}}</button>
</template>

<style scoped>
  .button {
    background-color: #fff;
    border: none;
    padding: 0.6em;
    font-size: inherit; 
    border-radius: 0.5em;
    box-shadow: 0.1rem 0.1rem 1rem #aaa;
    transition: background-color 0.15s;
  }
  .button:hover {
    background-color: #eee;
    transition: background-color 0.15s, transform 0.05s;
  }

  .button:hover:active {
    background-color: #e5e5e5;
    transform: scale(0.95);
  }
</style>