<script setup lang="ts">
const props = defineProps({
  isDirty: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['reforge', 'reset']);
</script>

<template>
  <div class="control-bar">
    <h1>Continuum</h1>
    <div class="actions">
      <button @click="emit('reforge')" :disabled="!isDirty">
        Reforge Timeline
      </button>
      <button @click="emit('reset')">Reset</button>
    </div>
  </div>
</template>
