import { useState, useEffect, useRef } from "react";

interface UseTypingAnimationOptions {
  phrases: string[];
  typingSpeed?: number; // Default: 100ms per character
  deletingSpeed?: number; // Default: 50ms per character
  pauseDuration?: number; // Default: 2000ms pause after typing
  delayStart?: number; // Default: 0ms initial delay
}

interface UseTypingAnimationReturn {
  displayText: string; // Current text to display
  isTyping: boolean; // Currently typing (not deleting/paused)
  isDeleting: boolean; // Currently deleting characters
  currentPhraseIndex: number; // Index of current phrase
}

export function useTypingAnimation({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  delayStart = 0,
}: UseTypingAnimationOptions): UseTypingAnimationReturn {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentPhrase.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing, pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, deletingSpeed);
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    };

    // Initial delay before starting animation (only on first load)
    if (!hasStartedRef.current && delayStart > 0) {
      hasStartedRef.current = true;
      timeoutRef.current = setTimeout(() => {
        handleTyping();
      }, delayStart);
    } else {
      hasStartedRef.current = true;
      handleTyping();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    phraseIndex,
    isDeleting,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    delayStart,
  ]);

  return {
    displayText,
    isTyping: !isDeleting && displayText.length < phrases[phraseIndex].length,
    isDeleting,
    currentPhraseIndex: phraseIndex,
  };
}
