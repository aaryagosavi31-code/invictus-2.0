import { useEffect, useRef, useState } from "react";
import eventsData from "../data/events.js";
import chamberBg from "../assets/prizepool.jpg";

const TIERS = [
  { rank: "1ST", numeral: "I", amount: "7000" },
  { rank: "2ND", numeral: "II", amount: "4500" },
  { rank: "3RD", numeral: "III", amount: "2500" },
];

const ROMAN = ["I", "II", "III"];
const CH_STARTS = [0.12, 0.42, 0.7];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* Hand-drawn laurel branch, generated along a bezier so it feels engraved, not stock */
function Laurel({ flip = false, className = "" }) {
  const p0 = { x: 112, y: 56 };
  const p1 = { x: 74, y: 40 };
  const p2 = { x: 36, y: 8 };
  const leaves = [];
  const N = 9;
  for (let i = 0; i < N; i++) {
    const t = 0.12 + (i / (N - 1)) * 0.78;
    const x = (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
    const y = (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
    const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
    const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const side = i % 2 ? 34 : -34;
    const s = 1 - t * 0.35;
    leaves.push({ x, y, rot: ang + side, rx: 7 * s, ry: 2.8 * s });
  }
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M112 56 C74 40 48 26 36 8"
        fill="none"
        stroke="#a87d2b"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx={l.rx}
          ry={l.ry}
          fill={i % 2 ? "#c9a045" : "#a87d2b"}
          opacity={i % 2 ? 0.95 : 0.8}
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
        />
      ))}
    </svg>
  );
}

