import { useRef, useCallback } from 'react';
import {
  type WaveformColorMode,
  drawStaticWaveform,
  drawSegmentedWaveform,
  WAVEFORM_COLOR_MODES,
} from '@/lib/AudioVisualizerWaveform/drawingUtils';
import { useColorTransition } from '@/lib/useColorTransition/useColorTransition';

export type useAudioVisualizerWaveformOptions = {
  /**
   * Color of the waveform line
   */
  lineColor?: string;

  /**
   * Thickness of the waveform line
   */
  lineWidth?: number;

  /**
   * Coloring mode for the waveform
   */
  colorMode?: WaveformColorMode;
  /**
   * Number of colored segments to divide the waveform into
   * Higher values create more color transitions, lower values improve performance
   * Only applies when colorMode is not 'static'
   * @default 40
   */
  segmentCount?: number;

  /**
   * Duration of the color transition in milliseconds
   * @default 1000
   */
  colorTransitionDuration?: number;
};

export type useAudioVisualizerWaveformReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawWaveform: (dataArray: Uint8Array) => void;
  clearCanvas: () => void;
};

export function useAudioVisualizerWaveform(
  options?: useAudioVisualizerWaveformOptions,
): useAudioVisualizerWaveformReturn {
  const {
    lineColor = '#ffffff',
    lineWidth = 2,
    colorMode = WAVEFORM_COLOR_MODES.STATIC,
    segmentCount = 40,
    colorTransitionDuration = 1000,
  } = options || {};

  const { getColorString, getCurrentColor } = useColorTransition({
    targetColor: lineColor,
    transitionDuration: colorTransitionDuration,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const drawWaveform = useCallback(
    (dataArray: Uint8Array) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = lineWidth;

      if (colorMode === WAVEFORM_COLOR_MODES.STATIC) {
        drawStaticWaveform(ctx, dataArray, displayWidth, displayHeight, getColorString());
      } else {
        drawSegmentedWaveform(
          ctx,
          dataArray,
          displayWidth,
          displayHeight,
          getCurrentColor(),
          colorMode,
          segmentCount,
        );
      }
    },
    [getCurrentColor, getColorString, lineWidth, colorMode, segmentCount],
  );

  return { canvasRef, drawWaveform, clearCanvas };
}
