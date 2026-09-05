import { useState } from 'react'
import './App.css'
import ContactUs from './components/ContactUs'
import EventTabs from './components/EventTabs'
import Register from './components/register'
import EventPanel from './components/RoundTimeline'
import eventsData from './data/events.js'

const initialEvent = eventsData[0]

function App() {
  const [activeId, setActiveId] = useState(initialEvent?.id)
  const activeEvent = eventsData.find((event) => event.id === activeId) ?? initialEvent

  return (
    <>
      <Register />
      <main className="page-shell">
      <div className="art-layer" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <section className="hero" id="top">
        <div className="eyebrow"><span /> THE AGE OF LEGENDS <span /></div>
        <h1>TIMELINE</h1>
        <p className="hero-subtitle">THE JOURNEY OF CHAMPIONS</p>
        <div className="ornament"><i /><b>✦</b><i /></div>
        <p className="hero-copy">Three legendary events. Countless trials. One path to glory.</p>
      </section>

      <EventTabs events={eventsData} activeId={activeId} onChange={setActiveId} />
      <EventPanel event={activeEvent} />

      <footer className="footer" id='codex'>
        <div className='footer-line' />
        <span aria-hidden="true">✦</span>
        <span>THE CHRONICLE OF CHAMPIONS </span>
        <div className='footer-line' />
      </footer>
      </main>
      <ContactUs />
    </>
  )
}

export default App
