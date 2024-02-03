import TableHeader from "@/components/calendar/week/table-header.tsx";
import {DndContext} from "@dnd-kit/core";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";
import {MediaQuery} from "@/enums/media-queries.ts";
import {isEqual} from "date-fns";
import CalendarDroppable from "@/components/calendar/calendar-droppable.tsx";
import VerticalLines from "@/components/calendar/week/vertical-lines.tsx";
import HorizontalLines from "@/components/calendar/week/horizontal-lines.tsx";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/providers/app-provider.tsx";
import {useWindowSize} from "usehooks-ts";
import useCalendarLayout from "@/hooks/use-calendar-layout.tsx";
import useDragAndDrop from "@/hooks/use-drag-and-drop.tsx";
import MiniCalendar from "@/components/calendar/mini-calendar.tsx";
import {cn} from "@/lib/utils.ts";

type CalendarTrackProps = {
  type: 'week' | 'day';
};

const CalendarTrack: React.FC<CalendarTrackProps> = ({ type }) => {
  const {
    selectedDate,
    daysCurrentWeek,
    eventsCurrentWeekSortedByDay,
    containerRef,
    containerOffsetRef,
    calculateTrackPosition,
  } = useContext(AppContext);
  const { width} = useWindowSize();
  const [items, setItems] = useState<CalendarEvent[][]>(eventsCurrentWeekSortedByDay);
  const { calendarRef, gridCellWidth, gridCellHeight } = useCalendarLayout();
  const { handleDragEnd, snapToGrid } = useDragAndDrop(items, setItems, gridCellWidth, gridCellHeight, daysCurrentWeek);

  useEffect(() => {
    calculateTrackPosition();
  }, [calculateTrackPosition])

  return (
    <div className="isolate flex flex-auto overflow-hidden bg-white">
      <div ref={containerRef} className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          {type === "week" && <TableHeader />}

          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1 relative z-20">
              <div ref={calendarRef} className={cn(
                type === "week" && "sm:grid-cols-7",
                "col-start-1 col-end-2 row-start-1 grid pr-8 grid-cols-1 divide-y divide-gray-100 pointer-events-none z-10"
              )}>
                <div ref={containerOffsetRef} className="row-end-1 col-start-1 col-end-[8] h-7 pointer-events-none"></div>
                <DndContext
                  onDragEnd={handleDragEnd}
                  modifiers={[snapToGrid, restrictToWindowEdges]}
                >
                  {items.map((eventsOfDay, columnIndex) => {
                    if (type === "week") {
                      if (width < MediaQuery.sm && type) {
                        if (!isEqual(daysCurrentWeek[columnIndex], selectedDate)) {
                          return null;
                        }
                      }
                    } else {
                      if (!isEqual(daysCurrentWeek[columnIndex], selectedDate)) {
                        return null;
                      }
                    }

                    return (
                      <CalendarDroppable
                        key={`droppable-${columnIndex}`}
                        columnIndex={columnIndex}
                        eventsOfDay={eventsOfDay}
                      />
                    )
                  })}
                </DndContext>
              </div>

              {type === "week" && <VerticalLines />}
              <HorizontalLines />
            </div>
          </div>
        </div>
      </div>
      {type === "day" && <MiniCalendar />}
    </div>
  )
}

export default CalendarTrack
