import { useMemo, type CSSProperties } from "react";

const COLORS = [
  "#F4B591",
  "#A6D0AF",
  "#A8C6E5",
  "#E8C679",
  "#E8A6B8",
  "#C7AEDB",
  "#FFFFFF",
  "#FFD24A",
];
const SHAPES = ["rect", "rect", "circle", "triangle", "star"] as const;

type Props = { fire: number };

export function Confetti({ fire }: Props) {
  const pieces = useMemo(() => {
    return Array.from({ length: 140 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 350 + Math.random() * 700;
      return {
        id: i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 200,
        rot: Math.random() * 1080 - 540,
        delay: Math.random() * 0.25,
        size: 10 + Math.random() * 16,
        duration: 1.6 + Math.random() * 1.0,
      };
    });
  }, [fire]);

  const streamers = useMemo(() => {
    const colors = ["#F4B591", "#E8A6B8", "#A6D0AF", "#A8C6E5"];
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      x: (Math.random() - 0.5) * 1200,
      y: -300 - Math.random() * 200,
      rot: Math.random() * 720 - 360,
      delay: Math.random() * 0.15,
      duration: 2.2 + Math.random() * 0.8,
    }));
  }, [fire]);

  if (!fire) return null;
  return (
    <div className="confetti-root" aria-hidden="true">
      <div key={`flash-${fire}`} className="confetti-flash" />
      <div key={`ring-${fire}`} className="confetti-ring" />
      <div key={`ring2-${fire}`} className="confetti-ring confetti-ring-2" />
      {streamers.map((s) => (
        <span
          key={`s-${fire}-${s.id}`}
          className="confetti-streamer"
          style={
            {
              "--dx": `${s.x}px`,
              "--dy": `${s.y}px`,
              "--rot": `${s.rot}deg`,
              "--delay": `${s.delay}s`,
              "--dur": `${s.duration}s`,
              "--c": s.color,
            } as CSSProperties
          }
        />
      ))}
      {pieces.map((p) => (
        <span
          key={`${fire}-${p.id}`}
          className={`confetti-piece shape-${p.shape}`}
          style={
            {
              "--dx": `${p.x}px`,
              "--dy": `${p.y}px`,
              "--rot": `${p.rot}deg`,
              "--delay": `${p.delay}s`,
              "--dur": `${p.duration}s`,
              "--c": p.color,
              "--sz": `${p.size}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
