'use strict';

const React = require('react');
const useLatest = require('./useLatest-rOeU5Z3P.js');

function useResizeObserver(callback) {
  const callbackRef = useLatest.useLatest(callback);
  const nodeRef = React.useRef(null);
  const observerRef = React.useRef(
    typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries, observer) => {
      callbackRef.current(entries, observer);
    }) : null
  );
  React.useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries, observer) => {
        callbackRef.current(entries, observer);
      });
      if (nodeRef.current) {
        observerRef.current.observe(nodeRef.current);
      }
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [callbackRef]);
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

exports.useResizeObserver = useResizeObserver;
