import { isSameDay } from "date-fns";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function dayHasEvents(day: Date, events: CalendarEvent[]) {
  return events.some((event) => {
    return isSameDay(day, event.startDate);
  })
}

export function eventsForDay(day: Date, events: CalendarEvent[]) {
  return events.filter((event) => {
    return isSameDay(day, event.startDate);
  })
}
