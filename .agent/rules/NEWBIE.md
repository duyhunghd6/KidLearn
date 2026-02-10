# KidLearn - Agent Rules

## Tech Stack

- **Framework:** React + Vite + TypeScript
- **Deps:** `lucide-react`, `canvas-confetti`, `framer-motion`
- **Testing:** Vitest + React Testing Library
- **Deploy:** Vercel (auto-deploy on `git push`)

## MVP Scope

- **Flashcard Mode** — Swipe through vocabulary cards with images/emoji
- **Quiz Mode** — "Where is the \_\_\_?" pick the correct image from 3 choices
- **Deferred:** Web Speech API (TTS) → future feature

## Project Structure

```
src/
├── __tests__/              # Unit tests
├── data/vocabulary.json    # 100 words (7 categories)
├── components/
│   ├── Card.tsx            # Image/word display
│   ├── CategorySelector.tsx # Topic picker
│   ├── FlashcardMode.tsx   # Learning mode
│   ├── Logo.tsx            # SVG logo
│   └── QuizMode.tsx        # Quiz game
├── utils/speech.ts         # Web Speech API helper
├── App.tsx
└── main.tsx
```

## Mandatory Rules

### 1. Before starting work

- Read `docs/STATUS.md` to understand current project state.
- **`docs/PRD.md` is the canonical source of truth for product requirements.** Re-read it whenever you begin implementing a **new feature** to ensure alignment with the spec. You do NOT need to re-read it for every minor edit, bug fix, or continuation of existing work — use common sense.
- **ALWAYS read `docs/ARCHITECTURE.md` before coding a new feature.** It is the single source of truth for how the codebase is structured. Do NOT modify any important component, data flow, or design pattern without first reading ARCHITECTURE.md. If you believe ARCHITECTURE.md is outdated or incorrect, **ASK the user before updating it** — changes to the architecture doc often cascade to many code files and require careful human review.

### 2. After completing work

- Update `docs/STATUS.md`: mark tasks done `[x]`, in-progress `[/]`, pending `[ ]`.
- Update `docs/CHANGELOG.md`: log changes as `## [date] - Short description`.
- Update `docs/DONE.md` after finishing a task.

### 3. Testing

- **Always test thoroughly before returning results.** Successful build + local UI verification required.
- **You MUST write unit tests and run `npm test` every time you complete a task that adds, modifies, or deletes any code file.** All existing tests must pass before you report the task as done. If you added new functionality, write corresponding tests for it.
- Default port: **5173**. If occupied → `kill -9 $(lsof -ti:5173)` then restart.
