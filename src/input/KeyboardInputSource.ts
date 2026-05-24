import type { InputSource, PressHandler } from "./InputSource";

export class KeyboardInputSource implements InputSource {
  readonly kind = "keyboard" as const;
  private handler: ((e: KeyboardEvent) => void) | null = null;

  start(onPress: PressHandler) {
    this.handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName ?? "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const map: Record<string, 0 | 1 | 2 | 3> = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (e.key in map) {
        e.preventDefault();
        onPress(map[e.key]);
      }
    };
    window.addEventListener("keydown", this.handler);
  }

  stop() {
    if (this.handler) window.removeEventListener("keydown", this.handler);
    this.handler = null;
  }
}
