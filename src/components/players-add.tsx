import {
  ActionIcon,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { usePlayersStore } from '../stores/players.store';
import { IconCheck, IconPencil, IconPlus, IconStar, IconTrash, IconX } from '@tabler/icons-react';
import { useField } from '@mantine/form';
import { useState } from 'react';

export function PlayersAdd() {
  const { players, addPlayer, removePlayer, setPlayers, host, setHost } = usePlayersStore();
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [editingError, setEditingError] = useState<string | null>(null);

  const field = useField({
    mode: 'controlled',
    initialValue: '',
    validate(value) {
      if (!value || !value.trim()) {
        return 'Player name is required';
      }

      if (players.find((p) => p.name === value.trim())) {
        return 'Player name must be unique';
      }

      return null;
    },
  });

  const handleAddPlayer = () => {
    addPlayer(field.getValue());

    field.reset();
  };

  const inputProps = field.getInputProps();

  const startEditing = (player: string) => {
    setEditingPlayer(player);
    setEditingValue(player);
    setEditingError(null);
  };

  const validateEditing = (value: string): string | null => {
    if (!value || !value.trim()) return 'Player name is required';
    const trimmed = value.trim();
    const others = players.filter((p) => p.name !== editingPlayer);
    if (others.find((p) => p.name === trimmed)) return 'Player name must be unique';
    return null;
  };

  const saveEditing = () => {
    const error = validateEditing(editingValue);
    if (error) {
      setEditingError(error);
      return;
    }
    const trimmed = editingValue.trim();
    const updated = players.map((p) => (p.name === editingPlayer ? { name: trimmed } : p));
    setPlayers(updated.map((p) => p.name));
    setEditingPlayer(null);
    setEditingValue('');
    setEditingError(null);
  };

  const cancelEditing = () => {
    setEditingPlayer(null);
    setEditingValue('');
    setEditingError(null);
  };

  return (
    <Card withBorder>
      <Stack gap='lg'>
        <Title order={3} ta='center'>
          👥 Add Players
        </Title>

        <Stack gap='md'>
          <Group justify='center' align='flex-end' gap='xs'>
            <TextInput
              flex={1}
              label='New player'
              placeholder="Enter the player's name"
              {...inputProps}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !editingPlayer && !field.error && field.getValue()) {
                  e.preventDefault();
                  handleAddPlayer();
                }
              }}
              disabled={!!editingPlayer}
              size='md'
            />
            <Button
              disabled={!!field.error || !field.getValue()}
              onClick={handleAddPlayer}
              variant='filled'
              color='blue'
            >
              <IconPlus size={16} />
            </Button>
          </Group>

          {players.length > 0 && (
            <Stack gap='sm'>
              <Text fw={600} size='sm' c='dimmed' ta='center'>
                {players.length} player{players.length !== 1 ? 's' : ''} added
              </Text>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
                {players.map((player) => (
                  <Card key={player.name} withBorder p='md'>
                    <Group justify='space-between' align='center'>
                      <Group gap='xs'>
                        {host === player.name && (
                          <ThemeIcon color='yellow' variant='light' size='sm'>
                            <IconStar size={12} />
                          </ThemeIcon>
                        )}
                        <Stack gap={0}>
                          <Text fw={500}>
                            {editingPlayer === player.name ? (
                              <TextInput
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.currentTarget.value)}
                                error={editingError || undefined}
                                placeholder='Edit player name'
                                autoFocus
                                size='sm'
                              />
                            ) : (
                              player.name
                            )}
                          </Text>
                        </Stack>
                      </Group>
                      <Group gap='xs'>
                        {editingPlayer === player.name ? (
                          <>
                            <ActionIcon color='green' variant='light' onClick={saveEditing} size='sm'>
                              <IconCheck size={14} />
                            </ActionIcon>
                            <ActionIcon color='gray' variant='light' onClick={cancelEditing} size='sm'>
                              <IconX size={14} />
                            </ActionIcon>
                          </>
                        ) : (
                          <>
                            {host !== player.name && (
                              <Tooltip label='Set as host'>
                                <ActionIcon
                                  color='orange'
                                  variant='light'
                                  onClick={() => setHost(player.name)}
                                  size='sm'
                                >
                                  <IconStar size={12} />
                                </ActionIcon>
                              </Tooltip>
                            )}
                            <ActionIcon
                              color='blue'
                              variant='light'
                              onClick={() => startEditing(player.name)}
                              size='sm'
                            >
                              <IconPencil size={14} />
                            </ActionIcon>
                            <ActionIcon color='red' variant='light' onClick={() => removePlayer(player.name)} size='sm'>
                              <IconTrash size={14} />
                            </ActionIcon>
                          </>
                        )}
                      </Group>
                    </Group>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          )}

          {players.length === 0 && (
            <Text c='dimmed' ta='center' size='sm'>
              No players added yet. Add at least one player to start the game.
            </Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
