# לעبة تعلم الأشياء بالعبرية — Hebrew Object Learning Game

## Overview

An interactive Phygital educational game that helps **Arabic-speaking children learn Hebrew vocabulary**. The game combines a computer screen with a physical jump-mat (4 pressure buttons connected via Arduino), creating an engaging body-movement learning experience.

**Phygital** = Physical + Digital — the child interacts with the software by jumping on buttons on the floor, making learning active and fun.

---

## Target Audience

- Arabic-speaking children (ages 4–8)
- Learning Hebrew as a second language
- Works in classroom or home settings

---

## Game Flow

### 1. Intro Page
- Simple Arabic explanation of how to play
- Teacher/parent selects session length: **5 / 10 / 15 words**
- A **Start** button begins the game

### 2. Game Session
The screen shows **4 object cards** in a 2×2 grid — these stay the same for the entire session.

Each card shows:
- A picture of the object
- The Hebrew word (large)
- The Arabic translation (smaller, below)

At the top of the screen, the **target word** is displayed:
- In **Hebrew** (large, bold)
- In **Arabic** (smaller, below it)
- The Hebrew word is also **spoken aloud** via audio

The child must jump on the mat button that matches the displayed word.

### 3. Correct Answer
- The matching card enlarges with a celebration animation
- Success audio plays in Arabic: **"أحسنت، رائع!"**
- Progress counter updates (e.g. 2/5)
- After a 1-second celebration, the next target word is shown
- The 4 cards stay the same throughout the session

### 4. Wrong Answer
- Error audio plays in Arabic: **"حاول مرة أخرى"**
- The same target word stays on screen
- The child retries

### 5. Hint System
If the child gets the **same word wrong 3 times in a row**:
- The correct card pulses / glows to guide the child

If wrong **3 times in a row**:
- The correct card is clearly highlighted
- The target audio replays automatically
- An Arabic encouragement plays: **"حاول مرة أخرى، أنت تستطيع!"**

### 6. Session Complete
After the child correctly matches all N target words:
- A **celebration screen** appears with animation/confetti
- Message in Arabic: **"أحسنت! أنهيت اللعبة!"**
- Shows words learned count: **"تعلمت 5 كلمات جديدة!"**
- Options: **Play Again** | **Back to Home**

---

## Session Design

| Setting | Words Taught |
|---------|-------------|
| Short   | 5 words      |
| Medium  | 10 words     |
| Long    | 15 words     |

- The **4 object cards stay fixed** for the entire session
- The game cycles through them as targets (each word must be matched once)
- Order of target words is **randomized** at session start

---

## Language Strategy

| Element | Language | Reason |
|---------|----------|--------|
| Target word (displayed) | Hebrew + Arabic | Learn the Hebrew word, Arabic for context |
| Target word (audio) | Hebrew only | Trains Hebrew sound recognition |
| Success/error feedback | Arabic | Child understands without confusion |
| Card labels | Hebrew + Arabic | Support during learning |
| UI chrome / buttons | Arabic | Native language for navigation |

---

## Hardware Setup

### Electronics
| Component | Spec | Purpose |
|-----------|------|---------|
| Microcontroller | Arduino Leonardo | Reads sensors, sends input to PC (can emulate keyboard) |
| Pressure sensors | 4× FSR406 | Detect jumps on each mat button |
| Resistors | 4× 10kΩ | Voltage dividers to read sensor resistance as voltage |
| Cable | Cat5e network cable | Carry all 4 sensor signals from mat to control box |
| Board | Breadboard → Perfboard | Connect and secure components |

### Physical Mat (top to bottom layers)
1. **Floor** — hard surface base
2. **EVA foam** — absorbs jump impact; wire channels carved inside
3. **FSR406 sensor** — adhered to foam at each button zone
4. **Force concentrator disc** — rigid ~4cm disc on sensor to focus jump weight
5. **PVC tarp / canvas cover** — protective layer with 4 printed/drawn buttons

### Communication Protocol
Arduino → PC via USB serial at **9600 baud**:
```
PRESS:1\n   // top-right card
PRESS:2\n   // top-left card
PRESS:3\n   // bottom-right card
PRESS:4\n   // bottom-left card
```

Card position mapping (RTL):

```
[ 2 ] [ 1 ]
[ 4 ] [ 3 ]
```

---

## Software Architecture

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React + Vite + TypeScript |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Arduino bridge | Web Serial API |
| Assets | Static files via JSON manifest |

