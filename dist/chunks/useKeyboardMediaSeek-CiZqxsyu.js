'use strict';

const React = require('react');
const formatDurationForDisplay = require('./formatDurationForDisplay-CG8pgKOh.js');

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
  const [currentSeekIncrement, setCurrentSeekIncrement] = React.useState(seekIncrement);
  const keyPressStartTimeRef = React.useRef(null);
  const seekIntervalRef = React.useRef(null);
  const activeKeyRef = React.useRef(null);
  const currentDirectionRef = React.useRef(null);
  const continuousSeekTimeoutRef = React.useRef(null);
  const performSingleSeek = React.useCallback(
    (direction) => {
      if (!mediaRef.current) return;
      const currentTime = mediaRef.current.currentTime;
      const newTime = direction === "forward" ? Math.min(duration, currentTime + seekIncrement) : Math.max(0, currentTime - seekIncrement);
      mediaRef.current.currentTime = newTime;
      onSeekComplete?.(newTime);
    },
    [mediaRef, duration, seekIncrement, onSeekComplete]
  );
  const performSeekWithAcceleration = React.useCallback(() => {
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
  const startContinuousSeeking = React.useCallback(
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
  const stopContinuousSeeking = React.useCallback(
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
  React.useEffect(() => {
    return () => {
      if (continuousSeekTimeoutRef.current !== null) {
        window.clearTimeout(continuousSeekTimeoutRef.current);
      }
      if (seekIntervalRef.current !== null) {
        window.clearInterval(seekIntervalRef.current);
      }
    };
  }, []);
  const handleKeyDown = React.useCallback(
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
  const handleKeyUp = React.useCallback(
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
    "aria-valuetext": `${formatDurationForDisplay.formatDurationForDisplay(mediaRef.current?.currentTime || 0)} of ${formatDurationForDisplay.formatDurationForDisplay(duration)}`
  };
  return {
    currentSeekIncrement,
    handleKeyDown,
    handleKeyUp,
    a11yProps
  };
}

exports.useKeyboardMediaSeek = useKeyboardMediaSeek;
