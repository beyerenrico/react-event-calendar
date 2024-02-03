import React from "react";
import DndView from "@/components/calendar/dnd-view.tsx";

type ViewDayProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewDay: React.FC<ViewDayProps> = ({ onAddEvent, onViewChange }) => (
  <DndView
    type="day"
    onAddEvent={onAddEvent}
    onViewChange={onViewChange}
  />
)

export default ViewDay
