import { useRef, useCallback } from 'react';

type MousePosition = {
  clientX: number | null;
  clientY: number | null;
  offsetX: number | null;
  offsetY: number | null;
};

export function useMousePositionRef() {
  const positionRef = useRef<MousePosition>({
    clientX: null,
    clientY: null,
    offsetX: null,
    offsetY: null,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { offsetX, offsetY } = e.nativeEvent;

    positionRef.current = {
      clientX,
      clientY,
      offsetX,
      offsetY,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    positionRef.current = {
      clientX: null,
      clientY: null,
      offsetX: null,
      offsetY: null,
    };
  }, []);

  const getPosition = useCallback(() => positionRef.current, []);
  const isHovering = useCallback(() => positionRef.current.clientX !== null, []);

  return {
    getPosition,
    positionRef,
    handleMouseMove,
    handleMouseLeave,
    isHovering,
  };
}
