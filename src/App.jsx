import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import EventPanel from './components/RoundTimeline'
import EventTabs from './components/EventTabs'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import eventsData from './data/events.js'

const initialEvent = eventsData[0]

function Timeline() {
  const [activeId, setActiveId] = useState(initialEvent?.id)
  const activeEvent = eventsData.find((event) => event.id === activeId) ?? initialEvent

  return (
    <main className='bg-[#16120e]/90 border border-[#d4af37]/35 ml-8 mr-8'>
      <section className="timeline-hero" id="timeline">
        <div className="eyebrow p-3"><span /> THE AGE OF LEGENDS <span /></div>
        <h1 className='text-center'>TIMELINE</h1>
        <p className="hero-subtitle text-center">THE JOURNEY OF CHAMPIONS</p>
        <div className="ornament"><i /><b>✦</b><i /></div>
        <p className="hero-copy text-center p-4">Three legendary events. Countless trials. One path to glory.</p>
      </section>

      <EventTabs events={eventsData} activeId={activeId} onChange={setActiveId} />
      <EventPanel
        key={activeEvent?.id}
        event={activeEvent}
        scrollOnMount={activeId !== initialEvent?.id}
      />

      <footer className="footer" id="codex">
        <div className="footer-line" />
        <span aria-hidden="true">✦</span>
        <span>THE CHRONICLE OF CHAMPIONS</span>
        <div className="footer-line" />
      </footer>
    </main>
  )
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <Homepage>
            <Timeline />
          </Homepage>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App