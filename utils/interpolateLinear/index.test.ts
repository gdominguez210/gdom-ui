import { describe, it, expect } from 'vitest';
import { interpolateLinear } from '@/utils/interpolateLinear';

describe('interpolateLinear should...', () => {
  it('should interpolate between two positive values', () => {
    expect(interpolateLinear(0, 10, 0)).toBe(0); // t=0 returns y1
    expect(interpolateLinear(0, 10, 1)).toBe(10); // t=1 returns y2
    expect(interpolateLinear(0, 10, 0.5)).toBe(5); // t=0.5 returns midpoint
    expect(interpolateLinear(0, 10, 0.25)).toBe(2.5); // t=0.25 returns quarter point
    expect(interpolateLinear(0, 10, 0.75)).toBe(7.5); // t=0.75 returns three-quarter point
  });

  it('should interpolate between two negative values', () => {
    expect(interpolateLinear(-10, -5, 0)).toBe(-10);
    expect(interpolateLinear(-10, -5, 1)).toBe(-5);
    expect(interpolateLinear(-10, -5, 0.5)).toBe(-7.5);
    expect(interpolateLinear(-10, -5, 0.2)).toBe(-9); // -10 + (-5 - (-10)) * 0.2 = -10 + 5 * 0.2 = -9
  });

  it('should interpolate between negative and positive values', () => {
    expect(interpolateLinear(-5, 5, 0)).toBe(-5);
    expect(interpolateLinear(-5, 5, 1)).toBe(5);
    expect(interpolateLinear(-5, 5, 0.5)).toBe(0); // Midpoint crosses zero
    expect(interpolateLinear(-5, 5, 0.3)).toBe(-2); // -5 + 10 * 0.3 = -5 + 3 = -2
    expect(interpolateLinear(-5, 5, 0.8)).toBe(3); // -5 + 10 * 0.8 = -5 + 8 = 3
  });

  it('should handle identical start and end values', () => {
    expect(interpolateLinear(5, 5, 0)).toBe(5);
    expect(interpolateLinear(5, 5, 0.5)).toBe(5);
    expect(interpolateLinear(5, 5, 1)).toBe(5);
    expect(interpolateLinear(-3, -3, 0.7)).toBe(-3);
  });

  it('should handle interpolation factor beyond 0-1 range (extrapolation)', () => {
    // t > 1 extrapolates beyond y2
    expect(interpolateLinear(0, 10, 1.5)).toBe(15); // 0 + (10-0) * 1.5 = 15
    expect(interpolateLinear(0, 10, 2)).toBe(20); // 0 + (10-0) * 2 = 20

    // t < 0 extrapolates beyond y1
    expect(interpolateLinear(0, 10, -0.5)).toBe(-5); // 0 + (10-0) * (-0.5) = -5
    expect(interpolateLinear(5, 15, -0.2)).toBe(3); // 5 + (15-5) * (-0.2) = 5 - 2 = 3
  });

  it('should handle zero interpolation factor', () => {
    expect(interpolateLinear(100, 200, 0)).toBe(100);
    expect(interpolateLinear(-50, 50, 0)).toBe(-50);
    expect(interpolateLinear(0, 0, 0)).toBe(0);
  });

  it('should handle unit interpolation factor', () => {
    expect(interpolateLinear(100, 200, 1)).toBe(200);
    expect(interpolateLinear(-50, 50, 1)).toBe(50);
    expect(interpolateLinear(0, 0, 1)).toBe(0);
  });

  it('should handle very small values', () => {
    expect(interpolateLinear(0.000001, 0.000002, 0.5)).toBeCloseTo(0.0000015, 10);
    expect(interpolateLinear(-0.0001, 0.0001, 0.25)).toBeCloseTo(-0.00005, 10);
  });

  it('should handle very large values', () => {
    expect(interpolateLinear(1000000, 2000000, 0.3)).toBe(1300000);
    expect(interpolateLinear(-5000000, 5000000, 0.1)).toBe(-4000000);
  });

  it('should maintain precision with fractional inputs', () => {
    expect(interpolateLinear(1.111, 2.222, 0.333)).toBeCloseTo(1.480963, 6);
    expect(interpolateLinear(3.14159, 2.71828, 0.5)).toBeCloseTo(2.929935, 6);
  });

  it('should handle floating point edge cases', () => {
    expect(interpolateLinear(1 / 3, 2 / 3, 0.5)).toBeCloseTo(0.5, 10);
    expect(interpolateLinear(0.1 + 0.2, 0.4, 0.5)).toBeCloseTo(0.35, 10); // Tests floating point arithmetic
  });

  it('should handle zero as start value', () => {
    expect(interpolateLinear(0, 100, 0.25)).toBe(25);
    expect(interpolateLinear(0, -100, 0.75)).toBe(-75);
  });

  it('should handle zero as end value', () => {
    expect(interpolateLinear(100, 0, 0.25)).toBe(75); // 100 + (0-100) * 0.25 = 100 - 25 = 75
    expect(interpolateLinear(-100, 0, 0.6)).toBe(-40); // -100 + (0-(-100)) * 0.6 = -100 + 60 = -40
  });

  it('should handle both values as zero', () => {
    expect(interpolateLinear(0, 0, 0.5)).toBe(0);
    expect(interpolateLinear(0, 0, 0)).toBe(0);
    expect(interpolateLinear(0, 0, 1)).toBe(0);
    expect(interpolateLinear(0, 0, 2)).toBe(0); // Even with extrapolation
  });

  it('should be commutative with flipped t', () => {
    // interpolateLinear(a, b, t) should equal interpolateLinear(b, a, 1-t)
    const y1 = 10,
      y2 = 30,
      t = 0.3;
    const forward = interpolateLinear(y1, y2, t);
    const reverse = interpolateLinear(y2, y1, 1 - t);
    expect(forward).toBeCloseTo(reverse, 10);
  });

  it('should be linear (satisfy additivity)', () => {
    // interpolateLinear(a, b, t1 + t2) should relate to sum of interpolations
    const y1 = 5,
      y2 = 15;
    const t1 = 0.2,
      t2 = 0.3;

    // Test that the function is indeed linear
    const result1 = interpolateLinear(y1, y2, t1);
    const result2 = interpolateLinear(y1, y2, t2);
    const result_sum = interpolateLinear(y1, y2, t1 + t2);

    // For linear interpolation: f(t1) + f(t2) - f(0) = f(t1 + t2)
    expect(result1 + result2 - y1).toBeCloseTo(result_sum, 10);
  });

  it('should satisfy midpoint property', () => {
    // The midpoint between any two values should be their average
    const testCases: [number, number][] = [
      [0, 10],
      [5, 15],
      [-10, 10],
      [-5, -15],
      [100, 200],
    ];

    testCases.forEach(([y1, y2]) => {
      const midpoint = interpolateLinear(y1, y2, 0.5);
      const average = (y1 + y2) / 2;
      expect(midpoint).toBeCloseTo(average, 10);
    });
  });

  it('should implement the correct linear interpolation formula', () => {
    // Formula: y1 + (y2 - y1) * t
    const testCases = [
      { y1: 10, y2: 20, t: 0.3, expected: 10 + (20 - 10) * 0.3 },
      { y1: -5, y2: 15, t: 0.7, expected: -5 + (15 - -5) * 0.7 },
      { y1: 100, y2: 50, t: 0.25, expected: 100 + (50 - 100) * 0.25 },
      { y1: 0, y2: 1, t: 0.618, expected: 0 + (1 - 0) * 0.618 }, // Golden ratio
    ];

    testCases.forEach(({ y1, y2, t, expected }) => {
      expect(interpolateLinear(y1, y2, t)).toBeCloseTo(expected, 10);
    });
  });

  it('should handle very large differences between values', () => {
    expect(interpolateLinear(-1000000, 1000000, 0.5)).toBe(0);
    expect(interpolateLinear(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0.5)).toBe(0);
  });

  it('should handle very small differences between values', () => {
    const y1 = 1.0000000001;
    const y2 = 1.0000000002;
    const result = interpolateLinear(y1, y2, 0.5);
    expect(result).toBeCloseTo(1.00000000015, 12);
  });
});
