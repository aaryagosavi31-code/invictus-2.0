import React, { useState } from "react";
import aristotleImg from "../assets/images/aristotle.png";
import athenaImg from "../assets/images/athena.png";
import hermesImg from "../assets/images/hermes.png";
import diogenesImg from "../assets/images/diogenes.png";
import socratesImg from "../assets/images/socrates.png";

const FAQ_ITEMS = [
  {
    q: "Is on-the-spot registration allowed?",
    a: "No. The gates to Mount Olympus close early. Registrations must be completed in advance; once mortal limits are met, the roster is sealed.",
    speaker: "Aristotle",
    title: "Master of Reason",
    avatar: aristotleImg,
  },
  {
    q: "Will I receive a participation certificate?",
    a: "Every worthy soul who steps onto the contest grounds and performs will receive an official digital laurel of participation.",
    speaker: "Athena",
    title: "Goddess of Wisdom & Strategy",
    avatar: athenaImg,
  },
  {
    q: "How will I know my event time and venue?",
    a: "Hermes shall deliver the edicts 24 hours prior via the council's official WhatsApp dispatch. Joining the assembly is mandatory.",
    speaker: "Hermes",
    title: "The Swift Messenger",
    avatar: hermesImg,
  },
  {
    q: "What if a teammate drops out after registration?",
    a: "Alert the High Council without delay. A replacement hero may take their post if sanctified prior to the dawn of day one.",
    speaker: "Diogenes",
    title: "The Cynic Philosopher",
    avatar: diogenesImg,
  },
  {
    q: "What kind of behavior can get someone disqualified?",
    a: "Hubris and dishonorable conduct invite swift exile. Poise, rhetoric, and sportsmanship are sacred. The Council's word is final.",
    speaker: "Socrates",
    title: "The Inquisitor of Truth",
    avatar: socratesImg,
  },
];

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V"];

export default function InvictusFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faq"
      className="min-h-screen text-[#ede4d1] font-['Libre_Baskerville',serif] flex justify-center items-center px-4 py-14 bg-[radial-gradient(circle_at_50%_15%,rgba(212,175,55,0.12),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(45,30,15,0.5),transparent_70%)]"
    >
      <div className="w-full max-w-[820px] bg-[#16120e]/90 border border-[#d4af37]/35 rounded-sm p-6 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md">
        
        {/* ================= HEADER ================= */}
        <header className="text-center mb-6">
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-[2.6rem] tracking-[4px] uppercase text-[#d4af37] drop-shadow-[0_0_18px_rgba(212,175,55,0.35)] mb-2 font-bold">
            The Oracle’s Decrees
          </h1>
          <p className="font-cinzel text-xs sm:text-sm tracking-[5px] text-[#b8ab96]">
            WISDOM&nbsp;&nbsp;·&nbsp;&nbsp;RHETORIC&nbsp;&nbsp;·&nbsp;&nbsp;TRIUMPH
          </p>

          <div className="flex items-center justify-center mt-4">
            <span className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent to-[#d4af37]/35" />
            <span className="mx-3.5 text-lg text-[#d4af37]">🏛</span>
            <span className="h-px flex-1 max-w-[140px] bg-gradient-to-l from-transparent to-[#d4af37]/35" />
          </div>
        </header>

        {/* ================= BULLETIN LABEL ================= */}
        <div className="font-cinzel text-[11px] sm:text-xs tracking-[3px] text-center text-[#997f3d] border-y border-[#d4af37]/15 py-2 mb-4 uppercase">
          DECREES OF OLYMPUS — FREQUENTLY ASKED QUESTIONS
        </div>

        <p className="text-center text-sm sm:text-base text-[#b8ab96] leading-relaxed max-w-[620px] mx-auto mb-9 italic">
          Before taking the arena at INVICTUS 2.0, seek the council of the Agora.
          Tap any query to consult the philosophers and deities.
        </p>

        {/* ================= FAQ ACCORDION ================= */}
        <main className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <section
                key={index}
                className={`border rounded-sm transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#d4af37] bg-[#120e0a]/90 shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
                    : "border-[#d4af37]/25 bg-[#0a0806]/65 hover:border-[#d4af37] hover:shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Question Row */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-3 sm:gap-4 pr-3">
                    <span className="font-cinzel text-base font-bold text-[#d4af37] min-w-[28px]">
                      {ROMAN_NUMERALS[index] || index + 1}
                    </span>
                    <span className="font-cinzel text-sm sm:text-base tracking-[0.8px] text-[#ede4d1]">
                      {item.q}
                    </span>
                  </span>
                  <span className="text-[#d4af37] text-sm shrink-0 transition-transform">
                    {isOpen ? "✕" : "✦"}
                  </span>
                </button>

                {/* Speaker Avatar & Dialogue Row */}
                <div className="flex items-start gap-4 px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-label={`Consult ${item.speaker}`}
                    className="p-0 border-0 bg-transparent cursor-pointer shrink-0"
                  >
                    <img
                      src={item.avatar}
                      alt={item.speaker}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#d4af37] bg-[#1e1913] object-cover shadow-[0_0_10px_rgba(212,175,55,0.25)] hover:scale-105 hover:brightness-110 transition-all duration-200"
                    />
                  </button>

                  {!isOpen ? (
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="text-left font-cinzel text-xs tracking-[1.8px] text-[#997f3d] hover:text-[#d4af37] pt-3.5 transition-colors cursor-pointer"
                    >
                      SEEK COUNSEL FROM {item.speaker.toUpperCase()} →
                    </button>
                  ) : (
                    <div className="flex-1">
                      <div className="bg-[#17130f] border border-[#d4af37]/30 p-4 rounded-sm shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
                        <p className="text-sm sm:text-base leading-relaxed text-[#ede4d1] mb-3">
                          {item.a}
                        </p>
                        <div className="flex flex-col items-end border-t border-[#d4af37]/15 pt-2">
                          <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-[1.5px] text-[#d4af37]">
                            — {item.speaker}
                          </span>
                          <span className="text-[11px] sm:text-xs text-[#b8ab96] italic">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="text-center mt-10">
          <div className="text-[#d4af37] text-lg tracking-[8px] mb-1">
            𐡸 🏛 𐡹
          </div>
          <p className="font-cinzel text-xs sm:text-sm tracking-[2px] text-[#997f3d]">
            #eXpressToInspire
          </p>
        </footer>

      </div>
    </div>
  );
}