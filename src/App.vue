<script setup lang="ts">
import ControlBar from './components/ControlBar.vue';
import TimelineContainer from './components/TimelineContainer.vue';
import { useTimeline } from './composables/useTimeline';

const {
  timelineEvents,
  isTimelineDirty,
  updateEvent,
  addEvent,
  deleteEvent,
  reforgeTimeline,
  resetTimeline,
} = useTimeline();
</script>

<template>
  <main>
    <ControlBar
      :is-dirty="isTimelineDirty"
      @reforge="reforgeTimeline"
      @reset="resetTimeline"
    />
    <TimelineContainer
      :events="timelineEvents"
      @add-event="addEvent"
      @update-event="updateEvent"
      @delete-event="deleteEvent"
    />
  </main>
</template>
