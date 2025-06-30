import { useRef, useCallback, useEffect } from 'react';
import { u as useLatest } from './useLatest-CIF2WkZQ.js';

function useDelayedMouseMove({
  initialDelay = 150,
  onMouseMove,
  onMouseLeave
}) {
  const initialDelayTimeoutRef = useRef(null);
  const isInitialDelayCompletedRef = useRef(false);
  const lastMouseEventRef = useRef(null);
  const onMouseMoveRef = useLatest(onMouseMove);
  const onMouseLeaveRef = useLatest(onMouseLeave);
  const handleMouseEnter = useCallback(
    (e) => {
      lastMouseEventRef.current = e;
      isInitialDelayCompletedRef.current = false;
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
      initialDelayTimeoutRef.current = setTimeout(() => {
        isInitialDelayCompletedRef.current = true;
        if (lastMouseEventRef.current && onMouseMoveRef.current) {
          onMouseMoveRef.current(lastMouseEventRef.current);
        }
      }, initialDelay);
    },
    [initialDelay, onMouseMoveRef]
  );
  const handleMouseMove = useCallback(
    (e) => {
      lastMouseEventRef.current = e;
      if (isInitialDelayCompletedRef.current) {
        onMouseMoveRef.current?.(lastMouseEventRef.current);
      }
    },
    [onMouseMoveRef]
  );
  const handleMouseOut = useCallback(
    (e) => {
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
        initialDelayTimeoutRef.current = null;
      }
      isInitialDelayCompletedRef.current = false;
      lastMouseEventRef.current = null;
      onMouseLeaveRef.current?.(e);
    },
    [onMouseLeaveRef]
  );
  useEffect(() => {
    return () => {
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
    };
  }, []);
  return {
    handleMouseEnter,
    handleMouseMove,
    handleMouseOut
  };
}

export { useDelayedMouseMove as u };
