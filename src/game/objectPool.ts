export type Category =
  | "animals"
  | "fruits"
  | "vegetables"
  | "body"
  | "clothing"
  | "household"
  | "colors"
  | "bonus";

export type GameObject = {
  id: string;
  category: Category;
  label_he: string;
  label_ar: string;
  emoji?: string;
  swatch?: string;
  image: string;
  audio_he: string;
};

export type FeedbackAudio = {
  success: string;
  mistake: string;
  try_again: string;
};

export type Manifest = {
  objects: GameObject[];
  feedback: FeedbackAudio;
};

// Mirrors /public/assets/manifest.json. Inlined so the game can render
// without a fetch round-trip; emoji + swatch hints are added here since the
// JSON manifest only describes real assets.
export const MANIFEST: Manifest = {
  objects: [
    // Animals
    { id: "cat",        category: "animals",    label_he: "חָתוּל",     label_ar: "قطة",     emoji: "🐱", image: "/assets/images/cat.png",        audio_he: "/assets/audio/he/cat.mp3" },
    { id: "dog",        category: "animals",    label_he: "כֶּלֶב",      label_ar: "كلب",     emoji: "🐶", image: "/assets/images/dog.png",        audio_he: "/assets/audio/he/dog.mp3" },
    { id: "bird",       category: "animals",    label_he: "צִיפּוֹר",    label_ar: "عصفور",   emoji: "🐦", image: "/assets/images/bird.png",       audio_he: "/assets/audio/he/bird.mp3" },
    { id: "fish",       category: "animals",    label_he: "דָּג",       label_ar: "سمكة",    emoji: "🐟", image: "/assets/images/fish.png",       audio_he: "/assets/audio/he/fish.mp3" },
    { id: "rabbit",     category: "animals",    label_he: "אַרְנָב",     label_ar: "أرنب",    emoji: "🐰", image: "/assets/images/rabbit.png",     audio_he: "/assets/audio/he/rabbit.mp3" },
    // Fruits
    { id: "apple",      category: "fruits",     label_he: "תַּפּוּחַ",     label_ar: "تفاحة",   emoji: "🍎", image: "/assets/images/apple.png",      audio_he: "/assets/audio/he/apple.mp3" },
    { id: "banana",     category: "fruits",     label_he: "בָּנָנָה",      label_ar: "موزة",    emoji: "🍌", image: "/assets/images/banana.png",     audio_he: "/assets/audio/he/banana.mp3" },
    { id: "orange",     category: "fruits",     label_he: "תַּפּוּז",     label_ar: "برتقالة", emoji: "🍊", image: "/assets/images/orange.png",     audio_he: "/assets/audio/he/orange.mp3" },
    { id: "strawberry", category: "fruits",     label_he: "תּוּת",      label_ar: "فراولة",  emoji: "🍓", image: "/assets/images/strawberry.png", audio_he: "/assets/audio/he/strawberry.mp3" },
    { id: "grapes",     category: "fruits",     label_he: "עֵנָב",      label_ar: "عنب",     emoji: "🍇", image: "/assets/images/grapes.png",     audio_he: "/assets/audio/he/grapes.mp3" },
    { id: "lemon",      category: "fruits",     label_he: "לִימוֹן",    label_ar: "ليمون",   emoji: "🍋", image: "/assets/images/lemon.png",      audio_he: "/assets/audio/he/lemon.mp3" },
    { id: "pear",       category: "fruits",     label_he: "אַגָּס",      label_ar: "إجاص",    emoji: "🍐", image: "/assets/images/pear.png",       audio_he: "/assets/audio/he/pear.mp3" },
    { id: "watermelon", category: "fruits",     label_he: "אֲבַטִּיחַ",    label_ar: "بطيخ",    emoji: "🍉", image: "/assets/images/watermelon.png", audio_he: "/assets/audio/he/watermelon.mp3" },
    // Vegetables
    { id: "tomato",     category: "vegetables", label_he: "עַגְבָנִיָּה",  label_ar: "طماطم",   emoji: "🍅", image: "/assets/images/tomato.png",     audio_he: "/assets/audio/he/tomato.mp3" },
    { id: "cucumber",   category: "vegetables", label_he: "מְלָפְפוֹן",   label_ar: "خيار",    emoji: "🥒", image: "/assets/images/cucumber.png",   audio_he: "/assets/audio/he/cucumber.mp3" },
    { id: "carrot",     category: "vegetables", label_he: "גֶּזֶר",      label_ar: "جزرة",    emoji: "🥕", image: "/assets/images/carrot.png",     audio_he: "/assets/audio/he/carrot.mp3" },
    { id: "corn",       category: "vegetables", label_he: "תִּירָס",     label_ar: "ذرة",     emoji: "🌽", image: "/assets/images/corn.png",       audio_he: "/assets/audio/he/corn.mp3" },
    { id: "onion",      category: "vegetables", label_he: "בָּצָל",      label_ar: "بصلة",    emoji: "🧅", image: "/assets/images/onion.png",      audio_he: "/assets/audio/he/onion.mp3" },
    { id: "pea",        category: "vegetables", label_he: "אֲפוּנָה",    label_ar: "بازلاء",  emoji: "🫛", image: "/assets/images/pea.png",        audio_he: "/assets/audio/he/pea.mp3" },
    // Body
    { id: "head",       category: "body",       label_he: "רֹאשׁ",      label_ar: "رأس",     emoji: "🧑", image: "/assets/images/head.png",       audio_he: "/assets/audio/he/head.mp3" },
    { id: "eyes",       category: "body",       label_he: "עֵינַיִים",   label_ar: "عيون",    emoji: "👀", image: "/assets/images/eyes.png",       audio_he: "/assets/audio/he/eyes.mp3" },
    { id: "nose",       category: "body",       label_he: "אַף",       label_ar: "أنف",     emoji: "👃", image: "/assets/images/nose.png",       audio_he: "/assets/audio/he/nose.mp3" },
    { id: "mouth",      category: "body",       label_he: "פֶּה",       label_ar: "فم",      emoji: "👄", image: "/assets/images/mouth.png",      audio_he: "/assets/audio/he/mouth.mp3" },
    { id: "ear",        category: "body",       label_he: "אוֹזֶן",     label_ar: "أذن",     emoji: "👂", image: "/assets/images/ear.png",        audio_he: "/assets/audio/he/ear.mp3" },
    { id: "hand",       category: "body",       label_he: "יָד",       label_ar: "يد",      emoji: "✋", image: "/assets/images/hand.png",       audio_he: "/assets/audio/he/hand.mp3" },
    { id: "foot",       category: "body",       label_he: "רֶגֶל",      label_ar: "قدم",     emoji: "🦶", image: "/assets/images/foot.png",       audio_he: "/assets/audio/he/foot.mp3" },
    { id: "belly",      category: "body",       label_he: "בֶּטֶן",      label_ar: "بطن",     emoji: "🫃", image: "/assets/images/belly.png",      audio_he: "/assets/audio/he/belly.mp3" },
    // Clothing
    { id: "shirt",      category: "clothing",   label_he: "חוּלְצָה",    label_ar: "قميص",    emoji: "👕", image: "/assets/images/shirt.png",      audio_he: "/assets/audio/he/shirt.mp3" },
    { id: "pants",      category: "clothing",   label_he: "מִכְנָסַיִים",  label_ar: "بنطال",   emoji: "👖", image: "/assets/images/pants.png",      audio_he: "/assets/audio/he/pants.mp3" },
    { id: "shoes",      category: "clothing",   label_he: "נַעֲלַיִים",   label_ar: "حذاء",    emoji: "👟", image: "/assets/images/shoes.png",      audio_he: "/assets/audio/he/shoes.mp3" },
    { id: "hat",        category: "clothing",   label_he: "כּוֹבַע",     label_ar: "قبعة",    emoji: "🧢", image: "/assets/images/hat.png",        audio_he: "/assets/audio/he/hat.mp3" },
    { id: "bag",        category: "clothing",   label_he: "תִּיק",      label_ar: "حقيبة",   emoji: "🎒", image: "/assets/images/bag.png",        audio_he: "/assets/audio/he/bag.mp3" },
    { id: "sock",       category: "clothing",   label_he: "גֶּרֶב",      label_ar: "جورب",    emoji: "🧦", image: "/assets/images/sock.png",       audio_he: "/assets/audio/he/sock.mp3" },
    // Household
    { id: "chair",      category: "household",  label_he: "כִּיסֵּא",     label_ar: "كرسي",    emoji: "🪑", image: "/assets/images/chair.png",      audio_he: "/assets/audio/he/chair.mp3" },
    { id: "table",      category: "household",  label_he: "שׁוּלְחָן",    label_ar: "طاولة",   emoji: "🍽️", image: "/assets/images/table.png",      audio_he: "/assets/audio/he/table.mp3" },
    { id: "bed",        category: "household",  label_he: "מִיטָּה",     label_ar: "سرير",    emoji: "🛏️", image: "/assets/images/bed.png",        audio_he: "/assets/audio/he/bed.mp3" },
    { id: "door",       category: "household",  label_he: "דֶּלֶת",      label_ar: "باب",     emoji: "🚪", image: "/assets/images/door.png",       audio_he: "/assets/audio/he/door.mp3" },
    { id: "window",     category: "household",  label_he: "חַלּוֹן",     label_ar: "نافذة",   emoji: "🪟", image: "/assets/images/window.png",     audio_he: "/assets/audio/he/window.mp3" },
    { id: "cup",        category: "household",  label_he: "כּוֹס",      label_ar: "كوب",     emoji: "🥛", image: "/assets/images/cup.png",        audio_he: "/assets/audio/he/cup.mp3" },
    { id: "plate",      category: "household",  label_he: "צַלַּחַת",     label_ar: "صحن",     emoji: "🍽", image: "/assets/images/plate.png",      audio_he: "/assets/audio/he/plate.mp3" },
    { id: "spoon",      category: "household",  label_he: "כַּף",       label_ar: "ملعقة",   emoji: "🥄", image: "/assets/images/spoon.png",      audio_he: "/assets/audio/he/spoon.mp3" },
    // Colors (rendered as swatches)
    { id: "red",    category: "colors", label_he: "אָדוֹם", label_ar: "أحمر", swatch: "#E85D5D", image: "/assets/images/red.png",    audio_he: "/assets/audio/he/red.mp3" },
    { id: "blue",   category: "colors", label_he: "כָּחוֹל", label_ar: "أزرق", swatch: "#4A90E2", image: "/assets/images/blue.png",   audio_he: "/assets/audio/he/blue.mp3" },
    { id: "yellow", category: "colors", label_he: "צָהוֹב", label_ar: "أصفر", swatch: "#F5C24A", image: "/assets/images/yellow.png", audio_he: "/assets/audio/he/yellow.mp3" },
    { id: "green",  category: "colors", label_he: "יָרוֹק", label_ar: "أخضر", swatch: "#6DBE6D", image: "/assets/images/green.png",  audio_he: "/assets/audio/he/green.mp3" },
    { id: "black",  category: "colors", label_he: "שָׁחוֹר", label_ar: "أسود", swatch: "#2D2A2A", image: "/assets/images/black.png",  audio_he: "/assets/audio/he/black.mp3" },
    { id: "white",  category: "colors", label_he: "לָבָן",  label_ar: "أبيض", swatch: "#FAFAFA", image: "/assets/images/white.png",  audio_he: "/assets/audio/he/white.mp3" },
    // Bonus
    { id: "light",  category: "bonus", label_he: "אוֹר", label_ar: "ضوء", emoji: "💡", image: "/assets/images/light.png", audio_he: "/assets/audio/he/light.mp3" },
    { id: "sound",  category: "bonus", label_he: "קוֹל", label_ar: "صوت", emoji: "🔊", image: "/assets/images/sound.png", audio_he: "/assets/audio/he/sound.mp3" },
  ],
  feedback: {
    success:   "/assets/audio/ar/success.mp3",
    mistake:   "/assets/audio/ar/mistake.mp3",
    try_again: "/assets/audio/ar/try_again.mp3",
  },
};

export const CATEGORY_LABELS_AR: Record<Category, string> = {
  animals:    "حيوانات",
  fruits:     "فواكه",
  vegetables: "خضروات",
  body:       "أعضاء الجسم",
  clothing:   "ملابس",
  household:  "أدوات المنزل",
  colors:     "ألوان",
  bonus:      "إضافي",
};

export function pickRandom(
  arr: GameObject[],
  excludeIds: Set<string> = new Set(),
): GameObject | null {
  const pool = arr.filter((o) => !excludeIds.has(o.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function buildInitialBoard(pool: GameObject[]): GameObject[] {
  const board: GameObject[] = [];
  const used = new Set<string>();
  while (board.length < 4 && board.length < pool.length) {
    const next = pickRandom(pool, used);
    if (!next) break;
    board.push(next);
    used.add(next.id);
  }
  return board;
}
