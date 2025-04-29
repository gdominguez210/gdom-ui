import {
  normalizeAudioValue,
  calculateWaveformY,
  calculateAmplitudeRatio,
  calculatePositionRatio,
} from './waveformUtils';
import { getColorByAudioIntensity } from '@lib/utils/getColorByAudioIntensity/getColorByAudioIntensity';
import { getColorByFrequencyPosition } from '@lib/utils/getColorByFrequencyPosition/getColorByFrequencyPosition';
import { getColorBySpectrum } from '@lib/utils/getColorBySpectrum/getColorBySpectrum';
import { getColorByDynamicIntensity } from '@lib/utils/getColorByDynamicIntensity/getColorByDynamicIntensity';
import { type OKLCHColor } from '@lib/types/colors';

export const WAVEFORM_COLOR_MODES = {
  STATIC: 'static',
  AMPLITUDE: 'amplitude',
  FREQUENCY: 'frequency',
  SPECTRUM: 'spectrum',
  DYNAMIC: 'dynamic',
} as const;

/**
 * Types of color modes available for the waveform
 */
export type WaveformColorMode = (typeof WAVEFORM_COLOR_MODES)[keyof typeof WAVEFORM_COLOR_MODES];

/**
 * Dynamic color modes (all except 'static')
 */
export type DynamicColorMode = Exclude<WaveformColorMode, 'static'>;

/**
 * Draws a static waveform with a single color
 *
 * @param ctx - Canvas rendering context
 * @param dataArray - Audio frequency data
 * @param displayWidth - Canvas display width
 * @param displayHeight - Canvas display height
 * @param lineColor - Color string to use for the waveform
 */
export function drawStaticWaveform(
  ctx: CanvasRenderingContext2D,
  dataArray: Uint8Array,
  displayWidth: number,
  displayHeight: number,
  lineColor: string,
): void {
  const sliceWidth = displayWidth / dataArray.length;
  const centerY = displayHeight / 2;

  ctx.strokeStyle = lineColor;
  ctx.beginPath();

  dataArray.forEach((value, index) => {
    const x = index * sliceWidth;
    const normalizedValue = normalizeAudioValue(value);
    const y = calculateWaveformY(normalizedValue, centerY);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

/**
 * Applies the appropriate color to a waveform segment based on the color mode
 *
 * @param ctx - Canvas rendering context
 * @param segmentStartIndex - Starting index of the current segment
 * @param dataArray - Audio frequency data
 * @param baseOklchColor - Base color in OKLCH format
 * @param colorMode - Color mode to use
 */
export function applySegmentColor(
  ctx: CanvasRenderingContext2D,
  segmentStartIndex: number,
  dataArray: Uint8Array,
  currentColor: OKLCHColor,
  colorMode: DynamicColorMode,
): void {
  const positionRatio = calculatePositionRatio(segmentStartIndex, dataArray.length);
  const normalizedValue = normalizeAudioValue(dataArray[segmentStartIndex]!);
  const amplitudeRatio = calculateAmplitudeRatio(normalizedValue);

  switch (colorMode) {
    case WAVEFORM_COLOR_MODES.AMPLITUDE:
      ctx.strokeStyle = getColorByAudioIntensity(currentColor, amplitudeRatio);
      break;
    case WAVEFORM_COLOR_MODES.FREQUENCY:
      ctx.strokeStyle = getColorByFrequencyPosition(currentColor, positionRatio);
      break;
    case WAVEFORM_COLOR_MODES.SPECTRUM:
      ctx.strokeStyle = getColorBySpectrum(currentColor, positionRatio);
      break;
    case WAVEFORM_COLOR_MODES.DYNAMIC:
      ctx.strokeStyle = getColorByDynamicIntensity(currentColor, amplitudeRatio);
      break;
  }
}

/**
 * Draws a segmented waveform with dynamic coloring
 *
 * @param ctx - Canvas rendering context
 * @param dataArray - Audio frequency data
 * @param displayWidth - Canvas display width
 * @param displayHeight - Canvas display height
 * @param baseOklchColor - Base color in OKLCH format
 * @param colorMode - Color mode to use
 * @param segmentCount - Number of segments to divide the waveform into
 */
export function drawSegmentedWaveform(
  ctx: CanvasRenderingContext2D,
  dataArray: Uint8Array,
  displayWidth: number,
  displayHeight: number,
  baseOklchColor: [number, number, number],
  colorMode: DynamicColorMode,
  segmentCount: number,
): void {
  const sliceWidth = displayWidth / dataArray.length;
  const centerY = displayHeight / 2;
  const segmentSize = Math.max(1, Math.floor(dataArray.length / segmentCount));

  // Track the last point to ensure continuity between segments
  let lastX = 0;
  let lastY = 0;

  for (let i = 0; i < dataArray.length; i += segmentSize) {
    const segmentEnd = Math.min(i + segmentSize, dataArray.length);

    ctx.beginPath();

    // Start from the last point of the previous segment
    if (i > 0) {
      ctx.moveTo(lastX, lastY);
    }

    // Draw current segment
    for (let j = i; j < segmentEnd; j++) {
      const x = j * sliceWidth;
      const normalizedValue = normalizeAudioValue(dataArray[j]!);
      const y = calculateWaveformY(normalizedValue, centerY);

      if (i === 0 && j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);

        // Remember the last point coordinates
        if (j === segmentEnd - 1) {
          lastX = x;
          lastY = y;
        }
      }
    }

    applySegmentColor(ctx, i, dataArray, baseOklchColor, colorMode);

    ctx.stroke();
  }
}
