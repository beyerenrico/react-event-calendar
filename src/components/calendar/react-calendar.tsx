import React, { useContext } from "react";
import { AppContext } from "../../providers/app-provider.tsx";
import ViewYear from "./view-year.tsx";
import ViewMonth from "./view-month.tsx";
import ViewWeek from "./view-week.tsx";
import ViewDay from "./view-day.tsx";

type ReactCalendarProps = {};

const ReactCalendar: React.FC<ReactCalendarProps> = ({}) => {
  const { currentView } = useContext(AppContext);

  switch (currentView) {
    case 'year':
      return <ViewYear />;
    case 'month':
      return <ViewMonth />;
    case 'week':
      return <ViewWeek />;
    case 'day':
      return <ViewDay />;
    default:
      return <ViewMonth />;
  }
}

export default ReactCalendar
