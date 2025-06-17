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
  const floorIndex = Math.floor(exactIndex);
  const ceilIndex = Math.min(Math.ceil(exactIndex), data.length - 1);

  if (floorIndex === ceilIndex || floorIndex >= data.length) {
    return data[Math.min(floorIndex, data.length - 1)]!;
  }

  const t = exactIndex - floorIndex;
  const current = data[floorIndex]!;
  const next = data[ceilIndex]!;

  return {
    min: interpolateLinear(current.min, next.min, t),
    max: interpolateLinear(current.max, next.max, t),
  };
}
