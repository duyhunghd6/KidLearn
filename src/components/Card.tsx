import { motion } from 'framer-motion';
import type { Word } from '../types';

interface CardProps {
  word: Word;
  onClick?: () => void;
  isShaking?: boolean;
  size?: 'normal' | 'small';
  disabled?: boolean;
  dimmed?: boolean;
}

export default function Card({ word, onClick, isShaking, size = 'normal', disabled, dimmed }: CardProps) {
  return (
    <motion.div
      className={`card card--${size} ${dimmed ? 'card--dimmed' : ''}`}
      onClick={disabled ? undefined : onClick}
      animate={isShaking ? {
        rotate: [0, -8, 8, -8, 8, -4, 4, 0],
        scale: [1, 1.05, 1.05, 1.05, 1.05, 1.02, 1.02, 1],
      } : {}}
      transition={{ duration: 0.5 }}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <span className="card__emoji" role="img" aria-label={word.en}>
        {word.emoji}
      </span>
      {size === 'normal' && (
        <>
          <span className="card__en">{word.en}</span>
          <span className="card__vi">{word.vi}</span>
        </>
      )}
    </motion.div>
  );
}
