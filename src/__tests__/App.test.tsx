import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Mock speech module
vi.mock('../utils/speech', () => ({
  speak: vi.fn(),
  speakQuestion: vi.fn(),
  isSpeechSupported: vi.fn(() => true),
}));

// Mock framer-motion completely to avoid animation issues in jsdom
vi.mock('framer-motion', () => {
  const MotionProxy = new Proxy(
    {},
    {
      get: (_target, prop) => {
        // Return a component that renders the equivalent HTML element
        return ({
          children,
          className,
          onClick,
          ...rest
        }: {
          children?: React.ReactNode;
          className?: string;
          onClick?: () => void;
          [key: string]: unknown;
        }) => {
          const Tag = prop as keyof JSX.IntrinsicElements;
          const htmlProps: Record<string, unknown> = {};
          if (className) htmlProps.className = className;
          if (onClick) htmlProps.onClick = onClick;
          // Forward aria-label and key data attributes
          Object.keys(rest).forEach(key => {
            if (key.startsWith('aria-') || key.startsWith('data-')) {
              htmlProps[key] = rest[key];
            }
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Element = Tag as any;
          return <Element {...htmlProps}>{children}</Element>;
        };
      },
    }
  );

  return {
    motion: MotionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useMotionValue: (val: number) => ({ get: () => val, set: vi.fn() }),
  };
});

describe('App component', () => {
  it('should render KidLearn title', () => {
    render(<App />);
    expect(screen.getByText('KidLearn')).toBeInTheDocument();
  });

  it('should render logo', () => {
    render(<App />);
    expect(screen.getByLabelText('KidLearn logo')).toBeInTheDocument();
  });

  it('should show category selector on home page', () => {
    render(<App />);
    expect(screen.getByText('Chọn chủ đề')).toBeInTheDocument();
  });

  it('should show all 7 categories on home page', () => {
    render(<App />);
    expect(screen.getByText('Động vật')).toBeInTheDocument();
    expect(screen.getByText('Trái cây')).toBeInTheDocument();
    expect(screen.getByText('Màu sắc')).toBeInTheDocument();
    expect(screen.getByText('Hình khối')).toBeInTheDocument();
    expect(screen.getByText('Phương tiện')).toBeInTheDocument();
    expect(screen.getByText('Cơ thể')).toBeInTheDocument();
    expect(screen.getByText('Đồ vật trong nhà')).toBeInTheDocument();
  });

  it('should not show mode nav buttons on home page', () => {
    render(<App />);
    expect(screen.queryByLabelText('Flashcard mode')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Quiz mode')).not.toBeInTheDocument();
  });

  it('should navigate to flashcard mode when Học is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const learnButtons = screen.getAllByText(/📖 Học/);
    await user.click(learnButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('1 / 20')).toBeInTheDocument();
    });
    expect(screen.getByLabelText('Flashcard mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Quiz mode')).toBeInTheDocument();
  });

  it('should navigate to quiz mode when Chơi is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const playButtons = screen.getAllByText(/🎮 Chơi/);
    await user.click(playButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Where is the/)).toBeInTheDocument();
    });
    expect(screen.getByText('⭐ 0')).toBeInTheDocument();
  });

  it('should go back to home when home button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Go to flashcard mode
    const learnButtons = screen.getAllByText(/📖 Học/);
    await user.click(learnButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('1 / 20')).toBeInTheDocument();
    });

    // Click home button
    const homeBtn = screen.getByLabelText('Back to home');
    await user.click(homeBtn);

    // Back to home
    await waitFor(() => {
      expect(screen.getByText('Chọn chủ đề')).toBeInTheDocument();
    });
  });

  it('should switch between flashcard and quiz modes', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Go to flashcard mode
    const learnButtons = screen.getAllByText(/📖 Học/);
    await user.click(learnButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('1 / 20')).toBeInTheDocument();
    });

    // Switch to quiz mode via nav button
    const quizBtn = screen.getByLabelText('Quiz mode');
    await user.click(quizBtn);
    await waitFor(() => {
      expect(screen.getByText(/Where is the/)).toBeInTheDocument();
    });

    // Switch back to flashcard mode
    const flashcardBtn = screen.getByLabelText('Flashcard mode');
    await user.click(flashcardBtn);
    await waitFor(() => {
      expect(screen.getByText('1 / 20')).toBeInTheDocument();
    });
  });
});
