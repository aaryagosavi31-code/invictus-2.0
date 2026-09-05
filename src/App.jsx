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
    <main className="page-shell">
      <div className="art-layer" aria-hidden="true" />

      <section className="timeline-hero" id="timeline">
        <div className="eyebrow"><span /> THE AGE OF LEGENDS <span /></div>
        <h1>TIMELINE</h1>
        <p className="hero-subtitle">THE JOURNEY OF CHAMPIONS</p>
        <div className="ornament"><i /><b>✦</b><i /></div>
        <p className="hero-copy">Three legendary events. Countless trials. One path to glory.</p>
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