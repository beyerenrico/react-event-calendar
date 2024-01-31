import React from "react";

declare global {
  type CalendarEvent = {
    id: string;
    title: string;
    href?: string;
    date: Date;
  };

  type AppProviderProps = {
    children: React.ReactNode;
  };

  type AppContextValue = {
    today: Date;
    selectedDate: Date;
    currentMonth: string;
    firstDayCurrentMonth: Date;
    daysCurrentMonth: Date[];
    monthsCurrentYear: Date[];
    events: CalendarEvent[];
    currentView: 'year' | 'month' | 'week' | 'day';
    togglePreviousDay: () => void;
    toggleNextDay: () => void;
    togglePreviousWeek: () => void;
    toggleNextWeek: () => void;
    togglePreviousMonth: () => void;
    toggleNextMonth: () => void;
    togglePreviousYear: () => void;
    toggleNextYear: () => void;
    setSelectedDate: (date: Date) => void;
    setCurrentMonth: (date: string) => void;
    setCurrentView: (view: 'year' | 'month' | 'week' | 'day') => void;
    setEvents: (events: CalendarEvent[]) => void;
  };
}

export {};
