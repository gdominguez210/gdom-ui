import { useCallback, type MouseEventHandler, type RefObject } from 'react';
import {
  useElementDimensions,
  type UseElementDimensionsReturn,
} from '@lib/useElementDimensions/useElementDimensions';
import {
  type useMousePositionRefReturn,
  useMousePositionRef,
} from '@lib/useMousePositionRef/useMousePositionRef';

export type useAudioProgressWaveformOptions = {
  /**
   * The duration of the audio to visualize
   */
  duration: number;
  /**
   * The audio element to visualize
   */
  audioRef: RefObject<HTMLAudioElement>;
  /**
   * Callback fired when a seek operation is performed
   * @param time The time in seconds to seek to
   */
  onProgressChange?: (time: number) => void;
};

export type useAudioProgressWaveformReturn = {
  canvasRef: UseElementDimensionsReturn['elementRef'];
  dimensionsRef: UseElementDimensionsReturn['dimensionsRef'];
  handleWaveformClick: MouseEventHandler;
  handleMouseMove: useMousePositionRefReturn['handleMouseMove'];
  handleMouseLeave: useMousePositionRefReturn['handleMouseLeave'];
  getPosition: useMousePositionRefReturn['getPosition'];
  getIsHovering: useMousePositionRefReturn['getIsHovering'];
  positionRef: useMousePositionRefReturn['positionRef'];
};

export function useAudioProgressWaveform(
  options: useAudioProgressWaveformOptions,
): useAudioProgressWaveformReturn {
  const { onProgressChange, audioRef, duration } = options;

  const { dimensionsRef, elementRef: canvasRef } = useElementDimensions();
  const { getPosition, getIsHovering, positionRef, handleMouseMove, handleMouseLeave } =
    useMousePositionRef();

  const seekToPosition = useCallback(
    (position: number) => {
      if (!audioRef.current) return;

      // Ensure position is between 0 and 1
      const normalizedPosition = Math.max(0, Math.min(1, position));

      // Convert position to time (in seconds)
      const timeToSeek = normalizedPosition * duration;

      audioRef.current.currentTime = timeToSeek;

      onProgressChange?.(timeToSeek);
    },
    [audioRef, duration, onProgressChange],
  );

  const handleWaveformClick: MouseEventHandler = useCallback(
    (e) => {
      if (!audioRef.current) return;

      const { width, left } = dimensionsRef.current;

      if (width === 0) return;

      // Calculate click position as a ratio (0-1)
      const clickX = e.clientX - left;
      const position = clickX / width;

      seekToPosition(position);
    },
    [audioRef, dimensionsRef, seekToPosition],
  );

  return {
    canvasRef,
    dimensionsRef,
    handleWaveformClick,
    handleMouseMove,
    handleMouseLeave,
    getPosition,
    getIsHovering,
    positionRef,
  };
}
