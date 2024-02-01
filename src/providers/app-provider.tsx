import React, {
  createContext,
  useCallback,
  useMemo,
  useState
} from 'react';
import {
  add,
  eachDayOfInterval, eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfToday,
  startOfWeek
} from "date-fns";

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(format(today, 'MMM-yyyy'));
  const [currentView, setCurrentView] = useState<'year' | 'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const daysCurrentMonth = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 })
  })
  const monthsCurrentYear = eachMonthOfInterval({
    start: new Date(firstDayCurrentMonth.getFullYear(), 0, 1),
    end: new Date(firstDayCurrentMonth.getFullYear(), 11, 31)
  });

  const toggleDate = useCallback((amount: number, type: 'days' | 'weeks' | 'months' | 'years') => {
    const firstDayNext = add(firstDayCurrentMonth, { [type]: amount });
    setCurrentMonth(format(firstDayNext, 'MMM-yyyy'));
  }, [firstDayCurrentMonth]);

  const togglePreviousDay = useCallback(() => toggleDate(-1, 'days'), [toggleDate]);
  const togglePreviousWeek = useCallback(() => toggleDate(-1, 'weeks'), [toggleDate]);
  const togglePreviousMonth = useCallback(() => toggleDate(-1, 'months'), [toggleDate]);
  const togglePreviousYear = useCallback(() => toggleDate(-1, 'years'), [toggleDate]);
  const toggleNextDay = useCallback(() => toggleDate(1, 'days'), [toggleDate]);
  const toggleNextWeek = useCallback(() => toggleDate(1, 'weeks'), [toggleDate]);
  const toggleNextMonth = useCallback(() => toggleDate(1, 'months'), [toggleDate]);
  const toggleNextYear = useCallback(() => toggleDate(1, 'years'), [toggleDate]);

  const contextValue = useMemo(() => ({
    today,
    selectedDate,
    currentMonth,
    firstDayCurrentMonth,
    daysCurrentMonth,
    monthsCurrentYear,
    events,
    currentView,
    togglePreviousDay,
    toggleNextDay,
    togglePreviousWeek,
    toggleNextWeek,
    togglePreviousMonth,
    toggleNextMonth,
    togglePreviousYear,
    toggleNextYear,
    setSelectedDate,
    setCurrentMonth,
    setCurrentView,
    setEvents,
  }), [
    today,
    selectedDate,
    currentMonth,
    firstDayCurrentMonth,
    daysCurrentMonth,
    monthsCurrentYear,
    events,
    currentView,
    togglePreviousDay,
    toggleNextDay,
    togglePreviousWeek,
    toggleNextWeek,
    togglePreviousMonth,
    toggleNextMonth,
    togglePreviousYear,
    toggleNextYear,
    setSelectedDate,
    setCurrentMonth,
    setCurrentView,
    setEvents,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
