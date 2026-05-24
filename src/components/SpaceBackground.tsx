import { useMemo } from "react";

// Twinkling stars + soft nebula + friendly planets. Pure visual chrome.
export function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
        sparkle: Math.random() < 0.18,
        hue:
          Math.random() < 0.85
            ? "white"
            : Math.random() < 0.5
              ? "#FFE4A8"
              : "#B8DFFF",
      })),
    [],
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        top: 10 + Math.random() * 40,
        left: 50 + Math.random() * 40,
        delay: i * 7 + Math.random() * 4,
      })),
    [],
  );

  return (
    <div className="space-bg" aria-hidden="true">
      <div className="space-gradient" />
      <div className="nebula nebula-pink" />
      <div className="nebula nebula-blue" />
      <div className="stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className={`star ${s.sparkle ? "star-sparkle" : ""}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.hue,
              boxShadow: `0 0 ${s.size * 2}px ${s.hue}`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>
      {shootingStars.map((s) => (
        <span
          key={s.id}
          className="shooting-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <div className="planet planet-saturn">
        <div className="planet-body" />
        <div className="planet-ring" />
      </div>
      <div className="planet planet-mint">
        <div className="planet-body" />
      </div>
      <div className="planet planet-blue">
        <div className="planet-body" />
      </div>
      <div className="moon">
        <div className="moon-body" />
      </div>
    </div>
  );
}
