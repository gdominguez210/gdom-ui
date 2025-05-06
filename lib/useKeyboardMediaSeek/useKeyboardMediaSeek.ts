import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, RefObject } from 'react';
import { formatDurationForDisplay } from '@lib/utils/formatDurationForDisplay/formatDurationForDisplay';

type HTMLMediaElement = HTMLAudioElement | HTMLVideoElement;

export type UseKeyboardMediaSeekOptions = {
  /**
   * Reference to the media element (audio or video)
   */
  mediaRef: RefObject<HTMLMediaElement>;

  /**
   * The total duration of the media in seconds
   */
  duration: number;

  /**
   * Callback fired when a seek operation is completed.
   * @param time The new time position in seconds (can be used if needed)
   */
  onSeekComplete?: (time: number) => void;

  /**
   * Initial amount of time (in seconds) to seek when using keyboard navigation
   * @default 1
   */
  seekIncrement?: number;

  /**
   * Maximum amount of time (in seconds) to seek when holding down arrow keys
   * @default 30
   */
  maxSeekIncrement?: number;

  /**
   * Rate at which seek increment increases when holding down arrow keys
   * @default 1.5
   */
  seekAcceleration?: number;

  /**
   * Delay in milliseconds before seek acceleration begins
   * @default 500
   */
  seekAccelerationDelay?: number;

  /**
   * Custom label for the media control element
   * @default "Media player. Use arrow keys to navigate."
   */
  ariaLabel?: string;

  /**
   * Interval in milliseconds between seek operations when holding a key
   * @default 100
   */
  seekInterval?: number;
};

export type UseKeyboardMediaSeekReturn = {
  /**
   * Current seek increment amount (changes while accelerating)
   */
  currentSeekIncrement: number;

  /**
   * Handler for keydown events
   */
  handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;

  /**
   * Handler for keyup events
   */
  handleKeyUp: (event: KeyboardEvent<HTMLElement>) => void;

  /**
   * Accessibility attributes to apply to the focusable element
   */
  a11yProps: {
    /**
     * Make the element keyboard focusable
     */
    tabIndex: number;

    /**
     * ARIA role for the control
     */
    role: string;

    /**
     * Description of the control for screen readers
     */
    'aria-label': string;

    /**
     * Minimum value of the slider
     */
    'aria-valuemin': number;

    /**
     * Maximum value of the slider
     */
    'aria-valuemax': number;

    /**
     * Current value of the slider
     */
    'aria-valuenow': number;

    /**
     * Text representation of the current value
     */
    'aria-valuetext'?: string;
  };
};

/**
 * Hook to handle keyboard-based seeking for audio or video elements.
 * Provides accelerated seeking when arrow keys are held down.
 */
