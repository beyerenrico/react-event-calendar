import {format} from "date-fns";
import React from "react";

type EventTileProps = {
  event: CalendarEvent;
};

const EventTile: React.FC<EventTileProps> = ({ event }) => {
  return (
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
  )
}

export default EventTile
