# KidLearn - Agent Rules

## Tech Stack

- **Framework:** React + Vite + TypeScript
- **Deps:** `lucide-react`, `canvas-confetti`, `framer-motion`
- **Deploy:** Vercel (auto-deploy on `git push`)

## MVP Scope

- **Flashcard Mode** — Swipe through vocabulary cards with images/emoji
- **Quiz Mode** — "Where is the \_\_\_?" pick the correct image from 3 choices
- **Deferred:** Web Speech API (TTS) → future feature

## Project Structure

```
src/
├── data/vocabulary.json    # 100 words (7 categories)
├── components/
│   ├── Card.tsx            # Image/word display
│   ├── FlashcardMode.tsx   # Learning mode
│   └── QuizMode.tsx        # Quiz game
├── App.tsx
└── main.tsx
```

## Mandatory Rules

### 1. Before starting work

- Read `docs/STATUS.md` to understand current project state.
- **`docs/PRD.md` is the canonical source of truth for product requirements.** Re-read it whenever you begin implementing a **new feature** to ensure alignment with the spec. You do NOT need to re-read it for every minor edit, bug fix, or continuation of existing work — use common sense.

### 2. After completing work

- Update `docs/STATUS.md`: mark tasks done `[x]`, in-progress `[/]`, pending `[ ]`.
- Update `docs/CHANGELOG.md`: log changes as `## [date] - Short description`.
- Update `docs/DONE.md` after finishing a task.

### 3. Testing

- **Always test thoroughly before returning results.** Successful build + local UI verification required.
- Default port: **5173**. If occupied → `kill -9 $(lsof -ti:5173)` then restart.
