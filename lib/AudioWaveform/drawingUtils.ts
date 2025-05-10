/**
 * Calculates the minimum gap width based on display width
 * @param displayWidth - The width of the canvas in pixels
 * @param minGapPercent - The minimum gap as a percentage of display width (default: 0.001 or 0.1%)
 * @returns Minimum gap width in pixels (at least 1px)
 */
export function calculateMinGapWidth(displayWidth: number, minGapPercent = 0.001): number {
  return Math.max(1, displayWidth * minGapPercent);
}

/**
 * Determines the actual gap width to use based on desired ratio and minimum constraints
 * @param displayWidth - The width of the canvas in pixels
 * @param barGapRatio - The desired gap width as a percentage of display width (value between 0 and 1)
 * @param minGapPercent - The minimum gap as a percentage of display width (value between 0 and 1)
 * @returns The actual gap width to use, respecting minimum size constraints
 */
export function getActualGapWidth(
  displayWidth: number,
  barGapRatio: number,
  minGapPercent = 0.001,
): number {
  if (barGapRatio === 0 || minGapPercent === 0) {
    return 0;
  }

  const minGapWidth = calculateMinGapWidth(displayWidth, minGapPercent);
  const desiredGapWidth = displayWidth * barGapRatio;
  return Math.max(minGapWidth, desiredGapWidth);
}

/**
 * Calculates how many bars can be displayed given the available width and minimum sizes
 * @param displayWidth - The width of the canvas in pixels
 * @param minBarWidth - The minimum width for each bar in pixels
 * @param gapWidth - The width of gaps between bars in pixels
 * @returns The maximum number of bars that can fit in the display width
 */
export function calculateMaxBarsInView(
  displayWidth: number,
  minBarWidth: number,
  gapWidth: number,
): number {
  // Calculate max bars accounting for n-1 gaps between n bars
  return Math.floor((displayWidth + gapWidth) / (minBarWidth + gapWidth));
}

/**
 * Determines if data sampling is needed and calculates the sampling rate
 * @param dataLength - The length of the original waveform data array
 * @param maxBarsInView - The maximum number of bars that can fit in the display
 * @returns The sampling rate to use (1 means use all data points)
 */
export function calculateSamplingRate(dataLength: number, maxBarsInView: number): number {
  if (dataLength <= maxBarsInView) {
    return 1; // No sampling needed
  }
  return Math.ceil(dataLength / maxBarsInView);
}

/**
 * Samples the waveform data to fit within the available display width
 * @param waveformData - The original waveform amplitude data
 * @param samplingRate - The rate at which to sample the data (e.g., 2 means take every other point)
 * @returns Sampled waveform data array
 */
export function sampleWaveformData(waveformData: number[], samplingRate: number): number[] {
  if (samplingRate === 1) {
    return waveformData; // No sampling needed
  }
  return waveformData.filter((_, i) => i % samplingRate === 0);
}

/**
 * Calculates the optimal bar width based on available space and number of bars
 * @param displayWidth - The width of the canvas in pixels
 * @param numBars - The number of bars to display
 * @param gapWidth - The width of gaps between bars in pixels
 * @param minBarWidth - The minimum width for each bar in pixels
 * @returns The calculated bar width in pixels
 */
export function calculateBarWidth(
  displayWidth: number,
  numBars: number,
  gapWidth: number,
  minBarWidth: number,
): number {
  // Calculate total width needed for gaps (n-1 gaps for n bars)
  const totalGapWidth = (numBars - 1) * gapWidth;

  // Calculate available width for bars
  const availableWidthForBars = displayWidth - totalGapWidth;

  // Determine the bar width, ensuring it's at least the minimum width
  return Math.max(minBarWidth, availableWidthForBars / numBars);
}
