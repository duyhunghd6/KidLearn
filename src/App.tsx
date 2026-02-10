import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Gamepad2, Home } from 'lucide-react';
import Logo from './components/Logo';
import CategorySelector from './components/CategorySelector';
import FlashcardMode from './components/FlashcardMode';
import QuizMode from './components/QuizMode';
import vocabularyData from './data/vocabulary.json';
import type { Category, AppMode } from './types';

const categories = vocabularyData as Category[];

export default function App() {
  const [mode, setMode] = useState<AppMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSelectCategory = (category: Category, selectedMode: AppMode) => {
    setSelectedCategory(category);
    setMode(selectedMode);
  };

  const handleGoHome = () => {
    setMode('home');
    setSelectedCategory(null);
  };

  const handleSwitchMode = (newMode: AppMode) => {
    if (newMode === 'home') {
      handleGoHome();
    } else {
      setMode(newMode);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <button className="header__home" onClick={handleGoHome}>
          <Logo size={36} />
          <h1 className="header__title">KidLearn</h1>
        </button>

        {mode !== 'home' && (
          <nav className="header__nav">
            <button
              className={`header__mode-btn ${mode === 'flashcard' ? 'header__mode-btn--active' : ''}`}
              onClick={() => handleSwitchMode('flashcard')}
              aria-label="Flashcard mode"
            >
              <BookOpen size={20} />
              <span>Học</span>
            </button>
            <button
              className={`header__mode-btn ${mode === 'quiz' ? 'header__mode-btn--active' : ''}`}
              onClick={() => handleSwitchMode('quiz')}
              aria-label="Quiz mode"
            >
              <Gamepad2 size={20} />
              <span>Chơi</span>
            </button>
          </nav>
        )}

        {mode !== 'home' && (
          <button className="header__back-btn" onClick={handleGoHome} aria-label="Back to home">
            <Home size={20} />
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="main">
        <AnimatePresence mode="wait">
          {mode === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CategorySelector
                categories={categories}
                onSelect={handleSelectCategory}
              />
            </motion.div>
          )}

          {mode === 'flashcard' && selectedCategory && (
            <motion.div
              key={`flashcard-${selectedCategory.category}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <FlashcardMode
                words={selectedCategory.words}
                categoryLabel={selectedCategory.label}
              />
            </motion.div>
          )}

          {mode === 'quiz' && selectedCategory && (
            <motion.div
              key={`quiz-${selectedCategory.category}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuizMode
                words={selectedCategory.words}
                categoryLabel={selectedCategory.label}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
