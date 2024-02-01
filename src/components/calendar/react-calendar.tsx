import React, {useContext} from "react";
import { AppContext } from "../../providers/app-provider.tsx";
import ViewYear from "./view-year.tsx";
import ViewMonth from "./view-month.tsx";
import ViewWeek from "./view-week.tsx";
import ViewDay from "./view-day.tsx";

type ReactCalendarProps = {
  onAddEvent?: () => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ReactCalendar: React.FC<ReactCalendarProps> = ({ onAddEvent, onViewChange }) => {
  const { currentView } = useContext(AppContext);

  switch (currentView) {
    case 'year':
      return <ViewYear onAddEvent={onAddEvent} onViewChange={onViewChange} />;
    case 'month':
      return <ViewMonth onAddEvent={onAddEvent} onViewChange={onViewChange} />;
    case 'week':
      return <ViewWeek onAddEvent={onAddEvent} onViewChange={onViewChange} />;
    case 'day':
      return <ViewDay onAddEvent={onAddEvent} onViewChange={onViewChange} />;
    default:
      return <ViewMonth onAddEvent={onAddEvent} onViewChange={onViewChange} />;
  }
}

export default ReactCalendar
