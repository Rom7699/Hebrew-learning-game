export type SessionStats = {
  correct: number;
  total: number;
  score: number;
  bestStreak: number;
  mistakes: number;
};

type Props = {
  stats: SessionStats;
  onPlayAgain: () => void;
  onHome: () => void;
};

const MESSAGES: Record<1 | 2 | 3, string> = {
  3: "ممتاز! أنت بطل!",
  2: "أحسنت! استمر!",
  1: "حاول مرة أخرى وستتحسن!",
};

export function SuccessScreen({ stats, onPlayAgain, onHome }: Props) {
  const denom = stats.correct + stats.mistakes;
  const accuracy = denom > 0 ? stats.correct / denom : 0;
  const stars: 1 | 2 | 3 = accuracy >= 0.8 ? 3 : accuracy >= 0.5 ? 2 : 1;

  return (
    <div className="summary-shell" dir="rtl">
      <div className="summary-card">
        <div className="summary-title">انتهت الجولة!</div>
        <div className="summary-stars" aria-label={`${stars} stars`}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`summary-star ${i < stars ? "on" : "off"}`}
              style={{ animationDelay: `${i * 0.18}s` }}
            >
              ★
            </span>
          ))}
        </div>
        <div className="summary-msg">{MESSAGES[stars]}</div>
        <div className="summary-stats">
          <div className="summary-stat">
            <div className="summary-stat-num">
              {stats.correct}
              <span className="summary-of">/{stats.total}</span>
            </div>
            <div className="summary-stat-label">إجابات صحيحة</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-num">{stats.score}</div>
            <div className="summary-stat-label">نقاط</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-num">
              {stats.bestStreak}
              <span className="stat-flame" aria-hidden="true">
                {" "}
                🔥
              </span>
            </div>
            <div className="summary-stat-label">أفضل سلسلة</div>
          </div>
        </div>
        <div className="summary-actions">
          <button className="intro-start" onClick={onPlayAgain}>
            <span className="intro-start-text">العب مرة أخرى</span>
            <span className="intro-start-arrow" aria-hidden="true">
              ◀
            </span>
          </button>
          <button className="summary-home" onClick={onHome}>
            <span aria-hidden="true">⌂</span>
            <span>العودة للقائمة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
