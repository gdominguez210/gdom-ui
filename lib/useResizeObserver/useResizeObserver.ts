import { useEffect, useRef, useCallback } from 'react';
import { useLatest } from '@/lib/useLatest/useLatest';

export type UseResizeObserverReturn = {
  setRef: (node: Element | null) => void;
};

/**
 * Hook to observe an element's size changes
 *
 * @param callback Standard ResizeObserver callback function
 * @returns Object with a setRef function to attach to the element you want to observe
 */
export function useResizeObserver(
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions,
): UseResizeObserverReturn {
  const callbackRef = useLatest(callback);
  const nodeRef = useRef<Element | null>(null);

  const observerRef = useRef<ResizeObserver | null>(
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver((entries, observer) => {
          callbackRef.current(entries, observer);
        })
      : null,
  );

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries, observer) => {
        callbackRef.current(entries, observer);
      });

      if (nodeRef.current) {
        try {
          observerRef.current.observe(nodeRef.current, options);
        } catch (error) {
          observerRef.current.observe(nodeRef.current);
        }
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [callbackRef, options]);

  const setRef = useCallback(
    (node: Element | null) => {
      const currentNode = node;

      nodeRef.current = currentNode;

      if (currentNode && observerRef.current) {
        try {
          observerRef.current.observe(currentNode, options);
        } catch (error) {
          observerRef.current.observe(currentNode);
        }
      }

      return () => {
        if (currentNode && observerRef.current) {
          observerRef.current.unobserve(currentNode);
        }
      };
    },
    [options],
  );

  return { setRef };
}
