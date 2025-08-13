import { Card, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useGamePackStore } from '../stores/game-pack.store';

export function GameTitle() {
  const { pack } = useGamePackStore();

  if (!pack?.name) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Card withBorder>
        <Stack gap='md' align='center'>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <Title order={2} ta='center'>
              📚 {pack.name}
            </Title>
          </motion.div>
          {pack.description ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <Text c='dimmed' size='md' ta='center'>
                {pack.description}
              </Text>
            </motion.div>
          ) : null}
        </Stack>
      </Card>
    </motion.div>
  );
}
