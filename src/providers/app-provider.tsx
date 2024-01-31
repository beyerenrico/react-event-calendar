import React, {
  createContext,
  useCallback,
  useMemo,
  useState
} from 'react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  parse,
  startOfToday,
  startOfWeek
} from "date-fns";

export const AppContext = createContext<AppContextValue>({
  today: startOfToday(),
  selectedDate: startOfToday(),
  currentMonth: format(startOfToday(), 'MMM-yyyy'),
  firstDayCurrentMonth: startOfToday(),
  daysCurrentMonth: [],
  events: [],
  currentView: 'month',
  togglePreviousMonth: () => {},
  toggleNextMonth: () => {},
  setSelectedDate: () => {},
  setCurrentMonth: () => {},
  setCurrentView: () => {},
  setEvents: () => {},
});

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

  const togglePreviousMonth = useCallback(() => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }, [firstDayCurrentMonth]);

  const toggleNextMonth = useCallback(() => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }, [firstDayCurrentMonth]);

  const contextValue = useMemo(() => ({
    today,
    selectedDate,
    currentMonth,
    firstDayCurrentMonth,
    daysCurrentMonth,
    events,
    currentView,
    togglePreviousMonth,
    toggleNextMonth,
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
    events,
    currentView,
    togglePreviousMonth,
    toggleNextMonth,
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
