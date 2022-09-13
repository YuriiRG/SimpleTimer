<script setup lang='ts'>
const props = defineProps<{
  text: string,
  disabled?: boolean
}>();

const emit = defineEmits<{
  (e?: "click"): void
}>();

</script>

<template>
  <button @click="emit('click')" class="button" :disabled="props.disabled">{{text}}</button>
</template>

<style scoped>
.button {
  background-color: #fff;
  border: none;
  padding: 0.6em;
  font-size: inherit; 
  border-radius: var(--sm-border-radius);
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);
  transition: background-color 0.15s;
  cursor: pointer;
}

.dark .button {
  background-color: #e0e0e0;
  color: #1d1d1d;
  box-shadow: none;
}

.button[disabled] {
  cursor: default;
}

.dark .button[disabled] {
  background-color: #3c3c3c;
  color: #777777;
}

.dark .button:hover:not([disabled]) {
  background-color: #c0c0c0;
}

.dark .button:hover:active:not([disabled]) {
  background-color: #b8b8b8;
}

.button:hover:not([disabled]) {
  background-color: #eee;
  transition: background-color 0.15s, transform 0.05s;
}

.button:hover:active:not([disabled]) {
  background-color: #e5e5e5;
  transform: scale(0.95);
}
</style>