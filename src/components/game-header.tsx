import { Card, Group, Stack, Text, Title, Progress } from '@mantine/core';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/game.store';
import { useWords } from '../hooks/use-words';

export function GameHeader() {
  const { currentPlayer, currentRound, usedWords } = useGameStore();
  const words = useWords();

  // Calculate progress
  const totalWords = words.length;
  const usedWordsCount = usedWords.length;
  const progressPercentage = totalWords > 0 ? (usedWordsCount / totalWords) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Group w='100%' grow>
        <Card withBorder>
          <Stack gap='xs' align='center'>
            <Text fw={600} size='sm'>
              👤 Current Player
            </Text>
            <Title order={3} ta='center'>
              {currentPlayer}
            </Title>
          </Stack>
        </Card>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <Card withBorder>
            <Stack gap='xs' align='center'>
              <Text fw={600} size='sm'>
                🔄 Round {currentRound}
              </Text>
              <Stack gap='xs' w='100%'>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                >
                  <Progress value={progressPercentage} color='green' size='sm' radius='md' />
                </motion.div>
                <Text size='xs' ta='center'>
                  {usedWordsCount}/{totalWords} words
                </Text>
              </Stack>
            </Stack>
          </Card>
        </motion.div>
      </Group>
    </motion.div>
  );
}
