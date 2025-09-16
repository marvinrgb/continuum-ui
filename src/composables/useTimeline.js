// src/composables/useTimeline.js

import { ref, computed } from 'vue';
import { initialTimelineData, mockApiReforge } from './mockData'; // Assume mock data is in another file

// Create a deep copy of the original data to prevent mutation
const getInitialData = () => JSON.parse(JSON.stringify(initialTimelineData));

export function useTimeline() {
  // --- Reactive State ---
  const timelineEvents = ref(getInitialData());
  const originalEvents = getInitialData(); // A static copy for the reset function
  const hasChanged = ref(false); // Tracks if any change has been made

  // --- Computed Properties ---
  // The "Reforge" button is enabled only if changes have been made.
  const isTimelineDirty = computed(() => hasChanged.value);

  // --- Actions ---

  // Called when any event is updated, added, or deleted.
  const markAsChanged = () => {
    hasChanged.value = true;
  };

  const updateEvent = (eventId, updatedData) => {
    const eventIndex = timelineEvents.value.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      timelineEvents.value[eventIndex] = { ...timelineEvents.value[eventIndex], ...updatedData };
      markAsChanged();
    }
  };

  const addEvent = (positionData) => {
    // Logic to determine where to splice the new event in the array
    const newEvent = {
      id: crypto.randomUUID(),
      title: 'New Event',
      date: 'Specify Date',
      type: 'user-added'
    };
    timelineEvents.value.splice(positionData.index, 0, newEvent);
    markAsChanged();
  };

  const deleteEvent = (eventId) => {
    timelineEvents.value = timelineEvents.value.filter(e => e.id !== eventId);
    markAsChanged();
  };

  // The core AI interaction function
  const reforgeTimeline = async () => {
    if (!isTimelineDirty.value) return;

    // In a real app, this is where you'd show a loading state
    console.log("Sending current timeline to AI:", timelineEvents.value);

    // Use the mock API
    const newTimeline = await mockApiReforge(timelineEvents.value);

    timelineEvents.value = newTimeline;
    hasChanged.value = false; // The timeline is now in a new, clean state
  };

  // Resets the timeline to the original canonical history
  const resetTimeline = () => {
    timelineEvents.value = getInitialData();
    hasChanged.value = false;
  };

  // Expose state and methods to the components
  return {
    timelineEvents,
    isTimelineDirty,
    updateEvent,
    addEvent,
    deleteEvent,
    reforgeTimeline,
    resetTimeline,
  };
}
