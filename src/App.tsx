import { useContext, useEffect } from "react";
import { AppContext } from "./providers/app-provider.tsx";
import ReactCalendar from "./components/calendar/react-calendar.tsx";

function App() {
  const { setEvents } = useContext(AppContext);

  useEffect(() => {
    setEvents([
      {
        id: '1',
        title: 'Comicon Düsseldorf',
        href: '#',
        startDate: new Date('2024-01-27 06:00:00'),
        endDate: new Date('2024-01-27 18:00:00')
      },
      {
        id: '2',
        title: 'Dokomi',
        href: '#',
        startDate: new Date('2024-01-31 06:00:00'),
        endDate: new Date('2024-01-31 14:00:00')
      },
      {
        id: '3',
        title: 'Kawaii Con',
        href: '#',
        startDate: new Date('2024-01-31 15:00:00'),
        endDate: new Date('2024-01-31 21:00:00')
      }
    ]);
  }, [setEvents]);

  return (
    <main className='w-full h-screen bg-slate-900 text-white flex justify-center items-center flex-col px-4 md:px-8 lg:px-24'>
      <h1 className='text-4xl font-bold mb-8'>React Event Calendar</h1>
      <div className='max-w-screen-lg w-full min-h-[700px] max-h-[900px] overflow-y-scroll rounded-md'>
        <ReactCalendar />
      </div>
    </main>
  )
}

export default App
