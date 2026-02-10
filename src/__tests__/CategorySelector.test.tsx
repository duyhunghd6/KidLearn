import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategorySelector from '../components/CategorySelector';
import type { Category, AppMode } from '../types';

const mockCategories: Category[] = [
  {
    category: 'animals',
    label: 'Động vật',
    emoji: '🐾',
    words: [
      { en: 'dog', vi: 'con chó', emoji: '🐶' },
      { en: 'cat', vi: 'con mèo', emoji: '🐱' },
    ],
  },
  {
    category: 'fruits',
    label: 'Trái cây',
    emoji: '🍎',
    words: [
      { en: 'apple', vi: 'quả táo', emoji: '🍎' },
    ],
  },
];

describe('CategorySelector component', () => {
  it('should render title and subtitle', () => {
    render(<CategorySelector categories={mockCategories} onSelect={() => {}} />);
    expect(screen.getByText('Chọn chủ đề')).toBeInTheDocument();
    expect(screen.getByText('Pick a topic to start learning!')).toBeInTheDocument();
  });

  it('should render all categories', () => {
    render(<CategorySelector categories={mockCategories} onSelect={() => {}} />);
    expect(screen.getByText('Động vật')).toBeInTheDocument();
    expect(screen.getByText('Trái cây')).toBeInTheDocument();
  });

  it('should display category emoji', () => {
    render(<CategorySelector categories={mockCategories} onSelect={() => {}} />);
    expect(screen.getByText('🐾')).toBeInTheDocument();
    expect(screen.getByText('🍎')).toBeInTheDocument();
  });

  it('should display word count', () => {
    render(<CategorySelector categories={mockCategories} onSelect={() => {}} />);
    expect(screen.getByText('2 từ')).toBeInTheDocument();
    expect(screen.getByText('1 từ')).toBeInTheDocument();
  });

  it('should have Học and Chơi buttons for each category', () => {
    render(<CategorySelector categories={mockCategories} onSelect={() => {}} />);
    const learnButtons = screen.getAllByText(/📖 Học/);
    const playButtons = screen.getAllByText(/🎮 Chơi/);
    expect(learnButtons).toHaveLength(2);
    expect(playButtons).toHaveLength(2);
  });

  it('should call onSelect with category and flashcard mode when Học is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CategorySelector categories={mockCategories} onSelect={onSelect} />);

    const learnButtons = screen.getAllByText(/📖 Học/);
    await user.click(learnButtons[0]);

    expect(onSelect).toHaveBeenCalledWith(mockCategories[0], 'flashcard' as AppMode);
  });

  it('should call onSelect with category and quiz mode when Chơi is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CategorySelector categories={mockCategories} onSelect={onSelect} />);

    const playButtons = screen.getAllByText(/🎮 Chơi/);
    await user.click(playButtons[1]);

    expect(onSelect).toHaveBeenCalledWith(mockCategories[1], 'quiz' as AppMode);
  });
});
