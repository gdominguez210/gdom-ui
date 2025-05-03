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
  /**
   * Callback fired when the mouse is over the waveform
   * @param time The time in seconds to preview
   */
  onPreviewTimeChange?: (time: number | null) => void;
};

export type useAudioProgressWaveformReturn = {
  canvasRef: UseElementDimensionsReturn['elementRef'];
  dimensionsRef: UseElementDimensionsReturn['dimensionsRef'];
  handleWaveformClick: MouseEventHandler;
  handleWaveformMouseMove: MouseEventHandler<HTMLCanvasElement>;
  handleWaveformMouseLeave: MouseEventHandler<HTMLCanvasElement>;
  getPosition: useMousePositionRefReturn['getPosition'];
  getIsHovering: useMousePositionRefReturn['getIsHovering'];
  positionRef: useMousePositionRefReturn['positionRef'];
};

export function useAudioProgressWaveform(
  options: useAudioProgressWaveformOptions,
): useAudioProgressWaveformReturn {
  const { onProgressChange, onPreviewTimeChange, audioRef, duration } = options;

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

  const updatePreviewFromPosition = useCallback(
    (position: number | null) => {
      if (position === null) {
        onPreviewTimeChange?.(null);
        return;
      }

      const normalizedPosition = Math.max(0, Math.min(1, position));

      const previewTime = normalizedPosition * duration;

      onPreviewTimeChange?.(previewTime);
    },
    [duration, onPreviewTimeChange],
  );

  const handleWaveformClick: MouseEventHandler = useCallback(
    (e) => {
      const { width, left } = dimensionsRef.current;

      if (width === 0) return;

      // Calculate click position as a ratio (0-1)
      const clickX = e.clientX - left;
      const position = clickX / width;

      seekToPosition(position);
    },
    [dimensionsRef, seekToPosition],
  );

  const handleWaveformMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleMouseMove(e);
      const { width, left } = dimensionsRef.current;
      if (width === 0) return;

      const mouseX = e.clientX - left;
      const position = mouseX / width;

      updatePreviewFromPosition(position);
    },
    [dimensionsRef, handleMouseMove, updatePreviewFromPosition],
  );

  const handleWaveformMouseLeave: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      handleMouseLeave(e);
      updatePreviewFromPosition(null);
    },
    [handleMouseLeave, updatePreviewFromPosition],
  );

  return {
    canvasRef,
    dimensionsRef,
    handleWaveformClick,
    handleWaveformMouseMove,
    handleWaveformMouseLeave,
    getPosition,
    getIsHovering,
    positionRef,
  };
}
