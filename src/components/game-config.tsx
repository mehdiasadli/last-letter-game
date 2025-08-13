import { Card, Select, Stack, Switch, Text, Title } from '@mantine/core';
import { useGameConfigStore } from '../stores/game-config.store';

const gameSpeedOptions = [
  {
    value: 'slow',
    label: '🐌 Slow',
    description: 'More time to think - relaxed gameplay',
  },
  {
    value: 'medium',
    label: '⚡ Medium',
    description: 'Balanced speed - moderate challenge',
  },
  {
    value: 'fast',
    label: '🚀 Fast',
    description: 'Quick thinking required - intense gameplay',
  },
];

export function GameConfig() {
  const {
    gameSpeed,
    setGameSpeed,
    setShowHowManyWordsLeft,
    setShowUsedWords,
    showHowManyWordsLeft,
    showUsedWords,
    soundEnabled,
    setSoundEnabled,
  } = useGameConfigStore();

  return (
    <Card withBorder>
      <Stack gap='lg'>
        <Title order={3} ta='center'>
          ⚙️ Game Settings
        </Title>

        <Stack gap='md'>
          <Select
            allowDeselect={false}
            label='Game Speed'
            placeholder='Pick the game speed'
            data={gameSpeedOptions}
            value={gameSpeed}
            description={gameSpeedOptions.find((o) => o.value === gameSpeed)?.description}
            onChange={(value) => setGameSpeed(value as 'slow' | 'medium' | 'fast')}
            size='md'
          />

          <Stack gap='sm'>
            <Switch
              label='📊 Show word count'
              description='Display how many words are left for the current letter'
              checked={showHowManyWordsLeft}
              onChange={(event) => setShowHowManyWordsLeft(event.currentTarget.checked)}
              size='md'
            />

            <Switch
              label='📝 Show used words'
              description='Display the list of words already used in the game'
              checked={showUsedWords}
              onChange={(event) => setShowUsedWords(event.currentTarget.checked)}
              size='md'
            />

            <Switch
              label='🔊 Sound effects'
              description='Play tick sounds when timer is running low (≤20s normal, ≤10s urgent every 0.5s) and error sounds for all validation errors'
              checked={soundEnabled}
              onChange={(event) => setSoundEnabled(event.currentTarget.checked)}
              size='md'
            />
          </Stack>
        </Stack>

        <Text size='sm' c='dimmed' ta='center'>
          🎮 Customize your gaming experience
        </Text>
      </Stack>
    </Card>
  );
}
