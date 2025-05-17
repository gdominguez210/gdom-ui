import { useRef, useCallback } from 'react';
import {
  calculateLogarithmicDistributionDenominator,
  calculateLogarithmicIndexRatio,
  calculateLogarithmicIndex,
  calculateAmplifiedValue,
  calculateFrequencyBandAverage,
} from '@lib/AudioVisualizerFrequencyBars/frequencyDistribution';
import {
  FREQUENCY_BARS_COLOR_MODES,
  getBarColor,
} from '@lib/AudioVisualizerFrequencyBars/drawingUtils';
import { useColorTransition } from '@lib/useColorTransition/useColorTransition';
export type useAudioVisualizerFrequencyBarOptions = {
  /**
   * Color of the frequency bars
   * @default '#FFFFFF'
   */
  barColor?: string;

  /**
   * Number of frequency bars to display
   * Lower values will group frequencies together for broader analysis
   * @default 128
   */
  barCount?: number;

  /**
   * Gap between bars as a proportion of canvas width (0-1)
   * For example, 0.01 would make gaps 1% of the total width
   * Default is auto-calculated based on bar count
   * @default 0.004
   */
  barGapRatio?: number;

  /**
   * Height multiplier to enhance visualization
   * Higher values make bars taller
   * @default 1
   */
  heightMultiplier?: number;

  /**
   * Minimum height for bars as percentage of canvas height (0-1)
   * Ensures even quiet frequencies have visible presence
   * @default 0
   */
  minBarHeight?: number;

  /**
   * Minimum width for bars (in pixels)
   * @default 1
   */
  minBarWidth?: number;

  /**
   * Whether to use reactive color
   * @default 'static'
   */
  colorMode?: 'static' | 'frequency' | 'intensity' | 'spectrum' | 'dynamic';

  /**
   * Duration of the color transition in milliseconds
   * @default 1000
   */
  colorTransitionDuration?: number;
};

export type useAudioVisualizerFrequencyBarsReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawFrequencyBars: (dataArray: Uint8Array) => void;
  clearCanvas: () => void;
};

export function useAudioVisualizerFrequencyBars(
  options?: useAudioVisualizerFrequencyBarOptions,
): useAudioVisualizerFrequencyBarsReturn {
  const {
    barColor = '#FFFFFF',
    barGapRatio = 0.004,
    barCount = 128,
    heightMultiplier = 1,
    minBarHeight = 0,
    minBarWidth = 1,
    colorMode = FREQUENCY_BARS_COLOR_MODES.STATIC,
    colorTransitionDuration = 1000,
  } = options || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const { getColorString, getCurrentColor } = useColorTransition({
    targetColor: barColor,
    transitionDuration: colorTransitionDuration,
  });

  const drawFrequencyBars = useCallback(
    (dataArray: Uint8Array) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (colorMode === FREQUENCY_BARS_COLOR_MODES.STATIC) {
        ctx.fillStyle = getColorString();
      }

      const gapWidth = displayWidth * barGapRatio;

      const totalGapWidth = (barCount - 1) * gapWidth;
      const barWidth = Math.max(minBarWidth, (displayWidth - totalGapWidth) / barCount);

      const logDistributionDenominator = calculateLogarithmicDistributionDenominator();

      for (let i = 0; i < barCount; i++) {
        const ratio = calculateLogarithmicIndexRatio(i, barCount);

        const logIndex = calculateLogarithmicIndex(
          ratio,
          dataArray.length,
          logDistributionDenominator,
        );

        const nextRatio = calculateLogarithmicIndexRatio(i + 1, barCount);
        const nextLogIndex = calculateLogarithmicIndex(
          nextRatio,
          dataArray.length,
          logDistributionDenominator,
        );

        const { normalizedValue } = calculateFrequencyBandAverage(
          dataArray,
          logIndex,
          nextLogIndex,
        );

        const amplifiedValue = calculateAmplifiedValue(normalizedValue, minBarHeight);
        const barHeight = Math.min(
          displayHeight,
          amplifiedValue * displayHeight * heightMultiplier,
        );

        const x = i * (barWidth + gapWidth);

        const positionRatio = i / barCount;
        const intensityRatio = normalizedValue;

        if (colorMode !== FREQUENCY_BARS_COLOR_MODES.STATIC) {
          const dynamicColor = getBarColor(
            getCurrentColor(),
            colorMode,
            positionRatio,
            intensityRatio,
          );
          ctx.fillStyle = dynamicColor;
        }

        ctx.fillRect(x, displayHeight - barHeight, barWidth, barHeight);
      }
    },
    [
      barCount,
      heightMultiplier,
      minBarHeight,
      colorMode,
      barGapRatio,
      getColorString,
      getCurrentColor,
      minBarWidth,
    ],
  );

  return { canvasRef, drawFrequencyBars, clearCanvas };
}
