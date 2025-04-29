import { useState, useCallback } from 'react';

type MousePosition = {
  clientX: number | null;
  clientY: number | null;
  offsetX: number | null;
  offsetY: number | null;
};

export type useMousePositionStateReturn = {
  position: MousePosition;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  isHovering: boolean;
};

export function useMousePositionState(): useMousePositionStateReturn {
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
