import { describe, it, expect } from 'vitest';
import { getInterpolatedEnvelopeCubic } from './index';
import type { EnvelopeSampleOptions } from '@/types/audio';

describe('getInterpolatedEnvelopeCubic should...', () => {
  it('return envelope with min and max values', () => {
    const data = [0.1, 0.5, -0.3, 0.8, -0.2];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('work with Float32Array data', () => {
    const data = new Float32Array([0.2, -0.4, 0.6, -0.1, 0.3]);
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
  });

  it('handle negative and positive values in data', () => {
    const data = [-0.8, 0.2, -0.5, 0.9, -0.1];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result.min).toBeLessThanOrEqual(result.max);
    expect(result.min).toBeGreaterThanOrEqual(-1);
    expect(result.max).toBeLessThanOrEqual(1);
  });

  it('handle exactIndex at start of data', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const result = getInterpolatedEnvelopeCubic(data, 0);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle exactIndex at end of data', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const result = getInterpolatedEnvelopeCubic(data, data.length - 1);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle fractional exactIndex', () => {
    const data = [0.0, 0.2, 0.4, 0.6, 0.8];
    const result = getInterpolatedEnvelopeCubic(data, 2.5);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle exactIndex beyond data boundaries', () => {
    const data = [0.1, 0.2, 0.3];

    // Beyond end
    const resultBeyond = getInterpolatedEnvelopeCubic(data, 10);
    expect(Number.isFinite(resultBeyond.min)).toBe(true);
    expect(Number.isFinite(resultBeyond.max)).toBe(true);

    // Before start (negative index)
    const resultBefore = getInterpolatedEnvelopeCubic(data, -1);
    expect(Number.isFinite(resultBefore.min)).toBe(true);
    expect(Number.isFinite(resultBefore.max)).toBe(true);
  });

  it('handle custom numSamples option', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const options: EnvelopeSampleOptions = { numSamples: 8 };

    const result = getInterpolatedEnvelopeCubic(data, 3, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle custom oversampleRate option', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const options: EnvelopeSampleOptions = { oversampleRate: 8 };

    const result = getInterpolatedEnvelopeCubic(data, 2, options);

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

    const result = getInterpolatedEnvelopeCubic(data, 2, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle undefined options (use defaults)', () => {
    const data = [0.2, 0.4, 0.6, 0.8];

    const result = getInterpolatedEnvelopeCubic(data, 1, undefined);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle empty options object', () => {
    const data = [0.1, 0.3, 0.5, 0.7];
    const options: EnvelopeSampleOptions = {};

    const result = getInterpolatedEnvelopeCubic(data, 1, options);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('ensure min <= max in result', () => {
    const data = [0.1, -0.5, 0.8, -0.2, 0.6];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with all positive values', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result.min).toBeGreaterThanOrEqual(0);
    expect(result.max).toBeGreaterThanOrEqual(0);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with all negative values', () => {
    const data = [-0.9, -0.7, -0.5, -0.3, -0.1];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result.min).toBeLessThanOrEqual(0);
    expect(result.max).toBeLessThanOrEqual(0);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with zero values', () => {
    const data = [0, 0.2, 0, -0.3, 0];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle constant data', () => {
    const data = [0.5, 0.5, 0.5, 0.5, 0.5];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(result.min).toBeCloseTo(0.5, 5);
    expect(result.max).toBeCloseTo(0.5, 5);
  });

  it('handle very small data arrays', () => {
    const data = [0.5];
    const result = getInterpolatedEnvelopeCubic(data, 0);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle two-element data array', () => {
    const data = [0.2, 0.8];
    const result = getInterpolatedEnvelopeCubic(data, 0.5);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle three-element data array', () => {
    const data = [0.1, 0.5, 0.9];
    const result = getInterpolatedEnvelopeCubic(data, 1);

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
  });

  it('handle large data arrays efficiently', () => {
    const largeData = Array.from({ length: 10000 }, (_, i) => Math.sin(i / 100));

    const startTime = performance.now();
    const result = getInterpolatedEnvelopeCubic(largeData, 5000);
    const endTime = performance.now();

    expect(result).toHaveProperty('min');
    expect(result).toHaveProperty('max');
    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(endTime - startTime).toBeLessThan(20); // Should be reasonably fast
  });

  it('handle data with very small values', () => {
    const data = [0.000001, -0.000002, 0.000003, -0.000001];
    const result = getInterpolatedEnvelopeCubic(data, 1);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle data with values close to audio range limits', () => {
    const data = [-0.99, 0.98, -0.97, 0.96, -0.95];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeGreaterThanOrEqual(-1.5); // Allow some interpolation overshoot
    expect(result.max).toBeLessThanOrEqual(1.5);
  });

  it('handle floating point precision edge cases', () => {
    const data = [0.1 + 0.2, 0.3, 1 / 3, 2 / 3, 0.7];
    const result = getInterpolatedEnvelopeCubic(data, 2);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('return identical results for identical inputs', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const exactIndex = 2.5;
    const options: EnvelopeSampleOptions = { numSamples: 6, oversampleRate: 8 };

    const result1 = getInterpolatedEnvelopeCubic(data, exactIndex, options);
    const result2 = getInterpolatedEnvelopeCubic(data, exactIndex, options);

    expect(result1.min).toBe(result2.min);
    expect(result1.max).toBe(result2.max);
  });

  it('be consistent across multiple calls', () => {
    const data = [0.2, -0.4, 0.6, -0.1, 0.3];
    const results = Array.from({ length: 10 }, () => getInterpolatedEnvelopeCubic(data, 2));

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
    const result2 = getInterpolatedEnvelopeCubic(data, 10, { numSamples: 2 });
    const result8 = getInterpolatedEnvelopeCubic(data, 10, { numSamples: 8 });

    expect(result2).toHaveProperty('min');
    expect(result2).toHaveProperty('max');
    expect(result8).toHaveProperty('min');
    expect(result8).toHaveProperty('max');

    // Both should be valid envelopes
    expect(result2.min).toBeLessThanOrEqual(result2.max);
    expect(result8.min).toBeLessThanOrEqual(result8.max);
  });

  it('use oversampleRate to improve accuracy', () => {
    const data = [0, 0.5, 1, 0.5, 0]; // Simple peak

    const lowSample = getInterpolatedEnvelopeCubic(data, 2, { oversampleRate: 1 });
    const highSample = getInterpolatedEnvelopeCubic(data, 2, { oversampleRate: 16 });

    expect(lowSample).toHaveProperty('min');
    expect(lowSample).toHaveProperty('max');
    expect(highSample).toHaveProperty('min');
    expect(highSample).toHaveProperty('max');

    // Higher oversampling might capture more detail
    expect(Number.isFinite(lowSample.min)).toBe(true);
    expect(Number.isFinite(highSample.min)).toBe(true);
  });

  it('handle multiple interpolations efficiently', () => {
    const data = Array.from({ length: 1000 }, (_, i) => Math.sin(i / 50));
    const indices = Array.from({ length: 100 }, (_, i) => i * 9);

    const startTime = performance.now();
    const results = indices.map((index) => getInterpolatedEnvelopeCubic(data, index));
    const endTime = performance.now();

    expect(results).toHaveLength(100);
    expect(endTime - startTime).toBeLessThan(100); // Should be reasonably fast

    // All results should be valid
    results.forEach((result) => {
      expect(Number.isFinite(result.min)).toBe(true);
      expect(Number.isFinite(result.max)).toBe(true);
      expect(result.min).toBeLessThanOrEqual(result.max);
    });
  });

  it('produce reasonable envelopes for smooth data', () => {
    // Smooth sine wave data
    const data = Array.from({ length: 20 }, (_, i) => Math.sin(i / 3));
    const result = getInterpolatedEnvelopeCubic(data, 10);

    expect(result.min).toBeGreaterThanOrEqual(-1.2);
    expect(result.max).toBeLessThanOrEqual(1.2);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });

  it('handle discontinuous data gracefully', () => {
    // Data with sharp transitions
    const data = [0, 0, 0, 1, 1, 1, 0, 0, 0];
    const result = getInterpolatedEnvelopeCubic(data, 4);

    expect(Number.isFinite(result.min)).toBe(true);
    expect(Number.isFinite(result.max)).toBe(true);
    expect(result.min).toBeLessThanOrEqual(result.max);
  });
});
