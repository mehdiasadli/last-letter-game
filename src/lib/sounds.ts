/* eslint-disable @typescript-eslint/no-explicit-any */
// Simple tick sound as a data URL (base64 encoded short beep)
export const TICK_SOUND =
  'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT';

// Create a simple beep using Web Audio API
export function createTickBeep(frequency: number = 800, volume: number = 0.2): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08);
  } catch (error) {
    console.warn('Failed to create tick sound:', error);
  }
}

// Normal tick sound (for ≤20 seconds)
export function createNormalTick(): void {
  createTickBeep(800, 0.15);
}

// Urgent tick sound (for ≤10 seconds) - higher frequency and volume
export function createUrgentTick(): void {
  createTickBeep(1000, 0.25);
}

// Error sound for invalid word submission
export function createErrorSound(): void {
  createTickBeep(400, 0.3); // Lower frequency, higher volume for error sound
}
