import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to observe an element's intersection with the viewport
 *
 * @param callback Standard IntersectionObserver callback function
 * @param options IntersectionObserver options
 * @returns Object with a setRef function to attach to the element you want to observe
 */
export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
): { setRef: (node: Element | null) => void } {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }, options);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [options]);

  const setRef = useCallback((node: Element | null) => {
    observerRef.current?.disconnect();

    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  return { setRef };
}
