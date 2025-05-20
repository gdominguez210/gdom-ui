import { useState, useRef, useCallback, useEffect } from 'react';
import { f as formatDurationForDisplay } from './formatDurationForDisplay-D6BfGXTZ.js';

function useKeyboardMediaSeek({
  mediaRef,
  duration,
  onSeekComplete,
  seekIncrement = 1,
  maxSeekIncrement = 30,
  seekAcceleration = 1.5,
  seekAccelerationDelay = 500,
  ariaLabel = "Media player. Use arrow keys to navigate.",
  seekInterval = 100
}) {
  const [currentSeekIncrement, setCurrentSeekIncrement] = useState(seekIncrement);
  const keyPressStartTimeRef = useRef(null);
  const seekIntervalRef = useRef(null);
  const activeKeyRef = useRef(null);
  const currentDirectionRef = useRef(null);
  const continuousSeekTimeoutRef = useRef(null);
  const performSingleSeek = useCallback(
    (direction) => {
      if (!mediaRef.current) return;
      const currentTime = mediaRef.current.currentTime;
      const newTime = direction === "forward" ? Math.min(duration, currentTime + seekIncrement) : Math.max(0, currentTime - seekIncrement);
      mediaRef.current.currentTime = newTime;
      onSeekComplete?.(newTime);
    },
    [mediaRef, duration, seekIncrement, onSeekComplete]
  );
  const performSeekWithAcceleration = useCallback(() => {
    if (!mediaRef.current || !currentDirectionRef.current || !keyPressStartTimeRef.current) return;
    const elapsedTime = Date.now() - keyPressStartTimeRef.current;
    let effectiveIncrement = seekIncrement;
    if (elapsedTime > seekAccelerationDelay) {
      const accelerationTime = elapsedTime - seekAccelerationDelay;
      const accelerationFactor = Math.min(
        accelerationTime / 1e3 * seekAcceleration,
        maxSeekIncrement / seekIncrement - 1
      );
      effectiveIncrement = Math.min(seekIncrement * (1 + accelerationFactor), maxSeekIncrement);
    }
    setCurrentSeekIncrement(effectiveIncrement);
    const currentTime = mediaRef.current.currentTime;
    const direction = currentDirectionRef.current;
    const newTime = direction === "forward" ? Math.min(duration, currentTime + effectiveIncrement) : Math.max(0, currentTime - effectiveIncrement);
    mediaRef.current.currentTime = newTime;
    onSeekComplete?.(newTime);
  }, [
    mediaRef,
    duration,
    seekIncrement,
    maxSeekIncrement,
    seekAcceleration,
    seekAccelerationDelay,
    onSeekComplete
  ]);
  const startContinuousSeeking = useCallback(
    (direction, key) => {
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
      continuousSeekTimeoutRef.current = window.setTimeout(() => {
        seekIntervalRef.current = window.setInterval(performSeekWithAcceleration, seekInterval);
        continuousSeekTimeoutRef.current = null;
      }, 250);
    },
    [performSingleSeek, performSeekWithAcceleration, seekInterval]
  );
  const stopContinuousSeeking = useCallback(
    (key) => {
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
    [seekIncrement]
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
    (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          startContinuousSeeking("backward", e.key);
          break;
        case "ArrowRight":
          e.preventDefault();
          startContinuousSeeking("forward", e.key);
          break;
        default:
          return;
      }
    },
    [startContinuousSeeking]
  );
  const handleKeyUp = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowRight":
          stopContinuousSeeking(e.key);
          break;
        default:
          return;
      }
    },
    [stopContinuousSeeking]
  );
  const a11yProps = {
    tabIndex: 0,
    role: "slider",
    "aria-label": `${ariaLabel} Currently seeking ${Math.round(currentSeekIncrement)} seconds at a time.`,
    "aria-valuemin": 0,
    "aria-valuemax": duration,
    "aria-valuenow": mediaRef.current?.currentTime || 0,
    "aria-valuetext": `${formatDurationForDisplay(mediaRef.current?.currentTime || 0)} of ${formatDurationForDisplay(duration)}`
  };
  return {
    currentSeekIncrement,
    handleKeyDown,
    handleKeyUp,
    a11yProps
  };
}

export { useKeyboardMediaSeek as u };
