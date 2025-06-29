import type { EnvelopeSegment } from '@/types/audio';
import { interpolateLinear } from '@/utils/interpolateLinear';

/**
 * Gets interpolated envelope from envelope segments using linear interpolation
 * @param data - Envelope segment data
 * @param exactIndex - Exact index to interpolate
 */
export function getInterpolatedEnvelopeFromSegments(
  data: EnvelopeSegment[],
  exactIndex: number,
): EnvelopeSegment {
  if (data.length === 0) {
    return { min: 0, max: 0 };
  }

  const clampedIndex = Math.max(0, exactIndex);

  const floorIndex = Math.floor(clampedIndex);
  const ceilIndex = Math.min(Math.ceil(clampedIndex), data.length - 1);

  if (floorIndex === ceilIndex || floorIndex >= data.length) {
    return data[Math.min(floorIndex, data.length - 1)]!;
  }

  const t = clampedIndex - floorIndex;
  const current = data[floorIndex]!;
  const next = data[ceilIndex]!;

  return {
    min: interpolateLinear(current.min, next.min, t),
    max: interpolateLinear(current.max, next.max, t),
  };
}
