export const initialTimelineData = [
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

// Mock AI service
export const mockApiReforge = async (currentTimeline) => {
  console.log('Mock AI: Received timeline for reforging:', currentTimeline);

  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));

  // Create a new, slightly altered timeline
  const newTimeline = currentTimeline.map(event => {
    // Keep original events, but mark them as 'original'
    if (event.type === 'original') {
      return { ...event };
    }
    // "Reforge" user-added and ai-generated events
    return {
      ...event,
      title: `AI: ${event.title}`,
      type: 'ai-generated',
    };
  });

  // Add a new AI-generated event
  newTimeline.push({
    id: crypto.randomUUID(),
    title: 'The AI Singularity',
    date: '2042',
    type: 'ai-generated',
  });

  // Sort events by a rough approximation of their date
  newTimeline.sort((a, b) => {
    const aDate = parseInt(a.date.replace(/[^0-9-]/g, ''), 10);
    const bDate = parseInt(b.date.replace(/[^0-9-]/g, ''), 10);
    return aDate - bDate;
  });

  console.log('Mock AI: Returning new timeline:', newTimeline);
  return newTimeline;
};
