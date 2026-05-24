import type { InputSource, PressHandler } from "./InputSource";

// Placeholder. Arduino → PC sends newline-delimited messages over Web Serial
// at 9600 baud:  PRESS:1\n  PRESS:2\n  PRESS:3\n  PRESS:4\n
// Wiring will happen in a later pass — for now this is a stub the game can
// import without crashing.
export class SerialInputSource implements InputSource {
  readonly kind = "serial" as const;

  async start(_onPress: PressHandler) {
    // TODO(arduino):
    // 1. const port = await (navigator as any).serial.requestPort();
    // 2. await port.open({ baudRate: 9600 });
    // 3. pipe through TextDecoderStream, read lines, match /^PRESS:([1-4])$/,
    //    call onPress(Number(match[1]) - 1 as 0|1|2|3).
    throw new Error("SerialInputSource not yet implemented");
  }

  async stop() {
    // TODO(arduino): cancel reader, close port.
  }
}
