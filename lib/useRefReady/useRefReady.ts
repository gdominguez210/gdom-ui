import { useRef, useState, useCallback } from 'react';

export type RefReadyResult<T> = [(node: T | null) => void, boolean, React.RefObject<T | null>];

/**
 * A hook that tracks whether a ref has been set
 * @param initialValue Optional initial value
 * @returns [setRef, isReady, ref] - A callback ref function, boolean state, and the actual ref object
 */
export function useRefReady<T>(initialValue?: T | null): RefReadyResult<T> {
  const ref = useRef<T | null>(initialValue ?? null);

  const [isReady, setIsReady] = useState<boolean>(initialValue !== null);

  const setRef = useCallback((node: T | null) => {
    ref.current = node;
    setIsReady(node !== null);
  }, []);

  return [setRef, isReady, ref];
}
