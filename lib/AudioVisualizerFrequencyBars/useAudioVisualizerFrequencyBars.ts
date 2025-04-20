import { useRef, useCallback, useEffect } from 'react';
import {
  calculateLogarithmicDistributionDenominator,
  calculateLogarithmicIndexRatio,
  calculateLogarithmicIndex,
  calculateAmplifiedValue,
} from '@lib/AudioVisualizerFrequencyBars/frequencyDistribution';
import { getColorByFrequencyPosition } from '@lib/utils/getColorByFrequencyPosition/getColorByFrequencyPosition';
import { getColorByAudioIntensity } from '@lib/utils/getColorByAudioIntensity/getColorByAudioIntensity';
import { getColorBySpectrum } from '@lib/utils/getColorBySpectrum/getColorBySpectrum';
import { getColorByDynamicIntensity } from '@lib/utils/getColorByDynamicIntensity/getColorByDynamicIntensity';
import { VISUALIZATION_PARAMS } from '@lib/AudioVisualizerFrequencyBars/visualizationParams';
import { useColorTransition } from '@lib/useColorTransition/useColorTransition';
export type useAudioVisualizerFrequencyBarOptions = {
  /**
   * Whether the frequency bars are active
   */
  isActive?: boolean;

  /**
   * Duration of the audio to visualize
   */
  duration?: number;

  /**
   * Color of the frequency bars
   */
  barColor?: string;

  /**
   * Number of frequency bars to display
   * Lower values will group frequencies together for broader analysis
   */
  barCount?: number;

  /**
   * Gap between bars as a proportion of canvas width (0-1)
   * For example, 0.01 would make gaps 1% of the total width
   * Default is auto-calculated based on bar count
   */
  barGapRatio?: number;

  /**
   * Height multiplier to enhance visualization
   * Higher values make bars taller
   */
  heightMultiplier?: number;

  /**
   * Minimum height for bars as percentage of canvas height (0-1)
   * Ensures even quiet frequencies have visible presence
   */
  minHeight?: number;

  /**
   * Whether to use reactive color
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
};

export function useAudioVisualizerFrequencyBars(
  options?: useAudioVisualizerFrequencyBarOptions,
): useAudioVisualizerFrequencyBarsReturn {
  const {
    barColor = '#FFFFFF',
    barGapRatio = 0.004,
    barCount = 128,
    heightMultiplier = 1.2,
    minHeight = 0,
    colorMode = 'static',
    colorTransitionDuration = 1000,
    isActive,
    duration,
  } = options || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousDuration = useRef<number | null>(duration);

  useEffect(() => {
    if (duration !== previousDuration.current && !isActive) {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0);
    }

    previousDuration.current = duration;
  }, [duration, isActive]);

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

      if (colorMode === 'static') {
        ctx.fillStyle = getColorString();
      }

      const gapWidth = displayWidth * barGapRatio;

      const totalGapWidth = (barCount - 1) * gapWidth;
      const barWidth = Math.max(
        VISUALIZATION_PARAMS.MIN_BAR_WIDTH,
        (displayWidth - totalGapWidth) / barCount,
      );

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

        let sum = 0;
        let sampleCount = 0;

        for (let j = logIndex; j <= nextLogIndex; j++) {
          if (j < dataArray.length) {
            sum += dataArray[j] ?? 0;
            sampleCount++;
          }
        }

        const averageValue = sampleCount > 0 ? sum / sampleCount : 0;
        const normalizedValue = averageValue / VISUALIZATION_PARAMS.MAX_AUDIO_VALUE;

        const amplifiedValue = calculateAmplifiedValue(normalizedValue, minHeight);
        const barHeight = Math.min(
          displayHeight,
          amplifiedValue * displayHeight * heightMultiplier,
        );

        const x = i * (barWidth + gapWidth);

        const positionRatio = i / barCount;
        const intensityRatio = normalizedValue;

        switch (colorMode) {
          case 'frequency':
            ctx.fillStyle = getColorByFrequencyPosition(getCurrentColor(), positionRatio);
            break;
          case 'intensity':
            ctx.fillStyle = getColorByAudioIntensity(getCurrentColor(), intensityRatio);
            break;
          case 'spectrum':
            ctx.fillStyle = getColorBySpectrum(getCurrentColor(), positionRatio);
            break;
          case 'dynamic':
            ctx.fillStyle = getColorByDynamicIntensity(getCurrentColor(), intensityRatio);
            break;
        }

        ctx.fillRect(x, displayHeight - barHeight, barWidth, barHeight);
      }
    },
    [
      barCount,
      heightMultiplier,
      minHeight,
      colorMode,
      barGapRatio,
      getColorString,
      getCurrentColor,
    ],
  );

  return { canvasRef, drawFrequencyBars };
}
