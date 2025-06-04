import { useCallback, useEffect } from 'react';
import { getActualGapWidth, calculateBarWidth } from '@/lib/AudioAmplitudeBars/drawingUtils';
import { useRefReady } from '@/lib/useRefReady/useRefReady';
import type { ColorResult } from '@/types/colors';
import { calculateMaxSegmentsInView } from '@/utils/calculateMaxSegmentsInView';
import { calculateSamplingRate } from '@/utils/calculateSamplingRate';
import { sampleAudioData } from '@/utils/sampleAudioData';

export type AmplitudeBarInfo = {
  /**
   * Position in the waveform (0-1)
   */
  position: number;

  /**
   * Amplitude value (0-1)
   */
  value: number;

  /**
   * Index in the waveform data array
   */
  index: number;

  /**
   * Width of this specific bar as a percentage of total width (0-1)
   */
  width: number;
};

export type UseAudioAmplitudeBarsOptions = {
  /**
   * Amplitude data array - normalized values between 0-1
   */
  amplitudeData: number[];

  /**
   * Height scale factor for the waveform
   */
  heightScale?: number;

  /**
   * Color of the waveform
   */
  color?: string;

  /**
   * Function to determine bar color based on state
   */
  getColor?: (barInfo: AmplitudeBarInfo) => ColorResult;

  /**
   * Gap between bars as a percentage of canvas width (value between 0 and 1)
   * For example, 0.005 would make gaps 0.5% of the total width
   * @default 0.003 (0.3% of canvas width)
   */
  barGapRatio?: number;

  /**
   * Minimum gap between bars as a percentage of canvas width
   * @default 0.001 (0.1% of canvas width)
   */
  minBarGapPercent?: number;

  /**
   * Minimum width for bars (in pixels)
   * @default 1
   */
  minBarWidth?: number;

  /**
   * Whether to draw the waveform on when the canvas ref is set
   * @default true
   */
  drawOnCanvasReady?: boolean;
};

export type UseAudioAmplitudeBarsReturn = {
  canvasRef: (canvas: HTMLCanvasElement) => void;
  drawWaveform: () => void;
};

export const useAudioAmplitudeBars = (options: UseAudioAmplitudeBarsOptions) => {
  const {
    amplitudeData,
    color = '#9f9fa9',
    getColor,
    barGapRatio = 0.0035,
    heightScale = 1,
    minBarWidth = 1,
    minBarGapPercent = 0.001,
    drawOnCanvasReady = true,
  } = options;

  const [setCanvasRef, isReady, canvasRef] = useRefReady<HTMLCanvasElement | null>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas || !amplitudeData.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gapWidth = getActualGapWidth(displayWidth, barGapRatio, minBarGapPercent);

    const maxBarsInView = calculateMaxSegmentsInView(displayWidth, minBarWidth, gapWidth);

    const samplingRate = calculateSamplingRate(amplitudeData.length, maxBarsInView);
    const displayData = sampleAudioData(amplitudeData, samplingRate);

    const barWidth = calculateBarWidth(displayWidth, displayData.length, gapWidth, minBarWidth);

    const centerY = displayHeight / 2;
    const maxBarHeight = displayHeight * heightScale;

    displayData.forEach((value, index) => {
      const isGapless = barGapRatio === 0 || minBarGapPercent === 0;
      const x = isGapless ? Math.round(index * barWidth) : index * (barWidth + gapWidth);
      const barHeight = value * maxBarHeight;

      const originalIndex = index * samplingRate;
      const position = amplitudeData.length > 1 ? originalIndex / (amplitudeData.length - 1) : 0;

      const barInfo: AmplitudeBarInfo = {
        position,
        value,
        index: originalIndex,
        width: barWidth / displayWidth,
      };

      if (getColor) {
        const barColorResult: ColorResult = getColor(barInfo);

        if (typeof barColorResult === 'string') {
          ctx.fillStyle = barColorResult;
        } else if (barColorResult.type === 'gradient') {
          const gradient = ctx.createLinearGradient(
            x,
            centerY + barHeight / 2,
            x,
            centerY - barHeight / 2,
          );

          barColorResult.stops.forEach((stop) => {
            gradient.addColorStop(stop.offset, stop.color);
          });

          ctx.fillStyle = gradient;
        }
      } else {
        ctx.fillStyle = color;
      }
      const effectiveBarWidth = isGapless ? Math.ceil(barWidth) : barWidth;

      ctx.fillRect(x, centerY - barHeight / 2, effectiveBarWidth, barHeight);
    });
  }, [
    color,
    canvasRef,
    getColor,
    heightScale,
    amplitudeData,
    barGapRatio,
    minBarGapPercent,
    minBarWidth,
  ]);

  useEffect(() => {
    if (isReady && canvasRef.current && drawOnCanvasReady) {
      drawWaveform();
    }
  }, [isReady, canvasRef, drawWaveform, drawOnCanvasReady]);

  return { canvasRef: setCanvasRef, drawWaveform };
};
