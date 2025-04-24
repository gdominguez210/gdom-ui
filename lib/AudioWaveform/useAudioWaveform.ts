import { useCallback, useRef } from 'react';

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
  getBarColor?: (barInfo: WaveformBarInfo) => string;

  /**
   * Gap between bars as a proportion of canvas width (0-1)
   * For example, 0.005 would make gaps 0.5% of the total width
   * @default 0.003 (0.3% of canvas width)
   */
  barGapRatio?: number;

  /**
   * Minimum width for bars (in pixels)
   * @default 1
   */
  minBarWidth?: number;
  /**
   * Height of the waveform as a percentage of canvas height
   * @default 0.8 (80% of canvas height)
   */
  heightScale?: number;
};

export const useAudioWaveform = (options: useAudioWaveformOptions) => {
  const {
    waveformData,
    barColor = '#eeeeee',
    getBarColor,
    barGapRatio = 0.0035,
    heightScale = 0.8,
    minBarWidth = 1,
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

    const totalBars = waveformData.length;
    const centerY = displayHeight / 2;
    const maxBarHeight = displayHeight * heightScale;

    // Calculate gap width based on proportion of canvas width
    const gapWidth = displayWidth * barGapRatio;

    // Calculate total width needed for gaps
    const totalGapWidth = (totalBars - 1) * gapWidth;

    // Calculate bar width to fill the remaining space
    const barWidth = Math.max(minBarWidth, (displayWidth - totalGapWidth) / totalBars);

    // Draw each bar
    waveformData.forEach((value, index) => {
      // Calculate bar position with proper spacing
      const x = index * (barWidth + gapWidth);
      const barHeight = value * maxBarHeight;

      // Bar info for color determination
      const barInfo: WaveformBarInfo = {
        position: index / (totalBars - 1),
        value,
        index,
      };

      // Set the color
      if (getBarColor) {
        ctx.fillStyle = getBarColor(barInfo);
      } else {
        ctx.fillStyle = barColor;
      }

      // Draw the bar centered vertically
      ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
    });
  }, [barColor, getBarColor, heightScale, waveformData, barGapRatio, minBarWidth]);

  return { canvasRef, drawWaveform };
};
