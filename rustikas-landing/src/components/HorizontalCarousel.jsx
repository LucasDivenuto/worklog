import { useRef } from "react";

export default function HorizontalCarousel({ ariaLabel, children, className = "" }) {
  const scrollerRef = useRef(null);

  const move = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction * Math.round(scroller.clientWidth * 0.82),
      behavior: "smooth",
    });
  };

  return (
    <div className={`carousel-shell ${className}`.trim()}>
      <div className="carousel-actions" aria-label={ariaLabel}>
        <button type="button" onClick={() => move(-1)} aria-label="Anterior">
          ‹
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Siguiente">
          ›
        </button>
      </div>
      <div className="carousel-track" ref={scrollerRef} tabIndex="0">
        {children}
      </div>
    </div>
  );
}
