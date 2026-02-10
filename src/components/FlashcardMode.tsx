import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import Card from './Card';
import { speak } from '../utils/speech';
import type { Word } from '../types';

interface FlashcardModeProps {
  words: Word[];
  categoryLabel: string;
}

export default function FlashcardMode({ words, categoryLabel }: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentWord = words[currentIndex];

  const handleCardClick = useCallback(() => {
    if (isShaking) return;
    setIsShaking(true);
    speak(currentWord.en, () => {
      setIsShaking(false);
    });
    // Fallback timeout in case onend doesn't fire
    setTimeout(() => setIsShaking(false), 1200);
  }, [currentWord.en, isShaking]);

  const goNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, words.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleSpeakButton = useCallback(() => {
    speak(currentWord.en);
  }, [currentWord.en]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
    setTouchStart(null);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="flashcard-mode">
      <div className="flashcard-mode__header">
        <h2 className="flashcard-mode__category">{categoryLabel}</h2>
        <span className="flashcard-mode__counter">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      <div
        className="flashcard-mode__stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flashcard-mode__card-wrapper"
          >
            <Card
              word={currentWord}
              onClick={handleCardClick}
              isShaking={isShaking}
              size="normal"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flashcard-mode__controls">
        <button
          className="flashcard-mode__nav-btn"
          onClick={goPrev}
          disabled={currentIndex === 0}
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          className="flashcard-mode__speak-btn"
          onClick={handleSpeakButton}
          aria-label="Speak"
        >
          <Volume2 size={24} />
        </button>

        <div className="flashcard-mode__dots">
          {words.map((_, i) => (
            <span
              key={i}
              className={`flashcard-mode__dot ${i === currentIndex ? 'flashcard-mode__dot--active' : ''}`}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            />
          ))}
        </div>

        <button
          className="flashcard-mode__nav-btn"
          onClick={goNext}
          disabled={currentIndex === words.length - 1}
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
