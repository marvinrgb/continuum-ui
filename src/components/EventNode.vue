<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { Event } from '@/types';

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true
  }
});

const emit = defineEmits<{
  (e: 'update', payload: { id: string, data: Partial<Event> }): void
  (e: 'delete', eventId: string): void
}>();

// --- Local Reactive State ---
const isEditing = ref(false);

const editableTitle = ref(props.event.title);
const editableDate = ref(props.event.date);

// --- Methods ---
const toggleEdit = () => {
  if (!isEditing.value) {
    editableTitle.value = props.event.title;
    editableDate.value = props.event.date;
  }
  isEditing.value = !isEditing.value;
};

const handleSave = () => {
  emit('update', {
    id: props.event.id,
    data: {
      title: editableTitle.value,
      date: editableDate.value
    }
  });
  isEditing.value = false;
};

const handleDelete = () => {
  emit('delete', props.event.id);
};

const handleCancel = () => {
  isEditing.value = false;
};

watch(() => props.event, (newEvent) => {
  isEditing.value = false;
  editableTitle.value = newEvent.title;
  editableDate.value = newEvent.date;
});
</script>

<template>
  <div :class="['event-node', `event-type-${props.event.type}`]">
    <div v-if="!isEditing" class="display-view">
      <div class="event-content" @click="toggleEdit">
        <h3>{{ event.title }}</h3>
        <p>{{ event.date }}</p>
      </div>
    </div>
    <div v-else class="editing-view">
      <div class="event-content">
        <input v-model="editableTitle" type="text" placeholder="Event Title" />
        <input v-model="editableDate" type="text" placeholder="Date" />
        <div class="edit-controls">
          <button @click="handleSave">Save</button>
          <button @click="handleCancel">Cancel</button>
          <button @click="handleDelete" class="delete-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
