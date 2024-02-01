import React, {Fragment, useContext, useEffect} from "react";
import {classNames, eventsForDay} from "../../helpers/utils.ts";
import { AppContext } from "../../providers/app-provider.tsx";
import { differenceInHours, format, isEqual } from "date-fns";
import CalendarHeader from "./calendar-header.tsx";
import MiniCalendar from "./mini-calendar.tsx";

type ViewDayProps = {
  onAddEvent?: () => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewDay: React.FC<ViewDayProps> = ({ onAddEvent, onViewChange }) => {
  const {
    today,
    selectedDate,
    daysCurrentWeek,
    events,
    containerRef,
    containerNavRef,
    containerOffsetRef,
    // timeIndicatorOffset,
    calculateTrackPosition,
    setSelectedDate,
    setCurrentMonth,
  } = useContext(AppContext);

  useEffect(() => {
    calculateTrackPosition();
  }, [calculateTrackPosition])

  return (
    <div className="flex h-full flex-col bg-gray-100 rounded-md">
      <CalendarHeader onAddEvent={onAddEvent} onViewChange={onViewChange} />
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div ref={containerRef} className="flex flex-auto flex-col overflow-auto">
          <div
            ref={containerNavRef}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
          >
            {daysCurrentWeek.map((day) => (
              <button
                key={format(day, 'yyyy-MM-dd')}
                onClick={() => {
                  setSelectedDate(day);
                  setCurrentMonth(format(day, 'MMM-yyyy'));
                }}
                type="button"
                className="flex flex-col items-center pb-1.5 pt-3"
              >
                <span>{format(day, 'eeee').slice(0, 1)}</span>
                  <span className={classNames(
                    isEqual(day, selectedDate) ? 'bg-gray-900 text-white' : '',
                    !isEqual(day, selectedDate) && !isEqual(day, today) ? 'text-gray-900' : '',
                    isEqual(day, today) && !isEqual(day, selectedDate) ? 'text-indigo-600' : '',
                    isEqual(day, today) && isEqual(day, selectedDate) ? 'bg-indigo-600 text-white' : '',
                    "mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
                  )}>
                  {format(day, 'd')}
                </span>
              </button>
            ))}
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100 relative"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                {/*<div className='absolute h-px bg-red-500 w-full' style={{ top: timeIndicatorOffset + 'px' }} />*/}
                <div ref={containerOffsetRef} className="row-end-1 h-7"></div>
                {Array.from({ length: 24 }).map((_, i) => (
                  <Fragment key={i}>
                    <div>
                      <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                        {i}:00
                      </div>
                    </div>
                    <div />
                  </Fragment>
                ))}
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid"
                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {eventsForDay(selectedDate, events).map((event) => (
                  <li
                    key={event.id}
                    className="relative mt-px flex"
                    style={{ gridRow: `${(Number(format(event.startDate, 'H')) * 12) + 2} / span ${Number(differenceInHours(event.endDate, event.startDate)) * 12}` }}
                  >
                    <a
                      href={event.href}
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                    >
                      <p className="order-1 font-semibold text-blue-700">{event.title}</p>
                      <p className="text-blue-500 group-hover:text-blue-700">
                        <time dateTime={format(event.startDate, 'yyyy-MM-dd HH:mm')}>
                          {format(event.startDate, 'HH:mm')}
                        </time>
                        {' '}-{' '}
                        <time dateTime={format(event.endDate, 'yyyy-MM-dd HH:mm')}>
                          {format(event.endDate, 'HH:mm')}
                        </time>
                      </p>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <MiniCalendar />
      </div>
    </div>
  )
}

export default ViewDay
