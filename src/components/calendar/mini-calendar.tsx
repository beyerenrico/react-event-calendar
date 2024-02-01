import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {format, isEqual, isSameMonth} from "date-fns";
import {classNames, dayHasEvents} from "../../helpers/utils.ts";
import React, {useContext} from "react";
import {AppContext} from "../../providers/app-provider.tsx";

const MiniCalendar: React.FC = () => {
  const {
    today,
    selectedDate,
    firstDayCurrentMonth,
    daysCurrentMonth,
    events,
    togglePreviousMonth,
    toggleNextMonth,
    setSelectedDate,
    setCurrentMonth,
  } = useContext(AppContext);

  return (
    <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
      <div className="flex items-center text-center text-gray-900">
        <button
          onClick={togglePreviousMonth}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">{format(firstDayCurrentMonth, 'MMMM yyyy')}</div>
        <button
          onClick={toggleNextMonth}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {daysCurrentMonth.map((day, dayIdx) => (
          <button
            key={format(day, 'yyyy-MM-dd')}
            onClick={() => {
              setSelectedDate(day);
              setCurrentMonth(format(day, 'MMM-yyyy'));
            }}
            type="button"
            className={classNames(
              'py-1.5 hover:bg-gray-100 focus:z-10 relative',
              isSameMonth(day, firstDayCurrentMonth) ? 'bg-white' : 'bg-gray-50',
              (isEqual(day, selectedDate) || isEqual(day, today)) ? 'font-semibold' : '',
              isEqual(day, selectedDate) ? 'text-white' : '',
              !isEqual(day, selectedDate) && isSameMonth(day, firstDayCurrentMonth) && !isEqual(day, today) ? 'text-gray-900' : '',
              !isEqual(day, selectedDate) && !isSameMonth(day, firstDayCurrentMonth) && !isEqual(day, today) ? 'text-gray-400' : '',
              isEqual(day, today) && !isEqual(day, selectedDate) ? 'text-indigo-600' : '',
              dayIdx === 0 ? 'rounded-tl-lg' : '',
              dayIdx === 6 ? 'rounded-tr-lg' : '',
              dayIdx === daysCurrentMonth.length - 7 ? 'rounded-bl-lg' : '',
              dayIdx === daysCurrentMonth.length - 1 ? 'rounded-br-lg' : ''
            )}
          >
            {dayHasEvents(day, events) && (
              <div className="h-1.5 w-1.5 rounded-full bg-sky-400 absolute top-1 right-1" />
            )}
            <time
              dateTime={format(day, 'yyyy-MM-dd')}
              className={classNames(
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                isEqual(day, selectedDate) && isEqual(day, today) ? 'bg-indigo-600' : '',
                isEqual(day, selectedDate) && !isEqual(day, today) ? 'bg-gray-900' : ''
              )}
            >
              {format(day, 'd')}
            </time>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MiniCalendar
