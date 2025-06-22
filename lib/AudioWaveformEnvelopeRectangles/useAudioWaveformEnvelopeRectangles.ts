import { type ColorResult, GRADIENT_MODE } from '@/types/colors';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
import { useCallback, useEffect } from 'react';
import {
  useAudioResponsiveSampling,
  type UseAudioResponsiveSamplingOptions,
  type UseAudioResponsiveSamplingReturn,
} from '@/lib/useAudioResponsiveSampling/useAudioResponsiveSampling';
import type { EnvelopeSegmentInfo } from '@/types/audio';

export type UseAudioWaveformEnvelopeRectanglesOptions = {
  /**
   * Height scale factor for the waveform
   */
  heightScale?: number;
  /**
   * Color of the envelope, can be a string or a function that returns a ColorResult
   */
  color?: string | ((segmentInfo: EnvelopeSegmentInfo) => ColorResult);
  /**
   * Whether to draw the waveform on when the canvas ref is set
   * @default true
   */
  drawOnCanvasReady?: boolean;
} & UseAudioResponsiveSamplingOptions;

export type UseAudioWaveformEnvelopeRectanglesReturn = {
  canvasRef: (node: HTMLCanvasElement | null) => void;
  calculateSegments: UseAudioResponsiveSamplingReturn['calculateSegments'];
  drawWaveform: () => void;
  handleResize: () => void;
};

/**
 * Hook for drawing audio waveform envelopes on a canvas.
 *
 * @param props - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export function useAudioWaveformEnvelopeRectangles(
  props: UseAudioWaveformEnvelopeRectanglesOptions,
): UseAudioWaveformEnvelopeRectanglesReturn {
  const {
    data,
    color = '#9f9fa9',
    heightScale = 1,
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    gapWidthPercent = 0,
    gapMinWidth = 0,
    gapMaxWidth,
    interpolationFn,
  } = props;

  const { segmentsRef, segmentWidthRef, gapWidthRef, calculateSegments } =
    useAudioResponsiveSampling({
      data,
      segmentMinWidth,
      gapWidthPercent,
      gapMinWidth,
      gapMaxWidth,
      interpolationFn,
    });

  const [setCanvasRef, isReady, canvasRef] = useRefReady<HTMLCanvasElement | null>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || data?.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayHeight = canvas.clientHeight;
    const displayWidth = canvas.clientWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segments = segmentsRef.current;
    const segmentWidth = segmentWidthRef.current;

    let globalGradient: CanvasGradient | null = null;

    segments.forEach(({ min, max }, i) => {
      const x = i * (segmentWidth + gapWidthRef.current);
      const minY = centerY + (min * maxHeight) / 2;
      const maxY = centerY + (max * maxHeight) / 2;
      const barHeight = Math.abs(maxY - minY);
      const amplitudeRange = Math.abs(max - min);
      const position = segments.length > 1 ? i / (segments.length - 1) : 0;

      const segmentInfo: EnvelopeSegmentInfo = {
        position,
        min,
        max,
        index: i,
        widthPercent: segmentWidth / displayWidth,
        widthPixels: segmentWidth,
        amplitudeRange,
        heightPixels: barHeight,
      };

      const fillRect = () => {
        ctx.fillRect(x, Math.min(minY, maxY), segmentWidth, barHeight);
      };

      if (typeof color !== 'function') {
        ctx.fillStyle = color;
        fillRect();
        return;
      }

      const colorResult = color(segmentInfo);

      if (typeof colorResult === 'string') {
        ctx.fillStyle = colorResult;
        fillRect();
        return;
      }

      if (colorResult.type === 'gradient') {
        const gradientMode = colorResult.mode ?? GRADIENT_MODE.GLOBAL;

        const addColorStops = (gradient: CanvasGradient) => {
          colorResult.stops.forEach((stop) => {
            gradient.addColorStop(stop.offset, stop.color);
          });
        };

        if (gradientMode === GRADIENT_MODE.GLOBAL) {
          if (globalGradient === null) {
            globalGradient = ctx.createLinearGradient(0, 0, 0, displayHeight);

            addColorStops(globalGradient);
          }

          ctx.fillStyle = globalGradient;
          fillRect();
          return;
        }

        const gradient = ctx.createLinearGradient(
          x,
          Math.min(minY, maxY),
          x,
          Math.min(minY, maxY) + barHeight,
        );

        addColorStops(gradient);

        ctx.fillStyle = gradient;
        fillRect();
        return;
      }
    });
  }, [canvasRef, data, color, heightScale, segmentsRef, segmentWidthRef, gapWidthRef]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    calculateSegments(canvas.clientWidth);
    drawWaveform();
  }, [canvasRef, calculateSegments, drawWaveform]);

  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      init();
    }
  }, [isReady, canvasRef, drawOnCanvasReady, init]);

  return { canvasRef: setCanvasRef, drawWaveform, calculateSegments, handleResize: init };
}
