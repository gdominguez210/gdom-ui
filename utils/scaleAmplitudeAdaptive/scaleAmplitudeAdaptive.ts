import { scaleAmplitudeCubic } from '@/utils/scaleAmplitudeCubic/scaleAmplitudeCubic';
import { scaleAmplitudeLinear } from '@/utils/scaleAmplitudeLinear/scaleAmplitudeLinear';

/**
 * Scales an amplitude value adaptively based on its magnitude.
 * Uses different scaling approaches for different amplitude ranges.
 *
 * if the amplitude is less than the adaptive threshold, it will be scaled using the cubic scale
 * otherwise, it will be scaled using the linear scale
 *
 * @see {@link scaleAmplitudeCubic}
 * @see {@link scaleAmplitudeLogarithmic}
 *
 *
 * @param value - Raw amplitude value (-1 to 1)
 * @param [minAmplitude=0.1] - Minimum amplitude value to ensure visibility
 * @param [adaptiveThreshold=0.01] - Threshold for switching between scaling methods
 * @returns Scaled amplitude value
 */
export function scaleAmplitudeAdaptive(
  value: number,
  minAmplitude: number = 0.1,
  adaptiveThreshold: number = 0.01,
): number {
  if (Math.abs(value) < adaptiveThreshold) {
    return scaleAmplitudeCubic(value, minAmplitude);
  }
  return scaleAmplitudeLinear(value, minAmplitude);
}
