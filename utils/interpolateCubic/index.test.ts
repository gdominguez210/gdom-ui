import { describe, it, expect } from 'vitest';
import { interpolateCubic } from '@/utils/interpolateCubic';

describe('interpolateCubic should...', () => {
  it('return y1 when mu=0', () => {
    expect(interpolateCubic(1, 2, 3, 4, 0)).toBe(2); // Should return y1
    expect(interpolateCubic(-5, 10, 15, 20, 0)).toBe(10);
    expect(interpolateCubic(0, 0, 0, 0, 0)).toBe(0);
  });

  it('return y2 when mu=1', () => {
    expect(interpolateCubic(1, 2, 3, 4, 1)).toBe(3); // Should return y2
    expect(interpolateCubic(-5, 10, 15, 20, 1)).toBe(15);
    expect(interpolateCubic(0, 0, 0, 0, 1)).toBe(0);
  });

  it('interpolate smoothly between y1 and y2', () => {
    // Test with a smooth progression: 0, 1, 2, 3
    const y0 = 0,
      y1 = 1,
      y2 = 2,
      y3 = 3;

    const result_quarter = interpolateCubic(y0, y1, y2, y3, 0.25);
    const result_half = interpolateCubic(y0, y1, y2, y3, 0.5);
    const result_three_quarter = interpolateCubic(y0, y1, y2, y3, 0.75);

    // Results should be between y1 and y2
    expect(result_quarter).toBeGreaterThan(y1);
    expect(result_quarter).toBeLessThan(y2);
    expect(result_half).toBeGreaterThan(y1);
    expect(result_half).toBeLessThan(y2);
    expect(result_three_quarter).toBeGreaterThan(y1);
    expect(result_three_quarter).toBeLessThan(y2);

    // Should progress monotonically
    expect(result_quarter).toBeLessThan(result_half);
    expect(result_half).toBeLessThan(result_three_quarter);
  });

  it('handle negative values correctly', () => {
    const y0 = -10,
      y1 = -5,
      y2 = 0,
      y3 = 5;

    const result = interpolateCubic(y0, y1, y2, y3, 0.5);
    expect(result).toBeGreaterThan(y1);
    expect(result).toBeLessThan(y2);
  });

  it('handle mixed positive and negative values', () => {
    const y0 = -2,
      y1 = 1,
      y2 = -1,
      y3 = 3;

    expect(interpolateCubic(y0, y1, y2, y3, 0)).toBe(y1);
    expect(interpolateCubic(y0, y1, y2, y3, 1)).toBe(y2);

    const mid_result = interpolateCubic(y0, y1, y2, y3, 0.5);
    expect(typeof mid_result).toBe('number');
    expect(Number.isFinite(mid_result)).toBe(true);
  });

  it('extrapolate when mu > 1', () => {
    const y0 = 0,
      y1 = 1,
      y2 = 2,
      y3 = 3;

    const result_1_5 = interpolateCubic(y0, y1, y2, y3, 1.5);
    const result_2 = interpolateCubic(y0, y1, y2, y3, 2);

    // Should continue the curve beyond y2
    expect(result_1_5).toBeGreaterThan(y2);
    expect(result_2).toBeGreaterThan(result_1_5);
  });

  it('extrapolate when mu < 0', () => {
    const y0 = 0,
      y1 = 1,
      y2 = 2,
      y3 = 3;

    const result_neg_half = interpolateCubic(y0, y1, y2, y3, -0.5);
    const result_neg_one = interpolateCubic(y0, y1, y2, y3, -1);

    // Should extrapolate backwards from y1
    expect(result_neg_half).toBeLessThan(y1);
    expect(result_neg_one).toBeLessThan(result_neg_half);
  });

  it('handle all identical values', () => {
    const value = 5;
    expect(interpolateCubic(value, value, value, value, 0)).toBe(value);
    expect(interpolateCubic(value, value, value, value, 0.5)).toBe(value);
    expect(interpolateCubic(value, value, value, value, 1)).toBe(value);
    expect(interpolateCubic(value, value, value, value, 1.5)).toBe(value);
  });

  it('handle y1 and y2 identical (flat interpolation)', () => {
    const result = interpolateCubic(0, 5, 5, 10, 0.5);
    expect(result).toBeCloseTo(5, 5); // Should be close to the flat value
  });

  it('handle three identical values', () => {
    expect(interpolateCubic(5, 5, 5, 10, 0.5)).toBeDefined();
    expect(interpolateCubic(0, 5, 5, 5, 0.5)).toBeDefined();
    expect(interpolateCubic(5, 10, 5, 5, 0.5)).toBeDefined();
  });

  it('handle zero in different positions', () => {
    expect(interpolateCubic(0, 1, 2, 3, 0.5)).toBeDefined();
    expect(interpolateCubic(1, 0, 2, 3, 0.5)).toBeDefined();
    expect(interpolateCubic(1, 2, 0, 3, 0.5)).toBeDefined();
    expect(interpolateCubic(1, 2, 3, 0, 0.5)).toBeDefined();
  });

  it('handle multiple zeros', () => {
    expect(interpolateCubic(0, 0, 1, 2, 0.5)).toBeDefined();
    expect(interpolateCubic(0, 1, 0, 2, 0.5)).toBeDefined();
    expect(interpolateCubic(1, 0, 0, 2, 0.5)).toBeDefined();
  });

  it('implement the correct cubic interpolation formula', () => {
    // Test against manual calculation
    const y0 = 1,
      y1 = 2,
      y2 = 3,
      y3 = 4;
    const mu = 0.5;

    // Manual calculation of the cubic interpolation formula
    const mu2 = mu * mu;
    const a0 = y3 - y2 - y0 + y1;
    const a1 = y0 - y1 - a0;
    const a2 = y2 - y0;
    const a3 = y1;
    const expected = a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;

    const result = interpolateCubic(y0, y1, y2, y3, mu);
    expect(result).toBeCloseTo(expected, 10);
  });

  it('calculate coefficients correctly for various inputs', () => {
    const testCases = [
      { y0: 0, y1: 1, y2: 4, y3: 9, mu: 0.3 }, // Quadratic-like progression
      { y0: -2, y1: 1, y2: -1, y3: 3, mu: 0.7 }, // Mixed signs
      { y0: 10, y1: 20, y2: 15, y3: 25, mu: 0.25 }, // Non-monotonic
    ];

    testCases.forEach(({ y0, y1, y2, y3, mu }) => {
      const result = interpolateCubic(y0, y1, y2, y3, mu);

      // Manually calculate expected result
      const mu2 = mu * mu;
      const a0 = y3 - y2 - y0 + y1;
      const a1 = y0 - y1 - a0;
      const a2 = y2 - y0;
      const a3 = y1;
      const expected = a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;

      expect(result).toBeCloseTo(expected, 10);
    });
  });

  it('handle very small values', () => {
    const result = interpolateCubic(0.0001, 0.0002, 0.0003, 0.0004, 0.5);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
  });

  it('handle very large values', () => {
    const result = interpolateCubic(1000000, 2000000, 3000000, 4000000, 0.5);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
  });

  it('maintain precision with fractional inputs', () => {
    const result = interpolateCubic(1.111, 2.222, 3.333, 4.444, 0.333);
    expect(typeof result).toBe('number');
    expect(Number.isFinite(result)).toBe(true);
    // Result should be reasonably close to y1 and y2 range
    expect(result).toBeGreaterThan(2);
    expect(result).toBeLessThan(4);
  });

  it('create a smooth curve that passes through y1 and y2', () => {
    const y0 = 0,
      y1 = 1,
      y2 = 2,
      y3 = 3;

    // Test multiple points along the curve
    const steps = 11;
    const results: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const mu = i / steps;
      results.push(interpolateCubic(y0, y1, y2, y3, mu));
    }

    // First and last should be y1 and y2
    expect(results[0]).toBeCloseTo(y1, 10);
    expect(results[steps]).toBeCloseTo(y2, 10);

    // All intermediate values should be finite
    results.forEach((result) => {
      expect(Number.isFinite(result)).toBe(true);
    });
  });

  it('handle inflection points properly', () => {
    // Test a curve with an inflection point
    const y0 = 0,
      y1 = 1,
      y2 = 0,
      y3 = 1; // Wave-like pattern

    const result_quarter = interpolateCubic(y0, y1, y2, y3, 0.25);
    const result_half = interpolateCubic(y0, y1, y2, y3, 0.5);
    const result_three_quarter = interpolateCubic(y0, y1, y2, y3, 0.75);

    // All should be finite and reasonable
    expect(Number.isFinite(result_quarter)).toBe(true);
    expect(Number.isFinite(result_half)).toBe(true);
    expect(Number.isFinite(result_three_quarter)).toBe(true);
  });

  it('handle very large differences between consecutive points', () => {
    const result = interpolateCubic(-1000, 0, 1000, 2000, 0.5);
    expect(Number.isFinite(result)).toBe(true);
  });

  it('handle alternating large positive and negative values', () => {
    const result = interpolateCubic(-1000, 1000, -1000, 1000, 0.5);
    expect(Number.isFinite(result)).toBe(true);
  });

  it('not overflow with reasonable inputs', () => {
    const result = interpolateCubic(100, 200, 300, 400, 0.5);
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(100);
    expect(result).toBeLessThan(400);
  });

  it('be continuous at boundary points', () => {
    const y0 = 1,
      y1 = 2,
      y2 = 3,
      y3 = 4;

    // Test continuity near boundaries
    const near_zero = interpolateCubic(y0, y1, y2, y3, 0.001);
    const near_one = interpolateCubic(y0, y1, y2, y3, 0.999);

    expect(near_zero).toBeCloseTo(y1, 2);
    expect(near_one).toBeCloseTo(y2, 2);
  });

  it('handle non-monotonic sequences correctly', () => {
    // Test with a sequence that goes up then down
    const y0 = 1,
      y1 = 3,
      y2 = 2,
      y3 = 4;

    const result = interpolateCubic(y0, y1, y2, y3, 0.5);
    expect(Number.isFinite(result)).toBe(true);

    // The interpolation should handle the non-monotonic nature
    expect(result).toBeDefined();
  });
});
