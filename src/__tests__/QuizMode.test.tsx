import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizMode from '../components/QuizMode';
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
  { en: 'fish', vi: 'con cá', emoji: '🐟' },
];

describe('QuizMode component', () => {
  it('should render category label', () => {
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText('Động vật')).toBeInTheDocument();
  });

  it('should display "Where is the [word]?" question', () => {
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText(/Where is the/)).toBeInTheDocument();
  });

  it('should render exactly 3 choices', () => {
    const { container } = render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    const choices = container.querySelectorAll('.card--small');
    expect(choices).toHaveLength(3);
  });

  it('should show score starting at 0', () => {
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText('⭐ 0')).toBeInTheDocument();
  });

  it('should show counter', () => {
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    expect(screen.getByText(/\/ 4/)).toBeInTheDocument();
  });

  it('should have repeat question button', () => {
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    const repeatBtn = screen.getByLabelText('Repeat question');
    expect(repeatBtn).toBeInTheDocument();
  });

  it('should have skip button', () => {
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    const skipBtn = screen.getByLabelText('Skip');
    expect(skipBtn).toBeInTheDocument();
  });

  it('should call speakQuestion on mount', async () => {
    const { speakQuestion } = await import('../utils/speech');
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);
    // Wait for the timeout in the component
    await new Promise(resolve => setTimeout(resolve, 600));
    expect(speakQuestion).toHaveBeenCalled();
  });

  it('should call speakQuestion when repeat button is clicked', async () => {
    const { speakQuestion } = await import('../utils/speech');
    const user = userEvent.setup();
    render(<QuizMode words={mockWords} categoryLabel="Động vật" />);

    const repeatBtn = screen.getByLabelText('Repeat question');
    await user.click(repeatBtn);

    expect(speakQuestion).toHaveBeenCalled();
  });

  it('should dim wrong answer when clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<QuizMode words={mockWords} categoryLabel="Động vật" />);

    // Find the question word
    const questionEl = screen.getByText(/Where is the/);
    const strongTag = questionEl.querySelector('strong');
    const questionWord = strongTag?.textContent || '';

    // Find a wrong choice (one that's not the question word)
    const choices = container.querySelectorAll('.card--small');
    let wrongChoice: Element | null = null;
    choices.forEach(choice => {
      const emoji = choice.querySelector('.card__emoji');
      if (emoji) {
        const word = mockWords.find(w => w.emoji === emoji.textContent);
        if (word && word.en !== questionWord) {
          wrongChoice = choice;
        }
      }
    });

    if (wrongChoice) {
      await user.click(wrongChoice);
      // After shake animation (500ms), the card should be dimmed
      await new Promise(resolve => setTimeout(resolve, 600));
      expect(container.querySelector('.card--dimmed')).toBeInTheDocument();
    }
  });
});
