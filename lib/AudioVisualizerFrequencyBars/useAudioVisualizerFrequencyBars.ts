import { useRef, useCallback } from 'react';

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

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ensure bars fill the entire canvas width
      const totalGapWidth = (barCount - 1) * barGap;
      const barWidth = Math.max(1, (canvas.width - totalGapWidth) / barCount);

      // Draw frequency bars
      ctx.fillStyle = barColor;

      // Use logarithmic scale for mapping frequencies
      // This more closely matches how humans perceive sound
      for (let i = 0; i < barCount; i++) {
        // Calculate logarithmic frequency index
        // This gives more visual space to lower frequencies which are perceptually more important
        const ratio = i / barCount;
        // Maps from range 0-1 to a logarithmic scale from ~1% to 100% of frequency range
        // Uses constant 19 to create a good range (1.1^19 ≈ 6.1 gives good distribution)
        const logIndex = Math.round(
          ((Math.pow(1.1, 19 * ratio) - 1) / (Math.pow(1.1, 19) - 1)) * (dataArray.length - 1),
        );

        // Calculate next index for range bounds
        const nextRatio = (i + 1) / barCount;
        const nextLogIndex = Math.min(
          Math.round(
            ((Math.pow(1.1, 19 * nextRatio) - 1) / (Math.pow(1.1, 19) - 1)) *
              (dataArray.length - 1),
          ),
          dataArray.length - 1,
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

        // Scale height to canvas with enhanced visibility:
        // 1. Apply minimum height so quiet frequencies are still visible
        // 2. Apply multiplier to make overall visualization more prominent
        // 3. Ensure bars don't exceed canvas height
        const normalizedValue = value / 255;
        const amplifiedValue = minHeight + normalizedValue * (1 - minHeight);
        const barHeight = Math.min(
          canvas.height,
          amplifiedValue * canvas.height * heightMultiplier,
        );

        // Calculate x position
        const x = i * (barWidth + barGap);

        // Draw bar from bottom up
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      }
    },
    [barColor, barCount, barGap, heightMultiplier, minHeight],
  );

  return { canvasRef, drawFrequencyBars };
}
