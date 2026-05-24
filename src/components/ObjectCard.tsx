import type { GameObject } from "../game/objectPool";

export type CardTint = { bg: string; ring: string };
export type CardState = "idle" | "correct" | "wrong";

export function ObjectVisual({
  obj,
  big,
}: {
  obj: GameObject;
  big?: boolean;
}) {
  if (obj.swatch) {
    return (
      <div
        className="card-swatch"
        style={{
          background: obj.swatch,
          borderColor: obj.swatch === "#FAFAFA" ? "#D9D2C7" : "transparent",
        }}
      />
    );
  }
  return (
    <div className={`card-emoji ${big ? "big" : ""}`}>{obj.emoji || "❓"}</div>
  );
}

type Props = {
  obj: GameObject;
  index: number;
  tint: CardTint;
  state: CardState;
  hintActive: boolean;
  onPress: () => void;
};

export function ObjectCard({
  obj,
  index,
  tint,
  state,
  hintActive,
  onPress,
}: Props) {
  return (
    <button
      className={`card card-${state} ${hintActive ? "card-hint-dim" : ""}`}
      style={{
        background: tint.bg,
        boxShadow:
          state === "correct"
            ? `0 0 0 4px ${tint.ring}, 0 24px 40px -16px rgba(74,55,40,.25)`
            : `0 12px 24px -12px rgba(74,55,40,.18)`,
      }}
      onClick={onPress}
      aria-label={`${obj.label_ar} (${obj.label_he})`}
    >
      <div className="card-keyhint" aria-hidden="true">
        {index + 1}
      </div>
      <ObjectVisual obj={obj} big />
    </button>
  );
}
