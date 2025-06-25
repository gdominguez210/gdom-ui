import { type ColorResult, GRADIENT_MODE } from '@/types/colors';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
import { useCallback, useEffect } from 'react';
import {
  useAudioResponsiveSamplingEnvelopes,
  type UseAudioResponsiveSamplingEnvelopesOptions,
  type UseAudioResponsiveSamplingEnvelopesReturn,
} from '@/lib/useAudioResponsiveSamplingEnvelopes/useAudioResponsiveSamplingEnvelopes';
import { type EnvelopeSegmentInfo } from '@/types/audio';

export type UseAudioWaveformEnvelopeLinesOptions = {
  /**
   * Height scale factor for the waveform
   */
  heightScale?: number;

  /**
   * Color of the envelope lines (fallback if function is not provided)
   */
  color?: string | ((segmentInfo: EnvelopeSegmentInfo) => ColorResult);

  /**
   * Width of the lines in pixels
   * @default 1
   */
  lineWidth?: number;

  /**
   * Style of line endings
   * @default 'butt'
   */
  lineCap?: CanvasLineCap;

  /**
   * Whether to draw the waveform on when the canvas ref is set
   * @default true
   */
  drawOnCanvasReady: boolean;
} & UseAudioResponsiveSamplingEnvelopesOptions;

export type UseAudioWaveformEnvelopeLinesReturn = {
  canvasRef: (node: HTMLCanvasElement | null) => void;
  calculateSegments: UseAudioResponsiveSamplingEnvelopesReturn['calculateSegments'];
  drawWaveform: () => void;
  handleResize: () => void;
};

/**
 * Hook for drawing audio waveform envelope lines on a canvas.
 *
 * @param props - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export function useAudioWaveformEnvelopeLines(
  props: UseAudioWaveformEnvelopeLinesOptions,
): UseAudioWaveformEnvelopeLinesReturn {
  const {
    data,
    color = '#9f9fa9',
    heightScale = 1,
    lineCap = 'butt',
    drawOnCanvasReady = true,
    segmentMinWidth = 1,
    gapWidthPercent = 0,
    gapMinWidth = 0,
    gapMaxWidth,
    interpolationFn,
  } = props;

  const { segmentsRef, segmentWidthRef, gapWidthRef, calculateSegments } =
    useAudioResponsiveSamplingEnvelopes({
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
    const segments = segmentsRef.current;
    if (!canvas || segments.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayHeight = canvas.clientHeight;
    const displayWidth = canvas.clientWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = displayHeight / 2;
    const maxHeight = displayHeight * heightScale;
    const segmentWidth = segmentWidthRef.current;

    ctx.lineWidth = segmentWidth;
    ctx.lineCap = lineCap;

    let globalGradient: CanvasGradient | null = null;

    segments.forEach(({ min, max }, i) => {
      const x = i * (segmentWidth + gapWidthRef.current);
      const minY = centerY + (min * maxHeight) / 2;
      const maxY = centerY + (max * maxHeight) / 2;
      const barHeight = Math.abs(maxY - minY);
      const amplitudeRange = Math.abs(max - min);
      const position = segments.length > 1 ? i / (segments.length - 1) : 0;

      // Center the line in the segment
      const lineX = x + segmentWidth / 2;

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

      const drawLine = () => {
        ctx.beginPath();
        ctx.moveTo(lineX, minY);
        ctx.lineTo(lineX, maxY);
        ctx.stroke();
      };

      if (typeof color !== 'function') {
        ctx.strokeStyle = color;
        drawLine();
        return;
      }

      const colorResult = color(segmentInfo);

      if (typeof colorResult === 'string') {
        ctx.strokeStyle = colorResult;
        drawLine();
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

          ctx.strokeStyle = globalGradient;
          drawLine();
          return;
        }

        const gradient = ctx.createLinearGradient(
          lineX,
          Math.min(minY, maxY),
          lineX,
          Math.min(minY, maxY) + barHeight,
        );

        addColorStops(gradient);

        ctx.strokeStyle = gradient;
        drawLine();
        return;
      }
    });
  }, [canvasRef, color, heightScale, lineCap, segmentsRef, segmentWidthRef, gapWidthRef]);

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
