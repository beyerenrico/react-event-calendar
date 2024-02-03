import React from "react";
import {differenceInHours, format} from "date-fns";
import {round} from "@/helpers/utils.ts";
import {Draggable} from "@/components/hocs/Draggable.tsx";
import EventTile from "@/components/calendar/event-tile.tsx";
import {Droppable} from "@/components/hocs/Droppable.tsx";

type CalendarDroppableProps = {
  columnIndex: number;
  eventsOfDay: CalendarEvent[];
};

const CalendarDroppable: React.FC<CalendarDroppableProps> = ({ columnIndex, eventsOfDay }) => {
  return (
    <Droppable id={columnIndex} asChild>
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
}

export default CalendarDroppable
