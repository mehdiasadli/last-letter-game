import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Status = 'active' | 'paused' | 'ended';

type CountdownHandlers = {
  onStart?: (timeLeft: number) => void;
  onEnd?: () => void;
  onPause?: (timeLeft: number) => void;
  onStop?: (timeLeft: number) => void;
  onResume?: (timeLeft: number) => void;
  onTick?: (timeLeft: number) => void;
  onReset?: () => void;
  onRestart?: (timeLeft: number) => void;
  format?: (timeLeft: number) => string;
};

export type UseCountdownOptions = {
  start?: number; // default 120
  autoStart?: boolean; // default true
  tickResolutionMs?: number; // default 250ms
} & CountdownHandlers;

export type UseCountdownReturn = {
  time: number;
  formattedTime: string;
  status: Status;
  start: (seconds?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: (seconds?: number) => void;
  restart: (seconds?: number) => void;
};

const defaultFormat = (s: number) => {
  if (s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

export function useCountdown(options: UseCountdownOptions = {}): UseCountdownReturn {
  const {
    start: startProp = 120,
    autoStart = true,
    tickResolutionMs = 250,
    onStart,
    onEnd,
    onPause,
    onStop,
    onResume,
    onTick,
    onReset,
    onRestart,
    format = defaultFormat,
  } = options;

  const initial = Math.max(0, Math.floor(startProp));
  const [time, setTime] = useState<number>(initial);
  const [status, setStatus] = useState<Status>('paused'); // idle/ready == "paused"

  const timeRef = useRef<number>(initial);
  const runningRef = useRef<boolean>(false);
  const pausedRef = useRef<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const deadlineRef = useRef<number | null>(null);
  const startSecondsRef = useRef<number>(initial);

  // Keep latest callbacks
  const cbsRef = useRef<Required<Omit<CountdownHandlers, 'format'>>>({
    onStart: onStart ?? (() => {}),
    onEnd: onEnd ?? (() => {}),
    onPause: onPause ?? (() => {}),
    onStop: onStop ?? (() => {}),
    onResume: onResume ?? (() => {}),
    onTick: onTick ?? (() => {}),
    onReset: onReset ?? (() => {}),
    onRestart: onRestart ?? (() => {}),
  });
  useEffect(() => {
    cbsRef.current.onStart = onStart ?? (() => {});
    cbsRef.current.onEnd = onEnd ?? (() => {});
    cbsRef.current.onPause = onPause ?? (() => {});
    cbsRef.current.onStop = onStop ?? (() => {});
    cbsRef.current.onResume = onResume ?? (() => {});
    cbsRef.current.onTick = onTick ?? (() => {});
    cbsRef.current.onReset = onReset ?? (() => {});
    cbsRef.current.onRestart = onRestart ?? (() => {});
  }, [onStart, onEnd, onPause, onStop, onResume, onTick, onReset, onRestart]);

  // Adopt new start prop if idle
  useEffect(() => {
    const next = Math.max(0, Math.floor(startProp));
    startSecondsRef.current = next;
    if (!runningRef.current && !pausedRef.current) {
      timeRef.current = next;
      setTime(next);
      setStatus(next === 0 ? 'ended' : 'paused');
    }
  }, [startProp]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Drift-safe ticker using a fixed deadline
  const beginTicking = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(
      () => {
        if (!runningRef.current || deadlineRef.current == null) return;
        const now = Date.now();
        const remainMs = Math.max(0, deadlineRef.current - now);
        const nextSec = Math.max(0, Math.ceil(remainMs / 1000));
        if (nextSec !== timeRef.current) {
          timeRef.current = nextSec;
          setTime(nextSec);
          cbsRef.current.onTick(nextSec);
          if (nextSec === 0) {
            clearTimer();
            runningRef.current = false;
            pausedRef.current = false;
            deadlineRef.current = null;
            setStatus('ended');
            cbsRef.current.onEnd();
          }
        }
      },
      Math.max(50, tickResolutionMs)
    );
  }, [clearTimer, tickResolutionMs]);

  const start = useCallback(
    (seconds?: number) => {
      const initial = Math.max(0, Math.floor(seconds ?? startSecondsRef.current));
      clearTimer();
      pausedRef.current = false;
      runningRef.current = true;
      timeRef.current = initial;
      setTime(initial);
      setStatus('active');
      deadlineRef.current = Date.now() + initial * 1000;
      cbsRef.current.onStart(initial);
      cbsRef.current.onTick(initial); // immediate UI sync
      beginTicking();
    },
    [beginTicking, clearTimer]
  );

  const pause = useCallback(() => {
    if (!runningRef.current) return;
    pausedRef.current = true;
    runningRef.current = false;
    clearTimer();
    deadlineRef.current = null;
    setStatus('paused');
    cbsRef.current.onPause(timeRef.current);
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (runningRef.current || !pausedRef.current || timeRef.current <= 0) return;
    pausedRef.current = false;
    runningRef.current = true;
    deadlineRef.current = Date.now() + timeRef.current * 1000;
    setStatus('active');
    cbsRef.current.onResume(timeRef.current);
    beginTicking();
  }, [beginTicking]);

  const stop = useCallback(() => {
    if (!runningRef.current && !pausedRef.current) return;
    const at = timeRef.current;
    runningRef.current = false;
    pausedRef.current = false;
    clearTimer();
    deadlineRef.current = null;
    timeRef.current = 0;
    setTime(0);
    setStatus('ended'); // manual stop maps to ended
    cbsRef.current.onStop(at);
  }, [clearTimer]);

  const reset = useCallback(
    (seconds?: number) => {
      const initial = Math.max(0, Math.floor(seconds ?? startSecondsRef.current));
      runningRef.current = false;
      pausedRef.current = false;
      clearTimer();
      deadlineRef.current = null;
      startSecondsRef.current = initial;
      timeRef.current = initial;
      setTime(initial);
      setStatus(initial === 0 ? 'ended' : 'paused');
      cbsRef.current.onReset();
    },
    [clearTimer]
  );

  const restart = useCallback(
    (seconds?: number) => {
      // Reset to provided seconds (or last known start), then immediately start
      const initial = Math.max(0, Math.floor(seconds ?? startSecondsRef.current));
      clearTimer();
      pausedRef.current = false;
      runningRef.current = true;
      startSecondsRef.current = initial;
      timeRef.current = initial;
      setTime(initial);
      setStatus('active');
      deadlineRef.current = Date.now() + initial * 1000;
      cbsRef.current.onRestart(initial);
      cbsRef.current.onStart(initial);
      cbsRef.current.onTick(initial);
      beginTicking();
    },
    [beginTicking, clearTimer]
  );

  // Auto-start once
  useEffect(() => {
    if (autoStart) start();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const formattedTime = useMemo(() => format(time), [time, format]);

  return {
    time,
    formattedTime,
    status,
    start,
    pause,
    resume,
    stop,
    reset,
    restart,
  };
}
