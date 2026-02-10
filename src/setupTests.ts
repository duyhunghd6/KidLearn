import '@testing-library/jest-dom';

// Mock Web Speech API
const mockSpeak = vi.fn();
const mockCancel = vi.fn();

Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: mockSpeak,
    cancel: mockCancel,
    getVoices: () => [],
    onvoiceschanged: null,
    paused: false,
    pending: false,
    speaking: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  },
  writable: true,
});

// Mock SpeechSynthesisUtterance
class MockSpeechSynthesisUtterance {
  text = '';
  lang = '';
  rate = 1;
  pitch = 1;
  volume = 1;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor(text?: string) {
    if (text) this.text = text;
  }
}

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  value: MockSpeechSynthesisUtterance,
  writable: true,
});

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));
