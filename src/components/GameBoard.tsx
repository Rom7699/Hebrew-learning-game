import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildInitialBoard,
  MANIFEST,
  pickRandom,
  type GameObject,
} from "../game/objectPool";
import { playAudio } from "../audio/AudioPlayer";
import { KeyboardInputSource } from "../input/KeyboardInputSource";
import { ObjectCard, type CardState, type CardTint } from "./ObjectCard";
import { HintOverlay } from "./HintOverlay";
import { Confetti } from "./Confetti";
import type { SessionStats } from "./SuccessScreen";

const CARD_TINTS: CardTint[] = [
  { bg: "#FFE8DC", ring: "#F4B591" }, // peach
  { bg: "#DDEEDF", ring: "#A6D0AF" }, // mint
  { bg: "#E1ECF7", ring: "#A8C6E5" }, // sky
  { bg: "#FBEACE", ring: "#E8C679" }, // butter
];

// Hard-coded for now — see GAME_SPEC.md. Tweakable later if the team wants.
const HINT_THRESHOLD = 3;
const ALWAYS_SHOW_ARABIC = true;
// Web Speech fallback so the game is playable before real audio assets exist.
const DEMO_SPEECH = true;

type Props = {
  sessionLength: number;
  onSessionEnd: (stats: SessionStats) => void;
  onHome: () => void;
};

