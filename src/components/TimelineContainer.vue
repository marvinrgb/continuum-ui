<script setup>
import { ref } from 'vue';
import EventNode from './EventNode.vue';

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['add-event', 'update-event', 'delete-event']);

const timelineEl = ref(null);

const handleTimelineClick = (event) => {
  // Only add event if clicking on the timeline axis itself
  if (event.target.classList.contains('timeline-axis')) {
    const rect = timelineEl.value.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const totalHeight = timelineEl.value.scrollHeight;

    // Determine the index to insert the new event
    const newIndex = Math.round((clickY / totalHeight) * props.events.length);

    emit('add-event', { index: newIndex });
  }
};

const handleUpdate = (payload) => {
  emit('update-event', payload.id, payload.data);
};

const handleDelete = (eventId) => {
  emit('delete-event', eventId);
};
</script>

<template>
  <div ref="timelineEl" class="timeline-container" @click="handleTimelineClick">
    <div class="timeline-axis"></div>
    <div
      v-for="(event, index) in events"
      :key="event.id"
      class="event-wrapper"
      :class="{ 'on-right': index % 2 }"
    >
      <EventNode
        :event="event"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
