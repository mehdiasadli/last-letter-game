import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function Celebration({ trigger, onComplete }: CelebrationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  const confettiColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

  return (
    <div
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }}
    >
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            backgroundColor: confettiColors[i % confettiColors.length],
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: '-10px',
          }}
          initial={{ y: -10, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: 'easeOut',
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}
