import { useRef, useCallback } from 'react';

// Constants for frequency distribution calculation
const FREQUENCY_DISTRIBUTION = {
  /**
   * Base value for logarithmic scale (higher = steeper curve)
   */
  LOG_BASE: 1.1,

  /**
   * Exponent multiplier controlling distribution shape
   * Higher values give more emphasis to lower frequencies
   */
  EXPONENT_MULTIPLIER: 19,

  /**
   * Offset value to shift the logarithmic curve to start at zero.
   * Since Math.pow(base, 0) = 1, we subtract 1 to make the curve start at 0.
   */
  ZERO_POINT_OFFSET: 1,
} as const;

// Constants for visualization parameters
const VISUALIZATION_PARAMS = {
  /**
   * Minimum value for bar width in pixels
   */
  MIN_BAR_WIDTH: 1,

  /**
   * Maximum value for audio data (8-bit)
   */
  MAX_AUDIO_VALUE: 255,

  /**
   * Maximum normalized value (represents 100% in the 0-1 scale)
   */
  MAX_NORMALIZED_VALUE: 1,
} as const;

/**
 * Calculates the denominator for the logarithmic distribution.
 * This is used to normalize values to the 0-1 range.
 * @returns The denominator for the logarithmic distribution
 */
function calculateLogarithmicDistributionDenominator() {
  return (
    Math.pow(FREQUENCY_DISTRIBUTION.LOG_BASE, FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER) -
    FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET
  );
}

/**
 * Calculates the ratio of the index to the bar count.
 * Represents where this bar falls in the visual spectrum:
 * - ratio = 0: leftmost bar (lowest frequencies)
 * - ratio = 1: rightmost bar (highest frequencies)
 * This ratio is used to create logarithmic distribution of frequency bands
 * @param index - The index of the bar
 * @param barCount - The total number of bars
 * @returns The ratio of the index to the bar count
 */
function calculateLogarithmicIndexRatio(index: number, barCount: number) {
  return index / barCount;
}

/**
 * Maps a normalized ratio (0-1) to a logarithmic frequency index.
 *
 * This function creates a logarithmic distribution of frequency data, which
 * more closely matches how humans perceive sound. Lower frequencies are given
 * more visual space, while higher frequencies are compressed.
 *
 * The algorithm:
 * 1. Applies a logarithmic function to the ratio (using LOG_BASE^(EXPONENT_MULTIPLIER*ratio))
 * 2. Shifts the curve to start at zero (subtracts ZERO_POINT_OFFSET)
 * 3. Normalizes to 0-1 range (divides by pre-calculated denominator)
 * 4. Scales to the array index range (multiplies by array length-1)
 * 5. Rounds to the nearest integer index
 *
 * @param ratio - Position in the visual range (0-1, where 0=leftmost, 1=rightmost)
 * @param dataArrayLength - Length of the frequency data array
 * @param denominator - Pre-calculated logarithmic distribution denominator
 * @returns The mapped index in the frequency data array
 */
function calculateLogarithmicIndex(
  ratio: number,
  dataArrayLength: number,
  denominator: number,
): number {
  return Math.round(
    ((Math.pow(
      FREQUENCY_DISTRIBUTION.LOG_BASE,
      FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER * ratio,
    ) -
      FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET) /
      denominator) *
      (dataArrayLength - 1),
  );
}

/**
 * Amplifies a normalized audio value using a minimum height threshold.
 *
 * This function enhances the visibility of quieter frequencies by:
 * 1. Ensuring a minimum height for all bars (so even silent frequencies have some presence)
 * 2. Scaling the remaining range proportionally to the audio intensity
 *
 * Formula: minHeight + normalizedValue * (MAX_NORMALIZED_VALUE - minHeight)
 *
 * Example:
 * - With minHeight=0.1 and normalizedValue=0 (silence): result=0.1 (10% height)
 * - With minHeight=0.1 and normalizedValue=1 (max): result=1.0 (100% height)
 * - With minHeight=0.1 and normalizedValue=0.5 (half): result=0.55 (55% height)
 *
 * @param normalizedValue - The audio value normalized to 0-1 range
 * @param minHeight - Minimum height threshold (0-1)
 * @returns The amplified value in 0-1 range
 */
function calculateAmplifiedValue(normalizedValue: number, minHeight: number): number {
  return minHeight + normalizedValue * (VISUALIZATION_PARAMS.MAX_NORMALIZED_VALUE - minHeight);
}

export type useAudioVisualizerFrequencyBarOptions = {
  /**
   * Color of the frequency bars
   */
  barColor?: string;

  /**
   * Gap between bars in pixels
   */
  barGap?: number;

  /**
   * Number of frequency bars to display
   * Lower values will group frequencies together for broader analysis
   */
  barCount?: number;

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
};

export type useAudioVisualizerFrequencyBarsReturn = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  drawFrequencyBars: (dataArray: Uint8Array) => void;
};

export function useAudioVisualizerFrequencyBars(
  options?: useAudioVisualizerFrequencyBarOptions,
): useAudioVisualizerFrequencyBarsReturn {
  const {
    barColor = '#ffffff',
    barGap = 4,
    barCount = 128,
    heightMultiplier = 1.2,
    minHeight = 0,
  } = options || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Setup the draw function for the audio analyzer
  const drawFrequencyBars = useCallback(
    (dataArray: Uint8Array) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ensure bars fill the entire canvas width
      const totalGapWidth = (barCount - 1) * barGap;
      const barWidth = Math.max(
        VISUALIZATION_PARAMS.MIN_BAR_WIDTH,
        (displayWidth - totalGapWidth) / barCount,
      );

      ctx.fillStyle = barColor;

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

        // Gather samples for this frequency range
        let sum = 0;
        let sampleCount = 0;

        // Sum all values in this frequency range
        for (let j = logIndex; j <= nextLogIndex; j++) {
          if (j < dataArray.length) {
            sum += dataArray[j] ?? 0;
            sampleCount++;
          }
        }

        // Calculate average value for this frequency range
        const value = sampleCount > 0 ? sum / sampleCount : 0;
        // Normalize the value to 0-1 range
        const normalizedValue = value / VISUALIZATION_PARAMS.MAX_AUDIO_VALUE;

        const amplifiedValue = calculateAmplifiedValue(normalizedValue, minHeight);
        const barHeight = Math.min(
          displayHeight,
          amplifiedValue * displayHeight * heightMultiplier,
        );

        // Calculate x position
        const x = i * (barWidth + barGap);

        // Draw bar from bottom up
        ctx.fillRect(x, displayHeight - barHeight, barWidth, barHeight);
      }
    },
    [barColor, barCount, barGap, heightMultiplier, minHeight],
  );

  return { canvasRef, drawFrequencyBars };
}
