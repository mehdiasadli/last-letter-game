import { Card, Stack, Title, Text, Badge, Group, SimpleGrid, Button } from '@mantine/core';
import { useGameStore } from '../stores/game.store';
import { usePlayersStore } from '../stores/players.store';
import { useWords } from '../hooks/use-words';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ResultPage() {
  const { players, resetEliminatedStatus } = usePlayersStore();
  const { currentLetter, usedWords, gameEnded, winner, winners, reset: resetGame } = useGameStore();
  const words = useWords();
  const navigate = useNavigate();

  // Redirect to home if no game has ended
  useEffect(() => {
    if (!gameEnded) {
      navigate('/');
    }
  }, [gameEnded, navigate]);

  // Don't render if no game has ended
  if (!gameEnded) {
    return null;
  }

  const eliminatedPlayers = players.filter((p) => p.eliminated);

  // Get remaining words for the current letter
  const remainingWordsForLetter = words.filter(
    (w) => w.main.toLowerCase().startsWith(currentLetter.toLowerCase()) && !usedWords.includes(w.main)
  );

  // Get total remaining words (all unused words)
  const totalRemainingWords = words.filter((w) => !usedWords.includes(w.main));

  const isWinner = winner !== null;
  const isMultipleWinners = winners.length > 0;
  const noWinner = !isWinner && !isMultipleWinners;

  const handlePlayAgain = () => {
    // Reset the game and player elimination status, then go back to start
    resetGame();
    resetEliminatedStatus();
    navigate('/');
  };

  return (
    <Stack w='100%' gap='lg'>
      <Card withBorder>
        <Stack align='center' gap='lg'>
          <Title order={2} ta='center'>
            🎮 Game Results
          </Title>

          {isWinner && (
            <Stack align='center' gap='md'>
              <Badge color='green' size='xl' variant='filled'>
                🏆 Winner! 🏆
              </Badge>
              <Title order={3} c='green' ta='center'>
                {winner} wins the game!
              </Title>
              <Text c='dimmed' ta='center' size='lg'>
                Congratulations! You were the last player standing and found a word to win!
              </Text>
            </Stack>
          )}

          {isMultipleWinners && (
            <Stack align='center' gap='md'>
              <Badge color='green' size='xl' variant='filled'>
                🏆 Winners! 🏆
              </Badge>
              <Title order={3} c='green' ta='center'>
                {winners.join(', ')} win the game!
              </Title>
              <Text c='dimmed' ta='center' size='lg'>
                Congratulations! You all survived until the word list was exhausted!
              </Text>
            </Stack>
          )}

          {noWinner && (
            <Stack align='center' gap='md'>
              <Badge color='red' size='xl' variant='filled'>
                No Winner
              </Badge>
              <Title order={3} c='red' ta='center'>
                All players eliminated!
              </Title>
              <Text c='dimmed' ta='center' size='lg'>
                Everyone ran out of time! No one found a word to continue the game.
              </Text>
            </Stack>
          )}
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap='lg'>
          <Title order={3} ta='center'>
            👥 Players
          </Title>

          {isWinner && (
            <Stack gap='md'>
              <Text fw={600} c='green' size='lg' ta='center'>
                🏆 Winner
              </Text>
              <Card withBorder p='lg'>
                <Text fw='bold' c='green' size='lg' ta='center'>
                  {winner}
                </Text>
              </Card>
            </Stack>
          )}

          {isMultipleWinners && (
            <Stack gap='md'>
              <Text fw={600} c='green' size='lg' ta='center'>
                🏆 Winners
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='md'>
                {winners.map((winnerName) => (
                  <Card key={winnerName} withBorder p='md'>
                    <Text fw='bold' c='green' size='lg' ta='center'>
                      {winnerName}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          )}

          {eliminatedPlayers.length > 0 && (
            <Stack gap='md'>
              <Text fw={600} c='red' size='lg' ta='center'>
                ❌ Eliminated Players
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='md'>
                {eliminatedPlayers.map((player) => (
                  <Card key={player.name} withBorder p='md'>
                    <Text c='red' fw={500} ta='center'>
                      {player.name}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
          )}
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap='lg'>
          <Title order={3} ta='center'>
            📊 Game Statistics
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='lg'>
            <Card withBorder p='md'>
              <Stack gap='xs' align='center'>
                <Text fw={600} size='sm'>
                  Final Letter
                </Text>
                <Badge size='xl' variant='filled' color='blue'>
                  {currentLetter}
                </Badge>
              </Stack>
            </Card>

            <Card withBorder p='md'>
              <Stack gap='xs' align='center'>
                <Text fw={600} size='sm'>
                  Words Used
                </Text>
                <Badge size='xl' variant='filled' color='green'>
                  {usedWords.length}
                </Badge>
              </Stack>
            </Card>

            <Card withBorder p='md'>
              <Stack gap='xs' align='center'>
                <Text fw={600} size='sm'>
                  Remaining ({currentLetter})
                </Text>
                <Badge size='xl' variant='filled' color='orange'>
                  {remainingWordsForLetter.length}
                </Badge>
              </Stack>
            </Card>

            <Card withBorder p='md'>
              <Stack gap='xs' align='center'>
                <Text fw={600} size='sm'>
                  Total Remaining
                </Text>
                <Badge size='xl' variant='filled' color='red'>
                  {totalRemainingWords.length}
                </Badge>
              </Stack>
            </Card>
          </SimpleGrid>

          <Group gap='md' justify='center'>
            <Text size='sm' c='dimmed' ta='center'>
              Game completed with {usedWords.length} words used out of {words.length} total words
            </Text>
          </Group>
        </Stack>
      </Card>

      {remainingWordsForLetter.length > 0 && (
        <Card withBorder>
          <Stack gap='lg'>
            <Title order={3} ta='center'>
              🔤 Remaining Words for "{currentLetter}"
            </Title>
            <Text c='dimmed' size='md' ta='center'>
              These words could have been used to continue the game:
            </Text>
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing='md'>
              {remainingWordsForLetter.slice(0, 16).map((word) => (
                <Card key={word.main} shadow='sm' p='xs'>
                  <Text size='sm' fw={500} ta='center'>
                    {word.main}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
            {remainingWordsForLetter.length > 16 && (
              <Text c='dimmed' size='sm' ta='center'>
                ... and {remainingWordsForLetter.length - 16} more words
              </Text>
            )}
          </Stack>
        </Card>
      )}

      <Card withBorder>
        <Stack gap='lg'>
          <Title order={3} ta='center'>
            📝 Used Words
          </Title>
          {usedWords.length > 0 ? (
            <>
              <Text c='dimmed' size='md' ta='center'>
                All words used during the game:
              </Text>
              <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing='md'>
                {usedWords.map((word) => (
                  <Card key={word} shadow='sm' p='xs'>
                    <Text size='sm' fw={500} ta='center'>
                      {word}
                    </Text>
                  </Card>
                ))}
              </SimpleGrid>
            </>
          ) : (
            <Text c='dimmed' ta='center' size='lg'>
              No words were used in this game.
            </Text>
          )}
        </Stack>
      </Card>

      <Card withBorder>
        <Stack gap='md' align='center'>
          <Button size='xl' onClick={handlePlayAgain} variant='gradient' gradient={{ from: 'blue', to: 'purple' }}>
            🎮 Play Again
          </Button>
          <Text size='sm' c='dimmed' ta='center'>
            Start a new game with the same settings
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}
