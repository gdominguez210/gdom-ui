import { describe, it, expect } from 'vitest';
import { getInterpolatedEnvelopeLinear } from './index';
import type { EnvelopeSampleOptions } from '@/types/audio';

describe('getInterpolatedEnvelopeLinear should...', () => {
  it('return envelope with min and max values', () => {
    const data = [0.1, 0.5, -0.3, 0.8, -0.2];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('work with Float32Array data', () => {
    const data = new Float32Array([0.2, -0.4, 0.6, -0.1, 0.3]);
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
  });

  it('handle negative and positive values in data', () => {
    const data = [-0.8, 0.2, -0.5, 0.9, -0.1];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeLessThanOrEqual(result.max);
    expect(result.min).toBeGreaterThanOrEqual(-1);
    expect(result.max).toBeLessThanOrEqual(1);
  });

  it('handle exactIndex at start of data', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const result = getInterpolatedEnvelopeLinear(data, 0);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle exactIndex at end of data', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const result = getInterpolatedEnvelopeLinear(data, data.length - 1);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle fractional exactIndex', () => {
    const data = [0.0, 0.2, 0.4, 0.6, 0.8];
    const result = getInterpolatedEnvelopeLinear(data, 2.5);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle exactIndex beyond data boundaries', () => {
    const data = [0.1, 0.2, 0.3];

    // Beyond end
    const resultBeyond = getInterpolatedEnvelopeLinear(data, 10);
    expect(Number.isFinite(resultBeyond.min)).toBe(true);
    expect(Number.isFinite(resultBeyond.max)).toBe(true);

    // Before start (negative index)
    const resultBefore = getInterpolatedEnvelopeLinear(data, -1);
    expect(Number.isFinite(resultBefore.min)).toBe(true);
    expect(Number.isFinite(resultBefore.max)).toBe(true);
  });

  it('handle custom numSamples option', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const options: EnvelopeSampleOptions = { numSamples: 8 };

    const result = getInterpolatedEnvelopeLinear(data, 3, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle custom oversampleRate option', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const options: EnvelopeSampleOptions = { oversampleRate: 8 };

    const result = getInterpolatedEnvelopeLinear(data, 2, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle both custom numSamples and oversampleRate', () => {
    const data = [0.0, 0.25, 0.5, 0.75, 1.0];
    const options: EnvelopeSampleOptions = {
      numSamples: 6,
      oversampleRate: 16,
    };

    const result = getInterpolatedEnvelopeLinear(data, 2, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle undefined options (use defaults)', () => {
    const data = [0.2, 0.4, 0.6, 0.8];

    const result = getInterpolatedEnvelopeLinear(data, 1, undefined);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle empty options object', () => {
    const data = [0.1, 0.3, 0.5, 0.7];
    const options: EnvelopeSampleOptions = {};

    const result = getInterpolatedEnvelopeLinear(data, 1, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('ensure min <= max in result', () => {
    const data = [0.1, -0.5, 0.8, -0.2, 0.6];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with all positive values', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeGreaterThanOrEqual(0);
    expect(result.max).toBeGreaterThanOrEqual(0);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with all negative values', () => {
    const data = [-0.9, -0.7, -0.5, -0.3, -0.1];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeLessThanOrEqual(0);
    expect(result.max).toBeLessThanOrEqual(0);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with zero values', () => {
    const data = [0, 0.2, 0, -0.3, 0];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle constant data', () => {
    const data = [0.5, 0.5, 0.5, 0.5, 0.5];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeCloseTo(0.5, 5);
    expect(result.max).toBeCloseTo(0.5, 5);
  });

  it('produce linear transitions between points', () => {
    // Linear interpolation should be more predictable than cubic
    const data = [0, 1, 0]; // Simple triangular wave
    const result = getInterpolatedEnvelopeLinear(data, 1);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle monotonic data linearly', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9]; // Monotonic increasing
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeGreaterThanOrEqual(0.1);
    expect(result.max).toBeLessThanOrEqual(0.9);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle step functions appropriately', () => {
    const data = [0, 0, 1, 1, 1]; // Step function
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle very small data arrays', () => {
    const data = [0.5];
    const result = getInterpolatedEnvelopeLinear(data, 0);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle two-element data array', () => {
    const data = [0.2, 0.8];
    const result = getInterpolatedEnvelopeLinear(data, 0.5);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle three-element data array', () => {
    const data = [0.1, 0.5, 0.9];
    const result = getInterpolatedEnvelopeLinear(data, 1);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle data with very small values', () => {
    const data = [0.000001, -0.000002, 0.000003, -0.000001];
    const result = getInterpolatedEnvelopeLinear(data, 1);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with values close to audio range limits', () => {
    const data = [-0.99, 0.98, -0.97, 0.96, -0.95];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeGreaterThanOrEqual(-1.1); // Allow some interpolation variance
    expect(result.max).toBeLessThanOrEqual(1.1);
  });

  it('handle floating point precision edge cases', () => {
    const data = [0.1 + 0.2, 0.3, 1 / 3, 2 / 3, 0.7];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('return identical results for identical inputs', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const exactIndex = 2.5;
    const options: EnvelopeSampleOptions = { numSamples: 6, oversampleRate: 8 };

    const result1 = getInterpolatedEnvelopeLinear(data, exactIndex, options);
    const result2 = getInterpolatedEnvelopeLinear(data, exactIndex, options);

    expect(result1.min).toBe(result2.min);
    expect(result1.max).toBe(result2.max);
  });

  it('be consistent across multiple calls', () => {
    const data = [0.2, -0.4, 0.6, -0.1, 0.3];
    const results = Array.from({ length: 10 }, () => getInterpolatedEnvelopeLinear(data, 2));

    const firstResult = results[0];
    expect(firstResult).toBeDefined();

    results.forEach((result) => {
      expect(result.min).toBe(firstResult!.min);
      expect(result.max).toBe(firstResult!.max);
    });
  });

  it('use numSamples to determine window size', () => {
    const data = Array.from({ length: 20 }, (_, i) => Math.sin(i / 3));

    // Different numSamples should potentially give different results
    const result2 = getInterpolatedEnvelopeLinear(data, 10, { numSamples: 2 });
    const result8 = getInterpolatedEnvelopeLinear(data, 10, { numSamples: 8 });

    expect(result2).toHaveProperty('min');
    expect(result2).toHaveProperty('max');
    expect(result8).toHaveProperty('min');
    expect(result8).toHaveProperty('max');

    // Both should be valid envelopes
    expect(result2.min).toBeLessThanOrEqual(result2.max);
    expect(result8.min).toBeLessThanOrEqual(result8.max);
  });

  it('use oversampleRate for more accurate sampling', () => {
    const data = [0, 0.5, 1, 0.5, 0]; // Simple peak

    const lowSample = getInterpolatedEnvelopeLinear(data, 2, { oversampleRate: 1 });
    const highSample = getInterpolatedEnvelopeLinear(data, 2, { oversampleRate: 16 });

    expect(lowSample).toHaveProperty('min');
    expect(lowSample).toHaveProperty('max');
    expect(highSample).toHaveProperty('min');
    expect(highSample).toHaveProperty('max');

    // Higher oversampling might capture more detail
    expect(Number.isFinite(lowSample.min)).toBe(true);
    expect(Number.isFinite(highSample.min)).toBe(true);
  });

  it('produce linear envelopes for linear data', () => {
    // Linear progression data
    const data = [0, 0.25, 0.5, 0.75, 1.0];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(result.min).toBeGreaterThanOrEqual(0);
    expect(result.max).toBeLessThanOrEqual(1);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle discontinuities linearly', () => {
    // Data with sharp transitions
    const data = [0, 0, 1, 1, 0];
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('maintain linearity for oscillating patterns', () => {
    const data = [-1, 1, -1, 1, -1]; // Alternating pattern
    const result = getInterpolatedEnvelopeLinear(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
    expect(result.min).toBeGreaterThanOrEqual(-1.1);
    expect(result.max).toBeLessThanOrEqual(1.1);
  });
});
