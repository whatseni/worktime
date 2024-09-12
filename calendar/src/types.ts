/**
 * Calendar Component의 Props
 */

export type Event = {
  title: string;
  date: string
}
export interface CalendarPropsType {
  onDateClick: (date: string) => void;
  events: Event[] | null;
  onMonthEvent: (year: number, month: number) => void;
  onEventClick: (event: Event) => void;
}