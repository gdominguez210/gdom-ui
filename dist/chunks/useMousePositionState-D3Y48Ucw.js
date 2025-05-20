import { useState, useCallback } from 'react';

function useMousePositionState() {
  const [position, setPosition] = useState({
    clientX: null,
    clientY: null,
    offsetX: null,
    offsetY: null
  });
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { offsetX, offsetY } = e.nativeEvent;
    setPosition({
      clientX,
      clientY,
      offsetX,
      offsetY
    });
  }, []);
  const handleMouseLeave = useCallback(() => {
    setPosition({
      clientX: null,
      clientY: null,
      offsetX: null,
      offsetY: null
    });
  }, []);
  return {
    position,
    handleMouseMove,
    handleMouseLeave,
    isHovering: position.clientX !== null
  };
}

export { useMousePositionState as u };
