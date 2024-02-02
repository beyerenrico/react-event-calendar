import React, { useContext } from 'react'
import { AppContext } from "../../providers/app-provider.tsx";
import { format, isEqual, isSameMonth } from "date-fns";
import {classNames, dayHasEvents, eventsForDay} from "../../helpers/utils.ts";
import CalendarHeader from "./calendar-header.tsx";

type ViewMonthProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewMonth: React.FC<ViewMonthProps> = ({ onAddEvent, onViewChange }) => {
  const {
    today,
    selectedDate,
    firstDayCurrentMonth,
    daysCurrentMonth,
    events,
    setSelectedDate,
    setCurrentMonth,
    setCurrentView,
  } = useContext(AppContext);

  const handleViewChange = (view: 'year' | 'month' | 'week' | 'day') => {
    setCurrentView(view);
    onViewChange?.(view);
  }

  return (
    <div className="lg:flex lg:h-full lg:flex-col bg-gray-100 w-full rounded-lg border shadow-md overflow-hidden">
      <CalendarHeader onAddEvent={onAddEvent} onViewChange={onViewChange} />
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {daysCurrentMonth?.map((day) => (
              <button
                key={format(day, 'yyyy-MM-dd')}
                onClick={() => {
                  setSelectedDate(day);
                  setCurrentMonth(format(day, 'MMM-yyyy'));
                  handleViewChange('day')
                }}
                className={classNames(
                  isSameMonth(day, firstDayCurrentMonth) ? 'bg-white' : 'bg-gray-50 text-gray-500',
                  'relative px-3 py-2 flex items-start justify-start flex-col overflow-hidden hover:bg-gray-100'
                )}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={
                    isEqual(day, selectedDate)
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                      : undefined
                  }
                >
                  {format(day, 'd')}
                </time>
                <ol className="mt-2 max-w-full">
                  {eventsForDay(day, events).slice(0, 2).map((event) => (
                    <li key={event.id}>
                      <a href={event.href} className="group flex">
                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600 text-left">
                          {event.title}
                        </p>
                      </a>
                    </li>
                  ))}
                  {eventsForDay(day, events).length > 2 && (
                    <li className="text-gray-500">
                      + {eventsForDay(day, events).length - 2} more
                    </li>
                  )}
                </ol>
              </button>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {daysCurrentMonth.map((day) => (
              <button
                key={format(day, 'yyyy-MM-dd')}
                onClick={() => {
                  setSelectedDate(day);
                  setCurrentMonth(format(day, 'MMM-yyyy'));
                  handleViewChange('day')
                }}
                type="button"
                className={classNames(
                  isSameMonth(day, firstDayCurrentMonth) ? 'bg-white' : 'bg-gray-50',
                  (isEqual(day, selectedDate) || isEqual(day, today)) ? 'font-semibold' : '',
                  isEqual(day, selectedDate) ? 'text-white' : '',
                  !isEqual(day, selectedDate) && isEqual(day, today) ? 'text-indigo-600' : '',
                  !isEqual(day, selectedDate) && isSameMonth(day, firstDayCurrentMonth) && !isEqual(day, today) ? 'text-gray-900' : '',
                  !isEqual(day, selectedDate) && !isSameMonth(day, firstDayCurrentMonth) && !isEqual(day, today) ? 'text-gray-500' : '',
                  'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10 hover:bg-gray-100'
                )}
              >
                <time
                  dateTime={format(day, 'yyyy-MM-dd')}
                  className={classNames(
                    isEqual(day, selectedDate) ? 'flex h-6 w-6 items-center justify-center rounded-full' : '',
                    isEqual(day, selectedDate) && isEqual(day, today) ? 'bg-indigo-600' : '',
                    isEqual(day, selectedDate) && !isEqual(day, today) ? 'bg-gray-900' : '',
                    'ml-auto'
                  )}
                >
                  {format(day, 'd')}
                </time>
                <span className="sr-only">{eventsForDay(day, events).length} events</span>
                {dayHasEvents(day, events) && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {eventsForDay(day, events).map((event) => (
                      <span key={event.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {dayHasEvents(selectedDate, events) && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {eventsForDay(selectedDate, events).map((event) => (
              <li key={event.id} className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.title}</p>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

export default ViewMonth
