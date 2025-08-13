import { Button, Card, Stack, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/game.store';
import { usePlayersStore } from '../stores/players.store';

export function GameHostPanel() {
  const { currentPlayer } = useGameStore();
  const { host } = usePlayersStore();

  if (currentPlayer !== host) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card withBorder>
        <Stack gap='md' align='center'>
          <Title order={4} ta='center'>
            👑 Host Controls
          </Title>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant='gradient' gradient={{ from: 'red', to: 'orange' }} size='md'>
              🛑 Stop Game
            </Button>
          </motion.div>
        </Stack>
      </Card>
    </motion.div>
  );
}
