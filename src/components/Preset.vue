<script setup lang="ts">
interface Preset {
  time: string,
  id: number
}

defineProps<{
  data: Preset
}>();

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>();
</script>

<template>
  <div class="string">
    <span>
      {{data.time}}
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" 
          width="16"
          height="16"
          fill="currentColor"
          @click="emit('delete', data.id)"
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
  width: 5rem;
  box-shadow: var(--sm-shadow-x)
              var(--sm-shadow-y)
              var(--sm-shadow-blur)
              var(--sm-shadow-color);

  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 1;
}
.string:hover {
  background-color: #eee;
}

@media screen and (min-width: 460px) {
  .string {
    padding: 0.3em 0.2em 0.3em 0.5em;
  }
}

.v-enter-active, .v-leave-active {
  transition: all 0.5s ease !important;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
  font-size: 0;
}

.v-enter-from > svg, .v-leave-to > svg {
  height: 0;
}

</style>