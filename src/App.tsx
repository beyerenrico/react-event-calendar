import ViewMonth from "./components/calendar/view-month.tsx";
import {useContext, useEffect} from "react";
import {AppContext} from "./providers/app-provider.tsx";

function App() {
  const {setEvents} = useContext(AppContext);

  useEffect(() => {
    setEvents([
      {
        id: '1',
        title: 'Comicon Düsseldorf',
        href: '#',
        date: new Date('2024-01-27')
      },
      {
        id: '2',
        title: 'Dokomi',
        href: '#',
        date: new Date('2024-01-31')
      },
      {
        id: '3',
        title: 'Kawaii Con',
        href: '#',
        date: new Date('2024-01-31')
      }
    ]);
  }, [setEvents]);

  return (
    <main className='w-full h-screen bg-slate-900 text-white flex justify-center items-center flex-col px-4 md:px-8 lg:px-24'>
      <h1 className='text-4xl font-bold mb-8'>React Event Calendar</h1>
      <div className='max-w-screen-lg w-full h-[600px]'>
        <ViewMonth />
      </div>
    </main>
  )
}

export default App
