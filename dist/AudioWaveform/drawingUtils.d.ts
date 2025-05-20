/**
 * Calculates the minimum gap width based on display width
 * @param displayWidth - The width of the canvas in pixels
 * @param minGapPercent - The minimum gap as a percentage of display width (default: 0.001 or 0.1%)
 * @returns Minimum gap width in pixels (at least 1px)
 */
export declare function calculateMinGapWidth(displayWidth: number, minGapPercent?: number): number;
/**
 * Determines the actual gap width to use based on desired ratio and minimum constraints
 * @param displayWidth - The width of the canvas in pixels
 * @param barGapRatio - The desired gap width as a percentage of display width (value between 0 and 1)
 * @param minGapPercent - The minimum gap as a percentage of display width (value between 0 and 1)
 * @returns The actual gap width to use, respecting minimum size constraints
 */
export declare function getActualGapWidth(displayWidth: number, barGapRatio: number, minGapPercent?: number): number;
/**
 * Calculates how many bars can be displayed given the available width and minimum sizes
 * @param displayWidth - The width of the canvas in pixels
 * @param minBarWidth - The minimum width for each bar in pixels
 * @param gapWidth - The width of gaps between bars in pixels
 * @returns The maximum number of bars that can fit in the display width
 */
export declare function calculateMaxBarsInView(displayWidth: number, minBarWidth: number, gapWidth: number): number;
/**
 * Determines if data sampling is needed and calculates the sampling rate
 * @param dataLength - The length of the original waveform data array
 * @param maxBarsInView - The maximum number of bars that can fit in the display
 * @returns The sampling rate to use (1 means use all data points)
 */
export declare function calculateSamplingRate(dataLength: number, maxBarsInView: number): number;
/**
 * Samples the waveform data to fit within the available display width
 * @param waveformData - The original waveform amplitude data
 * @param samplingRate - The rate at which to sample the data (e.g., 2 means take every other point)
 * @returns Sampled waveform data array
 */
export declare function sampleWaveformData(waveformData: number[], samplingRate: number): number[];
/**
 * Calculates the optimal bar width based on available space and number of bars
 * @param displayWidth - The width of the canvas in pixels
 * @param numBars - The number of bars to display
 * @param gapWidth - The width of gaps between bars in pixels
 * @param minBarWidth - The minimum width for each bar in pixels
 * @returns The calculated bar width in pixels
 */
export declare function calculateBarWidth(displayWidth: number, numBars: number, gapWidth: number, minBarWidth: number): number;
