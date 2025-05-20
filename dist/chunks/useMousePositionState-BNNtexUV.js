'use strict';

const React = require('react');

function useMousePositionState() {
  const [position, setPosition] = React.useState({
    clientX: null,
    clientY: null,
    offsetX: null,
    offsetY: null
  });
  const handleMouseMove = React.useCallback((e) => {
    const { clientX, clientY } = e;
    const { offsetX, offsetY } = e.nativeEvent;
    setPosition({
      clientX,
      clientY,
      offsetX,
      offsetY
    });
  }, []);
  const handleMouseLeave = React.useCallback(() => {
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

exports.useMousePositionState = useMousePositionState;
