import { useCallback, useRef } from 'react';
import {
  getActualGapWidth,
  calculateMaxBarsInView,
  calculateSamplingRate,
  sampleWaveformData,
  calculateBarWidth,
} from '@lib/AudioWaveform/drawingUtils';

export type GradientStop = {
  /**
   * Position of the stop (0-1)
   */
  offset: number;

  /**
   * Color of the stop as a CSS color string
   */
  color: string;
};

export type BarColorResult =
  | string
  | {
      type: 'gradient';
      stops: GradientStop[];
    };

export type WaveformGradientStop = {
  /**
   * Position of the stop (0-1)
   */
  offset: number;

  /**
   * Color of the stop as a CSS color string
   */
  color: string;
};

export type WaveformBarInfo = {
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

export type useAudioWaveformOptions = {
  /**
   * Waveform data array - normalized values between 0-1
   */
  waveformData: number[];

  /**
   * Color of the waveform
   */
  barColor?: string;

  /**
   * Function to determine bar color based on state
   */
  getBarColor?: (barInfo: WaveformBarInfo) => BarColorResult;

  /**
   * Gap between bars as a proportion of canvas width (0-1)
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
   * Height of the waveform as a percentage of canvas height
   * @default 1 (100% of canvas height)
   */
  heightScale?: number;
};

export const useAudioWaveform = (options: useAudioWaveformOptions) => {
  const {
    waveformData,
    barColor = '#eeeeee',
    getBarColor,
    barGapRatio = 0.0035,
    heightScale = 1,
    minBarWidth = 1,
    minBarGapPercent = 0.001,
  } = options;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gapWidth = getActualGapWidth(displayWidth, barGapRatio, minBarGapPercent);

    const maxBarsInView = calculateMaxBarsInView(displayWidth, minBarWidth, gapWidth);

    const samplingRate = calculateSamplingRate(waveformData.length, maxBarsInView);
    const displayData = sampleWaveformData(waveformData, samplingRate);

    const barWidth = calculateBarWidth(displayWidth, displayData.length, gapWidth, minBarWidth);

    const centerY = displayHeight / 2;
    const maxBarHeight = displayHeight * heightScale;

    displayData.forEach((value, index) => {
      const isGapless = barGapRatio === 0 || minBarGapPercent === 0;
      const x = isGapless ? Math.round(index * barWidth) : index * (barWidth + gapWidth);
      const barHeight = value * maxBarHeight;

      const originalIndex = index * samplingRate;
      const position = waveformData.length > 1 ? originalIndex / (waveformData.length - 1) : 0;

      const barInfo: WaveformBarInfo = {
        position,
        value,
        index: originalIndex,
        width: barWidth / displayWidth,
      };

      if (getBarColor) {
        const barColorResult = getBarColor(barInfo);

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
        ctx.fillStyle = barColor;
      }
      const effectiveBarWidth = isGapless ? Math.ceil(barWidth) : barWidth;

      ctx.fillRect(x, centerY - barHeight / 2, effectiveBarWidth, barHeight);
    });
  }, [
    barColor,
    getBarColor,
    heightScale,
    waveformData,
    barGapRatio,
    minBarWidth,
    minBarGapPercent,
  ]);

  return { canvasRef, drawWaveform };
};
