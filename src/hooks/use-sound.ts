import { useCallback, useRef } from 'react';

interface SoundOptions {
  volume?: number;
  loop?: boolean;
}

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundUrl: string, options: SoundOptions = {}) => {
    try {
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;
      audio.src = soundUrl;
      audio.volume = options.volume ?? 0.5;
      audio.loop = options.loop ?? false;

      // Play the sound
      audio.play().catch((error) => {
        console.warn('Failed to play sound:', error);
      });
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return {
    playSound,
    stopSound,
  };
}
