import { Badge, Button, Card, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useWordField } from '../hooks/use-word-field';
import { useGameStore } from '../stores/game.store';
import { useSubmitWord } from '../hooks/use-submit-word';
import { useUsedWords } from '../hooks/use-used-words';
import { useGameConfigStore } from '../stores/game-config.store';
import { useAnimations } from '../hooks/use-animations';

export function GameInput({
  timeStatus,
  restart,
}: {
  timeStatus: 'active' | 'paused' | 'ended';
  restart: (seconds?: number) => void;
}) {
  const field = useWordField();
  const { usedWordsWithCurrentLetter } = useUsedWords();
  const { currentLetter, usedWords } = useGameStore();
  const { showHowManyWordsLeft } = useGameConfigStore();
  const { onSubmit } = useSubmitWord({
    timeStatus,
    restart,
    field,
  });
  const { shake } = useAnimations();

  // Check if this is the first time this letter appears
  const isFirstTimeLetter = !usedWords.some((word) => word.toLowerCase().startsWith(currentLetter.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card withBorder>
        <Stack gap='lg'>
          <Group justify='center' align='center' gap='xs'>
            <motion.div
              key={currentLetter} // Re-trigger animation when letter changes
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Title ta='center' order={3}>
                ✍️ START WITH "{currentLetter}"
              </Title>
            </motion.div>
            {isFirstTimeLetter && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Badge color='green' size='sm' variant='filled'>
                  🆕 New Letter!
                </Badge>
              </motion.div>
            )}
          </Group>
          <Group gap='xs'>
            <motion.div style={{ flex: 1 }} variants={shake} animate={field.error ? 'visible' : 'hidden'}>
              <TextInput
                flex={1}
                placeholder={`Enter a word starting with "${currentLetter}"`}
                {...field.getInputProps()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !field.error && field.getValue()) {
                    e.preventDefault();
                    onSubmit(field.getValue() as string);
                  }
                }}
                size='md'
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onSubmit(field.getValue())}
                variant='gradient'
                gradient={{ from: 'purple', to: 'blue' }}
                size='md'
              >
                Submit
              </Button>
            </motion.div>
          </Group>
          {showHowManyWordsLeft && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <Text size='sm' c='dimmed' ta='center'>
                📊 {usedWordsWithCurrentLetter.length} word{usedWordsWithCurrentLetter.length === 1 ? '' : 's'} left
                with "{currentLetter}"
              </Text>
            </motion.div>
          )}

          {/* Last 3 used words */}
          {usedWords.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Group gap='xs' justify='center' wrap='nowrap'>
                <Text size='xs' c='dimmed'>
                  Last used:
                </Text>
                {usedWords.slice(-3).map((word, index) => (
                  <Badge key={`${word}-${index}`} size='xs' variant='light' color='green'>
                    {word}
                  </Badge>
                ))}
              </Group>
            </motion.div>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}
