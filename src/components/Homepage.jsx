import heroBg from "../assets/hero-bg.png";
import Register from "./register";
import ContactUs from "./ContactUs";
import FAQ from "./FAQ"
import PrizePool from "./PrizePool"

export default function Homepage({ children }) {
  return (
    <main className="homepage">
      <div
        className="homepage__background"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />
      <Hero />
      <Register />
      {children}
      <PrizePool />
      <FAQ />
      <ContactUs />
      <style>{`
        .homepage {
          position: relative;
          isolation: isolate;
          overflow: clip;
          background: #100c08;
        }

        .homepage__background {
          position: fixed;
          z-index: -1;
          inset: 0;
          background-position: center;
          background-size: cover;
          filter: brightness(0.8) saturate(0.85);
          transform: scale(1.04);
          pointer-events: none;
        }

        .homepage__background::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(10, 6, 3, 0.3);
        }

        .homepage > section,
        .homepage > main {
          position: relative;
        }
      `}</style>
    </main>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <h1 className="hero__title">INVICTUS 2.0</h1>
        <p className="hero__tagline">
          Every empire falls. Every champion is forgotten. Prove you are the exception.
        </p>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: "Cormorant Garamond", serif;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(25, 13, 7, 0.18) 0%,
            rgba(22, 12, 7, 0.28) 55%,
            rgba(15, 8, 5, 0.58) 100%
          );
        }

        /* darkens specifically behind the text column, since the archway
           and clouds there are brighter than the rest of the image */
        .hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 700px;
          padding: 2rem 1.5rem;
          color: #f3ead9;
        }

        .hero__kicker {
          font-family: "Cinzel", serif;
          letter-spacing: 0.25em;
          font-size: 0.85rem;
          text-transform: uppercase;
          color: #d3ac6b;
          margin: 0 0 1rem;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
        }

        .hero__title {
          font-family: "Cinzel", serif;
          font-weight: 700;
          font-size: clamp(2.6rem, 8vw, 5.5rem);
          letter-spacing: 0.06em;
          margin: 0 0 1.2rem;
          line-height: 1.05;
          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.85),
            0 8px 28px rgba(0, 0, 0, 0.65);
        }

        .hero__tagline {
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-style: italic;
          color: #e6ddc9;
          margin: 0 auto 2rem;
          max-width: 46ch;
          line-height: 1.5;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.75);
        }

        .hero__actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.6rem;
        }

        .hero__btn {
          font-family: "Cinzel", serif;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          padding: 0.9rem 2rem;
          border-radius: 2px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .hero__btn--primary {
          background: linear-gradient(180deg, #e3c07f, #a9793a);
          color: #241a0c;
          box-shadow: 0 6px 20px rgba(169, 121, 58, 0.45);
        }
        .hero__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(169, 121, 58, 0.55);
        }

        .hero__btn--ghost {
          border: 1px solid #d3ac6b;
          color: #f3ead9;
        }
        .hero__btn--ghost:hover {
          background: #d3ac6b;
          color: #241a0c;
        }

        .hero__dates {
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          color: #c9bfa8;
          margin: 0;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </section>
  );
}