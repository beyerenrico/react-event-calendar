type ViewWeekProps = {
  onAddEvent?: () => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewWeek: React.FC<ViewWeekProps> = ({}) => {
  return (
    <div>
      ViewWeek
    </div>
  )
}

export default ViewWeek
