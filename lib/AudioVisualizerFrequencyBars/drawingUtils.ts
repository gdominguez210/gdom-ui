import { getColorByFrequencyPosition } from '@/utils/getColorByFrequencyPosition/getColorByFrequencyPosition';
import { getColorByAudioIntensity } from '@/utils/getColorByAudioIntensity/getColorByAudioIntensity';
import { getColorBySpectrum } from '@/utils/getColorBySpectrum/getColorBySpectrum';
import { getColorByDynamicIntensity } from '@/utils/getColorByDynamicIntensity/getColorByDynamicIntensity';
import type { OKLCHColor } from 'types/colors';

export const FREQUENCY_BARS_COLOR_MODES = {
  STATIC: 'static',
  FREQUENCY: 'frequency',
  INTENSITY: 'intensity',
  SPECTRUM: 'spectrum',
  DYNAMIC: 'dynamic',
} as const;

/**
 * Types of color modes available for the frequency bars
 */
export type FrequencyBarsColorMode =
  (typeof FREQUENCY_BARS_COLOR_MODES)[keyof typeof FREQUENCY_BARS_COLOR_MODES];

/**
 * Dynamic color modes (all except 'static')
 */
export type DynamicColorMode = Exclude<FrequencyBarsColorMode, 'static'>;

/**
 * Applies the appropriate color based on the color mode
 *
 * @param currentColor - Current base color in OKLCH format
 * @param colorMode - Color mode to use
 * @param positionRatio - Position ratio (0-1) of the frequency bar
 * @param intensityRatio - Intensity ratio (0-1) of the frequency bar
 * @returns CSS color string to use
 */
export function getBarColor(
  currentColor: OKLCHColor,
  colorMode: DynamicColorMode,
  positionRatio: number,
  intensityRatio: number,
): string {
  switch (colorMode) {
    case FREQUENCY_BARS_COLOR_MODES.FREQUENCY:
      return getColorByFrequencyPosition(currentColor, positionRatio);
    case FREQUENCY_BARS_COLOR_MODES.INTENSITY:
      return getColorByAudioIntensity(currentColor, intensityRatio);
    case FREQUENCY_BARS_COLOR_MODES.SPECTRUM:
      return getColorBySpectrum(currentColor, positionRatio);
    case FREQUENCY_BARS_COLOR_MODES.DYNAMIC:
      return getColorByDynamicIntensity(currentColor, intensityRatio);
  }
}
