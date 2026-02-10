export interface Word {
  en: string;
  vi: string;
  emoji: string;
}

export interface Category {
  category: string;
  label: string;
  emoji: string;
  words: Word[];
}

export type AppMode = 'home' | 'flashcard' | 'quiz';
