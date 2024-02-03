const VerticalLines = () => (
  <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7 pointer-events-none">
    {Array.from({ length: 7 }).map((_, index) => (
      <div key={index} className={`col-start-${index + 1} row-span-full`} />
    ))}
    <div className="col-start-8 row-span-full w-8" />
  </div>
)

export default VerticalLines
