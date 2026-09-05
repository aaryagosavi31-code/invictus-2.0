import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#registration", label: "Registration" },
  { href: "#faq", label: "FAQs" },
  { href: "#contact", label: "Contact Us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((first, entry) =>
            first.boundingClientRect.top < entry.boundingClientRect.top ? first : entry
          );
          setActiveHref(`#${topMost.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observerRef.current.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header className="navbar">
      <a href="#home" className="navbar__brand">
        <span className="navbar__brand-text">Invictus 2.0</span>
      </a>

      <nav className="navbar__links">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeHref === link.href ? "active" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className={`navbar__toggle ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <nav className="navbar__mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeHref === link.href ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 1rem 3rem;
          background: rgba(20, 10, 6, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(211, 172, 107, 0.15);
          font-family: "Cormorant Garamond", serif;
        }

        .navbar__brand {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          justify-self: start;
        }

        .navbar__emblem {
          width: 30px;
          height: 30px;
          fill: none;
          stroke: #d3ac6b;
          stroke-width: 1.4;
          flex-shrink: 0;
        }

        .navbar__brand-text {
          font-family: "Cinzel", serif;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: #f3ead9;
        }

        .navbar__links {
          grid-column: 2;
          display: flex;
          gap: 2.5rem;
          font-size: 1.2rem;
        }

        .navbar__links a {
          position: relative;
          color: #e6ddc9;
          text-decoration: none;
          padding-bottom: 5px;
          transition: color 0.2s ease;
        }

        .navbar__links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #d3ac6b;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.25s ease;
        }

        .navbar__links a:hover,
        .navbar__links a:focus-visible,
        .navbar__links a.active {
          color: #d3ac6b;
        }

        .navbar__links a:hover::after,
        .navbar__links a:focus-visible::after,
        .navbar__links a.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .navbar__toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          justify-self: end;
        }

        .navbar__toggle span {
          display: block;
          height: 2px;
          background: #f3ead9;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

        .navbar__toggle.is-open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .navbar__toggle.is-open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__toggle.is-open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .navbar__mobile {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          background: rgba(20, 10, 6, 0.92);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem 1.6rem;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
        }

        .navbar__mobile a {
          color: #e6ddc9;
          text-decoration: none;
          font-size: 1.2rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(211, 172, 107, 0.15);
        }
        .navbar__mobile a:hover,
        .navbar__mobile a.active {
          color: #d3ac6b;
        }

        @media (max-width: 860px) {
          .navbar {
            grid-template-columns: 1fr auto;
            padding: 0.9rem 1.5rem;
          }
          .navbar__links {
            display: none;
          }
          .navbar__toggle {
            display: flex;
            grid-column: 2;
          }
        }
      `}</style>
    </header>
  );
}