import { motion } from 'framer-motion';
import type { Category, AppMode } from '../types';

interface CategorySelectorProps {
  categories: Category[];
  onSelect: (category: Category, mode: AppMode) => void;
}

export default function CategorySelector({ categories, onSelect }: CategorySelectorProps) {
  return (
    <div className="category-selector">
      <h2 className="category-selector__title">Chọn chủ đề</h2>
      <p className="category-selector__subtitle">Pick a topic to start learning!</p>

      <div className="category-selector__grid">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.category}
            className="category-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <span className="category-card__emoji">{cat.emoji}</span>
            <span className="category-card__label">{cat.label}</span>
            <span className="category-card__count">{cat.words.length} từ</span>
            <div className="category-card__actions">
              <button
                className="category-card__btn category-card__btn--learn"
                onClick={() => onSelect(cat, 'flashcard')}
              >
                📖 Học
              </button>
              <button
                className="category-card__btn category-card__btn--play"
                onClick={() => onSelect(cat, 'quiz')}
              >
                🎮 Chơi
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
