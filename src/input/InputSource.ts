export type PressHandler = (index: 0 | 1 | 2 | 3) => void;

export interface InputSource {
  readonly kind: "keyboard" | "serial";
  start(onPress: PressHandler): void | Promise<void>;
  stop(): void | Promise<void>;
}
