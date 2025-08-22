import { useEffect, useRef, useState } from 'react';
import { getRandomFloatDelay, getRandomTwinkleDelay } from '@/lib/utils';

interface UseCosmicAnimationReturn<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>; // Changed from RefObject<T> to RefObject<T | null>
  isVisible: boolean;
  animationDelay: number;
  twinkleDelay: number;
}

export function useCosmicAnimation<T extends HTMLElement = HTMLElement>(): UseCosmicAnimationReturn<T> {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationDelay] = useState(() => getRandomFloatDelay());
  const [twinkleDelay] = useState(() => getRandomTwinkleDelay());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return {
    ref,
    isVisible,
    animationDelay,
    twinkleDelay,
  };
}

// Hook for staggered animations
export function useStaggeredAnimation(itemCount: number, delay: number = 0.1) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * delay * 1000);
      
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [itemCount, delay]);

  const resetAnimation = () => {
    setVisibleItems([]);
  };

  return {
    visibleItems,
    resetAnimation,
    isItemVisible: (index: number) => visibleItems.includes(index),
  };
}