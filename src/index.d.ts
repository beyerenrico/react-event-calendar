import React from "react";

declare global {
  type CalendarEvent = {
    id: string;
    title: string;
    href?: string;
    startDate: Date;
    endDate: Date;
  };

  type AppProviderProps = {
    children: React.ReactNode;
  };

  type AppContextValue = {
    today: Date;
    selectedDate: Date;
    currentMonth: string;
    firstDayCurrentMonth: Date;
    daysCurrentWeek: Date[];
    daysCurrentMonth: Date[];
    monthsCurrentYear: Date[];
    events: CalendarEvent[];
    currentView: 'year' | 'month' | 'week' | 'day';
    containerRef: React.RefObject<HTMLDivElement>;
    containerNavRef: React.RefObject<HTMLDivElement>;
    containerOffsetRef: React.RefObject<HTMLDivElement>;
    timeIndicatorOffset: number;
    calculateTrackPosition: () => void;
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
    setTimeIndicatorOffset: (offset: number) => void;
  };
}

export {};
