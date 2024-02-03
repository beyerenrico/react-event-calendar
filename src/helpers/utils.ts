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

export function round(value: number, step: number) {
  step || (step = 1.0);
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}
