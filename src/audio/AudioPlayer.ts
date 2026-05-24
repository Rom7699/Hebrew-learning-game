type PlayOptions = {
  speechFallback?: boolean;
  speechText?: string;
  speechLang?: string;
};

// Tries to play the file; if it fails (missing/blocked) and a speech fallback
// is supplied, speaks the text via the browser's TTS so the prototype is
// playtestable before real audio assets exist.
export function playAudio(src: string, opts: PlayOptions = {}) {
  try {
    const a = new Audio(src);
    a.play().catch(() => {
      if (opts.speechFallback && "speechSynthesis" in window && opts.speechText) {
        const u = new SpeechSynthesisUtterance(opts.speechText);
        u.lang = opts.speechLang ?? "he-IL";
        u.rate = 0.85;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    });
  } catch {
    /* noop */
  }
}
