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
    events: CalendarEvent[];
    currentView: 'year' | 'month' | 'week' | 'day';
    togglePreviousMonth: () => void;
    toggleNextMonth: () => void;
    setSelectedDate: (date: Date) => void;
    setCurrentMonth: (date: string) => void;
    setCurrentView: (view: 'year' | 'month' | 'week' | 'day') => void;
    setEvents: (events: CalendarEvent[]) => void;
  };
}

export {};
