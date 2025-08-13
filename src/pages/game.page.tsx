import { Navigate } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { GameHeader } from '../components/game-header';
import { GameTimer } from '../components/game-timer';
import { GameInput } from '../components/game-input';
import { GameUsedWords } from '../components/game-used-words';
// import { GameHostPanel } from '../components/game-host-panel';
import { GamePlayers } from '../components/game-players';
import { Celebration } from '../components/celebration';
import { useSetup } from '../hooks/use-setup';
import { GameTitle } from '../components/game-title';
import { useGameStore } from '../stores/game.store';
import { useState, useEffect } from 'react';

export default function GamePage() {
  const { time, timeStatus, restart, canStart } = useSetup();
  const { gameEnded, usedWords } = useGameStore();
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastUsedWordsCount, setLastUsedWordsCount] = useState(usedWords.length);

  // Trigger celebration when a new word is added
  useEffect(() => {
    if (usedWords.length > lastUsedWordsCount) {
      setShowCelebration(true);
      setLastUsedWordsCount(usedWords.length);
    }
  }, [usedWords.length, lastUsedWordsCount]);

  if (!canStart) {
    return <Navigate to='/' />;
  }

  if (gameEnded) {
    return <Navigate to='/result' />;
  }

  return (
    <>
      <Stack w='100%' gap='lg'>
        <GameTitle />
        <GameHeader />
        <GameTimer time={time} />
        <GameInput timeStatus={timeStatus} restart={restart} />
        <GameUsedWords />
        <GamePlayers />
        {/* <GameHostPanel /> */}
      </Stack>
      <Celebration trigger={showCelebration} onComplete={() => setShowCelebration(false)} />
    </>
  );
}
