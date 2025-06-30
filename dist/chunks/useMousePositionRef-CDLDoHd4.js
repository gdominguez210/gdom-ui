import { useRef, useCallback } from 'react';

function useMousePositionRef() {
  const positionRef = useRef({
    clientX: null,
    clientY: null,
    offsetX: null,
    offsetY: null
  });
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { offsetX, offsetY } = e.nativeEvent;
    positionRef.current = {
      clientX,
      clientY,
      offsetX,
      offsetY
    };
  }, []);
  const handleMouseLeave = useCallback(() => {
    positionRef.current = {
      clientX: null,
      clientY: null,
      offsetX: null,
      offsetY: null
    };
  }, []);
  const getPosition = useCallback(() => positionRef.current, []);
  const getIsHovering = useCallback(() => positionRef.current.clientX !== null, []);
  return {
    getPosition,
    positionRef,
    handleMouseMove,
    handleMouseLeave,
    getIsHovering
  };
}

export { useMousePositionRef as u };
