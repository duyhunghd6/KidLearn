/**
 * Web Speech API helpers for KidLearn
 */

export const speak = (text: string, onEnd?: () => void) => {
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85; // Slow for kids
  utterance.pitch = 1.1; // Slightly higher pitch, friendly tone

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
};

export const speakQuestion = (word: string, onEnd?: () => void) => {
  speak(`Where is the ${word}?`, onEnd);
};

export const isSpeechSupported = (): boolean => {
  return 'speechSynthesis' in window;
};
