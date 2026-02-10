import { describe, it, expect, vi, beforeEach } from 'vitest';
import { speak, speakQuestion, isSpeechSupported } from '../utils/speech';

describe('speech utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('speak', () => {
    it('should cancel any ongoing speech before speaking', () => {
      speak('hello');
      expect(window.speechSynthesis.cancel).toHaveBeenCalled();
    });

    it('should create an utterance with correct language and rate', () => {
      speak('dog');
      const call = (window.speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0];
      const utterance = call[0];
      expect(utterance.lang).toBe('en-US');
      expect(utterance.rate).toBe(0.85);
      expect(utterance.pitch).toBe(1.1);
      expect(utterance.text).toBe('dog');
    });

    it('should call speechSynthesis.speak', () => {
      speak('cat');
      expect(window.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    });

    it('should set onend callback when provided', () => {
      const onEnd = vi.fn();
      speak('hello', onEnd);
      const call = (window.speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0];
      const utterance = call[0];
      expect(utterance.onend).toBe(onEnd);
    });

    it('should not set onend when callback is not provided', () => {
      speak('hello');
      const call = (window.speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0];
      const utterance = call[0];
      expect(utterance.onend).toBeNull();
    });
  });

  describe('speakQuestion', () => {
    it('should speak "Where is the [word]?"', () => {
      speakQuestion('elephant');
      const call = (window.speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0];
      const utterance = call[0];
      expect(utterance.text).toBe('Where is the elephant?');
    });

    it('should pass onEnd callback through', () => {
      const onEnd = vi.fn();
      speakQuestion('dog', onEnd);
      const call = (window.speechSynthesis.speak as ReturnType<typeof vi.fn>).mock.calls[0];
      const utterance = call[0];
      expect(utterance.onend).toBe(onEnd);
    });
  });

  describe('isSpeechSupported', () => {
    it('should return true when speechSynthesis exists', () => {
      expect(isSpeechSupported()).toBe(true);
    });
  });
});
