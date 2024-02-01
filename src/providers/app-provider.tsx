import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
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
  const [timeIndicatorOffset, setTimeIndicatorOffset] = useState<number>(0);
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const containerRef = useRef<HTMLDivElement>(null)
  const containerNavRef = useRef<HTMLDivElement>(null)
  const containerOffsetRef = useRef<HTMLDivElement>(null)
  const daysCurrentWeek = eachDayOfInterval({
    start: startOfWeek(selectedDate, { weekStartsOn: 1 }),
    end: endOfWeek(selectedDate, { weekStartsOn: 1 })
  })
  const daysCurrentMonth = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 })
  })
  const monthsCurrentYear = eachMonthOfInterval({
    start: new Date(firstDayCurrentMonth.getFullYear(), 0, 1),
    end: new Date(firstDayCurrentMonth.getFullYear(), 11, 31)
  });

  const toggleDate = useCallback((amount: number, type: 'days' | 'weeks' | 'months' | 'years') => {
    const nextDay = add(selectedDate, { [type]: amount });

    setSelectedDate(nextDay);
    setCurrentMonth(format(nextDay, 'MMM-yyyy'));
  }, [selectedDate]);

  const togglePreviousDay = useCallback(() => toggleDate(-1, 'days'), [toggleDate]);
  const togglePreviousWeek = useCallback(() => toggleDate(-1, 'weeks'), [toggleDate]);
  const togglePreviousMonth = useCallback(() => toggleDate(-1, 'months'), [toggleDate]);
  const togglePreviousYear = useCallback(() => toggleDate(-1, 'years'), [toggleDate]);
  const toggleNextDay = useCallback(() => toggleDate(1, 'days'), [toggleDate]);
  const toggleNextWeek = useCallback(() => toggleDate(1, 'weeks'), [toggleDate]);
  const toggleNextMonth = useCallback(() => toggleDate(1, 'months'), [toggleDate]);
  const toggleNextYear = useCallback(() => toggleDate(1, 'years'), [toggleDate]);

  const calculateTrackPosition = useCallback(() => {
    const currentMinute = new Date().getHours() * 60

    if (containerRef.current === null || containerNavRef.current === null || containerOffsetRef.current === null) return;

    const offsetTop = (containerRef.current.scrollHeight - containerNavRef.current.offsetHeight) * currentMinute / 1440;

    containerRef.current.scrollTop = offsetTop;
    setTimeIndicatorOffset(offsetTop);
  }, [containerRef, containerNavRef, containerOffsetRef])

  const contextValue = useMemo(() => ({
    today,
    selectedDate,
    currentMonth,
    firstDayCurrentMonth,
    daysCurrentWeek,
    daysCurrentMonth,
    monthsCurrentYear,
    events,
    currentView,
    containerRef,
    containerNavRef,
    containerOffsetRef,
    timeIndicatorOffset,
    calculateTrackPosition,
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
    setTimeIndicatorOffset,
  }), [
    today,
    selectedDate,
    currentMonth,
    firstDayCurrentMonth,
    daysCurrentWeek,
    daysCurrentMonth,
    monthsCurrentYear,
    events,
    currentView,
    containerRef,
    containerNavRef,
    containerOffsetRef,
    timeIndicatorOffset,
    calculateTrackPosition,
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
    setTimeIndicatorOffset,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
