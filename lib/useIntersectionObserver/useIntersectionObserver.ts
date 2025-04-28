import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useLatest } from '@lib/useLatest/useLatest';
const DEFAULT_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px',
  threshold: 0,
  root: null,
};

/**
 * Hook to observe an element's intersection with the viewport
 *
 * @param callback Standard IntersectionObserver callback function
 * @param options IntersectionObserver options
 * @returns Object with a setRef function to attach to the element you want to observe
 */
export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = DEFAULT_OPTIONS,
): { setRef: (node: Element | null) => void } {
  const mergedOptions = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);

  const callbackRef = useLatest(callback);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }, mergedOptions);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [mergedOptions, callbackRef]);

  const setRef = useCallback((node: Element | null) => {
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { setRef };
}
