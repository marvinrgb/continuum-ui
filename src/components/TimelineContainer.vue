<script setup lang="ts">
import { ref } from 'vue';
import EventNode from './EventNode.vue';
import type { PropType } from 'vue';
import type { Event } from '@/types';

const props = defineProps({
  events: {
    type: Array as PropType<Event[]>,
    required: true,
  },
});

const emit = defineEmits(['add-event', 'update-event', 'delete-event']);

const timelineEl = ref<HTMLElement | null>(null);

const handleTimelineClick = (event: MouseEvent) => {
  if (timelineEl.value && event.target instanceof HTMLElement && event.target.classList.contains('timeline-axis')) {
    const rect = timelineEl.value.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const totalHeight = timelineEl.value.scrollHeight;

    const newIndex = Math.round((clickY / totalHeight) * props.events.length);

    emit('add-event', { index: newIndex });
  }
};

const handleUpdate = (payload: { id: string, data: Partial<Event> }) => {
  emit('update-event', payload.id, payload.data);
};

const handleDelete = (eventId: string) => {
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
