import { useMemo, useRef, useEffect, useCallback } from 'react';
import { u as useLatest } from './useLatest-CIF2WkZQ.js';

const DEFAULT_OPTIONS = {
  rootMargin: "0px",
  threshold: 0,
  root: null
};
function useIntersectionObserver(callback, options = DEFAULT_OPTIONS) {
  const mergedOptions = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);
  const callbackRef = useLatest(callback);
  const observerRef = useRef(
    typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }) : null
  );
  const nodeRef = useRef(null);
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
  const setRef = useCallback((node) => {
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

export { useIntersectionObserver as u };
