import { type ColorResult } from '@/types/colors';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
import { useCallback, useEffect } from 'react';
import {
  useAudioResponsiveSamplingForCurves,
  type UseAudioResponsiveSamplingForCurvesOptions,
  type UseAudioResponsiveSamplingForCurvesReturn,
} from '@/lib/useAudioResponsiveSamplingCurves/useAudioResponsiveSamplingCurves';
import {
  useColorTransition,
  type UseColorTransitionOptions,
} from '@/lib/useColorTransition/useColorTransition';

export type UseAudioWaveformCurvesOptions = {
  /**
   * Height scale factor for the waveform
   */
  heightScale?: number;
  /**
   * Color of the curve, can be a string or a function that returns a ColorResult
   */
  color?: string | (() => ColorResult);
  /**
   * Whether to draw the waveform when the canvas ref is set
   * @default true
   */
  drawOnCanvasReady?: boolean;
  /**
   * Line width for the curve stroke
   * @default 2
   */
  lineWidth?: number;
  /**
   * Line cap style for the curve endpoints
   * @default 'round'
   */
  lineCap?: CanvasLineCap;
  /**
   * Smoothness factor for curves (0 = angular, 1 = very smooth)
   * @default 0.5
   */
  smoothingFactor?: number;
} & UseAudioResponsiveSamplingForCurvesOptions &
  Omit<UseColorTransitionOptions, 'targetColor'>;

export type UseAudioWaveformCurvesReturn = {
  canvasRef: (node: HTMLCanvasElement | null) => void;
  calculateSegments: UseAudioResponsiveSamplingForCurvesReturn['calculateSegments'];
  drawWaveform: () => void;
  handleResize: () => void;
};

/**
 * Hook for drawing audio waveform curves on a canvas.
 * Creates continuous stroke-based curves without gaps.
 *
 * @param props - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export function useAudioWaveformCurves(
  props: UseAudioWaveformCurvesOptions,
): UseAudioWaveformCurvesReturn {
  const {
    data,
    color = '#9f9fa9',
    colorTransitionDuration,
    frameRate,
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    interpolationFn,
    lineWidth = 2,
    lineCap = 'round',
    smoothingFactor = 0.5,
  } = props;

  const { valuesRef, segmentWidthRef, calculateSegments } = useAudioResponsiveSamplingForCurves({
    data,
    segmentMinWidth,
    interpolationFn,
  });

  const { getColorString, currentColor } = useColorTransition({
    targetColor: typeof color === 'string' ? color : '#000000',
    colorTransitionDuration,
    frameRate,
  });

  const [setCanvasRef, isReady, canvasRef] = useRefReady<HTMLCanvasElement | null>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const values = valuesRef.current;

    if (!canvas || values.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayHeight = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = segmentWidthRef.current;

    ctx.beginPath();

    values.forEach((value, i) => {
      const x = i * segmentWidth + segmentWidth / 2;
      const y = centerY - (value * maxHeight) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else if (smoothingFactor === 0) {
        ctx.lineTo(x, y);
      } else {
        const prevX = (i - 1) * segmentWidth + segmentWidth / 2;
        const controlX = prevX + (x - prevX) * smoothingFactor;
        const prevY = centerY - (values[i - 1]! * maxHeight) / 2;

        ctx.quadraticCurveTo(controlX, prevY, x, y);
      }
    });

    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.lineJoin = 'round';

    if (typeof color !== 'function') {
      ctx.strokeStyle = getColorString();
      ctx.stroke();
      return;
    }

    const colorResult = color();

    if (typeof colorResult === 'string') {
      ctx.strokeStyle = colorResult;
      ctx.stroke();
      return;
    }

    if (colorResult.type === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);
      colorResult.stops.forEach((stop) => {
        gradient.addColorStop(stop.offset, stop.color);
      });
      ctx.strokeStyle = gradient;
      ctx.stroke();
      return;
    }
  }, [
    canvasRef,
    color,
    heightScale,
    valuesRef,
    segmentWidthRef,
    lineWidth,
    lineCap,
    smoothingFactor,
    getColorString,
  ]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    calculateSegments(canvas.clientWidth);
    drawWaveform();
  }, [canvasRef, calculateSegments, drawWaveform]);

  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      calculateSegments(canvasRef.current.clientWidth);
    }
  }, [isReady, canvasRef, drawOnCanvasReady, calculateSegments]);

  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      drawWaveform();
    }
  }, [isReady, canvasRef, drawOnCanvasReady, drawWaveform, currentColor]);

  return { canvasRef: setCanvasRef, drawWaveform, calculateSegments, handleResize };
}
