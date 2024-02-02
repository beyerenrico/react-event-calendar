import React, {useContext} from "react";
import { AppContext } from "../../providers/app-provider.tsx";
import ViewYear from "./view-year.tsx";
import ViewMonth from "./view-month.tsx";
import ViewWeek from "./view-week.tsx";
import ViewDay from "./view-day.tsx";

type ReactCalendarProps = {
  onAddEvent?: (options?: AddEventOptions) => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ReactCalendar: React.FC<ReactCalendarProps> = ({ onAddEvent, onViewChange }) => {
  const { currentView } = useContext(AppContext);
  let Slot;

  switch (currentView) {
    case 'year':
      Slot = () => <ViewYear onAddEvent={onAddEvent} onViewChange={onViewChange} />;
      break;
    case 'month':
      Slot = () => <ViewMonth onAddEvent={onAddEvent} onViewChange={onViewChange} />;
      break;
    case 'week':
      Slot = () => <ViewWeek onAddEvent={onAddEvent} onViewChange={onViewChange} />;
      break;
    case 'day':
      Slot = () => <ViewDay onAddEvent={onAddEvent} onViewChange={onViewChange} />;
      break;
    default:
      Slot = () => <ViewMonth onAddEvent={onAddEvent} onViewChange={onViewChange} />;
      break;
  }

  return (
    <div className='h-full'>
      <Slot />
    </div>
  )
}

export default ReactCalendar
