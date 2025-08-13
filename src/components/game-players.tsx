import { Card, SimpleGrid, Stack, Title, Badge, ActionIcon, Tooltip, Modal, Group, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { usePlayersStore } from '../stores/players.store';
import { useGameStore } from '../stores/game.store';
import { useLeaveGame } from '../hooks/use-leave-game';
import { useMemo, useState } from 'react';
import { Text } from '@mantine/core';
import { IconDoorExit } from '@tabler/icons-react';

export function GamePlayers() {
  const { players } = usePlayersStore();
  const { currentPlayer } = useGameStore();
  const { handleLeaveGame, canLeave } = useLeaveGame();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [playerToLeave, setPlayerToLeave] = useState<string | null>(null);

  const playersSorted = useMemo(() => {
    // non-eliminated players first, then eliminated players
    return players.sort((a, b) => {
      if (a.eliminated && !b.eliminated) return 1;
      if (!a.eliminated && b.eliminated) return -1;
      return 0;
    });
  }, [players]);

  const handleLeaveClick = (playerName: string) => {
    setPlayerToLeave(playerName);
    setShowConfirmModal(true);
  };

  const confirmLeave = () => {
    if (playerToLeave) {
      handleLeaveGame(playerToLeave);
    }
    setShowConfirmModal(false);
    setPlayerToLeave(null);
  };

  const cancelLeave = () => {
    setShowConfirmModal(false);
    setPlayerToLeave(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card withBorder>
        <Stack gap='lg'>
          <Title order={3} ta='center'>
            👥 Players
          </Title>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing='md'>
            {playersSorted.map((player) => (
              <Card key={player.name} withBorder p='md'>
                <Stack gap='xs' align='center'>
                  <Text
                    fw='bold'
                    c={player.eliminated ? 'red' : currentPlayer === player.name ? 'blue' : undefined}
                    ta='center'
                    size='md'
                  >
                    {player.name}
                  </Text>
                  {currentPlayer === player.name && !player.eliminated && (
                    <Badge color='blue' size='sm' variant='filled'>
                      🎯 Current
                    </Badge>
                  )}
                  {player.eliminated && (
                    <Badge color='red' size='sm' variant='filled'>
                      ❌ Eliminated
                    </Badge>
                  )}
                </Stack>

                {/* Leave button for non-eliminated players */}
                {!player.eliminated && canLeave(player.name) && (
                  <Tooltip label='Leave game'>
                    <ActionIcon
                      color='orange'
                      variant='light'
                      size='sm'
                      onClick={() => handleLeaveClick(player.name)}
                      style={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <IconDoorExit size={14} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Card>
            ))}
          </SimpleGrid>
        </Stack>

        {/* Confirmation Modal */}
        <Modal opened={showConfirmModal} onClose={cancelLeave} title='Leave Game?' centered size='sm'>
          <Stack gap='md'>
            <Text>Are you sure you want to leave the game? This will eliminate you and end your turn.</Text>
            <Group justify='flex-end' gap='sm'>
              <Button variant='outline' onClick={cancelLeave}>
                Cancel
              </Button>
              <Button color='red' onClick={confirmLeave} variant='filled'>
                Leave Game
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Card>
    </motion.div>
  );
}
