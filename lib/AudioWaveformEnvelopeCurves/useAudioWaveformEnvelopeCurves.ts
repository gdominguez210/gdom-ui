import { type ColorResult } from '@/types/colors';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
import { useCallback, useEffect } from 'react';
import {
  useAudioResponsiveSamplingEnvelopes,
  type UseAudioResponsiveSamplingEnvelopesOptions,
  type UseAudioResponsiveSamplingEnvelopesReturn,
} from '@/lib/useAudioResponsiveSamplingEnvelopes/useAudioResponsiveSamplingEnvelopes';
import {
  useColorTransition,
  type UseColorTransitionOptions,
} from '@/lib/useColorTransition/useColorTransition';

export type UseAudioWaveformEnvelopeCurvesOptions = {
  /**
   * Height scale factor for the waveform
   */
  heightScale?: number;
  /**
   * Color of the envelope, can be a string or a function that returns a ColorResult
   */
  color?: string | (() => ColorResult);
  /**
   * Whether to draw the waveform on when the canvas ref is set
   * @default true
   */
  drawOnCanvasReady?: boolean;
  /**
   * Smoothness factor for curves (0 = angular, 1 = very smooth)
   * @default 0.5
   */
  smoothingFactor?: number;
} & Omit<
  UseAudioResponsiveSamplingEnvelopesOptions,
  'gapWidthPercent' | 'gapMinWidth' | 'gapMaxWidth'
> &
  Omit<UseColorTransitionOptions, 'targetColor'>;

export type UseAudioWaveformEnvelopeCurvesReturn = {
  canvasRef: (node: HTMLCanvasElement | null) => void;
  calculateSegments: UseAudioResponsiveSamplingEnvelopesReturn['calculateSegments'];
  drawWaveform: () => void;
  handleResize: () => void;
};

/**
 * Hook for drawing curved audio waveform envelopes on a canvas.
 * Creates continuous filled curves without gaps between segments.
 *
 * @param options - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export function useAudioWaveformEnvelopeCurves(
  options: UseAudioWaveformEnvelopeCurvesOptions,
): UseAudioWaveformEnvelopeCurvesReturn {
  const {
    data,
    color = '#9f9fa9',
    colorTransitionDuration,
    frameRate,
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    interpolationFn,
    smoothingFactor = 0.5,
  } = options;

  const { getSegments, getSegmentWidth, getGapWidth, calculateSegments } =
    useAudioResponsiveSamplingEnvelopes({
      data,
      segmentMinWidth,
      interpolationFn,
      gapMinWidth: 0,
    });

  const { getColorString, currentColor } = useColorTransition({
    targetColor: typeof color === 'string' ? color : '#000000',
    colorTransitionDuration,
    frameRate,
  });

  const [setCanvasRef, isReady, canvasRef] = useRefReady<HTMLCanvasElement | null>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const segments = getSegments();

    if (!canvas || segments.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayHeight = canvas.clientHeight;
    const displayWidth = canvas.clientWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = getSegmentWidth();

    ctx.beginPath();

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (!segment) continue;

      const { max } = segment;
      const x = i * segmentWidth + segmentWidth / 2;
      const maxY = centerY + (max * maxHeight) / 2;

      if (i === 0) {
        ctx.moveTo(0, maxY);
        ctx.lineTo(x, maxY);
      } else if (i === segments.length - 1) {
        const prevX = (i - 1) * segmentWidth + segmentWidth / 2;
        const controlX = prevX + (x - prevX) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, maxY, x, maxY);
        ctx.lineTo(displayWidth, maxY);
      } else {
        const prevX = (i - 1) * segmentWidth + segmentWidth / 2;
        const controlX = prevX + (x - prevX) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, maxY, x, maxY);
      }
    }

    for (let i = segments.length - 1; i >= 0; i--) {
      const segment = segments[i];

      if (!segment) continue;

      const { min } = segment;
      const x = i * segmentWidth + segmentWidth / 2;
      const minY = centerY + (min * maxHeight) / 2;

      if (i === segments.length - 1) {
        ctx.lineTo(x, minY);
      } else if (i === 0) {
        const nextX = (i + 1) * segmentWidth + segmentWidth / 2;
        const controlX = x + (nextX - x) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, minY, x, minY);
        ctx.lineTo(0, minY);
      } else {
        const nextX = (i + 1) * segmentWidth + segmentWidth / 2;
        const controlX = x + (nextX - x) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, minY, x, minY);
      }
    }

    ctx.closePath();

    if (typeof color !== 'function') {
      ctx.fillStyle = getColorString();
      ctx.fill();
      return;
    }

    const colorResult = color();

    if (typeof colorResult === 'string') {
      ctx.fillStyle = colorResult;
      ctx.fill();
      return;
    }

    if (colorResult.type === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, 0, displayHeight);

      colorResult.stops.forEach((stop) => {
        gradient.addColorStop(stop.offset, stop.color);
      });

      ctx.fillStyle = gradient;
      ctx.fill();
      return;
    }
  }, [
    canvasRef,
    color,
    heightScale,
    getSegments,
    getSegmentWidth,
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
  }, [isReady, canvasRef, drawOnCanvasReady, drawWaveform, currentColor, calculateSegments]);

  return { canvasRef: setCanvasRef, drawWaveform, calculateSegments, handleResize };
}
