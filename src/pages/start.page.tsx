import { Button, Card, Stack, Text, Title, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { SelectPack } from '../components/select-pack';
import { GameConfig } from '../components/game-config';
import { PlayersAdd } from '../components/players-add';
import { usePlayersStore } from '../stores/players.store';
import { useGamePackStore } from '../stores/game-pack.store';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/game.store';

export default function StartPage() {
  const { players, host, resetEliminatedStatus } = usePlayersStore();
  const { pack } = useGamePackStore();
  const { reset } = useGameStore();
  const navigate = useNavigate();

  const canStart = useMemo(() => {
    if (players.length < 1) return 'Players are required';
    if (!pack) return 'Pack is required';
    if (!host) return 'Host is required';

    return null;
  }, [players, pack, host]);

  const handleStart = () => {
    reset();
    resetEliminatedStatus();
    navigate('/game');
  };

  return (
    <Stack gap='lg'>
      <Card withBorder>
        <Stack align='center' gap='md'>
          <Group justify='space-between' w='100%'>
            <div></div>
            <Title order={1} ta='center'>
              🎮 LAST LETTER!
            </Title>
            <Tooltip label='Settings'>
              <ActionIcon variant='light' size='lg' onClick={() => navigate('/settings')} color='gray'>
                <IconSettings size={20} />
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text c='dimmed' size='lg' ta='center'>
            The ultimate word game where every letter counts!
          </Text>
        </Stack>
      </Card>

      <SelectPack />
      <GameConfig />
      <PlayersAdd />

      <Card withBorder>
        <Stack gap='md' align='center'>
          <Button
            size='xl'
            onClick={handleStart}
            disabled={!!canStart}
            variant='gradient'
            gradient={{ from: 'blue', to: 'purple' }}
          >
            🚀 Start Game
          </Button>
          {canStart && (
            <Text size='sm' ta='center' c='red'>
              ⚠️ {canStart}
            </Text>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
