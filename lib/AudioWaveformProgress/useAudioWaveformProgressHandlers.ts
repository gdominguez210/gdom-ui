import { useCallback, type MouseEventHandler, type RefObject } from 'react';
import { type UseElementDimensionsReturn } from '@/lib/useElementDimensions/useElementDimensions';

export type UseAudioWaveformProgressHandlersOptions = {
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
  /**
   * A function that returns the element's dimensions
   */
  getElementDimensions: UseElementDimensionsReturn['getElementDimensions'];
};

export function useAudioWaveformProgressHandlers(options: UseAudioWaveformProgressHandlersOptions) {
  const { onProgressChange, onPreviewTimeChange, audioRef, duration, getElementDimensions } =
    options;

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

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      const { width, left } = getElementDimensions();

      if (width === 0) return;

      // Calculate click position as a ratio (0-1)
      const clickX = e.clientX - left;
      const position = clickX / width;

      seekToPosition(position);
    },
    [getElementDimensions, seekToPosition],
  );

  const handleWaveformMouseMove: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (e) => {
      const { width, left } = getElementDimensions();
      if (width === 0) return;

      const mouseX = e.clientX - left;
      const position = mouseX / width;

      updatePreviewFromPosition(position);
    },
    [getElementDimensions, updatePreviewFromPosition],
  );

  const handleWaveformMouseLeave: MouseEventHandler<HTMLCanvasElement> = useCallback(() => {
    updatePreviewFromPosition(null);
  }, [updatePreviewFromPosition]);

  return {
    handleClick,
    handleMouseMove: handleWaveformMouseMove,
    handleMouseLeave: handleWaveformMouseLeave,
  };
}
