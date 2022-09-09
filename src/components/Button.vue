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

.button[disabled] {
  cursor: default;
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