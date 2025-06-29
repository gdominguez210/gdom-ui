import { describe, it, expect } from 'vitest';
import { getInterpolatedEnvelopeFromSegments } from './index';
import type { EnvelopeSegment } from '@/types/audio';

describe('getInterpolatedEnvelopeFromSegments should...', () => {
  it('return exact segments at integer indices', () => {
    const segments: EnvelopeSegment[] = [
      { min: -0.5, max: 0.8 },
      { min: -0.1, max: 0.2 },
      { min: -0.9, max: 0.4 },
      { min: -0.3, max: 0.6 },
    ];

    expect(getInterpolatedEnvelopeFromSegments(segments, 0)).toEqual({ min: -0.5, max: 0.8 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 1)).toEqual({ min: -0.1, max: 0.2 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 2)).toEqual({ min: -0.9, max: 0.4 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 3)).toEqual({ min: -0.3, max: 0.6 });
  });

  it('interpolate between adjacent segments', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0, max: 1 },
      { min: -1, max: 0 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.5);

    expect(result.min).toBe(-0.5); // Linear interpolation: (0 + (-1)) / 2
    expect(result.max).toBe(0.5); // Linear interpolation: (1 + 0) / 2
  });

  it('handle fractional indices correctly', () => {
    const segments: EnvelopeSegment[] = [
      { min: -0.8, max: 0.2 },
      { min: -0.4, max: 0.6 },
      { min: -0.2, max: 0.8 },
    ];

    // Test quarter point between first and second segments
    const quarter = getInterpolatedEnvelopeFromSegments(segments, 0.25);
    expect(quarter.min).toBeCloseTo(-0.7, 5); // -0.8 + 0.25 * (-0.4 - (-0.8)) = -0.7
    expect(quarter.max).toBeCloseTo(0.3, 5); // 0.2 + 0.25 * (0.6 - 0.2) = 0.3

    // Test three-quarter point
    const threeQuarter = getInterpolatedEnvelopeFromSegments(segments, 0.75);
    expect(threeQuarter.min).toBeCloseTo(-0.5, 5); // -0.8 + 0.75 * (-0.4 - (-0.8)) = -0.5
    expect(threeQuarter.max).toBeCloseTo(0.5, 5); // 0.2 + 0.75 * (0.6 - 0.2) = 0.5
  });

  it('handle segments with identical min and max values', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0.5, max: 0.5 },
      { min: -0.3, max: -0.3 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.6);
    expect(result.min).toBeCloseTo(0.02, 5); // 0.5 + 0.6 * (-0.3 - 0.5) = 0.02
    expect(result.max).toBeCloseTo(0.02, 5);
  });

  it('clamp indices to valid range', () => {
    const segments: EnvelopeSegment[] = [
      { min: -0.5, max: 0.8 },
      { min: -0.1, max: 0.2 },
      { min: -0.9, max: 0.4 },
    ];

    // Below range - should return first segment
    expect(getInterpolatedEnvelopeFromSegments(segments, -1)).toEqual({ min: -0.5, max: 0.8 });
    expect(getInterpolatedEnvelopeFromSegments(segments, -0.5)).toEqual({ min: -0.5, max: 0.8 });

    // Above range - should return last segment
    expect(getInterpolatedEnvelopeFromSegments(segments, 3)).toEqual({ min: -0.9, max: 0.4 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 10)).toEqual({ min: -0.9, max: 0.4 });
  });

  it('handle single segment array', () => {
    const segments: EnvelopeSegment[] = [{ min: -0.7, max: 0.3 }];

    expect(getInterpolatedEnvelopeFromSegments(segments, 0)).toEqual({ min: -0.7, max: 0.3 });
    expect(getInterpolatedEnvelopeFromSegments(segments, -1)).toEqual({ min: -0.7, max: 0.3 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 1)).toEqual({ min: -0.7, max: 0.3 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 0.5)).toEqual({ min: -0.7, max: 0.3 });
  });

  it('handle two segment array', () => {
    const segments: EnvelopeSegment[] = [
      { min: -1, max: 0 },
      { min: 0, max: 1 },
    ];

    expect(getInterpolatedEnvelopeFromSegments(segments, 0)).toEqual({ min: -1, max: 0 });
    expect(getInterpolatedEnvelopeFromSegments(segments, 1)).toEqual({ min: 0, max: 1 });

    const midpoint = getInterpolatedEnvelopeFromSegments(segments, 0.5);
    expect(midpoint.min).toBe(-0.5);
    expect(midpoint.max).toBe(0.5);
  });

  it('handle exact boundary at last valid index', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0, max: 0.2 },
      { min: -0.1, max: 0.3 },
      { min: -0.5, max: 0.1 },
    ];

    const lastIndex = segments.length - 1;
    expect(getInterpolatedEnvelopeFromSegments(segments, lastIndex)).toEqual({
      min: -0.5,
      max: 0.1,
    });

    // Very close to but not exactly at the boundary
    const nearLast = getInterpolatedEnvelopeFromSegments(segments, lastIndex - 0.0001);
    expect(nearLast.min).toBeCloseTo(-0.5, 4); // Should be very close to last segment (index 2)
    expect(nearLast.max).toBeCloseTo(0.1, 4);
  });

  it('maintain envelope semantics (min <= max)', () => {
    const segments: EnvelopeSegment[] = [
      { min: -0.8, max: -0.2 },
      { min: -0.3, max: 0.7 },
      { min: 0.1, max: 0.9 },
    ];

    const testIndices = [0.1, 0.5, 0.9, 1.2, 1.8];

    testIndices.forEach((index) => {
      const result = getInterpolatedEnvelopeFromSegments(segments, index);
      expect(result.min).toBeLessThanOrEqual(result.max);
    });
  });

  it('handle segments where min > max (inverted envelopes)', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0.5, max: -0.5 }, // Inverted envelope
      { min: -0.2, max: 0.8 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.5);
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
    // Don't enforce min <= max as input doesn't guarantee this
  });

  it('handle zero-amplitude segments (min = max)', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0.3, max: 0.3 },
      { min: 0.3, max: 0.3 },
      { min: 0.7, max: 0.7 },
    ];

    const result1 = getInterpolatedEnvelopeFromSegments(segments, 0.5);
    expect(result1.min).toBe(0.3);
    expect(result1.max).toBe(0.3);

    const result2 = getInterpolatedEnvelopeFromSegments(segments, 1.5);
    expect(result2.min).toBe(0.5); // Linear interpolation between 0.3 and 0.7
    expect(result2.max).toBe(0.5);
  });

  it('handle very small differences between segments', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0.000001, max: 0.000002 },
      { min: 0.000003, max: 0.000004 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.5);
    expect(result.min).toBeCloseTo(0.000002, 8);
    expect(result.max).toBeCloseTo(0.000003, 8);
  });

  it('handle very large values', () => {
    const segments: EnvelopeSegment[] = [
      { min: -1000000, max: 2000000 },
      { min: -500000, max: 1500000 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.5);
    expect(result.min).toBe(-750000);
    expect(result.max).toBe(1750000);
  });

  it('handle floating point precision edge cases', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0.1, max: 0.2 },
      { min: 0.3, max: 0.4 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.5);
    expect(result.min).toBeCloseTo(0.2, 10);
    expect(result.max).toBeCloseTo(0.3, 10);
  });

  it('maintain precision with many decimal places', () => {
    const segments: EnvelopeSegment[] = [
      { min: Math.PI / 10, max: Math.E / 10 },
      { min: Math.sqrt(2) / 10, max: Math.sqrt(3) / 10 },
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.333);
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('use correct linear interpolation formula', () => {
    const segments: EnvelopeSegment[] = [
      { min: 10, max: 100 },
      { min: 20, max: 200 },
    ];

    const index = 0.3;
    const t = index - Math.floor(index); // 0.3

    // Manual calculation
    const expectedMin = 10 + t * (20 - 10); // 10 + 0.3 * 10 = 13
    const expectedMax = 100 + t * (200 - 100); // 100 + 0.3 * 100 = 130

    const result = getInterpolatedEnvelopeFromSegments(segments, index);
    expect(result.min).toBe(expectedMin);
    expect(result.max).toBe(expectedMax);
  });

  it('interpolate min and max independently', () => {
    const segments: EnvelopeSegment[] = [
      { min: -1, max: 1 },
      { min: 1, max: -1 }, // Swapped values
    ];

    const result = getInterpolatedEnvelopeFromSegments(segments, 0.25);

    // Min interpolation: -1 + 0.25 * (1 - (-1)) = -1 + 0.5 = -0.5
    expect(result.min).toBe(-0.5);

    // Max interpolation: 1 + 0.25 * (-1 - 1) = 1 - 0.5 = 0.5
    expect(result.max).toBe(0.5);
  });

  it('be efficient with large segment arrays', () => {
    const largeSegments: EnvelopeSegment[] = Array.from({ length: 10000 }, (_, i) => ({
      min: Math.sin(i / 100) * 0.5,
      max: Math.cos(i / 100) * 0.5,
    }));

    const startTime = performance.now();
    const result = getInterpolatedEnvelopeFromSegments(largeSegments, 5000.7);
    const endTime = performance.now();

    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
    expect(endTime - startTime).toBeLessThan(5); // Should be very fast
  });

  it('handle many interpolations efficiently', () => {
    const segments: EnvelopeSegment[] = [
      { min: -0.8, max: 0.2 },
      { min: -0.4, max: 0.6 },
      { min: -0.1, max: 0.9 },
      { min: -0.3, max: 0.5 },
    ];

    const indices = Array.from({ length: 1000 }, (_, i) => i / 250); // 0 to 4

    const startTime = performance.now();
    const results = indices.map((index) => getInterpolatedEnvelopeFromSegments(segments, index));
    const endTime = performance.now();

    expect(results).toHaveLength(1000);
    expect(endTime - startTime).toBeLessThan(20);

    // All results should be valid envelopes
    results.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('preserve monotonic trends in min values', () => {
    const segments: EnvelopeSegment[] = [
      { min: -1, max: 0.5 },
      { min: -0.5, max: 0.3 },
      { min: 0, max: 0.1 },
      { min: 0.5, max: 0.7 },
    ];

    const samples = [0.2, 0.7, 1.3, 1.8, 2.4, 2.9];
    const results = samples.map((index) => getInterpolatedEnvelopeFromSegments(segments, index));

    // Check that min values follow monotonic increasing trend
    for (let i = 1; i < results.length; i++) {
      expect(results[i]!.min).toBeGreaterThanOrEqual(results[i - 1]!.min);
    }
  });

  it('handle non-monotonic envelope sequences', () => {
    const segments: EnvelopeSegment[] = [
      { min: 0, max: 1 },
      { min: 0.5, max: 0.8 }, // Goes up then down
      { min: -0.2, max: 0.3 }, // Goes down
      { min: 0.8, max: 1.2 }, // Goes up again
    ];

    const testIndices = [0.5, 1.5, 2.5];
    const results = testIndices.map((index) =>
      getInterpolatedEnvelopeFromSegments(segments, index),
    );

    results.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle empty array gracefully', () => {
    const emptySegments: EnvelopeSegment[] = [];

    // Should return a default envelope for empty arrays
    const result = getInterpolatedEnvelopeFromSegments(emptySegments, 0);
    expect(result).toEqual({ min: 0, max: 0 });
  });
});
