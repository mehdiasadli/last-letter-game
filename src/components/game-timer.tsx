import { Card, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useGameConfigStore } from '../stores/game-config.store';
import { useAnimations } from '../hooks/use-animations';
import { createNormalTick, createUrgentTick } from '../lib/sounds';
import { useEffect, useRef } from 'react';

export function GameTimer({ time }: { time: string }) {
  const { hasTimer, soundEnabled } = useGameConfigStore();
  const { timerPulse, timerUrgency } = useAnimations();
  const lastTimeRef = useRef<number>(0);
  const urgentIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const timeNumber = time.split(':').reduce((acc, part, index) => {
    if (index === 0) {
      // Minutes
      return acc + parseInt(part, 10) * 60;
    } else {
      // Seconds
      return acc + parseInt(part, 10);
    }
  }, 0);
  const isLowTime = timeNumber <= 20;
  const isVeryLowTime = timeNumber <= 10;

  // Play tick sound when time changes and is <= 20 seconds
  useEffect(() => {
    if (soundEnabled && timeNumber <= 20 && timeNumber !== lastTimeRef.current && lastTimeRef.current > 0) {
      // Play different tick sounds based on urgency
      if (timeNumber <= 10) {
        createUrgentTick(); // Higher frequency and volume for ≤10 seconds
      } else {
        createNormalTick(); // Normal tick for 11-20 seconds
      }
    }
    lastTimeRef.current = timeNumber;
  }, [timeNumber, soundEnabled]);

  // Handle urgent interval ticks (≤10 seconds, every 0.5s)
  useEffect(() => {
    // Clear any existing interval
    if (urgentIntervalRef.current) {
      clearInterval(urgentIntervalRef.current);
      urgentIntervalRef.current = null;
    }

    // Start urgent interval if time is ≤10 seconds and sound is enabled
    if (soundEnabled && timeNumber <= 10 && timeNumber > 0) {
      urgentIntervalRef.current = setInterval(() => {
        createUrgentTick();
      }, 500); // Every 0.5 seconds
    }

    // Cleanup on unmount or when conditions change
    return () => {
      if (urgentIntervalRef.current) {
        clearInterval(urgentIntervalRef.current);
        urgentIntervalRef.current = null;
      }
    };
  }, [timeNumber, soundEnabled]);

  if (!hasTimer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card withBorder>
        <Stack gap='xs' align='center'>
          <Text fw={600} size='sm'>
            ⏱️ Timer
          </Text>
          <motion.div
            variants={isVeryLowTime ? timerUrgency : isLowTime ? timerPulse : undefined}
            initial='hidden'
            animate='visible'
            key={time} // Re-trigger animation when time changes
          >
            <Title order={2} ta='center' c={isLowTime ? 'red' : undefined}>
              {time}
            </Title>
          </motion.div>
        </Stack>
      </Card>
    </motion.div>
  );
}
