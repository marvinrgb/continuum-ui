import { ref, computed } from 'vue';
import type { Event } from '@/types';

const initialTimelineData: Event[] = [
  {
    id: 'a1b2c3d4',
    title: 'The Great Pyramid of Giza',
    date: 'c. 2580–2560 BC',
    type: 'original',
  },
  {
    id: 'e5f6g7h8',
    title: 'Fall of the Western Roman Empire',
    date: '476 AD',
    type: 'original',
  },
  {
    id: 'i9j0k1l2',
    title: 'The Renaissance Begins',
    date: 'c. 1300',
    type: 'original',
  },
  {
    id: 'm3n4o5p6',
    title: 'Invention of the Printing Press',
    date: 'c. 1440',
    type: 'original',
  },
  {
    id: 'q7r8s9t0',
    title: 'First Manned Moon Landing',
    date: '1969',
    type: 'original',
  },
];

const getInitialData = (): Event[] => JSON.parse(JSON.stringify(initialTimelineData));

export function useTimeline() {
  const timelineEvents = ref<Event[]>(getInitialData());
  const beforeTimeline = ref<Event[]>(getInitialData());
  const hasChanged = ref(false);

  const isTimelineDirty = computed(() => hasChanged.value);

  const markAsChanged = () => {
    hasChanged.value = true;
  };

  const updateEvent = (eventId: string, updatedData: Partial<Event>) => {
    const eventIndex = timelineEvents.value.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      timelineEvents.value[eventIndex] = { ...timelineEvents.value[eventIndex], ...updatedData };
      markAsChanged();
    }
  };

  const addEvent = (positionData: { index: number }) => {
    const newEvent: Event = {
      id: crypto.randomUUID(),
      title: 'New Event',
      date: 'Specify Date',
      type: 'user-added'
    };
    timelineEvents.value.splice(positionData.index, 0, newEvent);
    markAsChanged();
  };

  const deleteEvent = (eventId: string) => {
    timelineEvents.value = timelineEvents.value.filter(e => e.id !== eventId);
    markAsChanged();
  };

  const reforgeTimeline = async () => {
    if (!isTimelineDirty.value) return;

    try {
      const response = await fetch('/api/v1/timeline/reforge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          beforeTimeline: beforeTimeline.value,
          afterTimeline: timelineEvents.value,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTimeline: Event[] = await response.json();
      timelineEvents.value = newTimeline;
      beforeTimeline.value = newTimeline;
      hasChanged.value = false;
    } catch (error) {
      console.error("Error reforging timeline:", error);
      // Here you might want to set an error state to show in the UI
    }
  };

  const resetTimeline = () => {
    timelineEvents.value = getInitialData();
    beforeTimeline.value = getInitialData();
    hasChanged.value = false;
  };

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
