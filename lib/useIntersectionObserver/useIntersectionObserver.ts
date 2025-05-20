import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useLatest } from '@/lib/useLatest/useLatest';
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

  const observerRef = useRef<IntersectionObserver | null>(
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries, observer) => {
          callbackRef.current(entries, observer);
        })
      : null,
  );

  const nodeRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries, observer) => {
        callbackRef.current(entries, observer);
      }, mergedOptions);

      if (nodeRef.current) {
        observerRef.current.observe(nodeRef.current);
      }
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [mergedOptions, callbackRef]);

  const setRef = useCallback((node: Element | null) => {
    const currentNode = node;
    nodeRef.current = currentNode;

    if (currentNode && observerRef.current) {
      observerRef.current.observe(currentNode);
    }

    return () => {
      if (currentNode && observerRef.current) {
        observerRef.current.unobserve(currentNode);
      }
    };
  }, []);

  return { setRef };
}
