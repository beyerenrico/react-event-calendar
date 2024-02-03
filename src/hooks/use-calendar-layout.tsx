import React, { useCallback, useRef, useState, useEffect } from 'react';

type UseCalendarLayout = () => {
  calendarRef: React.MutableRefObject<HTMLDivElement | null>;
  gridCellWidth: () => number;
  gridCellHeight: () => number;
};

const useCalendarLayout: UseCalendarLayout = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (calendarRef.current) {
        setDimensions({
          width: calendarRef.current.offsetWidth,
          height: calendarRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Initial call

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const gridCellWidth = useCallback(() => {
    return dimensions.width ? (dimensions.width - 32 - 1) / 7 : 0;
  }, [dimensions.width]);

  const gridCellHeight = useCallback(() => {
    return dimensions.height ? (dimensions.height - 28 - 1) / 48 : 0;
  }, [dimensions.height]);

  return { calendarRef, gridCellWidth, gridCellHeight };
};

export default useCalendarLayout;