export function useKeyboardMediaSeek({
  mediaRef,
  duration,
  onSeekComplete,
  seekIncrement = 1,
  maxSeekIncrement = 30,
  seekAcceleration = 1.5,
  seekAccelerationDelay = 500,
  ariaLabel = 'Media player. Use arrow keys to navigate.',
  seekInterval = 100,
}: UseKeyboardMediaSeekOptions): UseKeyboardMediaSeekReturn {
  const [currentSeekIncrement, setCurrentSeekIncrement] = useState(seekIncrement);
  const keyPressStartTimeRef = useRef<number | null>(null);
  const seekIntervalRef = useRef<number | null>(null);
  const activeKeyRef = useRef<string | null>(null);
  const currentDirectionRef = useRef<'forward' | 'backward' | null>(null);
  const continuousSeekTimeoutRef = useRef<number | null>(null);

  const performSingleSeek = useCallback(
    (direction: 'forward' | 'backward') => {
      if (!mediaRef.current) return;

      const currentTime = mediaRef.current.currentTime;
      const newTime =
        direction === 'forward'
          ? Math.min(duration, currentTime + seekIncrement)
          : Math.max(0, currentTime - seekIncrement);

      mediaRef.current.currentTime = newTime;
      onSeekComplete?.(newTime);
    },
    [mediaRef, duration, seekIncrement, onSeekComplete],
  );

  const performSeekWithAcceleration = useCallback(() => {
    if (!mediaRef.current || !currentDirectionRef.current || !keyPressStartTimeRef.current) return;

    const elapsedTime = Date.now() - keyPressStartTimeRef.current;

    let effectiveIncrement = seekIncrement;

    if (elapsedTime > seekAccelerationDelay) {
      const accelerationTime = elapsedTime - seekAccelerationDelay;
      const accelerationFactor = Math.min(
        (accelerationTime / 1000) * seekAcceleration,
        maxSeekIncrement / seekIncrement - 1,
      );
      effectiveIncrement = Math.min(seekIncrement * (1 + accelerationFactor), maxSeekIncrement);
    }

    setCurrentSeekIncrement(effectiveIncrement);

    const currentTime = mediaRef.current.currentTime;
    const direction = currentDirectionRef.current;
    const newTime =
      direction === 'forward'
        ? Math.min(duration, currentTime + effectiveIncrement)
        : Math.max(0, currentTime - effectiveIncrement);

    mediaRef.current.currentTime = newTime;
    onSeekComplete?.(newTime);
  }, [
    mediaRef,
    duration,
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    onSeekComplete,
  ]);

  const startContinuousSeeking = useCallback(
    (direction: 'forward' | 'backward', key: string) => {
      if (activeKeyRef.current === key) return;

      performSingleSeek(direction);

      activeKeyRef.current = key;
      currentDirectionRef.current = direction;
      keyPressStartTimeRef.current = Date.now();

      if (continuousSeekTimeoutRef.current !== null) {
        window.clearTimeout(continuousSeekTimeoutRef.current);
      }
      if (seekIntervalRef.current !== null) {
        window.clearInterval(seekIntervalRef.current);
      }

      // Set a timeout before we start continuous seeking
      // This ensures brief keypresses only get a single seek
      continuousSeekTimeoutRef.current = window.setTimeout(() => {
        seekIntervalRef.current = window.setInterval(performSeekWithAcceleration, seekInterval);
        continuousSeekTimeoutRef.current = null;
      }, 250);
    },
    [performSingleSeek, performSeekWithAcceleration, seekInterval],
  );

  const stopContinuousSeeking = useCallback(
    (key?: string) => {
      if (key && activeKeyRef.current !== key) return;

      if (continuousSeekTimeoutRef.current !== null) {
        window.clearTimeout(continuousSeekTimeoutRef.current);
        continuousSeekTimeoutRef.current = null;
      }

      if (seekIntervalRef.current !== null) {
        window.clearInterval(seekIntervalRef.current);
        seekIntervalRef.current = null;
      }

      activeKeyRef.current = null;
      currentDirectionRef.current = null;
      keyPressStartTimeRef.current = null;
      setCurrentSeekIncrement(seekIncrement);
    },
    [seekIncrement],
  );

  useEffect(() => {
    return () => {
      if (continuousSeekTimeoutRef.current !== null) {
        window.clearTimeout(continuousSeekTimeoutRef.current);
      }
      if (seekIntervalRef.current !== null) {
        window.clearInterval(seekIntervalRef.current);
      }
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          startContinuousSeeking('backward', e.key);
          break;
        case 'ArrowRight':
          e.preventDefault();
          startContinuousSeeking('forward', e.key);
          break;
        default:
          return;
      }
    },
    [startContinuousSeeking],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          stopContinuousSeeking(e.key);
          break;
        default:
          return;
      }
    },
    [stopContinuousSeeking],
  );

  const a11yProps = {
    tabIndex: 0,
    role: 'slider',
    'aria-label': `${ariaLabel} Currently seeking ${Math.round(currentSeekIncrement)} seconds at a time.`,
    'aria-valuemin': 0,
    'aria-valuemax': duration,
    'aria-valuenow': mediaRef.current?.currentTime || 0,
    'aria-valuetext': `${formatDurationForDisplay(mediaRef.current?.currentTime || 0)} of ${formatDurationForDisplay(duration)}`,
  };

  return {
    currentSeekIncrement,
    handleKeyDown,
    handleKeyUp,
    a11yProps,
  };
}
