import { useEffect, useState } from "react";
import type { GameObject } from "../game/objectPool";
import { ObjectVisual } from "./ObjectCard";

type Props = {
  target: GameObject;
  onDismiss: () => void;
};

export function HintOverlay({ target, onDismiss }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    setSecondsLeft(5);
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(tick);
          onDismiss();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [target, onDismiss]);

  return (
    <div className="hint-overlay" role="dialog" aria-live="polite">
      <button
        className="hint-close"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        aria-label="إغلاق"
      >
        ×
      </button>
      <div className="hint-eyebrow">مساعدة — هذه هي الإجابة</div>
      <div className="hint-pic" aria-hidden="true">
        <ObjectVisual obj={target} big />
      </div>
      <div className="hint-encourage">
        حاول مرة أخرى، أنت تستطيع!{" "}
        <span className="hint-count">({secondsLeft})</span>
      </div>
    </div>
  );
}
