'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RotatingTextProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function RotatingText({
  words,
  className,
  duration = 2000,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span
      className={cn(
        'inline-block transition-all duration-300',
        isAnimating && 'opacity-0 -translate-y-2',
        !isAnimating && 'opacity-100 translate-y-0',
        className
      )}
    >
      {words[index]}
    </span>
  );
}
