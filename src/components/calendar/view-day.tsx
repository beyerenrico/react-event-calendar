type ViewDayProps = {
  onAddEvent?: () => void;
  onViewChange?: (view: 'year' | 'month' | 'week' | 'day') => void;
};

const ViewDay: React.FC<ViewDayProps> = ({}) => {
  return (
    <div>
      ViewDay
    </div>
  )
}

export default ViewDay
