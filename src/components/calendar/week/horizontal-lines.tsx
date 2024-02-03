const HorizontalLines = () => (
  <div
    className="grid absolute inset-0 divide-y divide-gray-100 pointer-events-none"
    style={{ gridTemplateRows: '1.75rem repeat(48, minmax(0, 1fr)) auto' }}
  >
    <div />
    {Array.from({ length: 48 }).map((_, rowIndex) => (
      <div key={rowIndex} className="relative">
        {rowIndex % 2 === 0 && (
          <div className="absolute left-0 z-20 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
            {rowIndex / 2}:00
          </div>
        )}
      </div>
    ))}
  </div>
);

export default HorizontalLines;
