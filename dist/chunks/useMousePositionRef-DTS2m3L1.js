'use strict';

const React = require('react');

function useMousePositionRef() {
  const positionRef = React.useRef({
    clientX: null,
    clientY: null,
    offsetX: null,
    offsetY: null
  });
  const handleMouseMove = React.useCallback((e) => {
    const { clientX, clientY } = e;
    const { offsetX, offsetY } = e.nativeEvent;
    positionRef.current = {
      clientX,
      clientY,
      offsetX,
      offsetY
    };
  }, []);
  const handleMouseLeave = React.useCallback(() => {
    positionRef.current = {
      clientX: null,
      clientY: null,
      offsetX: null,
      offsetY: null
    };
  }, []);
  const getPosition = React.useCallback(() => positionRef.current, []);
  const getIsHovering = React.useCallback(() => positionRef.current.clientX !== null, []);
  return {
    getPosition,
    positionRef,
    handleMouseMove,
    handleMouseLeave,
    getIsHovering
  };
}

exports.useMousePositionRef = useMousePositionRef;
