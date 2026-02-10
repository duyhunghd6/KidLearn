import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import type { Word } from '../types';

const mockWord: Word = {
  en: 'elephant',
  vi: 'con voi',
  emoji: '🐘',
};

describe('Card component', () => {
  it('should render emoji', () => {
    render(<Card word={mockWord} />);
    expect(screen.getByText('🐘')).toBeInTheDocument();
  });

  it('should render English and Vietnamese text in normal size', () => {
    render(<Card word={mockWord} size="normal" />);
    expect(screen.getByText('elephant')).toBeInTheDocument();
    expect(screen.getByText('con voi')).toBeInTheDocument();
  });

  it('should NOT render text in small size', () => {
    render(<Card word={mockWord} size="small" />);
    expect(screen.getByText('🐘')).toBeInTheDocument();
    expect(screen.queryByText('elephant')).not.toBeInTheDocument();
    expect(screen.queryByText('con voi')).not.toBeInTheDocument();
  });

  it('should apply dimmed class when dimmed prop is true', () => {
    const { container } = render(<Card word={mockWord} dimmed />);
    expect(container.querySelector('.card--dimmed')).toBeInTheDocument();
  });

  it('should not apply dimmed class by default', () => {
    const { container } = render(<Card word={mockWord} />);
    expect(container.querySelector('.card--dimmed')).not.toBeInTheDocument();
  });

  it('should apply correct size class', () => {
    const { container: normalContainer } = render(
      <Card word={mockWord} size="normal" />
    );
    expect(normalContainer.querySelector('.card--normal')).toBeInTheDocument();

    const { container: smallContainer } = render(
      <Card word={mockWord} size="small" />
    );
    expect(smallContainer.querySelector('.card--small')).toBeInTheDocument();
  });

  it('should have aria-label on emoji for accessibility', () => {
    render(<Card word={mockWord} />);
    const emoji = screen.getByRole('img', { name: 'elephant' });
    expect(emoji).toBeInTheDocument();
  });

  it('should default to normal size', () => {
    const { container } = render(<Card word={mockWord} />);
    expect(container.querySelector('.card--normal')).toBeInTheDocument();
  });
});
