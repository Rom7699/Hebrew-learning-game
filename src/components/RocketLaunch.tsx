import { useMemo } from "react";

export function RocketLaunch() {
  const streaks = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 0.5 + Math.random() * 0.6,
        height: 40 + Math.random() * 120,
      })),
    [],
  );
  return (
    <div className="rocket-launch" aria-hidden="true">
      <div className="rocket-streaks">
        {streaks.map((s) => (
          <span
            key={s.id}
            className="rocket-streak"
            style={{
              left: `${s.x}%`,
              height: `${s.height}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="rocket-emoji">🚀</div>
      <div className="rocket-trail" />
    </div>
  );
}
