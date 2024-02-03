import React from "react";
import DndView from "@/components/calendar/dnd-view.tsx";

type ViewWeekProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewWeek: React.FC<ViewWeekProps> = ({ onAddEvent, onViewChange }) => (
  <DndView
    type="week"
    onAddEvent={onAddEvent}
    onViewChange={onViewChange}
  />
)

export default ViewWeek
