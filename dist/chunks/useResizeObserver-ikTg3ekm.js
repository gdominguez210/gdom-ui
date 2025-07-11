import { useRef, useEffect, useCallback } from 'react';
import { u as useLatest } from './useLatest-CIF2WkZQ.js';

function useResizeObserver(callback, options) {
  const callbackRef = useLatest(callback);
  const nodeRef = useRef(null);
  const observerRef = useRef(
    typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }) : null
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
    (node) => {
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
    [options]
  );
  return { setRef };
}

export { useResizeObserver as u };
