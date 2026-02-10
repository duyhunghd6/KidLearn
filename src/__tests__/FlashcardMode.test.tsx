import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlashcardMode from '../components/FlashcardMode';
import type { Word } from '../types';

// Mock speech module
vi.mock('../utils/speech', () => ({
  speak: vi.fn(),
  speakQuestion: vi.fn(),
  isSpeechSupported: vi.fn(() => true),
}));

const mockWords: Word[] = [
  { en: 'dog', vi: 'con chó', emoji: '🐶' },
  { en: 'cat', vi: 'con mèo', emoji: '🐱' },
  { en: 'bird', vi: 'con chim', emoji: '🐦' },
];

describe('FlashcardMode component', () => {
  it('should render first card', () => {
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText('🐶')).toBeInTheDocument();
    expect(screen.getByText('dog')).toBeInTheDocument();
    expect(screen.getByText('con chó')).toBeInTheDocument();
  });

  it('should render category label', () => {
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText('Động vật')).toBeInTheDocument();
  });

  it('should show counter as 1 / N', () => {
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('should navigate to next card when clicking next button', async () => {
    const user = userEvent.setup();
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);

    const nextBtn = screen.getByLabelText('Next');
    await user.click(nextBtn);

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('should disable previous button on first card', () => {
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    const prevBtn = screen.getByLabelText('Previous');
    expect(prevBtn).toBeDisabled();
  });

  it('should disable next button on last card', async () => {
    const user = userEvent.setup();
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);

    const nextBtn = screen.getByLabelText('Next');
    await user.click(nextBtn); // 2nd card
    await user.click(nextBtn); // 3rd card (last)

    expect(nextBtn).toBeDisabled();
  });

  it('should call speak when card is clicked', async () => {
    const { speak } = await import('../utils/speech');
    const user = userEvent.setup();
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);

    const card = screen.getByText('🐶').closest('.card')!;
    await user.click(card);

    expect(speak).toHaveBeenCalledWith('dog', expect.any(Function));
  });

  it('should have a speak button', () => {
    render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    const speakBtn = screen.getByLabelText('Speak');
    expect(speakBtn).toBeInTheDocument();
  });

  it('should render navigation dots matching words count', () => {
    const { container } = render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    const dots = container.querySelectorAll('.flashcard-mode__dot');
    expect(dots).toHaveLength(3);
  });

  it('should highlight active dot', () => {
    const { container } = render(<FlashcardMode words={mockWords} categoryLabel="Động vật" />);
    const activeDot = container.querySelector('.flashcard-mode__dot--active');
    expect(activeDot).toBeInTheDocument();
  });
});
