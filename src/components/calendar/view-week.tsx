import CalendarHeader from "./calendar-header.tsx";
import React, {Fragment, useContext, useEffect} from "react";
import { useWindowSize } from 'usehooks-ts'
import {AppContext} from "../../providers/app-provider.tsx";
import {format, isEqual, differenceInHours} from "date-fns";
import {classNames, eventsForDay} from "@/helpers/utils.ts";
import {MediaQuery} from "@/enums/media-queries.ts";
import EventTile from "./event-tile.tsx";

type ViewWeekProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewWeek: React.FC<ViewWeekProps> = ({ onAddEvent, onViewChange }) => {
  const {
    today,
    selectedDate,
    daysCurrentWeek,
    events,
    containerRef,
    containerNavRef,
    containerOffsetRef,
    calculateTrackPosition,
    setSelectedDate,
  } = useContext(AppContext);
  const { width} = useWindowSize();

  useEffect(() => {
    calculateTrackPosition();
  }, [calculateTrackPosition])

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <CalendarHeader onAddEvent={onAddEvent} onViewChange={onViewChange} />
      <div ref={containerRef} className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div
            ref={containerNavRef}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
              {daysCurrentWeek.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  className="flex flex-col items-center pb-3 pt-2"
                  onClick={() => setSelectedDate(day)}
                >
                  {format(day, 'EEE')}
                  <span className={classNames(
                    isEqual(day, selectedDate) ? 'bg-gray-900 text-white' : '',
                    !isEqual(day, selectedDate) && !isEqual(day, today) ? 'text-gray-900' : '',
                    isEqual(day, today) && !isEqual(day, selectedDate) ? 'text-indigo-600' : '',
                    isEqual(day, today) && isEqual(day, selectedDate) ? 'bg-indigo-600 text-white' : '',
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900"
                  )}>
                    {format(day, 'd')}
                  </span>
                </button>
              ))}
            </div>

            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {daysCurrentWeek.map((day, index) => (
                <div className="flex items-center justify-center py-3" key={index}>
                  <span className={classNames(
                    isEqual(day, today) ? 'flex items-baseline' : '',
                  )}>
                    {format(day, 'EE')}{' '}
                    <span className={classNames(
                      isEqual(day, today) ? 'ml-1.5 flex h-8 w-8 rounded-full bg-indigo-600 text-white' : 'text-gray-900',
                      "items-center justify-center font-semibold "
                    )}>
                      {format(day, 'd')}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid pr-8 divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffsetRef} className="row-end-1 col-start-1 col-end-[8] h-7 pointer-events-none"></div>
                {Array.from({ length: 7 }).map((_, columnIndex) => {
                  return (
                    <div className='grid grid-cols-1 row-span-full divide-y divide-gray-100' style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}>
                      {Array.from({ length: 48 }).map((_, rowIndex) => (
                        <Fragment key={rowIndex}>
                          <button
                            type="button"
                            onClick={() => onAddEvent?.({
                              columnIndex: columnIndex,
                              rowIndex: rowIndex,
                              date: new Date(daysCurrentWeek[columnIndex].setHours(rowIndex / 2, (rowIndex % 2) * 30, 0, 0))
                            })}
                            className="hover:bg-gray-100"
                          >
                            {columnIndex === 0 && rowIndex % 2 === 0 && (
                              <div className="sticky left-0 z-20 -ml-14 -mt-8 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                {rowIndex / 2}:00
                              </div>
                            )}
                          </button>
                        </Fragment>
                      ))}
                    </div>
                  )
                })}
              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7 pointer-events-none">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full" />
                <div className="col-start-8 row-span-full w-8" />
              </div>

              {/* Events */}
              <div className="col-start-1 col-end-2 row-start-1 grid sm:grid-cols-7 sm:pr-8 pointer-events-none">
                {daysCurrentWeek.map((day, index) => {
                  if (width < MediaQuery.sm) {
                    if (!isEqual(day, selectedDate)) {
                      return null;
                    }
                  }

                  // TODO: Find a way to correctly autosize the grid elements, so they take up space if they do not collide with other events

                  return (
                    <ol
                      key={index}
                      className="relative mt-px row-start-1 row-end-2 grid pointer-events-none"
                      style={{
                        gridColumnStart: width < MediaQuery.sm ? 1 : index + 1,
                        gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto'
                      }}
                    >
                      {eventsForDay(day, events).map((event) => (
                        <li
                          key={event.id}
                          className="relative mt-px flex"
                          style={{ gridRow: `${(Number(format(event.startDate, 'H')) * 12) + 2} / span ${Number(differenceInHours(event.endDate, event.startDate)) * 12}` }}
                        >
                          <EventTile event={event} />
                        </li>
                      ))}
                    </ol>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewWeek
