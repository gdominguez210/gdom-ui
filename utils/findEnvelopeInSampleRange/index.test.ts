import { describe, it, expect } from 'vitest';
import { findEnvelopeInSampleRange } from './index';
import type { GetEnvelopeSamplesAtPositionFn } from './index';

describe('findEnvelopeInSampleRange should...', () => {
  it('find min/max with single sample per position', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos];
    const result = findEnvelopeInSampleRange(0, 4, getSamples, 1);

    expect(result.min).toBe(0); // Minimum position
    expect(result.max).toBe(4); // Maximum position
  });

  it('handle multiple samples at each position', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos - 1, pos, pos + 1];
    const result = findEnvelopeInSampleRange(5, 7, getSamples, 1);

    expect(result.min).toBe(4); // 5 - 1 = 4
    expect(result.max).toBe(8); // 7 + 1 = 8
  });

  it('handle negative values correctly', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [-pos * 2, pos];
    const result = findEnvelopeInSampleRange(1, 3, getSamples, 1);

    expect(result.min).toBe(-6); // -3 * 2 = -6
    expect(result.max).toBe(3);
  });

  it('handle zero range (start equals end)', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos * 2];
    const result = findEnvelopeInSampleRange(5, 5, getSamples, 1);

    expect(result.min).toBe(10);
    expect(result.max).toBe(10);
  });

  it('handle empty sample arrays', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = () => [];
    const result = findEnvelopeInSampleRange(0, 3, getSamples, 1);

    expect(result.min).toBe(Infinity);
    expect(result.max).toBe(-Infinity);
  });

  it('sample more points between integer positions', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [Math.sin(pos)];
    const result = findEnvelopeInSampleRange(0, 1, getSamples, 10);

    // With oversampling, we should get a better approximation of sin curve between 0 and 1
    expect(result.min).toBeCloseTo(0, 5); // sin(0) = 0
    expect(result.max).toBeCloseTo(Math.sin(1), 2); // sin(1) ≈ 0.841
  });

  it('handle fractional step calculations correctly', () => {
    const sampledPositions: number[] = [];
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => {
      sampledPositions.push(pos);
      return [pos];
    };

    findEnvelopeInSampleRange(0, 2, getSamples, 4);

    // Should sample at positions from 0 to 2 with 4 samples per unit + endpoint
    // With oversampleRate=4 over 2 units = 8 steps + 1 endpoint = 9 total samples
    expect(sampledPositions).toHaveLength(9); // (2-0) * 4 + 1 = 9 steps
    expect(sampledPositions[0]).toBe(0);
    expect(sampledPositions[1]).toBeCloseTo(0.25, 5);
    expect(sampledPositions[2]).toBeCloseTo(0.5, 5);
    expect(sampledPositions[8]).toBeCloseTo(2.0, 5); // Should include endpoint
  });

  it('handle large oversample rates', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [Math.floor(pos * 100) / 100];
    const result = findEnvelopeInSampleRange(0, 1, getSamples, 1000);

    expect(result.min).toBe(0);
    expect(result.max).toBe(1); // Now includes endpoint, so max is 1.0 instead of 0.99
  });

  it('find more precise min/max with oversampling', () => {
    // Function that has a peak between integer positions
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => {
      // Parabola: -(x-0.5)^2 + 1, peak at x=0.5 with value 1
      return [-((pos - 0.5) ** 2) + 1];
    };

    // Without oversampling
    const discreteResult = findEnvelopeInSampleRange(0, 1, getSamples, 1);
    // With oversampling
    const oversampledResult = findEnvelopeInSampleRange(0, 1, getSamples, 100);

    // Oversampled should find the peak better
    expect(oversampledResult.max).toBeGreaterThan(discreteResult.max);
    expect(oversampledResult.max).toBeCloseTo(1, 2);
  });

  it('handle negative start position', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos];
    const result = findEnvelopeInSampleRange(-2, 1, getSamples, 1);

    expect(result.min).toBe(-2);
    expect(result.max).toBe(1);
  });

  it('handle very large ranges', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos / 1000];
    const result = findEnvelopeInSampleRange(0, 1000000, getSamples, 1);

    expect(result.min).toBe(0);
    expect(result.max).toBe(1000);
  });

  it('handle fractional start and end positions with oversampling', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos];
    // Input: 1.5, 3.7 -> Rounded to: 2, 4
    const result = findEnvelopeInSampleRange(1.5, 3.7, getSamples, 10);

    expect(result.min).toBeCloseTo(2, 5); // Rounded from 1.5
    expect(result.max).toBeCloseTo(4, 5); // Rounded from 3.7
  });

  it('handle functions returning infinity', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => (pos === 2 ? [Infinity] : [pos]);
    const result = findEnvelopeInSampleRange(0, 4, getSamples, 1);

    expect(result.min).toBe(0);
    expect(result.max).toBe(Infinity);
  });

  it('handle functions returning negative infinity', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => (pos === 1 ? [-Infinity] : [pos]);
    const result = findEnvelopeInSampleRange(0, 3, getSamples, 1);

    expect(result.min).toBe(-Infinity);
    expect(result.max).toBe(3);
  });

  it('handle functions returning NaN', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => (pos === 2 ? [NaN] : [pos]);
    const result = findEnvelopeInSampleRange(0, 4, getSamples, 1);

    expect(result.min).toBeNaN();
    expect(result.max).toBeNaN();
  });

  it('handle mix of finite and infinite values', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => {
      if (pos === 0) return [-Infinity];
      if (pos === 1) return [5];
      if (pos === 2) return [Infinity];
      return [pos];
    };
    const result = findEnvelopeInSampleRange(0, 3, getSamples, 1);

    expect(result.min).toBe(-Infinity);
    expect(result.max).toBe(Infinity);
  });

  it('handle function that throws for certain positions', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => {
      if (pos === 2) throw new Error('Invalid position');
      return [pos];
    };

    // Should throw when trying to sample position 2
    expect(() => {
      findEnvelopeInSampleRange(0, 4, getSamples, 1);
    }).toThrow('Invalid position');
  });

  it('handle function returning very large arrays', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) =>
      Array.from({ length: 1000 }, (_, i) => pos + i / 1000);
    const result = findEnvelopeInSampleRange(0, 1, getSamples, 1);

    expect(result.min).toBe(0);
    expect(result.max).toBeCloseTo(1.999, 3);
  });

  it('handle function with consistent return pattern', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos, -pos, pos * 2];
    const result = findEnvelopeInSampleRange(1, 3, getSamples, 1);

    expect(result.min).toBe(-3); // -3 from position 3
    expect(result.max).toBe(6); // 3 * 2 = 6 from position 3
  });

  it('complete within reasonable time for large ranges', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [Math.sin(pos)];
    const startTime = performance.now();

    findEnvelopeInSampleRange(0, 10000, getSamples, 1);

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
  });

  it('be efficient with high oversample rates', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos];
    const startTime = performance.now();

    findEnvelopeInSampleRange(0, 100, getSamples, 100);

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(50); // Should be reasonably fast
  });

  it('maintain monotonicity when samples are monotonic', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [pos]; // Monotonic increasing
    const result = findEnvelopeInSampleRange(10, 20, getSamples, 1);

    expect(result.min).toBeLessThanOrEqual(result.max);
    expect(result.min).toBe(10);
    expect(result.max).toBe(20);
  });

  it('handle symmetric functions correctly', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [Math.abs(pos - 5)];
    const result = findEnvelopeInSampleRange(0, 10, getSamples, 1);

    expect(result.min).toBe(0); // Minimum at pos = 5
    expect(result.max).toBe(5); // Maximum at pos = 0 or 10
  });

  it('return identical results for equivalent ranges', () => {
    const getSamples: GetEnvelopeSamplesAtPositionFn = (pos) => [Math.sin(pos)];

    const result1 = findEnvelopeInSampleRange(0, 10, getSamples, 10);
    const result2 = findEnvelopeInSampleRange(0, 10, getSamples, 10);

    expect(result1.min).toBe(result2.min);
    expect(result1.max).toBe(result2.max);
  });
});
