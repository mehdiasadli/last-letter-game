import type { Variants } from 'framer-motion';

export const useAnimations = () => {
  // Fade in animation
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Slide up animation
  const slideUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Scale in animation
  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Bounce animation for celebrations
  const bounce: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
  };

  // Pulse animation for current player
  const pulse: Variants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Shake animation for errors
  const shake: Variants = {
    hidden: { x: 0 },
    visible: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  // Stagger children animation
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Word submission animation
  const wordSubmit: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  // Timer countdown animation
  const timerPulse: Variants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Timer urgency animation (for low time)
  const timerUrgency: Variants = {
    hidden: { scale: 1, color: '#f97316' },
    visible: {
      scale: [1, 1.1, 1],
      color: ['#f97316', '#ef4444', '#f97316'],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Player elimination animation
  const playerEliminated: Variants = {
    hidden: { opacity: 1, scale: 1 },
    visible: {
      opacity: 0.5,
      scale: 0.95,
      filter: 'grayscale(100%)',
      transition: { duration: 0.5 },
    },
  };

  // Red pulse animation for invalid word feedback
  const redPulse: Variants = {
    hidden: { scale: 1 },
    visible: {
      scale: [1, 1.1, 1, 1.1, 1],
      transition: {
        duration: 1.2,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1], // Two complete pulses
      },
    },
  };

  return {
    fadeIn,
    slideUp,
    scaleIn,
    bounce,
    pulse,
    shake,
    staggerContainer,
    wordSubmit,
    timerPulse,
    timerUrgency,
    playerEliminated,
    redPulse,
  };
};