### Asset Manifest (`/public/assets/manifest.json`)
```json
{
  "objects": [
    {
      "id": "apple",
      "label_he": "תפוח",
      "label_ar": "تفاحة",
      "image": "/assets/images/apple.png",
      "audio_he": "/assets/audio/he/apple.mp3"
    }
  ],
  "feedback": {
    "success": "/assets/audio/ar/success.mp3",
    "mistake": "/assets/audio/ar/mistake.mp3",
    "try_again": "/assets/audio/ar/try_again.mp3"
  }
}
```

### Input Modes
- **Dev mode**: keyboard keys `1` `2` `3` `4` simulate mat presses (for development without hardware)
- **Production mode**: Web Serial API reads Arduino output

---

## Word Pool (50 words)

| # | Hebrew | Arabic | Category |
|---|--------|--------|----------|
| 1 | חתול | قطة | Animals |
| 2 | כלב | كلب | Animals |
| 3 | ציפור | عصفور | Animals |
| 4 | דג | سمكة | Animals |
| 5 | ארנב | أرنب | Animals |
| 6 | תפוח | تفاحة | Fruits |
| 7 | בננה | موزة | Fruits |
| 8 | תפוז | برتقالة | Fruits |
| 9 | תות | فراولة | Fruits |
| 10 | ענב | عنب | Fruits |
| 11 | לימון | ليمون | Fruits |
| 12 | אגס | كمثرى | Fruits |
| 13 | אבטיח | بطيخ | Fruits |
| 14 | עגבנייה | طماطم | Vegetables |
| 15 | מלפפון | خيار | Vegetables |
| 16 | גזר | جزرة | Vegetables |
| 17 | תירס | ذرة | Vegetables |
| 18 | בצל | بصلة | Vegetables |
| 19 | אפונה | بازلاء | Vegetables |
| 20 | ראש | رأس | Body Parts |
| 21 | עיניים | عيون | Body Parts |
| 22 | אף | أنف | Body Parts |
| 23 | פה | فم | Body Parts |
| 24 | אוזן | أذن | Body Parts |
| 25 | יד | يد | Body Parts |
| 26 | רגל | قدم | Body Parts |
| 27 | בטן | بطن | Body Parts |
| 28 | חולצה | قميص | Clothing |
| 29 | מכנסיים | بنطلون | Clothing |
| 30 | נעליים | حذاء | Clothing |
| 31 | כובע | قبعة | Clothing |
| 32 | תיק | حقيبة | Clothing |
| 33 | גרב | جورب | Clothing |
| 34 | כסא | كرسي | Household |
| 35 | שולחן | طاولة | Household |
| 36 | מיטה | سرير | Household |
| 37 | דלת | باب | Household |
| 38 | חלון | نافذة | Household |
| 39 | כוס | كوب | Household |
| 40 | צלחת | طبق | Household |
| 41 | כף | ملعقة | Household |
| 42 | אדום | أحمر | Colors |
| 43 | כחול | أزرق | Colors |
| 44 | צהוב | أصفر | Colors |
| 45 | ירוק | أخضر | Colors |
| 46 | שחור | أسود | Colors |
| 47 | לבן | أبيض | Colors |
| 48 | אור | ضوء | Common |
| 49 | מים | ماء | Common |
| 50 | ספר | كتاب | Common |

---

## Directory Structure

```
game/
├── GAME_SPEC.md              ← this file
├── public/
│   └── assets/
│       ├── manifest.json
│       ├── images/           ← one PNG per object (id.png)
│       └── audio/
│           ├── he/           ← Hebrew word audio (id.mp3)
│           └── ar/           ← Arabic feedback audio
└── src/
    ├── components/
    │   ├── IntroPage.tsx
    │   ├── GameBoard.tsx
    │   ├── ObjectCard.tsx
    │   ├── TargetWord.tsx
    │   ├── HintOverlay.tsx
    │   ├── ProgressBar.tsx
    │   └── SuccessScreen.tsx
    ├── game/
    │   ├── useGameState.ts
    │   └── objectPool.ts
    ├── input/
    │   ├── InputSource.ts
    │   ├── KeyboardInputSource.ts
    │   └── SerialInputSource.ts
    ├── audio/
    │   └── AudioPlayer.ts
    ├── assets/
    │   └── manifest.ts
    ├── App.tsx
    └── main.tsx
```

---

## Asset Collection Checklist

For each word in the pool, collect:
- [ ] `/public/assets/images/{id}.png` — clear illustration or photo, square crop, child-friendly
- [ ] `/public/assets/audio/he/{id}.mp3` — native Hebrew speaker, clear pronunciation, no background noise

Shared feedback audio to record:
- [ ] `ar/success.mp3` — "أحسنت، رائع!"
- [ ] `ar/mistake.mp3` — "حاول مرة أخرى"
- [ ] `ar/try_again.mp3` — "حاول مرة أخرى، أنت تستطيع!"
