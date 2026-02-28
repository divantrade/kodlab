"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypeWriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = "",
}: TypeWriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Finished typing — pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      // Typing or deleting one character at a time
      timeout = setTimeout(
        () => setCharIndex((prev) => prev + (isDeleting ? -1 : 1)),
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  const displayText = phrases[phraseIndex].substring(0, charIndex);

  return (
    <span className={className}>
      {displayText}
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}
