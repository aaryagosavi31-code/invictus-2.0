import { useRef } from "react";

import helmetImage from "../assets/helmet.png";
import shipImage from "../assets/ship.png";
import odysseusImage from "../assets/odysseus.png";

const eventImages = [
  helmetImage,
  shipImage,
  odysseusImage,
];

export default function EventTabs({
  events = [],
  activeId,
  onChange,
}) {
  const tabRefs = useRef([]);

  if (!events.length) {
    return null;
  }

  const handleKeyDown = (e, index) => {
    let nextIndex = null;

    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % events.length;
    }

    if (e.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + events.length) %
        events.length;
    }

    if (nextIndex !== null) {
      e.preventDefault();

      onChange(events[nextIndex].id);

      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      className="tabs"
      role="tablist"
      aria-label="Invictus 2.0 events"
    >
      {events.map((event, index) => {
        const selected =
          event.id === activeId;

        return (
          <button
            key={event.id}

            ref={(element) => {
              tabRefs.current[index] =
                element;
            }}

            id={`tab-${event.id}`}

            role="tab"

            aria-selected={selected}

            aria-controls={`panel-${event.id}`}

            tabIndex={selected ? 0 : -1}

            className={`event-tab ${
              selected
                ? "event-tab--active"
                : ""
            }`}

            onClick={() =>
              onChange(event.id)
            }

            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
          >
            <div className="event-tab__number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="event-tab__image">
              <img
                src={eventImages[index]}
                alt=""
              />
            </div>

            <div className="event-tab__content">

              <span className="event-tab__event">
                EVENT {index + 1}
              </span>

              <span className="event-tab__name">
                {event.name}
              </span>

              <span className="event-tab__genre">
                {event.genre}
              </span>

            </div>

          </button>
        );
      })}
    </div>
  );
}