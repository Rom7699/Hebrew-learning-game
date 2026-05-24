# Hebrew Object Learning Game — لعبة تعلم الأشياء بالعبرية

An interactive **phygital** educational game that helps Arabic-speaking children (ages 4–8) learn Hebrew vocabulary. The child sees four object cards on screen, hears a Hebrew word, and jumps on the matching button on a physical pressure-sensor mat (Arduino).

This repo currently contains the **UI prototype** (Vite + React + TypeScript). Arduino integration via Web Serial is stubbed and will be wired up in a later pass.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

**Dev controls:** press `1` / `2` / `3` / `4` to simulate the mat buttons, or click the cards directly.

## Project structure

```
src/
├── App.tsx                # view router (intro → launch → game → summary)
├── components/            # UI components (intro, board, cards, hint, confetti, etc.)
├── game/objectPool.ts     # 48-word manifest with Hebrew/Arabic labels
├── audio/AudioPlayer.ts   # mp3 player with Web Speech fallback
├── input/
│   ├── InputSource.ts            # interface
│   ├── KeyboardInputSource.ts    # dev mode (1/2/3/4 keys)
│   └── SerialInputSource.ts      # Arduino bridge (stub, TODO)
└── index.css              # all styles
```

## Assets

Drop real audio and images into `public/assets/`:
- `images/<id>.png` — illustration per object (emoji is used as a placeholder)
- `audio/he/<id>.mp3` — Hebrew word pronunciation
- `audio/ar/{success,mistake,try_again}.mp3` — Arabic feedback

Until real files exist, the app falls back to the browser's Web Speech API.

## Hardware (planned)

- Arduino Leonardo + 4× FSR406 pressure sensors → USB serial at 9600 baud
- Protocol: newline-delimited `PRESS:1\n` ... `PRESS:4\n` messages

See [`GAME_SPEC.md`](./GAME_SPEC.md) for the full design.
