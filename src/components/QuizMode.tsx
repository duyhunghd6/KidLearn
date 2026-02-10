import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, SkipForward } from 'lucide-react';
import confetti from 'canvas-confetti';
import Card from './Card';
import { speakQuestion, speak } from '../utils/speech';
import type { Word } from '../types';

interface QuizModeProps {
  words: Word[];
  categoryLabel: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getQuizChoices(words: Word[], correctWord: Word): Word[] {
  const others = words.filter(w => w.en !== correctWord.en);
  const shuffledOthers = shuffleArray(others);
  const wrongChoices = shuffledOthers.slice(0, 2);
  return shuffleArray([correctWord, ...wrongChoices]);
}

export default function QuizMode({ words, categoryLabel }: QuizModeProps) {
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<Word[]>([]);
  const [shakingCard, setShakingCard] = useState<string | null>(null);
  const [dimmedCards, setDimmedCards] = useState<Set<string>>(new Set());
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [, setTotalAnswered] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const hasSpoken = useRef(false);

  // Initialize shuffled words
  useEffect(() => {
    const shuffled = shuffleArray(words);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTotalAnswered(0);
    setIsFinished(false);
  }, [words]);

  const currentWord = shuffledWords[currentIndex];

  // Set up choices when current word changes
  useEffect(() => {
    if (!currentWord) return;
    const newChoices = getQuizChoices(words, currentWord);
    setChoices(newChoices);
    setDimmedCards(new Set());
    setIsCorrect(false);
    setShakingCard(null);
    hasSpoken.current = false;
  }, [currentWord, words]);

  // Speak the question
  useEffect(() => {
    if (!currentWord || hasSpoken.current) return;
    const timer = setTimeout(() => {
      speakQuestion(currentWord.en);
      hasSpoken.current = true;
    }, 500);
    return () => clearTimeout(timer);
  }, [currentWord]);

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#2ECC71', '#A78BFA'],
    });
  }, []);

  const handleChoiceClick = useCallback((chosenWord: Word) => {
    if (isCorrect || !currentWord) return;

    if (chosenWord.en === currentWord.en) {
      // Correct!
      setIsCorrect(true);
      setScore(prev => prev + 1);
      setTotalAnswered(prev => prev + 1);
      speak('Yeah!');
      fireConfetti();

      // Move to next after delay
      setTimeout(() => {
        if (currentIndex < shuffledWords.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setIsFinished(true);
        }
      }, 1800);
    } else {
      // Wrong — shake and dim
      setShakingCard(chosenWord.en);
      setTotalAnswered(prev => prev + 1);
      setTimeout(() => {
        setShakingCard(null);
        setDimmedCards(prev => new Set(prev).add(chosenWord.en));
      }, 500);
    }
  }, [isCorrect, currentWord, currentIndex, shuffledWords.length, fireConfetti]);

  const handleRepeatQuestion = useCallback(() => {
    if (currentWord) {
      speakQuestion(currentWord.en);
    }
  }, [currentWord]);

  const handleSkip = useCallback(() => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, shuffledWords.length]);

  const handleRestart = useCallback(() => {
    const shuffled = shuffleArray(words);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTotalAnswered(0);
    setIsFinished(false);
  }, [words]);

  if (isFinished) {
    return (
      <div className="quiz-mode">
        <motion.div
          className="quiz-mode__result"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <span className="quiz-mode__result-emoji">🎉</span>
          <h2 className="quiz-mode__result-title">Giỏi quá!</h2>
          <p className="quiz-mode__result-score">
            {score} / {shuffledWords.length} câu đúng
          </p>
          <button className="quiz-mode__restart-btn" onClick={handleRestart}>
            🔄 Chơi lại
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="quiz-mode">
      <div className="quiz-mode__header">
        <h2 className="quiz-mode__category">{categoryLabel}</h2>
        <span className="quiz-mode__score">⭐ {score}</span>
        <span className="quiz-mode__counter">
          {currentIndex + 1} / {shuffledWords.length}
        </span>
      </div>

      <div className="quiz-mode__question">
        <motion.p
          className="quiz-mode__question-text"
          key={currentWord.en}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Where is the <strong>{currentWord.en}</strong>?
        </motion.p>
        <div className="quiz-mode__question-actions">
          <button
            className="quiz-mode__action-btn"
            onClick={handleRepeatQuestion}
            aria-label="Repeat question"
          >
            <Volume2 size={20} />
          </button>
          <button
            className="quiz-mode__action-btn"
            onClick={handleSkip}
            aria-label="Skip"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord.en}
          className="quiz-mode__choices"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {choices.map((choice) => (
            <Card
              key={choice.en}
              word={choice}
              size="small"
              onClick={() => handleChoiceClick(choice)}
              isShaking={shakingCard === choice.en}
              dimmed={dimmedCards.has(choice.en)}
              disabled={dimmedCards.has(choice.en) || isCorrect}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {isCorrect && (
        <motion.div
          className="quiz-mode__feedback quiz-mode__feedback--correct"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          🎉 Yeah! That's {currentWord.en}!
        </motion.div>
      )}
    </div>
  );
}
