import { useRef, useEffect, type RefObject } from 'react';

/**
 * Hook that returns a ref object with the latest value
 * The ref is updated every time the value changes
 * Useful for accessing the latest value in callbacks without triggering re-renders
 *
 * @param value The value to keep up-to-date in the ref
 * @returns A ref object that always contains the latest value
 */
export function useLatest<T>(value: T): RefObject<T> {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
