import { EventInput } from '@fullcalendar/react';

export const formatDate = (date: Date): string => date.toISOString().replace(/T.*$/, '');

export const INITIAL_EVENTS: EventInput[] = [
  {
    allDay: false,
    id: '#1234123',
    title: 'Rezerwacja',
    start: `${formatDate(new Date())}T12:00:00+02:00`,
    end: `${formatDate(new Date())}T14:00:00+02:00`,
  },
];

let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}
