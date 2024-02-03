import {useContext} from "react";
import {AppContext} from "@/providers/app-provider.tsx";
import {format, isEqual} from "date-fns";
import {classNames} from "@/helpers/utils.ts";

const TableHeader = () => {
  const {
    today,
    selectedDate,
    daysCurrentWeek,
    containerNavRef,
    setSelectedDate,
  } = useContext(AppContext);

  return (
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
  )
}

export default TableHeader
