import { useState, useCallback } from 'react';

type MousePosition = {
  clientX: number | null;
  clientY: number | null;
  offsetX: number | null;
  offsetY: number | null;
};

export function useMousePositionState() {
  const [position, setPosition] = useState<MousePosition>({
    clientX: null,
    clientY: null,
    offsetX: null,
    offsetY: null,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { offsetX, offsetY } = e.nativeEvent;

    setPosition({
      clientX,
      clientY,
      offsetX,
      offsetY,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({
      clientX: null,
      clientY: null,
      offsetX: null,
      offsetY: null,
    });
  }, []);

  return {
    position,
    handleMouseMove,
    handleMouseLeave,
    isHovering: position.clientX !== null,
  };
}
