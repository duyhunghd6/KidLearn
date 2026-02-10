import { describe, it, expect } from 'vitest';
import vocabularyData from '../data/vocabulary.json';

interface Word {
  en: string;
  vi: string;
  emoji: string;
}

interface Category {
  category: string;
  label: string;
  emoji: string;
  words: Word[];
}

const categories = vocabularyData as Category[];

describe('vocabulary.json', () => {
  it('should have exactly 7 categories', () => {
    expect(categories).toHaveLength(7);
  });

  it('should have exactly 100 words total', () => {
    const totalWords = categories.reduce((sum, cat) => sum + cat.words.length, 0);
    expect(totalWords).toBe(100);
  });

  it('should include all expected categories', () => {
    const categoryNames = categories.map(c => c.category);
    expect(categoryNames).toContain('animals');
    expect(categoryNames).toContain('fruits');
    expect(categoryNames).toContain('colors');
    expect(categoryNames).toContain('shapes');
    expect(categoryNames).toContain('vehicles');
    expect(categoryNames).toContain('body');
    expect(categoryNames).toContain('household');
  });

  it('should have correct word counts per category', () => {
    const expected: Record<string, number> = {
      animals: 20,
      fruits: 20,
      colors: 10,
      shapes: 10,
      vehicles: 10,
      body: 10,
      household: 20,
    };

    categories.forEach(cat => {
      expect(cat.words.length).toBe(expected[cat.category]);
    });
  });

  it('every category should have category, label, emoji, and words fields', () => {
    categories.forEach(cat => {
      expect(cat.category).toBeDefined();
      expect(cat.label).toBeDefined();
      expect(cat.emoji).toBeDefined();
      expect(cat.words).toBeDefined();
      expect(Array.isArray(cat.words)).toBe(true);
    });
  });

  it('every word should have en, vi, and emoji fields', () => {
    categories.forEach(cat => {
      cat.words.forEach(word => {
        expect(word.en).toBeDefined();
        expect(typeof word.en).toBe('string');
        expect(word.en.length).toBeGreaterThan(0);

        expect(word.vi).toBeDefined();
        expect(typeof word.vi).toBe('string');
        expect(word.vi.length).toBeGreaterThan(0);

        expect(word.emoji).toBeDefined();
        expect(typeof word.emoji).toBe('string');
        expect(word.emoji.length).toBeGreaterThan(0);
      });
    });
  });

  it('should not have duplicate English words within a category', () => {
    categories.forEach(cat => {
      const enWords = cat.words.map(w => w.en);
      const unique = new Set(enWords);
      expect(unique.size).toBe(enWords.length);
    });
  });

  it('all English words should be lowercase', () => {
    categories.forEach(cat => {
      cat.words.forEach(word => {
        expect(word.en).toBe(word.en.toLowerCase());
      });
    });
  });
});
