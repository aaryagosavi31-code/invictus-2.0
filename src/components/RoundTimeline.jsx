import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function EventPanel({
  event,
}) {
  const panelRef = useRef(null);

  const [activeRound, setActiveRound] =
    useState(0);

  /*
   * Reset timeline whenever another
   * event is selected.
   */
  useEffect(() => {
    setActiveRound(0);

    /*
     * Put the user at the beginning
     * of the newly selected timeline.
     */
    if (panelRef.current) {
      panelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [event?.id]);


  /*
   * Scroll-based timeline progress.
   */
  useEffect(() => {
    if (!panelRef.current) {
      return;
    }

    const items =
      panelRef.current.querySelectorAll(
        ".timeline__item"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const index = Number(
              entry.target.dataset.index
            );

            setActiveRound(index);

          });
        },
        {
          root: null,

          /*
           * Round becomes active when it
           * reaches the center area of viewport.
           */
          rootMargin:
            "-42% 0px -42% 0px",

          threshold: 0,
        }
      );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      observer.disconnect();
    };

  }, [event?.id]);


  if (!event?.rounds?.length) {
    return null;
  }


  /*
   * Progress percentage.
   */
  const progress =
    event.rounds.length === 1
      ? 100
      : (
          activeRound /
          (event.rounds.length - 1)
        ) * 100;


  return (
    <section
      ref={panelRef}

      id={`panel-${event.id}`}

      role="tabpanel"

      aria-labelledby={`tab-${event.id}`}

      className="panel"
    >

      {/* EVENT HEADER */}

      <div className="panel__intro">

        <div>

          <span className="panel__eyebrow">
            THE TRIALS BEGIN
          </span>

          <h2>
            {event.name}
          </h2>

          <p className="panel__genre">
            {event.genre}
          </p>

        </div>

        <div className="panel__team">

          <span>
            TEAM SIZE
          </span>

          <strong>
            {event.teamSize}
          </strong>

        </div>

      </div>


      <p className="panel__tagline">
        {event.tagline}
      </p>


      {/* TIMELINE */}

      <div className="timeline-wrap">

        {/* SWORD */}

        <div
          className="timeline__weapon"
          aria-hidden="true"
        >

          <div className="weapon__pommel" />

          <div className="weapon__grip">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="weapon__guard">
            <div className="guard-left" />
            <div className="guard-right" />
          </div>

          <div className="weapon__blade">

            <div className="blade-highlight" />

            <div
              className="weapon__blood"
              style={{
                height: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* CENTERED TIMELINE */}

        <ol className="timeline">

          <span
            className="timeline__track"
            aria-hidden="true"
          />

          <span
            className="timeline__fill"
            aria-hidden="true"
            style={{
              height: `${progress}%`,
            }}
          />


          {event.rounds.map(
            (round, index) => {

              const active =
                index <= activeRound;

              return (
                <li
                  key={round.numeral}
                  data-index={index}

                  className={`timeline__item ${
                    active
                      ? "timeline__item--active"
                      : ""
                  }`}
                >

                  {/* CENTER CARD */}

                  <article className="timeline__card">

                    <div className="card__top">

                      <span className="timeline__round">
                        ROUND {round.numeral}
                      </span>

                      <span className="card__symbol">
                        ✦
                      </span>

                    </div>


                    <h3 className="timeline__title">
                      {round.title}
                    </h3>


                    <p className="timeline__quote">
                      “{round.quote}”
                    </p>


                    <p className="timeline__desc">
                      {round.description}
                    </p>


                    <div className="card__bottom">

                      <span />

                      <small>
                        TRIAL {index + 1}
                      </small>

                    </div>

                  </article>

                </li>
              );
            }
          )}

        </ol>

      </div>

    </section>
  );
}