import { Anchor, Card, Flex, Modal, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../stores/game.store';
import { useMemo, useState } from 'react';
import { useGameConfigStore } from '../stores/game-config.store';
import { useAnimations } from '../hooks/use-animations';

export function GameUsedWords() {
  const { showUsedWords } = useGameConfigStore();
  const { usedWords, currentLetter, pulsingWord } = useGameStore();
  const { wordSubmit, staggerContainer, redPulse } = useAnimations();
  const [allUsedWordsModalOpened, setAllUsedWordsModalOpened] = useState(false);
  const [filterByStartingLetter, setFilterByStartingLetter] = useState<string | null>(null);

  if (!showUsedWords) return null;

  const usedWordsStartingWithCurrentLetter = useMemo(() => {
    return usedWords.filter((word) => word.toLowerCase().startsWith(currentLetter.toLowerCase()));
  }, [usedWords, currentLetter]);

  const areThereMoreUsedWords = useMemo(() => {
    return usedWordsStartingWithCurrentLetter.length < usedWords.length;
  }, [usedWordsStartingWithCurrentLetter, usedWords]);

  const possibleStartingLetters = useMemo(() => {
    return [...new Set(usedWords.map((word) => word[0].toUpperCase()))].sort();
  }, [usedWords]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card withBorder>
          {usedWordsStartingWithCurrentLetter.length > 0 ? (
            <Stack gap='lg'>
              <Flex align='center' justify='space-between'>
                <Title order={3}>📝 Used Words</Title>
                {areThereMoreUsedWords && (
                  <Anchor onClick={() => setAllUsedWordsModalOpened(true)} c='blue'>
                    View all words
                  </Anchor>
                )}
              </Flex>
              <motion.div variants={staggerContainer} initial='hidden' animate='visible'>
                <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing='md'>
                  <AnimatePresence>
                    {usedWordsStartingWithCurrentLetter.map((word, index) => (
                      <motion.div
                        key={word}
                        variants={pulsingWord === word ? redPulse : wordSubmit}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card shadow='sm' p='xs' bg={pulsingWord === word ? 'red.0' : 'green.0'}>
                          <Text fw={500} ta='center' c={pulsingWord === word ? 'red.7' : 'green.7'} size='sm'>
                            {word}
                          </Text>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </SimpleGrid>
              </motion.div>
            </Stack>
          ) : (
            <Stack gap='md' align='center'>
              <Title ta='center' c='dimmed' order={3}>
                📝 No words used yet
              </Title>
              <Text c='dimmed' ta='center' size='sm'>
                Be the first to submit a word starting with "{currentLetter}"!
              </Text>
            </Stack>
          )}
        </Card>
      </motion.div>

      {areThereMoreUsedWords && (
        <Modal
          title={<Title order={4}>📝 All Used Words</Title>}
          size='lg'
          opened={allUsedWordsModalOpened}
          onClose={() => setAllUsedWordsModalOpened(false)}
        >
          <Stack gap='lg'>
            <Select
              label='Filter by starting letter'
              placeholder='Pick a letter'
              clearable
              data={possibleStartingLetters}
              value={filterByStartingLetter}
              onChange={(value) => setFilterByStartingLetter(value || null)}
              size='md'
            />
            <SimpleGrid cols={{ base: 2, sm: 3 }} spacing='md'>
              {usedWords
                .filter((word) => word.toUpperCase().startsWith(filterByStartingLetter || ''))
                .map((word) => (
                  <Card key={word} shadow='sm' p='xs'>
                    <Text fw={500} ta='center' size='sm'>
                      {word}
                    </Text>
                  </Card>
                ))}
            </SimpleGrid>
          </Stack>
        </Modal>
      )}
    </>
  );
}
