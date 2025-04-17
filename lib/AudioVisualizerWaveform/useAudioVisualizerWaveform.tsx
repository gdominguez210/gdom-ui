import { convertColorToOKLCH } from '@lib/utils/convertColorToOKLCH/convertColorToOKLCH';
import { useRef, useCallback, useMemo } from 'react';
import {
  type WaveformColorMode,
  drawStaticWaveform,
  drawSegmentedWaveform,
  WAVEFORM_COLOR_MODES,
} from '@lib/AudioVisualizerWaveform/drawingUtils';

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
};

export type useAudioVisualizerWaveformReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawWaveform: (dataArray: Uint8Array) => void;
};

export function useAudioVisualizerWaveform(
  options?: useAudioVisualizerWaveformOptions,
): useAudioVisualizerWaveformReturn {
  const {
    lineColor = '#ffffff',
    lineWidth = 2,
    colorMode = WAVEFORM_COLOR_MODES.STATIC,
    segmentCount = 40,
  } = options || {};

  const baseOklchColor = useMemo(() => {
    return convertColorToOKLCH(lineColor);
  }, [lineColor]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        drawStaticWaveform(ctx, dataArray, displayWidth, displayHeight, lineColor);
      } else {
        drawSegmentedWaveform(
          ctx,
          dataArray,
          displayWidth,
          displayHeight,
          baseOklchColor,
          colorMode,
          segmentCount,
        );
      }
    },
    [lineColor, lineWidth, colorMode, baseOklchColor, segmentCount],
  );

  return { canvasRef, drawWaveform };
}
