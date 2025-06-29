import { describe, it, expect } from 'vitest';
import { getInterpolatedValueLinear } from './index';

describe('getInterpolatedValueLinear should...', () => {
  it('return exact values at integer indices', () => {
    const data = [10, 20, 30, 40, 50];

    expect(getInterpolatedValueLinear(data, 0)).toBe(10);
    expect(getInterpolatedValueLinear(data, 1)).toBe(20);
    expect(getInterpolatedValueLinear(data, 2)).toBe(30);
    expect(getInterpolatedValueLinear(data, 4)).toBe(50);
  });

  it('interpolate between adjacent values', () => {
    const data = [0, 10, 20];

    expect(getInterpolatedValueLinear(data, 0.5)).toBe(5); // Midpoint between 0 and 10
    expect(getInterpolatedValueLinear(data, 1.5)).toBe(15); // Midpoint between 10 and 20
    expect(getInterpolatedValueLinear(data, 0.25)).toBe(2.5); // Quarter point
    expect(getInterpolatedValueLinear(data, 1.75)).toBe(17.5); // Three-quarter point
  });

  it('handle negative values correctly', () => {
    const data = [-10, -5, 0, 5, 10];

    expect(getInterpolatedValueLinear(data, 0.5)).toBe(-7.5); // Between -10 and -5
    expect(getInterpolatedValueLinear(data, 1.5)).toBe(-2.5); // Between -5 and 0
    expect(getInterpolatedValueLinear(data, 2.5)).toBe(2.5); // Between 0 and 5
    expect(getInterpolatedValueLinear(data, 3.5)).toBe(7.5); // Between 5 and 10
  });

  it('work with Float32Array data', () => {
    const data = new Float32Array([1.5, 2.5, 3.5, 4.5]);

    expect(getInterpolatedValueLinear(data, 0)).toBe(1.5);
    expect(getInterpolatedValueLinear(data, 1.5)).toBe(3); // Between 2.5 and 3.5
    expect(getInterpolatedValueLinear(data, 2.5)).toBe(4); // Between 3.5 and 4.5
  });

  it('clamp indices to data bounds', () => {
    const data = [100, 200, 300];

    // Below range - should return first value
    expect(getInterpolatedValueLinear(data, -1)).toBe(100);
    expect(getInterpolatedValueLinear(data, -0.5)).toBe(100);

    // Above range - should return last value
    expect(getInterpolatedValueLinear(data, 3)).toBe(300);
    expect(getInterpolatedValueLinear(data, 10)).toBe(300);
  });

  it('handle single element array', () => {
    const data = [42];

    expect(getInterpolatedValueLinear(data, 0)).toBe(42);
    expect(getInterpolatedValueLinear(data, -1)).toBe(42);
    expect(getInterpolatedValueLinear(data, 1)).toBe(42);
    expect(getInterpolatedValueLinear(data, 0.5)).toBe(42);
  });

  it('handle two element array', () => {
    const data = [10, 20];

    expect(getInterpolatedValueLinear(data, 0)).toBe(10);
    expect(getInterpolatedValueLinear(data, 1)).toBe(20);
    expect(getInterpolatedValueLinear(data, 0.5)).toBe(15);
    expect(getInterpolatedValueLinear(data, 0.25)).toBe(12.5);
    expect(getInterpolatedValueLinear(data, 0.75)).toBe(17.5);
  });

  it('handle exact boundary at last valid index', () => {
    const data = [1, 2, 3, 4, 5];
    const lastIndex = data.length - 1;

    expect(getInterpolatedValueLinear(data, lastIndex)).toBe(5);
    expect(getInterpolatedValueLinear(data, lastIndex - 0.0001)).toBeCloseTo(4.9999, 4);
  });

  it('handle data with zeros', () => {
    const data = [0, 0, 1, 0, 0];

    expect(getInterpolatedValueLinear(data, 0.5)).toBe(0);
    expect(getInterpolatedValueLinear(data, 1.5)).toBe(0.5);
    expect(getInterpolatedValueLinear(data, 2.5)).toBe(0.5);
    expect(getInterpolatedValueLinear(data, 3.5)).toBe(0);
  });

  it('handle data with identical consecutive values', () => {
    const data = [1, 5, 5, 5, 9];

    expect(getInterpolatedValueLinear(data, 1.5)).toBe(5);
    expect(getInterpolatedValueLinear(data, 2.5)).toBe(5);
    expect(getInterpolatedValueLinear(data, 3.5)).toBe(7); // Between 5 and 9
  });

  it('handle large value differences', () => {
    const data = [0, 1000000, 0];

    expect(getInterpolatedValueLinear(data, 0.5)).toBe(500000);
    expect(getInterpolatedValueLinear(data, 1.5)).toBe(500000);
  });

  it('handle very small value differences', () => {
    const data = [0.0000001, 0.0000002, 0.0000003];

    expect(getInterpolatedValueLinear(data, 0.5)).toBeCloseTo(0.00000015, 10);
    expect(getInterpolatedValueLinear(data, 1.5)).toBeCloseTo(0.00000025, 10);
  });

  it('maintain precision with fractional indices', () => {
    const data = [1, 2, 3, 4, 5];

    expect(getInterpolatedValueLinear(data, 1.333333)).toBeCloseTo(2.333333, 6);
    expect(getInterpolatedValueLinear(data, 2.666667)).toBeCloseTo(3.666667, 6);
  });

  it('handle floating point data values', () => {
    const data = [Math.PI, Math.E, Math.sqrt(2)];

    const result = getInterpolatedValueLinear(data, 0.5);
    const expected = (Math.PI + Math.E) / 2;
    expect(result).toBeCloseTo(expected, 10);
  });

  it('handle edge cases with floating point arithmetic', () => {
    const data = [0.1, 0.2, 0.3];

    // Known floating point precision issue: 0.1 + 0.2 !== 0.3
    const result = getInterpolatedValueLinear(data, 0.5);
    expect(result).toBeCloseTo(0.15, 10);
  });

  it('be linear (satisfy proportionality)', () => {
    const data = [0, 10, 20, 30];

    // Test linearity: f(a*x) should be close to a*f(x) for proportional data
    const x = 1.5;
    const result1 = getInterpolatedValueLinear(data, x);
    const result2 = getInterpolatedValueLinear([0, 20, 40, 60], x);

    expect(result2).toBeCloseTo(result1 * 2, 10);
  });

  it('be monotonic for monotonic data', () => {
    const data = [1, 3, 5, 7, 9]; // Monotonic increasing

    const samples = [0.1, 0.5, 1.2, 1.8, 2.3, 2.7, 3.1, 3.9];
    const results = samples.map((index) => getInterpolatedValueLinear(data, index));

    // Check that results are also monotonic increasing
    for (let i = 1; i < results.length; i++) {
      expect(results[i]!).toBeGreaterThanOrEqual(results[i - 1]!);
    }
  });

  it('handle reverse monotonic data', () => {
    const data = [10, 8, 6, 4, 2]; // Monotonic decreasing

    expect(getInterpolatedValueLinear(data, 0.5)).toBe(9);
    expect(getInterpolatedValueLinear(data, 1.5)).toBe(7);
    expect(getInterpolatedValueLinear(data, 2.5)).toBe(5);
    expect(getInterpolatedValueLinear(data, 3.5)).toBe(3);
  });

  it('always return a number', () => {
    const data = [1, 2, 3];

    expect(typeof getInterpolatedValueLinear(data, 0)).toBe('number');
    expect(typeof getInterpolatedValueLinear(data, 0.5)).toBe('number');
    expect(typeof getInterpolatedValueLinear(data, -1)).toBe('number');
    expect(typeof getInterpolatedValueLinear(data, 10)).toBe('number');
  });

  it('return finite numbers for finite input', () => {
    const data = [1, 2, 3, 4, 5];

    const result1 = getInterpolatedValueLinear(data, 1.5);
    const result2 = getInterpolatedValueLinear(data, 2.7);

    expect(Number.isFinite(result1)).toBe(true);
    expect(Number.isFinite(result2)).toBe(true);
  });

  it('use correct linear interpolation formula', () => {
    const data = [100, 200];

    // Manual calculation: value = data[floor] + (data[ceil] - data[floor]) * fraction
    const index = 0.3;
    const floor = Math.floor(index); // 0
    const fraction = index - floor; // 0.3
    const expected = data[floor]! + (data[floor + 1]! - data[floor]!) * fraction;
    // expected = 100 + (200 - 100) * 0.3 = 100 + 30 = 130

    expect(getInterpolatedValueLinear(data, index)).toBe(expected);
    expect(getInterpolatedValueLinear(data, index)).toBe(130);
  });

  it('verify interpolation at various fractions', () => {
    const data = [10, 50]; // Difference of 40

    expect(getInterpolatedValueLinear(data, 0.25)).toBe(20); // 10 + 40 * 0.25 = 20
    expect(getInterpolatedValueLinear(data, 0.5)).toBe(30); // 10 + 40 * 0.5 = 30
    expect(getInterpolatedValueLinear(data, 0.75)).toBe(40); // 10 + 40 * 0.75 = 40
  });

  it('handle empty array gracefully', () => {
    const data: number[] = [];

    // Behavior with empty array might vary by implementation
    // This test documents the expected behavior
    expect(() => getInterpolatedValueLinear(data, 0)).not.toThrow();
  });
});
