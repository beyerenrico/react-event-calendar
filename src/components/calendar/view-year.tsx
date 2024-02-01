import React, { useContext } from 'react';
import { classNames } from "../../helpers/utils.ts";
import { AppContext } from "../../providers/app-provider.tsx";
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameMonth, startOfWeek } from "date-fns";
import CalendarHeader from "./calendar-header.tsx";

type ViewYearProps = {
  onAddEvent?: () => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewYear: React.FC<ViewYearProps> = ({ onAddEvent, onViewChange }) => {
  const {
    today,
    monthsCurrentYear,
    setCurrentMonth,
    setCurrentView,
    setSelectedDate
  } = useContext(AppContext);
  const daysOfMonthsCurrentYear = monthsCurrentYear.map(month => {
    return {
      firstDayOfMonth: month,
      days: eachDayOfInterval({
        start: startOfWeek(month, { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
      })
    }
  });

  const handleViewChange = (view: 'year' | 'month' | 'week' | 'day') => {
    setCurrentView(view);
    onViewChange?.(view);
  }

  return (
    <div className='bg-gray-100 rounded-md'>
      <CalendarHeader onAddEvent={onAddEvent} onViewChange={onViewChange} />
      <div className="bg-white">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
          {daysOfMonthsCurrentYear.map((month, id) => (
            <section key={id} className="text-center">
              <h2 className="text-sm font-semibold text-gray-900">{format(new Date(1970, id, 1), 'MMMM')}</h2>
              <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
              <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                {month.days.map((day, dayIdx) => (
                  <button
                    onClick={() => {
                      setCurrentMonth(format(day, 'MMM-yyyy'));
                      setSelectedDate(day);
                      handleViewChange('month');
                    }}
                    key={dayIdx}
                    type="button"
                    className={classNames(
                      isSameMonth(day, month.firstDayOfMonth) ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400',
                      dayIdx === 0 ? 'rounded-tl-lg' : '',
                      dayIdx === 6 ? 'rounded-tr-lg' : '',
                      dayIdx === month.days.length - 7 ? 'rounded-bl-lg' : '',
                      dayIdx === month.days.length - 1 ? 'rounded-br-lg' : '',
                      'py-1.5 hover:bg-gray-100 focus:z-10'
                    )}
                  >
                    <time
                      dateTime={format(day, 'yyyy-MM-dd')}
                      className={classNames(
                        isEqual(day, today) ? 'bg-indigo-600 font-semibold text-white' : '',
                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full'
                      )}
                    >
                      {format(day, 'd')}
                    </time>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewYear
