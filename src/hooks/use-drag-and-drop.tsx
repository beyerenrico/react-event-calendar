import React, { useCallback } from 'react';
import { DragEndEvent, Modifier } from '@dnd-kit/core';
import { add, differenceInHours, differenceInMinutes } from 'date-fns';

type UseDragAndDropProps = (
  items: CalendarEvent[][],
  setItems: React.Dispatch<React.SetStateAction<CalendarEvent[][]>>,
  gridCellWidth: () => number,
  gridCellHeight: () => number,
  daysCurrentWeek: Date[],
) => {
  handleDragEnd: (event: DragEndEvent) => void;
  snapToGrid: Modifier;
};

const useDragAndDrop: UseDragAndDropProps = (
  items,
  setItems,
  gridCellWidth,
  gridCellHeight,
  daysCurrentWeek
) => {
  const snapToGrid: Modifier = useCallback((args) => {
    const { transform } = args;
    return {
      ...transform,
      x: Math.ceil(transform.x / gridCellWidth()) * gridCellWidth(),
      y: Math.ceil(transform.y / gridCellHeight()) * gridCellHeight(),
    };
  }, [gridCellWidth, gridCellHeight]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over, delta: { x, y } } = event;

    if (!over) return;

    const activeIndex = items.findIndex((item) => item.some((i) => i.title === active.id));
    const activeEvent = items[activeIndex]?.find((i) => i.title === active.id);
    if (!activeEvent) return;

    const initialDayIndex = daysCurrentWeek.findIndex((day) => day.toDateString() === activeEvent.startDate.toDateString());
    const hourDiff = differenceInHours(activeEvent.endDate, activeEvent.startDate);
    const minuteDiff = differenceInMinutes(activeEvent.endDate, activeEvent.startDate) - hourDiff * 60;

    // Calculate new positions
    const horizontalMoveDistance = x / gridCellWidth();
    const verticalMoveDistance = y / gridCellHeight();
    const newDayIndex = initialDayIndex + Math.round(horizontalMoveDistance);
    if (newDayIndex < 0 || newDayIndex >= daysCurrentWeek.length) return; // Boundary check

    const newStartDate = add(activeEvent.startDate, { days: Math.round(horizontalMoveDistance), minutes: Math.round(verticalMoveDistance) * 30 });
    const newEndDate = add(newStartDate, { hours: hourDiff, minutes: minuteDiff });

    // Update the event with new start and end dates
    const updatedEvent = { ...activeEvent, startDate: newStartDate, endDate: newEndDate };
    const newItems = [...items];
    newItems[activeIndex] = newItems[activeIndex].filter((i) => i.title !== active.id);
    newItems[newDayIndex].push(updatedEvent);

    setItems(newItems);
  }, [daysCurrentWeek, gridCellWidth, gridCellHeight, items, setItems]);

  return { handleDragEnd, snapToGrid };
};

export default useDragAndDrop;
