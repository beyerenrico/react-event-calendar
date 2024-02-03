import CalendarHeader from "./calendar-header.tsx";
import React, { useContext, useEffect, useState } from "react";
import { useWindowSize } from 'usehooks-ts'
import { AppContext } from "../../providers/app-provider.tsx";
import { differenceInHours, format, isEqual } from "date-fns";
import { round } from "@/helpers/utils.ts";
import { MediaQuery } from "@/enums/media-queries.ts";
import EventTile from "./event-tile.tsx";
import { Droppable } from "@/components/hocs/Droppable.tsx";
import { Draggable } from "@/components/hocs/Draggable.tsx";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import useDragAndDrop from "@/hooks/use-drag-and-drop.tsx";
import useCalendarLayout from "@/hooks/use-calendar-layout.tsx";
import VerticalLines from "@/components/calendar/week/vertical-lines.tsx";
import HorizontalLines from "@/components/calendar/week/horizontal-lines.tsx";
import TableHeader from "@/components/calendar/week/table-header.tsx";

type ViewWeekProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewWeek: React.FC<ViewWeekProps> = ({ onAddEvent, onViewChange }) => {
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
    <div className="flex h-full flex-col bg-gray-100">
      <CalendarHeader onAddEvent={onAddEvent} onViewChange={onViewChange} />
      <div ref={containerRef} className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <TableHeader />

          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1 relative z-20">
              <div ref={calendarRef} className="col-start-1 col-end-2 row-start-1 grid pr-8 grid-cols-1 sm:grid-cols-7 divide-y divide-gray-100 pointer-events-none z-10">
                <div ref={containerOffsetRef} className="row-end-1 col-start-1 col-end-[8] h-7 pointer-events-none"></div>
                <DndContext
                  onDragEnd={handleDragEnd}
                  modifiers={[snapToGrid, restrictToWindowEdges]}
                >
                  {items.map((eventsOfDay, columnIndex) => {
                    if (width < MediaQuery.sm) {
                      if (!isEqual(daysCurrentWeek[columnIndex], selectedDate)) {
                        return null;
                      }
                    }

                    return (
                      <Droppable key={`droppable-${columnIndex}`} id={columnIndex} asChild>
                        <ol
                          id={`droppable-${columnIndex}`}
                          className='grid row-span-full pointer-events-none'
                          style={{ gridTemplateRows: 'repeat(48, minmax(2.5rem, 1fr))' }}
                        >
                          {eventsOfDay.map((event) => {
                            const time = format(event.startDate, 'H.mm');
                            const roundedTime = time.includes('.30') ? round(Number(time), 0.5) : round(Number(time), 1);
                            const rowIndex = (roundedTime * 2) + 1;

                            return (
                              <Draggable key={event.title} id={event.title} asChild>
                                <li
                                  key={event.id}
                                  className="relative mt-px flex pointer-events-auto"
                                  style={{ gridRow: `${rowIndex} / span ${Number(differenceInHours(event.endDate, event.startDate)) * 2}` }}
                                >
                                  <EventTile event={event} />
                                </li>
                              </Draggable>
                            )
                          })}
                        </ol>
                      </Droppable>
                    )
                  })}
                </DndContext>
              </div>

              <VerticalLines />
              <HorizontalLines />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewWeek
