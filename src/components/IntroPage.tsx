import { useState } from "react";

type Props = {
  onStart: (length: number) => void;
};

const OPTIONS = [
  { value: 5, label: "5", sub: "قصيرة" },
  { value: 10, label: "10", sub: "متوسطة" },
  { value: 15, label: "15", sub: "طويلة" },
];

export function IntroPage({ onStart }: Props) {
  const [length, setLength] = useState(10);
  return (
    <div className="intro-shell" dir="rtl">
      <div className="intro-rocket" aria-hidden="true">
        🚀
      </div>
      <div className="intro-card">
        <div className="intro-brandmark" aria-hidden="true">
          <span>א</span>
        </div>
        <h1 className="intro-title">نقفز في الفضاء</h1>
        <p className="intro-tag">
          اقفز على الكلمة الصحيحة وتعلم كلمات جديدة بالعبرية!
        </p>

        <div className="intro-steps">
          <div className="intro-step">
            <div className="intro-step-num">1</div>
            <div className="intro-step-icon" aria-hidden="true">
              👂
            </div>
            <div className="intro-step-text">اسمع الكلمة</div>
          </div>
          <div className="intro-step">
            <div className="intro-step-num">2</div>
            <div className="intro-step-icon" aria-hidden="true">
              👀
            </div>
            <div className="intro-step-text">انظر إلى الصور</div>
          </div>
          <div className="intro-step">
            <div className="intro-step-num">3</div>
            <div className="intro-step-icon" aria-hidden="true">
              👆
            </div>
            <div className="intro-step-text">اضغط على الصحيحة</div>
          </div>
        </div>

        <div className="intro-rounds">
          <div className="intro-rounds-label">كم سؤال تريد؟</div>
          <div className="intro-rounds-options">
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                className={`intro-round-chip ${length === o.value ? "on" : ""}`}
                onClick={() => setLength(o.value)}
                aria-pressed={length === o.value}
              >
                <span className="round-chip-num">{o.label}</span>
                <span className="round-chip-sub">{o.sub}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="intro-start" onClick={() => onStart(length)}>
          <span className="intro-start-text">هيا نبدأ!</span>
          <span className="intro-start-arrow" aria-hidden="true">
            ◀
          </span>
        </button>
      </div>
    </div>
  );
}
