import { useCallback, useEffect, useRef, type MouseEventHandler } from 'react';
import { useLatest } from '@lib/useLatest/useLatest';

/**
 * Options for the useDelayedMouseMove hook
 */
export type UseDelayedMouseMoveOptions<T extends HTMLElement> = {
  /**
   * Delay in milliseconds before mouse move events are processed
   */
  initialDelay?: number;

  /**
   * Callback function to execute after the initial delay
   */
  onMouseMove: MouseEventHandler<T>;

  /**
   * Optional callback for when mouse leaves the element
   */
  onMouseLeave?: MouseEventHandler<T>;
};

/**
 * Hook that delays processing mouse move events until after an initial delay period
 * Useful for preventing flickering effects during quick mouse movements
 */
export function useDelayedMouseMove<T extends HTMLElement>({
  initialDelay = 150,
  onMouseMove,
  onMouseLeave,
}: UseDelayedMouseMoveOptions<T>) {
  const initialDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialDelayCompletedRef = useRef(false);
  const lastMouseEventRef = useRef<React.MouseEvent<T> | null>(null);

  const onMouseMoveRef = useLatest(onMouseMove);
  const onMouseLeaveRef = useLatest(onMouseLeave);

  const handleMouseEnter: MouseEventHandler<T> = useCallback(
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
    [initialDelay, onMouseMoveRef],
  );

  const handleMouseMove: MouseEventHandler<T> = useCallback(
    (e) => {
      lastMouseEventRef.current = e;

      if (isInitialDelayCompletedRef.current) {
        onMouseMoveRef.current?.(lastMouseEventRef.current);
      }
    },
    [onMouseMoveRef],
  );

  const handleMouseOut: MouseEventHandler<T> = useCallback(
    (e) => {
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
        initialDelayTimeoutRef.current = null;
      }

      isInitialDelayCompletedRef.current = false;
      lastMouseEventRef.current = null;

      onMouseLeaveRef.current?.(e);
    },
    [onMouseLeaveRef],
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
    handleMouseOut,
  };
}