export function GameBoard({ sessionLength, onSessionEnd, onHome }: Props) {
  const pool = useMemo(() => MANIFEST.objects, []);

  const [board, setBoard] = useState<GameObject[]>(() =>
    buildInitialBoard(pool),
  );
  const [target, setTarget] = useState<GameObject | null>(null);
  const [feedback, setFeedback] = useState<(CardState | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [round, setRound] = useState(1);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [confettiKey, setConfettiKey] = useState(0);
  const [locked, setLocked] = useState(false);

  // Refs so input callbacks always see current state without re-binding.
  const targetRef = useRef<GameObject | null>(null);
  const boardRef = useRef(board);
  const lockedRef = useRef(false);
  const mistakesRef = useRef(0);
  const roundRef = useRef(1);
  const scoreRef = useRef(0);
  const bestStreakRef = useRef(0);
  const totalMistakesRef = useRef(0);
  const sessionEndedRef = useRef(false);
  useEffect(() => {
    targetRef.current = target;
  }, [target]);
  useEffect(() => {
    boardRef.current = board;
  }, [board]);
  useEffect(() => {
    lockedRef.current = locked;
  }, [locked]);
  useEffect(() => {
    mistakesRef.current = mistakes;
  }, [mistakes]);
  useEffect(() => {
    roundRef.current = round;
  }, [round]);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    bestStreakRef.current = bestStreak;
  }, [bestStreak]);
  useEffect(() => {
    totalMistakesRef.current = totalMistakes;
  }, [totalMistakes]);

  // Pick a new target whenever the board has 4 cards and no target is active.
  useEffect(() => {
    if (!target && board.length === 4) {
      const t = board[Math.floor(Math.random() * board.length)];
      setTarget(t);
    }
  }, [board, target]);

  // Speak the Hebrew target whenever it changes. Tracking the last spoken id
  // via a ref keeps StrictMode's double-invoke from re-speaking, and using a
  // bare setTimeout (no cleanup) prevents the dep-change cleanup from
  // cancelling the speech before it fires — which is what the previous
  // useEffect did, silently breaking "speak on first shown".
  const lastSpokenTargetIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (target && target.id !== lastSpokenTargetIdRef.current) {
      lastSpokenTargetIdRef.current = target.id;
      window.setTimeout(() => speakHebrew(target), 350);
    }
    // speakHebrew is stable (defined with empty-deps useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  // Speak any object's Hebrew label. Used for both the target prompt and the
  // card the child just pressed.
  const speakHebrew = useCallback((obj?: GameObject | null) => {
    const o = obj ?? targetRef.current;
    if (!o) return;
    playAudio(o.audio_he, {
      speechFallback: DEMO_SPEECH,
      speechText: o.label_he,
      speechLang: "he-IL",
    });
  }, []);

  const speakFeedback = useCallback(
    (kind: "success" | "mistake" | "tryagain") => {
      const map = {
        success: { src: MANIFEST.feedback.success, ar: "أحسنت، رائع!" },
        mistake: { src: MANIFEST.feedback.mistake, ar: "حاول مرة أخرى" },
        tryagain: {
          src: MANIFEST.feedback.try_again,
          ar: "حاول مرة أخرى، أنت تستطيع!",
        },
      }[kind];
      playAudio(map.src, {
        speechFallback: DEMO_SPEECH,
        speechText: map.ar,
        speechLang: "ar-SA",
      });
    },
    [],
  );

  const handlePress = useCallback(
    (index: 0 | 1 | 2 | 3) => {
      if (lockedRef.current) return;
      const t = targetRef.current;
      const b = boardRef.current;
      if (!t || !b[index]) return;
      const pressed = b[index];

      // Always speak the Hebrew word of the pressed card — even on a wrong
      // press it reinforces vocabulary ("you pressed כלב, not the target").
      // Feedback audio is delayed below so the word can be heard first.
      speakHebrew(pressed);

      if (pressed.id === t.id) {
        setLocked(true);
        setFeedback((prev) => {
          const next = [...prev];
          next[index] = "correct";
          return next;
        });
        setConfettiKey((k) => k + 1);
        setScore((s) => s + 10 + Math.max(0, 5 - mistakesRef.current) * 2);
        setStreak((s) => {
          const ns = s + 1;
          setBestStreak((b2) => Math.max(b2, ns));
          return ns;
        });
        setTimeout(() => speakFeedback("success"), 800);
        setShowHint(false);

        setTimeout(() => {
          const completed = roundRef.current;
          if (completed >= sessionLength && !sessionEndedRef.current) {
            sessionEndedRef.current = true;
            onSessionEnd({
              correct: completed,
              total: sessionLength,
              score: scoreRef.current,
              bestStreak: bestStreakRef.current,
              mistakes: totalMistakesRef.current,
            });
            return;
          }
          const remainingIds = new Set(
            boardRef.current.filter((_, i) => i !== index).map((o) => o.id),
          );
          const replacement = pickRandom(pool, remainingIds);
          if (!replacement) {
            // Pool exhausted — just reset feedback and pick a new target.
            setFeedback([null, null, null, null]);
            setMistakes(0);
            setTarget(null);
            setLocked(false);
            setRound((r) => r + 1);
            return;
          }
          setBoard((prev) => {
            const next = [...prev];
            next[index] = replacement;
            return next;
          });
          setFeedback([null, null, null, null]);
          setMistakes(0);
          setTarget(null);
          setLocked(false);
          setRound((r) => r + 1);
        }, 1400);
      } else {
        // Wrong
        setFeedback((prev) => {
          const next = [...prev];
          next[index] = "wrong";
          return next;
        });
        // Compute outside the state updater so StrictMode's double-invoke
        // doesn't fire the speech / hint side effects twice in dev.
        const nm = mistakesRef.current + 1;
        setMistakes(nm);
        // Delay so the just-spoken pressed-card word can finish first.
        if (nm >= HINT_THRESHOLD) {
          setShowHint(true);
          setTimeout(() => speakFeedback("tryagain"), 800);
          setTimeout(() => speakHebrew(), 1800);
        } else {
          setTimeout(() => speakFeedback("mistake"), 800);
        }
        setStreak(0);
        setTotalMistakes((m) => m + 1);
        setTimeout(() => {
          setFeedback((prev) => {
            const next = [...prev];
            if (next[index] === "wrong") next[index] = null;
            return next;
          });
        }, 700);
      }
    },
    [pool, sessionLength, onSessionEnd, speakFeedback, speakHebrew],
  );

  // Keyboard input (dev mode). Arduino is wired up via SerialInputSource later.
  useEffect(() => {
    const source = new KeyboardInputSource();
    source.start(handlePress);
    return () => source.stop();
  }, [handlePress]);

  const isCorrectFlying = feedback.includes("correct");

  return (
    <div className="game-shell" dir="rtl">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <div className="brand-mark-inner">א</div>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">نقفز في الفضاء</h1>
            <p className="brand-sub">اقفز على الكلمة الصحيحة</p>
          </div>
        </div>

        <div className="topbar-right">
          <div className="scoreboard">
            <button
              className="speaker-btn"
              onClick={() => speakHebrew()}
              aria-label="إعادة الاستماع"
            >
              <span aria-hidden="true">🔊</span>
              <span className="speaker-label">استمع</span>
            </button>
            <div className="stat">
              <div className="stat-num">{score}</div>
              <div className="stat-label">نقاط</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                {streak}
                <span className="stat-flame" aria-hidden="true">
                  🔥
                </span>
              </div>
              <div className="stat-label">سلسلة</div>
            </div>
            <div className="stat stat-quiet">
              <div className="stat-num">
                {round}
                <span className="stat-of">/{sessionLength}</span>
              </div>
              <div className="stat-label">جولة</div>
            </div>
          </div>
          <button
            className="home-btn"
            onClick={onHome}
            aria-label="العودة للقائمة"
          >
            ⌂
          </button>
        </div>
      </header>

      <section className="prompt">
        <span className="prompt-eyebrow">اسمع واضغط على...</span>
        <div className="prompt-row">
          <div className="prompt-bubble">
            <div className="prompt-words">
              <span className="prompt-he" lang="he">
                {target ? target.label_he : "..."}
              </span>
              {ALWAYS_SHOW_ARABIC && target && (
                <span className="prompt-ar" lang="ar">
                  {target.label_ar}
                </span>
              )}
            </div>
            <span className="prompt-sound" aria-hidden="true">
              🔊
            </span>
          </div>
        </div>
      </section>

      <main className="board-wrap">
        <div className="board">
          {board.map((obj, i) => (
            <ObjectCard
              key={`${i}-${obj.id}`}
              obj={obj}
              index={i}
              tint={CARD_TINTS[i]}
              state={feedback[i] ?? "idle"}
              hintActive={!!(showHint && target && obj.id !== target.id)}
              onPress={() => handlePress(i as 0 | 1 | 2 | 3)}
            />
          ))}
          <Confetti fire={isCorrectFlying ? confettiKey : 0} />
          {showHint && target && (
            <HintOverlay target={target} onDismiss={() => setShowHint(false)} />
          )}
        </div>

        <div className="board-foot">
          <span className="kbd-hint">
            <kbd>1</kbd>
            <kbd>2</kbd>
            <kbd>3</kbd>
            <kbd>4</kbd>
            <span>أو اضغط على البطاقات</span>
          </span>
          <span className="mat-hint">
            <span className="mat-dot" />
            وضع التطوير — سيتم الاتصال بسجادة القفز عبر Arduino قريباً
          </span>
        </div>
      </main>
    </div>
  );
}
