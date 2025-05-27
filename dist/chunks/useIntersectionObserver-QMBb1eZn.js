'use strict';

const React = require('react');
const useLatest = require('./useLatest-rOeU5Z3P.js');

const DEFAULT_OPTIONS = {
  rootMargin: "0px",
  threshold: 0,
  root: null
};
function useIntersectionObserver(callback, options = DEFAULT_OPTIONS) {
  const mergedOptions = React.useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);
  const callbackRef = useLatest.useLatest(callback);
  const observerRef = React.useRef(
    typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }) : null
  );
  const nodeRef = React.useRef(null);
  React.useEffect(() => {
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
  const setRef = React.useCallback((node) => {
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

exports.useIntersectionObserver = useIntersectionObserver;