export default function PrizePool() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const sectionRef = useRef(null);
  const runwayRef = useRef(null);
  const sceneRef = useRef(null);
  const chamberRef = useRef(null);
  const dimRef = useRef(null);
  const liveRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  /* Entrance reveal for the intro composition */
  useEffect(() => {
    if (reduced) return undefined;
    const section = sectionRef.current;
    if (!section) return undefined;
    const revealEls = section.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  /* Pinned scrub engine: scroll position is the playhead, fully reversible */
  useEffect(() => {
    if (reduced) return undefined;
    const runway = runwayRef.current;
    const scene = sceneRef.current;
    const live = liveRef.current;
    if (!runway || !scene || !live) return undefined;

    const intro = scene.querySelector(".prizes__intro");
    const chamber = chamberRef.current;
    const dim = dimRef.current;
    const cards = Array.from(scene.querySelectorAll(".prize-card"));
    const rows = cards.map((c) => Array.from(c.querySelectorAll(".prize-row")));
    const finale = scene.querySelector(".prizes__finale");
    const cue = scene.querySelector(".prizes__cue");
    const backdrop = scene.querySelector(".prizes__backdrop");
    const backdropNum = scene.querySelector(".prizes__backdrop b");
    const dots = Array.from(scene.querySelectorAll(".prizes__pin"));
    let lastActive = -2;
    let ticking = false;
    let frame = 0;

    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const smooth = (t) => t * t * (3 - 2 * t);

    const apply = (p) => {
      const seg = (a, b) => clamp01((p - a) / (b - a));

      const io = smooth(seg(0.06, 0.13));
      if (intro) {
        intro.style.opacity = (1 - io).toFixed(3);
        intro.style.transform = `translateY(${(-38 * io).toFixed(2)}px) scale(${(1 - 0.05 * io).toFixed(4)})`;
      }
      if (chamber) {
        chamber.style.transform = `translateY(${((p - 0.5) * 18).toFixed(2)}px) scale(1.06)`;
      }
      if (dim) dim.style.opacity = (smooth(seg(0.93, 1)) * 0.4).toFixed(3);

      let active = -1;
      let activeVis = 0.35;
      CH_STARTS.forEach((s, i) => {
        const last = i === CH_STARTS.length - 1;
        const e = smooth(seg(s, s + 0.06));
        const exitA = last ? 0.9 : s + 0.24;
        const exitB = last ? 0.96 : s + 0.3;
        const x = smooth(seg(exitA, exitB));
        const vis = e * (1 - x);
        const card = cards[i];
        if (card) {
          card.style.opacity = vis.toFixed(3);
          card.style.transform = `translateY(${((1 - e) * 46 - x * 42).toFixed(2)}px) scale(${(0.962 + 0.038 * e + 0.026 * x).toFixed(4)})`;
        }
        rows[i]?.forEach((row, t) => {
          const r = smooth(seg(s + 0.06 + 0.04 * t, s + 0.1 + 0.04 * t));
          row.style.opacity = r.toFixed(3);
          row.style.transform = `translateY(${(14 * (1 - r)).toFixed(2)}px)`;
        });
        if (vis > activeVis) {
          activeVis = vis;
          active = i;
        }
      });

      const fin = smooth(seg(0.9, 0.97));
      if (finale) {
        finale.style.opacity = fin.toFixed(3);
        finale.style.transform = `translateY(${(26 * (1 - fin)).toFixed(2)}px)`;
      }
      if (cue) {
        const c = 1 - smooth(seg(0.012, 0.05));
        cue.style.opacity = c.toFixed(3);
        cue.style.visibility = c < 0.05 ? "hidden" : "visible";
      }
      if (backdrop) {
        const bOn = active < 0 ? 0 : Math.min(1, activeVis / 0.9);
        backdrop.style.opacity = (bOn * 0.5).toFixed(3);
      }

      if (active !== lastActive) {
        dots.forEach((d, di) => {
          d.classList.toggle("is-on", di === active);
          if (di === active) d.setAttribute("aria-current", "true");
          else d.removeAttribute("aria-current");
        });
        if (backdropNum) backdropNum.textContent = active < 0 ? "" : ROMAN[active];
        live.textContent =
          active < 0
            ? p > 0.9
              ? "The spoils are yours"
              : "Prize pool — the spoils of war"
            : `Chapter ${ROMAN[active]} — ${eventsData[active].name}`;
        lastActive = active;
      }
    };

    const tick = () => {
      ticking = false;
      const r = runway.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp01(-r.top / total) : 0;
      apply(p);
    };
    const request = () => {
      if (!ticking) {
        ticking = true;
        frame = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    request();
    document.fonts?.ready?.then(request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const jumpToChapter = (i) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const r = runway.getBoundingClientRect();
    const total = Math.max(0, r.height - window.innerHeight);
    window.scrollTo({
      top: window.scrollY + r.top + CH_STARTS[i] * total + 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const renderCard = (event, i) => (
    <article
      key={event.id}
      className={`prize-card prize-card--tilt-${i % 3}`}
      aria-label={`Challenge ${ROMAN[i]} — ${event.name}: ${event.genre}. 1st prize up to ₹7000, 2nd prize up to ₹4500, 3rd prize up to ₹2500.`}
    >
      <div className="prize-card__parch">
        <div className="prize-card__skin" aria-hidden="true" />
        <div className="prize-card__inner">
          <p className="prize-card__num">CHALLENGE {ROMAN[i]}</p>
          <h3 className="prize-card__name">{event.name}</h3>
          <p className="prize-card__genre">{event.genre}</p>
          <div className="prize-card__rule" aria-hidden="true">
            <i /> ✦ <i />
          </div>
          <ul className="prize-card__tiers">
            {TIERS.map((tier, ti) => (
              <li key={tier.rank} className={`prize-row prize-row--${ti + 1}`}>
                <span className="prize-row__medal" aria-hidden="true">
                  {tier.numeral}
                </span>
                <span className="prize-row__body">
                  <span className="prize-row__label">
                    {ti === 0 ? "✦ " : ""}
                    {tier.rank} PRIZE
                  </span>
                  <strong className="prize-row__amount">
                    <em>Up to</em> <span className="prize-row__sum">₹{tier.amount}</span>
                  </strong>
                </span>
              </li>
            ))}
          </ul>
          <svg className="prize-card__meander" aria-hidden="true">
            <rect width="100%" height="14" fill="url(#prize-meander)" />
          </svg>
        </div>
      </div>
    </article>
  );

  const renderIntro = (withReveal, showCopy) => (
    <header className="prizes__intro">
      <span className="prizes__halo" aria-hidden="true" />
      <p
        className="prizes__eyebrow"
        data-reveal={withReveal || undefined}
        style={withReveal ? { "--d": "0s" } : undefined}
      >
        <i /> ✦ THE SPOILS OF WAR ✦ <i />
      </p>
      <p
        className="prizes__total"
        data-reveal={withReveal || undefined}
        style={withReveal ? { "--d": "0.1s" } : undefined}
      >
        ₹40,000<span aria-hidden="true">+</span>
      </p>
      <h2
        id="prizepool-title"
        className="prizes__title"
        data-reveal={withReveal || undefined}
        style={withReveal ? { "--d": "0.22s" } : undefined}
      >
        PRIZE POOL
      </h2>
      <p
        className="prizes__subtitle"
        data-reveal={withReveal || undefined}
        style={withReveal ? { "--d": "0.32s" } : undefined}
      >
        WHERE THE VICTORS ARE CROWNED
      </p>
      <p
        className="prizes__facts"
        data-reveal={withReveal || undefined}
        style={withReveal ? { "--d": "0.42s" } : undefined}
      >
        3 CHALLENGES • 9 LAURELS • CASH + IN-KIND REWARDS
      </p>
      <div
        className="prizes__laurels"
        data-reveal={withReveal || undefined}
        style={withReveal ? { "--d": "0.5s" } : undefined}
        aria-hidden="true"
      >
        <Laurel className="prizes__laurel" />
        <span className="prizes__star">✦</span>
        <Laurel flip className="prizes__laurel" />
      </div>
      {showCopy && (
        <p className="prizes__copy">
          The trials end. The tributes begin. Nine laurels await across three
          arenas of legend — claim your place in the annals of INVICTUS.
        </p>
      )}
    </header>
  );

  if (reduced) {
    return (
      <section
        id="prizepool"
        ref={sectionRef}
        className="prizes prizes--static"
        aria-labelledby="prizepool-title"
      >
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <pattern id="prize-meander" width="18" height="14" patternUnits="userSpaceOnUse">
              <path d="M1 13 V1 H17 V9 H9 V5 H13" fill="none" stroke="#7a5a20" strokeWidth="1.4" />
            </pattern>
          </defs>
        </svg>
        <div className="prizes__handoff" aria-hidden="true" />
        <div className="prizes__staticwrap">
          {renderIntro(false, true)}
          {eventsData.map((event, i) => renderCard(event, i))}
          <p className="prizes__note">
            <span aria-hidden="true">✦</span> Prize values include both cash and
            in-kind rewards. <span aria-hidden="true">✦</span>
          </p>
        </div>
        <div className="ornament prizes__outro" aria-hidden="true">
          <i />
          <b>✦</b>
          <i />
        </div>
        <style>{STATIC_STYLES}</style>
      </section>
    );
  }

  return (
    <section
      id="prizepool"
      ref={sectionRef}
      className="prizes"
      aria-labelledby="prizepool-title"
    >
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <pattern id="prize-meander" width="18" height="14" patternUnits="userSpaceOnUse">
            <path d="M1 13 V1 H17 V9 H9 V5 H13" fill="none" stroke="#7a5a20" strokeWidth="1.4" />
          </pattern>
        </defs>
      </svg>

      <div className="prizes__handoff" aria-hidden="true" />

      <div className="prizes__runway" ref={runwayRef}>
        <div className="prizes__sticky" ref={sceneRef}>
          <div className="prizes__chamber" ref={chamberRef} aria-hidden="true" />
          <div className="prizes__dim" ref={dimRef} aria-hidden="true" />

          <div className="prizes__frame" aria-hidden="true">
            <span className="panel-corner top-left" />
            <span className="panel-corner top-right" />
            <span className="panel-corner bottom-left" />
            <span className="panel-corner bottom-right" />
          </div>

          <div className="prizes__column prizes__column--left" aria-hidden="true" />
          <div className="prizes__column prizes__column--right" aria-hidden="true" />

          <div className="prizes__specks" aria-hidden="true">
            {[18, 32, 55, 68, 80, 92].map((left, i) => (
              <span
                key={left}
                className="prizes__speck"
                style={{
                  left: `${left}%`,
                  top: `${18 + (i % 3) * 22}%`,
                  animationDelay: `${i * 2.1}s`,
                  animationDuration: `${10 + (i % 4) * 2.5}s`,
                }}
              />
            ))}
          </div>

          <p className="prizes__backdrop" aria-hidden="true">
            <b>I</b>
          </p>

          <div className="prizes__stage">
            {renderIntro(true, false)}

            {eventsData.map((event, i) => renderCard(event, i))}

            <div className="prizes__finale">
              <div className="prizes__laurels" aria-hidden="true">
                <Laurel className="prizes__laurel" />
                <span className="prizes__star">✦</span>
                <Laurel flip className="prizes__laurel" />
              </div>
              <h3 className="prizes__finale-title">THE SPOILS ARE YOURS</h3>
              <p className="prizes__finale-sub">LET THE AGORA DECIDE YOUR LEGEND</p>
              <p className="prizes__note">
                <span aria-hidden="true">✦</span> Prize values include both cash and
                in-kind rewards. <span aria-hidden="true">✦</span>
              </p>
            </div>
          </div>

          <p className="prizes__cue" aria-hidden="true">
            <span className="prizes__cue-top">DESCEND INTO THE SPOILS</span>
            <span className="prizes__cue-arrow">↓</span>
            <span className="prizes__cue-scroll">SCROLL</span>
          </p>

          <aside className="prizes__compass" aria-label="Prize pool chapters">
            <ol className="prizes__pins">
              {eventsData.map((event, i) => (
                <li key={event.id}>
                  <button
                    type="button"
                    className="prizes__pin"
                    aria-label={`Chapter ${ROMAN[i]} — ${event.name}`}
                    onClick={() => jumpToChapter(i)}
                  >
                    <i aria-hidden="true">{ROMAN[i]}</i>
                    <span aria-hidden="true">{event.name}</span>
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <p ref={liveRef} className="prizes__sr" aria-live="polite">
            Prize pool — the spoils of war
          </p>
        </div>
      </div>

      <div className="ornament prizes__outro" aria-hidden="true">
        <i />
        <b>✦</b>
        <i />
      </div>

      <style>{PINNED_STYLES}</style>
    </section>
  );
}

const SHARED_STYLES = `
  .prizes {
    position: relative;
    padding: 0 0 8px;
    color: #e9dfc8;
    background: linear-gradient(180deg, #120d08 0%, #191208 40%, #150e08 88%, #110c07 100%);
  }
  .prizes__handoff {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 96px;
    z-index: 3;
    background: linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.55));
  }

  .prizes [data-reveal] { opacity: 0; transform: translateY(26px); }
  .prizes [data-reveal].is-inview {
    opacity: 1;
    transform: none;
    animation: prize-rise 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) backwards;
    animation-delay: var(--d, 0s);
  }
  @keyframes prize-rise {
    from { opacity: 0; transform: translateY(26px); }
  }

  .prizes__eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin: 0;
    color: #d2a647;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.34em;
  }
  .prizes__eyebrow i { width: 56px; height: 1px; background: linear-gradient(90deg, transparent, #73541e); }
  .prizes__eyebrow i:last-child { background: linear-gradient(90deg, #73541e, transparent); }
  .prizes__laurels { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 16px 0 4px; }
  .prizes__laurel { width: clamp(64px, 9vw, 108px); height: auto; opacity: 0.9; }
  .prizes__star { color: #d4af37; font-size: 15px; }
  .prizes__title {
    margin: 4px 0 10px;
    font-family: 'Cinzel', Georgia, serif;
    font-weight: 700;
    font-size: clamp(30px, 6vw, 52px);
    letter-spacing: 0.12em;
    color: #ead295;
    text-shadow: 0 3px 0 rgba(85, 64, 29, 0.35), 0 0 26px rgba(229, 174, 62, 0.18);
  }
  .prizes__subtitle {
    margin: 0 0 12px;
    color: #d4ad58;
    font-size: clamp(9px, 1.5vw, 12px);
    font-weight: 700;
    letter-spacing: 0.44em;
  }
  .prizes__copy {
    max-width: 54ch;
    margin: 0 auto;
    padding: 0 16px;
    color: #dbd0bd;
    font-size: 14px;
    line-height: 1.7;
  }

  .prize-card {
    --torn: polygon(
      0% 2.4%, 3% 1.1%, 8% 2.6%, 13% 0.9%, 19% 2.5%, 25% 1%, 31% 2.7%, 38% 1.2%,
      45% 2.6%, 52% 0.9%, 59% 2.5%, 66% 1.1%, 73% 2.7%, 80% 1%, 87% 2.5%, 93% 1.2%,
      100% 2.6%, 100% 97.4%, 94% 98.9%, 88% 97.3%, 81% 99%, 74% 97.4%, 67% 99%,
      60% 97.3%, 53% 98.9%, 46% 97.4%, 39% 99%, 32% 97.3%, 25% 98.9%, 18% 97.4%,
      11% 99%, 6% 97.4%, 0% 98.6%
    );
    color: #33220c;
  }
  .prize-card--tilt-0 .prize-card__parch { rotate: -0.5deg; }
  .prize-card--tilt-1 .prize-card__parch { rotate: 0.35deg; }
  .prize-card--tilt-2 .prize-card__parch { rotate: -0.3deg; }

  .prize-card__skin {
    position: absolute;
    inset: 0;
    clip-path: var(--torn);
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(255, 244, 214, 0.5), transparent 55%),
      linear-gradient(165deg, #f2e6c2 0%, #e6d4a9 34%, #d1b78c 68%, #bda277 100%);
    box-shadow:
      inset 0 0 0 1px rgba(120, 88, 38, 0.5),
      inset 0 0 44px rgba(122, 89, 38, 0.38),
      0 0 90px rgba(214, 164, 64, 0.12),
      0 30px 70px rgba(0, 0, 0, 0.55),
      0 6px 18px rgba(0, 0, 0, 0.45);
  }
  .prize-card__skin::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.55;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.09'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .prize-card__skin::after {
    content: '';
    position: absolute;
    inset: 0;
    clip-path: var(--torn);
    mix-blend-mode: multiply;
    background:
      radial-gradient(30% 22% at 8% 96%, rgba(112, 78, 28, 0.28), transparent 70%),
      radial-gradient(26% 20% at 94% 4%, rgba(112, 78, 28, 0.22), transparent 70%),
      radial-gradient(20% 14% at 78% 88%, rgba(122, 86, 30, 0.16), transparent 70%);
  }

  .prize-card__inner {
    position: relative;
    z-index: 1;
    margin: 6px 16px 4px;
    padding: clamp(18px, 3vh, 30px) clamp(22px, 2.6vw, 42px) clamp(12px, 1.8vh, 18px);
    border: 1px solid rgba(94, 66, 22, 0.4);
    box-shadow:
      inset 0 0 0 3px rgba(94, 66, 22, 0.12),
      inset 0 0 0 4px rgba(214, 176, 96, 0.35);
    background: linear-gradient(180deg, rgba(255, 248, 224, 0.28), rgba(148, 112, 56, 0.1));
  }
  .prize-card__num {
    margin: 0;
    text-align: center;
    color: #8a6420;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.34em;
  }
  .prize-card__name {
    margin: clamp(8px, 1.6vh, 14px) 0 clamp(4px, 0.8vh, 8px);
    text-align: center;
    font-family: 'Cinzel', serif;
    font-weight: 700;
    font-size: clamp(24px, 3vw, 38px);
    letter-spacing: 0.08em;
    color: #33220c;
    text-shadow: 0 1px 0 rgba(255, 246, 220, 0.7);
  }
  .prize-card__genre {
    margin: 0 0 clamp(10px, 1.8vh, 18px);
    text-align: center;
    font-family: 'Libre Baskerville', Georgia, serif;
    font-style: italic;
    font-size: clamp(12px, 1.2vw, 14px);
    color: #6d5527;
  }
  .prize-card__rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: clamp(14px, 2.6vh, 24px);
    color: #9a742c;
    font-size: 12px;
  }
  .prize-card__rule i { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #9a742c, transparent); }

  .prize-card__tiers { margin: auto 0; padding: 0; list-style: none; }
  .prize-row {
    display: flex;
    align-items: center;
    gap: clamp(12px, 1.4vw, 18px);
    margin-bottom: clamp(10px, 1.8vh, 16px);
    padding: clamp(12px, 2vh, 19px) clamp(14px, 1.6vw, 22px);
    border: 1px solid rgba(94, 66, 22, 0.28);
    background: linear-gradient(180deg, rgba(255, 246, 220, 0.34), rgba(214, 182, 120, 0.16));
  }
  .prize-row:last-child { margin-bottom: clamp(12px, 2vh, 18px); }
  .prize-row--1 {
    padding: clamp(15px, 2.6vh, 24px) clamp(14px, 1.6vw, 22px);
    border-color: rgba(64, 44, 10, 0.55);
    background: linear-gradient(180deg, #e3b95c, #c19136);
    box-shadow: inset 0 0 0 1px rgba(255, 232, 170, 0.55), 0 4px 12px rgba(84, 58, 12, 0.35);
  }
  .prize-row--1 .prize-row__label { color: #3d2a08; }
  .prize-row--1 .prize-row__amount { font-size: clamp(24px, 2.8vw, 34px); color: #241704; }
  .prize-row--1 .prize-row__medal {
    background: #6e5318;
    color: #f6e6b6;
    border-color: rgba(255, 236, 180, 0.7);
    box-shadow: inset 0 0 0 2px rgba(58, 40, 8, 0.35), 0 0 10px rgba(58, 40, 8, 0.3);
  }
  .prize-row__medal {
    flex: 0 0 auto;
    width: clamp(40px, 4.4vw, 50px);
    height: clamp(40px, 4.4vw, 50px);
    display: grid;
    place-items: center;
    border: 1px solid rgba(94, 66, 22, 0.55);
    border-radius: 50%;
    background: rgba(255, 248, 224, 0.4);
    color: #5f461c;
    font-family: 'Cinzel', serif;
    font-size: 16px;
    font-weight: 700;
  }
  .prize-row--2 .prize-row__medal,
  .prize-row--3 .prize-row__medal { width: clamp(34px, 3.8vw, 43px); height: clamp(34px, 3.8vw, 43px); font-size: 14px; }
  .prize-row__body { min-width: 0; }
  .prize-row__label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(10px, 1vw, 12px);
    font-weight: 700;
    letter-spacing: 0.28em;
    color: #5f461c;
  }
  .prize-row__amount {
    display: block;
    margin-top: clamp(3px, 0.5vh, 5px);
    font-family: 'Cinzel', serif;
    font-weight: 700;
    font-size: clamp(19px, 2vw, 26px);
    letter-spacing: 0.02em;
    color: #33220c;
  }
  .prize-row__amount em {
    font-family: 'Libre Baskerville', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    font-size: 0.66em;
    letter-spacing: 0;
    margin-right: 5px;
    opacity: 0.85;
  }
  .prize-row__sum { white-space: nowrap; }
  .prize-card__meander { display: block; width: 100%; height: 14px; opacity: 0.5; }

  .prizes__note {
    margin: 18px 0 0;
    text-align: center;
    font-family: 'Libre Baskerville', Georgia, serif;
    font-style: italic;
    font-size: 13.5px;
    color: #cdbb92;
  }
  .prizes__note span { color: #d4af37; font-size: 11px; }
  .prizes__outro { margin: 26px auto 10px; }
  .prizes__sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .prizes [data-reveal] {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  }
`;

const STATIC_STYLES = `
  ${SHARED_STYLES}

  .prizes--static { padding-top: 96px; }
  .prizes__staticwrap {
    width: min(1180px, calc(100% - 56px));
    margin: 0 auto;
    padding: clamp(30px, 5vw, 54px) clamp(14px, 4vw, 54px) clamp(30px, 4.5vw, 46px);
    background: rgba(16, 12, 8, 0.72);
    border: 1px solid rgba(212, 175, 55, 0.35);
    clip-path: polygon(1.3% 0, 98.7% 0, 100% 3%, 100% 97%, 98.7% 100%, 1.3% 100%, 0 97%, 0 3%);
  }
  .prizes__staticwrap .prizes__intro { position: static; text-align: center; }
  .prizes__staticwrap .prize-card {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .prizes__staticwrap .prize-card__parch {
    position: relative;
    width: min(520px, 92vw);
    min-height: 0;
    padding: 34px 8px 28px;
  }
  @media (max-width: 760px) {
    .prizes--static { padding-top: 72px; }
    .prizes__handoff { height: 72px; }
    .prizes__staticwrap {
      width: calc(100% - 32px);
      clip-path: polygon(3% 0, 97% 0, 100% 2%, 100% 98%, 97% 100%, 3% 100%, 0 98%, 0 2%);
    }
  }
`;

const PINNED_STYLES = `
  ${SHARED_STYLES}

  .prizes__runway {
    position: relative;
    height: calc(100vh + var(--pp-runway, 520vh));
  }
  @supports (height: 100svh) {
    .prizes__runway { height: calc(100svh + var(--pp-runway, 520vh)); }
  }
  .prizes__sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: clip;
    display: grid;
    place-items: center;
    padding: 76px clamp(14px, 4vw, 48px) 30px;
  }
  @supports (height: 100svh) {
    .prizes__sticky { height: 100svh; }
  }

  .prizes__chamber {
    position: absolute;
    inset: -30px 0;
    pointer-events: none;
    transform: scale(1.06);
    will-change: transform;
    background-image:
      radial-gradient(46% 40% at 50% 44%, rgba(206, 146, 48, 0.16), transparent 70%),
      linear-gradient(180deg, rgba(16, 11, 6, 0.6), rgba(24, 16, 9, 0.26) 42%, rgba(12, 8, 4, 0.76) 100%),
      radial-gradient(115% 95% at 50% 50%, transparent 52%, rgba(10, 7, 4, 0.62) 100%),
      url(${chamberBg});
    background-size: 100% 100%, 100% 100%, 100% 100%, cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .prizes__dim {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(180deg, rgba(9, 6, 3, 0.92), rgba(9, 6, 3, 0.96));
  }

  .prizes__sticky::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.35;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.07'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  .prizes__frame {
    position: absolute;
    inset: 10px 12px;
    z-index: 2;
    pointer-events: none;
    border: 1px solid rgba(212, 175, 55, 0.28);
    background: transparent;
    clip-path: polygon(1.1% 0, 98.9% 0, 100% 2.4%, 100% 97.6%, 98.9% 100%, 1.1% 100%, 0 97.6%, 0 2.4%);
  }

  .prizes__column { position: absolute; top: 0; bottom: 0; width: 76px; display: none; }
  @media (min-width: 1600px) {
    .prizes__column { display: block; }
    .prizes__column--left { left: 3.5vw; }
    .prizes__column--right { right: 3.5vw; }
    .prizes__column::before {
      content: '';
      position: absolute;
      inset: 96px 0 0;
      border-left: 1px solid rgba(212, 175, 55, 0.14);
      border-right: 1px solid rgba(212, 175, 55, 0.14);
      background: repeating-linear-gradient(
        90deg,
        rgba(226, 180, 74, 0.10) 0 7px,
        rgba(0, 0, 0, 0.35) 7px 11px,
        rgba(226, 180, 74, 0.04) 11px 18px
      );
      -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.5) 55%, transparent 96%);
      mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.5) 55%, transparent 96%);
    }
    .prizes__column::after {
      content: '';
      position: absolute;
      top: 64px;
      left: -8px;
      right: -8px;
      height: 26px;
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-bottom: 0;
      background: linear-gradient(180deg, rgba(230, 186, 86, 0.16), rgba(160, 118, 40, 0.1));
    }
  }

  .prizes__specks { position: absolute; inset: 0 0 auto 0; height: 420px; pointer-events: none; }
  .prizes__speck {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(238, 196, 102, 0.9), rgba(238, 196, 102, 0) 70%);
    opacity: 0;
    animation: prize-speck 12s ease-in-out infinite;
  }
  @keyframes prize-speck {
    0%, 100% { opacity: 0; transform: translateY(8px); }
    50% { opacity: 0.65; transform: translateY(-16px); }
  }
  @media (max-width: 899px) { .prizes__specks { display: none; } }

  .prizes__backdrop {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    margin: 0;
    pointer-events: none;
    user-select: none;
    opacity: 0;
  }
  .prizes__backdrop b {
    font-family: 'Cinzel', Georgia, serif;
    font-weight: 700;
    font-size: clamp(260px, 42vw, 560px);
    line-height: 1;
    color: rgba(212, 175, 55, 0.06);
    letter-spacing: 0.04em;
    text-shadow: 0 0 60px rgba(212, 175, 55, 0.05);
  }

  .prizes__stage {
    position: relative;
    z-index: 2;
    width: min(1120px, 100%);
    height: 100%;
  }

  .prizes__intro {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    will-change: transform, opacity;
  }
  .prizes__halo {
    position: absolute;
    left: 50%;
    top: 44%;
    width: min(60vmin, 540px);
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(212, 160, 60, 0.12), transparent 66%);
    pointer-events: none;
  }
  .prizes__halo::before {
    content: '';
    position: absolute;
    inset: 6.5%;
    border: 1px solid rgba(212, 175, 55, 0.12);
    border-radius: 50%;
  }
  .prizes__total {
    margin: clamp(8px, 1.6vh, 18px) 0 0;
    font-family: 'Cinzel', Georgia, serif;
    font-weight: 700;
    font-size: clamp(60px, min(13.5vw, 19vh), 148px);
    line-height: 1.02;
    letter-spacing: 0.02em;
    background: linear-gradient(180deg, #f6e3a5 8%, #e0b458 46%, #a97c22 92%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 4px 0 rgba(70, 50, 12, 0.4)) drop-shadow(0 0 30px rgba(229, 174, 62, 0.22));
  }
  .prizes__total span { font-size: 0.52em; vertical-align: 0.42em; }
  .prizes__facts {
    margin: clamp(6px, 1.2vh, 12px) 0 0;
    color: #b99a55;
    font-family: 'Cinzel', serif;
    font-size: clamp(8.5px, 1.1vw, 10.5px);
    font-weight: 700;
    letter-spacing: 0.3em;
  }

  .prizes__stage .prizes__finale {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 16px;
    opacity: 0;
    will-change: transform, opacity;
  }
  .prizes__finale-title {
    margin: 6px 0 8px;
    font-family: 'Cinzel', Georgia, serif;
    font-weight: 700;
    font-size: clamp(26px, 5vw, 46px);
    letter-spacing: 0.14em;
    color: #ead295;
    text-shadow: 0 3px 0 rgba(85, 64, 29, 0.35), 0 0 26px rgba(229, 174, 62, 0.18);
  }
  .prizes__finale-sub {
    margin: 0 0 6px;
    color: #d4ad58;
    font-size: clamp(9px, 1.5vw, 11px);
    font-weight: 700;
    letter-spacing: 0.4em;
  }

  .prizes__stage .prize-card {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    will-change: transform, opacity;
  }
  .prize-card__parch {
    position: relative;
    width: min(60vw, 820px);
    min-height: min(68vh, 660px);
    display: flex;
    padding: clamp(30px, 4.6vh, 50px) clamp(14px, 1.6vw, 24px) clamp(22px, 3.4vh, 38px);
  }
  .prizes__stage .prize-card__inner {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .prizes__stage .prize-card__num { margin-top: 0; }
  .prizes__stage .prize-card__meander { margin-top: clamp(12px, 2vh, 20px); }

  .prizes__stage .prize-row { opacity: 0; will-change: transform, opacity; }

  .prizes__cue {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin: 0;
    text-align: center;
    animation: prize-cue 2.8s ease-in-out infinite;
  }
  .prizes__cue-top {
    color: #c9a95c;
    font-family: 'Cinzel', serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.4em;
  }
  .prizes__cue-arrow { color: #d4af37; font-size: 13px; line-height: 1; }
  .prizes__cue-scroll {
    color: #8a7a58;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.5em;
  }
  @keyframes prize-cue {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }

  .prizes__compass {
    position: absolute;
    right: clamp(20px, 3.4vw, 60px);
    top: 50%;
    transform: translateY(-50%);
    z-index: 6;
  }
  .prizes__pins {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .prizes__pins li { position: relative; }
  .prizes__pins li + li::before {
    content: '';
    position: absolute;
    left: 16px;
    top: -14px;
    width: 1px;
    height: 13px;
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.45), rgba(212, 175, 55, 0.12));
  }
  .prizes__pin {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 3px;
    border: 0;
    background: none;
    cursor: pointer;
    text-align: left;
  }
  .prizes__pin i {
    flex: 0 0 auto;
    width: 33px;
    height: 33px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(212, 175, 55, 0.5);
    border-radius: 50%;
    background: rgba(24, 18, 10, 0.6);
    color: #c9a045;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    font-weight: 700;
    transition: background 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  }
  .prizes__pin span {
    font-family: 'Cinzel', serif;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 0.26em;
    color: #8f7f5c;
    text-transform: uppercase;
    transition: color 0.35s ease;
  }
  .prizes__pin.is-on i {
    border-color: rgba(255, 236, 180, 0.85);
    background: linear-gradient(180deg, #e8c268, #c19136);
    color: #241704;
    box-shadow: 0 0 14px rgba(226, 185, 94, 0.45);
  }
  .prizes__pin.is-on span { color: #e2b95e; }
  .prizes__pin:focus-visible {
    outline: 2px solid #e8bf62;
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (max-width: 899px) {
    .prizes__runway { --pp-runway: 420vh; }
    .prizes__sticky { padding: 66px 14px 24px; }
    .prizes__frame { inset: 6px 8px; }
    .prizes__chamber { background-position: center 52%; }
    .prizes__facts { font-size: 8.5px; letter-spacing: 0.16em; }
    .prizes__cue-top { font-size: 8px; letter-spacing: 0.22em; }
    .prize-card__parch {
      width: min(78vw, 640px);
      min-height: min(64vh, 560px);
    }
    .prizes__compass {
      right: auto;
      top: auto;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
    }
    .prizes__pins { flex-direction: row; gap: 12px; }
    .prizes__pins li + li::before { display: none; }
    .prizes__pin i { width: 29px; height: 29px; font-size: 11px; }
    .prizes__cue { bottom: 52px; }
  }
  @media (max-width: 640px) {
    .prizes__pin span { display: none; }
    .prizes__copy { font-size: 13px; }
    .prize-card__parch {
      width: min(92vw, 460px);
      min-height: min(66vh, 540px);
      padding: clamp(24px, 4.5vh, 36px) 8px clamp(20px, 3.5vh, 30px);
    }
    .prize-card__inner { margin: 4px 10px 2px; padding: 14px 16px 10px; }
    .prize-card__name { font-size: clamp(22px, 6.4vw, 28px); }
    .prize-row { gap: 11px; padding: clamp(10px, 1.8vh, 15px) 12px; margin-bottom: clamp(8px, 1.5vh, 12px); }
    .prize-row--1 { padding: clamp(13px, 2.3vh, 19px) 12px; }
    .prize-row__medal { width: 36px; height: 36px; font-size: 13px; }
    .prize-row--2 .prize-row__medal,
    .prize-row--3 .prize-row__medal { width: 31px; height: 31px; font-size: 11px; }
    .prize-row__label { font-size: 9.5px; }
    .prize-row__amount { font-size: 17px; }
    .prize-row--1 .prize-row__amount { font-size: 21px; }
  }

  @media (max-height: 760px) {
    .prizes__total { font-size: clamp(48px, min(11vw, 14vh), 110px); }
    .prizes__laurels { margin: 8px 0 2px; }
    .prizes__title { margin: 2px 0 6px; }
    .prize-card__parch { min-height: min(60vh, 520px); }
    .prizes__eyebrow { font-size: 9px; }
    .prizes__finale-title { font-size: clamp(22px, 4vw, 34px); }
    .prizes__copy { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .prizes__speck { animation: none; opacity: 0; }
    .prizes__cue { animation: none; opacity: 0; }
    .prizes__pin i { transition: none; }
  }
`;
