'use strict';

const React = require('react');

function useRefReady(initialValue) {
  const ref = React.useRef(initialValue ?? null);
  const [isReady, setIsReady] = React.useState(initialValue !== null);
  const setRef = React.useCallback((node) => {
    ref.current = node;
    setIsReady(node !== null);
  }, []);
  return [setRef, isReady, ref];
}

exports.useRefReady = useRefReady;
