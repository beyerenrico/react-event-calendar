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
      },
      {
        id: '4',
        title: 'Random Event',
        href: '#',
        startDate: new Date('2024-02-01 10:00:00'),
        endDate: new Date('2024-02-01 14:00:00')
      },
      {
        id: '5',
        title: 'Other Random Event',
        href: '#',
        startDate: new Date('2024-02-01 08:00:00'),
        endDate: new Date('2024-02-01 11:00:00')
      },
      {
        id: '6',
        title: 'Yet another Random Event',
        href: '#',
        startDate: new Date('2024-02-01 07:00:00'),
        endDate: new Date('2024-02-01 15:00:00')
      },
      {
        id: '7',
        title: 'Yeeeeet!!',
        href: '#',
        startDate: new Date('2024-02-01 14:00:00'),
        endDate: new Date('2024-02-01 16:00:00')
      }
    ]);
  }, [setEvents]);

  const handleAddEvent = (options?: AddEventOptions) => {
    console.log('Add event', options);
  };

  return (
    <main className='w-full h-screen bg-slate-900 text-white flex justify-center items-center flex-col px-4 md:px-8 lg:px-24'>
      <h1 className='text-4xl font-bold mb-8'>React Event Calendar</h1>
      <div className='max-w-screen-xl w-full min-h-[700px] max-h-[900px] overflow-y-scroll rounded-md'>
        <ReactCalendar onAddEvent={handleAddEvent} />
      </div>
    </main>
  )
}

export default App
