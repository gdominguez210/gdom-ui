'use strict';

const React = require('react');
const useLatest = require('./useLatest-rOeU5Z3P.js');

function useDelayedMouseMove({
  initialDelay = 150,
  onMouseMove,
  onMouseLeave
}) {
  const initialDelayTimeoutRef = React.useRef(null);
  const isInitialDelayCompletedRef = React.useRef(false);
  const lastMouseEventRef = React.useRef(null);
  const onMouseMoveRef = useLatest.useLatest(onMouseMove);
  const onMouseLeaveRef = useLatest.useLatest(onMouseLeave);
  const handleMouseEnter = React.useCallback(
    (e) => {
      lastMouseEventRef.current = e;
      isInitialDelayCompletedRef.current = false;
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
      initialDelayTimeoutRef.current = setTimeout(() => {
        isInitialDelayCompletedRef.current = true;
        if (lastMouseEventRef.current && onMouseMoveRef.current) {
          onMouseMoveRef.current(lastMouseEventRef.current);
        }
      }, initialDelay);
    },
    [initialDelay, onMouseMoveRef]
  );
  const handleMouseMove = React.useCallback(
    (e) => {
      lastMouseEventRef.current = e;
      if (isInitialDelayCompletedRef.current) {
        onMouseMoveRef.current?.(lastMouseEventRef.current);
      }
    },
    [onMouseMoveRef]
  );
  const handleMouseOut = React.useCallback(
    (e) => {
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
        initialDelayTimeoutRef.current = null;
      }
      isInitialDelayCompletedRef.current = false;
      lastMouseEventRef.current = null;
      onMouseLeaveRef.current?.(e);
    },
    [onMouseLeaveRef]
  );
  React.useEffect(() => {
    return () => {
      if (initialDelayTimeoutRef.current) {
        clearTimeout(initialDelayTimeoutRef.current);
      }
    };
  }, []);
  return {
    handleMouseEnter,
    handleMouseMove,
    handleMouseOut
  };
}

exports.useDelayedMouseMove = useDelayedMouseMove;
