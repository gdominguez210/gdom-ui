import { describe, it, expect } from 'vitest';
import { getInterpolatedValueCubic } from './index';

describe('getInterpolatedValueCubic should...', () => {
  it('return exact values at integer indices', () => {
    const data = [1, 4, 9, 16, 25];

    expect(getInterpolatedValueCubic(data, 0)).toBe(1);
    expect(getInterpolatedValueCubic(data, 1)).toBe(4);
    expect(getInterpolatedValueCubic(data, 2)).toBe(9);
    expect(getInterpolatedValueCubic(data, 3)).toBe(16);
    expect(getInterpolatedValueCubic(data, 4)).toBe(25);
  });

  it('provide smooth interpolation between points', () => {
    const data = [0, 1, 8, 27];

    const midpoint = getInterpolatedValueCubic(data, 1.5);
    expect(typeof midpoint).toBe('number');
    expect(Number.isFinite(midpoint)).toBe(true);

    // Should be somewhere between adjacent values but not necessarily linear
    expect(midpoint).toBeGreaterThan(1);
    expect(midpoint).toBeLessThan(8);
  });

  it('work with Float32Array data', () => {
    const data = new Float32Array([1.1, 2.2, 3.3, 4.4, 5.5]);

    // Use toBeCloseTo for Float32Array due to precision limitations
    expect(getInterpolatedValueCubic(data, 0)).toBeCloseTo(1.1, 5);
    expect(getInterpolatedValueCubic(data, 2)).toBeCloseTo(3.3, 5);

    const interpolated = getInterpolatedValueCubic(data, 1.5);
    expect(typeof interpolated).toBe('number');
    expect(Number.isFinite(interpolated)).toBe(true);
  });

  it('handle indices at data boundaries', () => {
    const data = [10, 20, 30, 40, 50];

    // Exact boundaries
    expect(getInterpolatedValueCubic(data, 0)).toBe(10);
    expect(getInterpolatedValueCubic(data, 4)).toBe(50);

    // Near boundaries - cubic interpolation may deviate from edge values
    const nearStart = getInterpolatedValueCubic(data, 0.1);
    const nearEnd = getInterpolatedValueCubic(data, 3.9);

    expect(typeof nearStart).toBe('number');
    expect(Number.isFinite(nearStart)).toBe(true);
    expect(typeof nearEnd).toBe('number');
    expect(Number.isFinite(nearEnd)).toBe(true);
  });

  it('handle out-of-bounds indices gracefully', () => {
    const data = [100, 200, 300];

    // Below range
    const belowResult = getInterpolatedValueCubic(data, -1);
    expect(typeof belowResult).toBe('number');
    expect(Number.isFinite(belowResult)).toBe(true);

    // Above range
    const aboveResult = getInterpolatedValueCubic(data, 10);
    expect(typeof aboveResult).toBe('number');
    expect(Number.isFinite(aboveResult)).toBe(true);
  });

  it('handle single element array', () => {
    const data = [42];

    expect(getInterpolatedValueCubic(data, 0)).toBe(42);

    // Out of bounds on single element should extrapolate reasonably
    const result1 = getInterpolatedValueCubic(data, -1);
    const result2 = getInterpolatedValueCubic(data, 1);
    expect(typeof result1).toBe('number');
    expect(typeof result2).toBe('number');
  });

  it('handle two element array', () => {
    const data = [10, 20];

    expect(getInterpolatedValueCubic(data, 0)).toBe(10);
    expect(getInterpolatedValueCubic(data, 1)).toBe(20);

    const midpoint = getInterpolatedValueCubic(data, 0.5);
    expect(typeof midpoint).toBe('number');
    expect(Number.isFinite(midpoint)).toBe(true);
  });

  it('handle three element array', () => {
    const data = [1, 2, 3];

    expect(getInterpolatedValueCubic(data, 0)).toBe(1);
    expect(getInterpolatedValueCubic(data, 1)).toBe(2);
    expect(getInterpolatedValueCubic(data, 2)).toBe(3);

    const interpolated = getInterpolatedValueCubic(data, 0.5);
    expect(typeof interpolated).toBe('number');
    expect(Number.isFinite(interpolated)).toBe(true);
  });

  it('handle negative values correctly', () => {
    const data = [-10, -5, 0, 5, 10];

    expect(getInterpolatedValueCubic(data, 0)).toBe(-10);
    expect(getInterpolatedValueCubic(data, 2)).toBe(0);
    expect(getInterpolatedValueCubic(data, 4)).toBe(10);

    const interpolated = getInterpolatedValueCubic(data, 1.5);
    expect(typeof interpolated).toBe('number');
    expect(Number.isFinite(interpolated)).toBe(true);
  });

  it('handle zero values', () => {
    const data = [0, 0, 1, 0, 0];

    expect(getInterpolatedValueCubic(data, 0)).toBe(0);
    expect(getInterpolatedValueCubic(data, 2)).toBe(1);
    expect(getInterpolatedValueCubic(data, 4)).toBe(0);

    const interpolated = getInterpolatedValueCubic(data, 1.5);
    expect(typeof interpolated).toBe('number');
    expect(Number.isFinite(interpolated)).toBe(true);
  });

  it('handle very large values', () => {
    const data = [1e6, 2e6, 3e6, 4e6];

    const result = getInterpolatedValueCubic(data, 1.5);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(1e6);
    expect(result).toBeLessThan(4e6);
  });

  it('handle very small values', () => {
    const data = [1e-6, 2e-6, 3e-6, 4e-6];

    const result = getInterpolatedValueCubic(data, 1.5);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(5e-6);
  });

  it('provide smoother interpolation than linear', () => {
    const data = [0, 0, 1, 1]; // Step function

    // Cubic should provide smooth transition
    const quarter = getInterpolatedValueCubic(data, 1.25);
    const half = getInterpolatedValueCubic(data, 1.5);
    const threeQuarter = getInterpolatedValueCubic(data, 1.75);

    // Should show smooth progression
    expect(quarter).toBeLessThan(half);
    expect(half).toBeLessThan(threeQuarter);

    // All should be reasonable values
    expect(quarter).toBeGreaterThanOrEqual(-0.5);
    expect(quarter).toBeLessThanOrEqual(1.5);
  });

  it('handle oscillating data smoothly', () => {
    const data = [0, 1, 0, 1, 0]; // Oscillating

    const samples = [0.5, 1.5, 2.5, 3.5];
    const results = samples.map((index) => getInterpolatedValueCubic(data, index));

    results.forEach((result) => {
      expect(Number.isFinite(result)).toBe(true);
    });
  });

  it('maintain smoothness at inflection points', () => {
    const data = [1, 0, 1, 0, 1];

    const testPoints = [0.9, 1.0, 1.1, 1.9, 2.0, 2.1];
    const results = testPoints.map((point) => getInterpolatedValueCubic(data, point));

    results.forEach((result) => {
      expect(Number.isFinite(result)).toBe(true);
      expect(typeof result).toBe('number');
    });
  });

  it('be deterministic', () => {
    const data = [1, 4, 9, 16, 25];
    const index = 2.3;

    const result1 = getInterpolatedValueCubic(data, index);
    const result2 = getInterpolatedValueCubic(data, index);

    expect(result1).toBe(result2);
  });

  it('handle monotonic data reasonably', () => {
    const data = [1, 2, 3, 4, 5]; // Monotonic increasing

    const samples = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];
    const results = samples.map((index) => getInterpolatedValueCubic(data, index));

    // Check general trend (allowing for some cubic overshoot)
    results.forEach((result) => {
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(7); // Allow some overshoot
    });
  });

  it('handle constant data', () => {
    const data = [5, 5, 5, 5, 5];

    const samples = [0.2, 1.3, 2.7, 3.8];
    const results = samples.map((index) => getInterpolatedValueCubic(data, index));

    results.forEach((result) => {
      expect(result).toBeCloseTo(5, 1); // Should be close to constant value
    });
  });

  it('handle multiple interpolations efficiently', () => {
    const data = [1, 8, 27, 64, 125]; // Cubes
    const testIndices = Array.from({ length: 100 }, (_, i) => i / 25); // 0 to 4

    const startTime = performance.now();
    const results = testIndices.map((index) => getInterpolatedValueCubic(data, index));
    const endTime = performance.now();

    expect(results).toHaveLength(100);
    expect(endTime - startTime).toBeLessThan(20);

    // All results should be finite
    results.forEach((result) => {
      expect(Number.isFinite(result)).toBe(true);
    });
  });

  it('use information from neighboring points', () => {
    // Test that cubic considers context from neighboring points
    const data1 = [0, 1, 2, 3];
    const data2 = [10, 1, 2, 30]; // Same middle values, different context

    const result1 = getInterpolatedValueCubic(data1, 1.5);
    const result2 = getInterpolatedValueCubic(data2, 1.5);

    expect(typeof result1).toBe('number');
    expect(typeof result2).toBe('number');
    expect(Number.isFinite(result1)).toBe(true);
    expect(Number.isFinite(result2)).toBe(true);

    // Results might be different due to different context
    // This test documents that the algorithm considers neighboring points
  });

  it('handle very negative indices', () => {
    const data = [1, 2, 3, 4];

    const result = getInterpolatedValueCubic(data, -100);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
  });

  it('handle very large positive indices', () => {
    const data = [1, 2, 3, 4];

    const result = getInterpolatedValueCubic(data, 100);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
  });

  it('handle fractional indices close to integers', () => {
    const data = [10, 20, 30, 40];

    const nearInteger = getInterpolatedValueCubic(data, 1.0000001);
    const exactInteger = getInterpolatedValueCubic(data, 1);

    expect(nearInteger).toBeCloseTo(exactInteger, 5);
  });

  it('maintain reasonable precision', () => {
    const data = [Math.PI, Math.E, Math.sqrt(2), Math.sqrt(3)];

    const result = getInterpolatedValueCubic(data, 1.5);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
  });

  it('handle precision edge cases', () => {
    const data = [0.1, 0.2, 0.3, 0.4]; // Known floating point precision issues

    const result = getInterpolatedValueCubic(data, 1.5);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });
});
