import React, {Fragment, useContext, useMemo} from "react";
import {format} from "date-fns";
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon} from "@heroicons/react/20/solid";
import {Menu, Transition} from "@headlessui/react";
import _ from "lodash";
import {classNames} from "@/helpers/utils.ts";
import {AppContext} from "../../providers/app-provider.tsx";

type CalendarHeaderProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const CalendarHeader: React.FC<CalendarHeaderProps> = ({onAddEvent, onViewChange}) => {
  const {
    today,
    firstDayCurrentMonth,
    currentView,
    selectedDate,
    togglePreviousDay,
    togglePreviousWeek,
    togglePreviousMonth,
    togglePreviousYear,
    toggleNextDay,
    toggleNextWeek,
    toggleNextMonth,
    toggleNextYear,
    setSelectedDate,
    setCurrentMonth,
    setCurrentView
  } = useContext(AppContext);

  const handleViewChange = (view: 'year' | 'month' | 'week' | 'day') => {
    setCurrentView(view);
    onViewChange?.(view);
  }

  const toggleMapping = useMemo(() => ({
    day: {
      previous: togglePreviousDay,
      next: toggleNextDay,
    },
    week: {
      previous: togglePreviousWeek,
      next: toggleNextWeek,
    },
    month: {
      previous: togglePreviousMonth,
      next: toggleNextMonth,
    },
    year: {
      previous: togglePreviousYear,
      next: toggleNextYear,
    },
  }), [
    togglePreviousDay,
    toggleNextDay,
    togglePreviousWeek,
    toggleNextWeek,
    togglePreviousMonth,
    toggleNextMonth,
    togglePreviousYear,
    toggleNextYear,
  ]);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <Headline
        currentView={currentView}
        firstDayCurrentMonth={firstDayCurrentMonth}
        selectedDate={selectedDate}
      />
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            onClick={toggleMapping[currentView].previous}
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous {currentView}</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => {
              setSelectedDate(today);
              setCurrentMonth(format(today, 'MMM-yyyy'));
            }}
            type="button"
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            onClick={toggleMapping[currentView].next}
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next {currentView}</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button
              type="button"
              className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {_.capitalize(currentView)} view
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleViewChange('day')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        Day view
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleViewChange('week')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        Week view
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleViewChange('month')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        Month view
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => handleViewChange('year')}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        Year view
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            onClick={() => onAddEvent?.()}
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add event
          </button>
        </div>
        <Menu as="div" className="relative ml-6 md:hidden">
          <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onAddEvent?.()}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      Create event
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setSelectedDate(today);
                        setCurrentMonth(format(today, 'MMM-yyyy'));
                      }}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      Go to today
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleViewChange('day')}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      Day view
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleViewChange('week')}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      Week view
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleViewChange('month')}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      Month view
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleViewChange('year')}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm w-full text-left'
                      )}
                    >
                      Year view
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  )
}

type HeadlineProps = {
  currentView: 'year' | 'month' | 'week' | 'day';
  firstDayCurrentMonth: Date;
  selectedDate: Date;
}

const Headline = ({ currentView, firstDayCurrentMonth, selectedDate }: HeadlineProps) => {
  switch (currentView) {
    case 'day':
      return (
        <div>
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            <time dateTime={format(selectedDate, 'yyyy-MM-dd')} className="sm:hidden">
              {format(selectedDate, 'MMM dd, yyyy')}
            </time>
            <time dateTime={format(selectedDate, 'yyyy-MM-dd')} className="hidden sm:inline">
              {format(selectedDate, 'MMMM dd, yyyy')}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">{format(selectedDate, 'EEEE')}</p>
        </div>
      );
    case 'week':
    case 'month':
      return (
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime={format(firstDayCurrentMonth, 'yyyy-MM-dd')}>{format(firstDayCurrentMonth, 'MMMM yyyy')}</time>
        </h1>
      );
    case 'year':
      return (
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime={format(firstDayCurrentMonth, 'yyyy')}>{format(firstDayCurrentMonth, 'yyyy')}</time>
        </h1>
      );
  }
}

export default CalendarHeader
