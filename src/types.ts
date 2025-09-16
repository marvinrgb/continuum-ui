export type EventType = 'original' | 'user-added' | 'ai-generated';

export interface Event {
  id: string;
  title: string;
  date: string;
  type: EventType;
}

export interface ReforgeRequestBody {
  beforeTimeline: Event[];
  afterTimeline: Event[];
}
