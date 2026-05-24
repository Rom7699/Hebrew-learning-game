import { useCallback, useState } from "react";
import { SpaceBackground } from "./components/SpaceBackground";
import { IntroPage } from "./components/IntroPage";
import { RocketLaunch } from "./components/RocketLaunch";
import { GameBoard } from "./components/GameBoard";
import {
  SuccessScreen,
  type SessionStats,
} from "./components/SuccessScreen";

type View = "intro" | "launching" | "playing" | "summary";

export default function App() {
  const [view, setView] = useState<View>("intro");
  const [sessionLength, setSessionLength] = useState(10);
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);
  const [gameKey, setGameKey] = useState(0);

  const startSession = useCallback((length: number) => {
    setSessionLength(length);
    setSessionStats(null);
    setView("launching");
    setTimeout(() => {
      setGameKey((k) => k + 1);
      setView("playing");
    }, 1400);
  }, []);

  const handleSessionEnd = useCallback((stats: SessionStats) => {
    setSessionStats(stats);
    setView("summary");
  }, []);

  const goHome = useCallback(() => {
    setView("intro");
    setSessionStats(null);
  }, []);

  return (
    <>
      <SpaceBackground />
      {view === "intro" && <IntroPage onStart={startSession} />}
      {view === "launching" && <RocketLaunch />}
      {view === "playing" && (
        <GameBoard
          key={gameKey}
          sessionLength={sessionLength}
          onSessionEnd={handleSessionEnd}
          onHome={goHome}
        />
      )}
      {view === "summary" && sessionStats && (
        <SuccessScreen
          stats={sessionStats}
          onPlayAgain={() => startSession(sessionLength)}
          onHome={goHome}
        />
      )}
    </>
  );
}
