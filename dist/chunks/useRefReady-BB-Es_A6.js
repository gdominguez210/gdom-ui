import { useRef, useState, useCallback } from 'react';

function useRefReady(initialValue) {
  const ref = useRef(initialValue ?? null);
  const [isReady, setIsReady] = useState(initialValue !== null);
  const setRef = useCallback((node) => {
    ref.current = node;
    setIsReady(node !== null);
  }, []);
  return [setRef, isReady, ref];
}

export { useRefReady as u };
