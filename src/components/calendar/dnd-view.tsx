import React from "react";
import CalendarHeader from "./calendar-header.tsx";
import CalendarTrack from "@/components/calendar/calendar-track.tsx";

type DndViewProps = {
  type: "day" | "week";
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewDay: React.FC<DndViewProps> = ({ type, onAddEvent, onViewChange }) => {
  return (
    <div className="flex h-full flex-col bg-gray-100 rounded-md">
      <CalendarHeader onAddEvent={onAddEvent} onViewChange={onViewChange} />
      <CalendarTrack type={type} />
    </div>
  )
}

export default ViewDay
