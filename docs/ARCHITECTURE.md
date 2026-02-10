# KidLearn Architecture

## Overview

KidLearn is a single-page React application for teaching English vocabulary to children aged 3–6. It uses a **component-based architecture** with **static JSON data** and **no backend**.

## Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| UI Framework | React 18 + TypeScript           |
| Build Tool   | Vite                            |
| Animations   | Framer Motion                   |
| Icons        | Lucide React                    |
| Effects      | canvas-confetti                 |
| Audio        | Web Speech API (browser native) |
| Testing      | Vitest + React Testing Library  |
| Deployment   | Vercel                          |

## Directory Structure

```
src/
├── __tests__/                 # Unit tests (mirrors component names)
│   ├── App.test.tsx
│   ├── Card.test.tsx
│   ├── CategorySelector.test.tsx
│   ├── FlashcardMode.test.tsx
│   ├── Logo.test.tsx
│   ├── QuizMode.test.tsx
│   ├── speech.test.ts
│   └── vocabulary.test.ts
├── components/
│   ├── Card.tsx               # Reusable word card (emoji + text)
│   ├── CategorySelector.tsx   # Home: category grid with Learn/Play buttons
│   ├── FlashcardMode.tsx      # Learning mode: swipe through vocab cards
│   ├── Logo.tsx               # SVG logo component
│   └── QuizMode.tsx           # Quiz mode: "Where is the ___?"
├── data/
│   └── vocabulary.json        # 100 words across 7 categories (single source of truth)
├── utils/
│   └── speech.ts              # Web Speech API wrapper (speak, speakQuestion)
├── App.tsx                    # Root: routing + mode switching + header
├── index.css                  # Global styles + design system (CSS variables)
├── main.tsx                   # React entry point
├── setupTests.ts              # Vitest setup (mocks for Speech API, confetti)
├── types.ts                   # Shared TypeScript types (Word, Category, AppMode)
└── vite-env.d.ts              # Vite type declarations
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                    App.tsx                       │
│  ┌─────────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Header     │  │ Mode Nav │  │ Home Btn │   │
│  │   (Logo)     │  │ Học/Chơi │  │          │   │
│  └─────────────┘  └──────────┘  └──────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │ AnimatePresence (mode="wait")            │   │
│  │                                          │   │
│  │  mode=home      → CategorySelector       │   │
│  │  mode=flashcard → FlashcardMode          │   │
│  │  mode=quiz      → QuizMode               │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌─────────────────┐
│  FlashcardMode  │  │    QuizMode     │
│  ┌───────────┐  │  │  ┌───────────┐  │
│  │  Card     │  │  │  │  Card x3  │  │
│  │  (normal) │  │  │  │  (small)  │  │
│  └───────────┘  │  │  └───────────┘  │
│  speak()        │  │  speakQuestion()│
│  Nav dots       │  │  confetti()     │
│  Swipe gestures │  │  Score tracking │
└─────────────────┘  └─────────────────┘
```

## Data Flow

```
vocabulary.json → App.tsx → [CategorySelector | FlashcardMode | QuizMode]
                    │
                    ├── categories: Category[]
                    ├── mode: 'home' | 'flashcard' | 'quiz'
                    └── selectedCategory: Category | null
```

**State is fully client-side.** No server, no database, no local storage (MVP).

## Key Types

```typescript
interface Word {
  en: string; // English word (lowercase)
  vi: string; // Vietnamese translation
  emoji: string; // Emoji representation
}

interface Category {
  category: string; // Machine key: 'animals', 'fruits', etc.
  label: string; // Display name in Vietnamese
  emoji: string; // Category icon emoji
  words: Word[]; // Array of words in this category
}

type AppMode = "home" | "flashcard" | "quiz";
```

## Component Responsibilities

### `Card.tsx`

- Renders a single word card with emoji, English text, and Vietnamese text
- Two sizes: `normal` (flashcard) and `small` (quiz choice — emoji only)
- Framer Motion animations: shake (wrong answer), hover/tap effects
- Visual states: `dimmed` (wrong, already tried), `disabled`
- Accessibility: `aria-label` on emoji `role="img"`

### `FlashcardMode.tsx`

- Displays one `Card` at a time in `normal` size
- Swipe gestures via Framer Motion `drag="x"`
- Navigation: Previous/Next buttons + dot indicators
- Click card → shake animation + speak word via Web Speech API
- Dedicated speak button (Volume2 icon)

### `QuizMode.tsx`

- Generates 3 choices: 1 correct + 2 random wrong (from same category)
- Question format: "Where is the **[word]**?"
- Auto-speaks question on mount via `speakQuestion()`
- Correct answer → confetti + "Yeah!" + auto-advance after 1.8s
- Wrong answer → shake card 0.5s → dim card (can't re-click)
- Score tracking: `⭐ N` display
- Skip button for difficult words
- Completion screen with score and restart option
- Shuffles words on init for variety

### `CategorySelector.tsx`

- Grid of category cards with emoji, Vietnamese label, word count
- Two action buttons per category: "📖 Học" (flashcard) and "🎮 Chơi" (quiz)
- Staggered entrance animation via Framer Motion variants

### `Logo.tsx`

- Inline SVG component (no external file dependency)
- Depicts open book + graduation cap + sparkles
- Configurable `size` prop (default: 36px)
- `aria-label="KidLearn logo"` for accessibility

## Design System (`index.css`)

```css
/* Core palette */
--bg-primary: #fff9e6; /* Warm cream background */
--color-primary: #4ecdc4; /* Teal — buttons, accents */
--color-accent: #ff6b6b; /* Red-pink — play/quiz theme */
--color-success: #2ecc71; /* Green — correct answers */
--color-purple: #a78bfa; /* Purple — speak button */
--color-yellow: #ffe66d; /* Yellow — highlights */
--font-main: "Nunito", sans-serif;
```

Key design patterns:

- **Mobile-first responsive** (media queries for `>480px`, `>768px`, `>1024px`)
- **BEM naming**: `.block__element--modifier`
- **Large touch targets**: min 44px for child-friendly interaction
- **Glassmorphism header**: `backdrop-filter: blur()`
- **Card shadows**: Subtle elevation for depth perception

## Testing Architecture

- **Framework**: Vitest (zero-config with Vite)
- **DOM**: jsdom environment
- **Assertions**: `@testing-library/jest-dom` for DOM matchers
- **User events**: `@testing-library/user-event` for realistic interactions
- **Mocks** (in `setupTests.ts`):
  - `window.speechSynthesis` — mock speak/cancel
  - `SpeechSynthesisUtterance` — mock class
  - `canvas-confetti` — vi.fn()

Run tests:

```bash
npm test           # Single run
npm run test:watch # Watch mode
```

## Adding New Vocabulary

Edit `src/data/vocabulary.json`:

```json
{
  "category": "new_category",
  "label": "Vietnamese Label",
  "emoji": "🆕",
  "words": [{ "en": "word", "vi": "từ", "emoji": "📝" }]
}
```

**Rules:**

1. English words must be lowercase
2. No duplicate English words within a category
3. Minimum 3 words per category (quiz needs 3 choices)
4. Each word must have `en`, `vi`, and `emoji` fields

## Build & Deploy

```bash
npm run dev        # Start dev server (port 5173)
npm run build      # Production build → dist/
npm run test       # Run all tests
```

Deploy: Push to `main` branch → Vercel auto-deploys (if GitHub integration is connected), or run `npx vercel deploy --prod`.
