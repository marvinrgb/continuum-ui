<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update', 'delete']);

// --- Local Reactive State ---
const isEditing = ref(false);

// Local copies of the event data for the form fields.
// This prevents "prop mutation" warnings.
const editableTitle = ref(props.event.title);
const editableDate = ref(props.event.date);

// --- Methods ---
const toggleEdit = () => {
  if (!isEditing.value) {
    // When entering edit mode, reset local state to match current props
    editableTitle.value = props.event.title;
    editableDate.value = props.event.date;
  }
  isEditing.value = !isEditing.value;
};

const handleSave = () => {
  // Emit the changes to the parent component
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
  // Emit the delete request to the parent component
  emit('delete', props.event.id);
  // No need to change editing state, as the component will be removed
};

const handleCancel = () => {
  isEditing.value = false;
  // No data is emitted, changes are discarded
};

// --- Watcher (optional but good practice) ---
// If the underlying prop changes from a reforge while the user is editing,
// it might be desirable to exit editing mode.
watch(() => props.event, () => {
  isEditing.value = false;
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
