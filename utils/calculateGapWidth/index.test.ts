import { describe, it, expect } from 'vitest';
import { calculateGapWidth } from './index';

describe('calculateGapWidth should...', () => {
  it('calculate gap width correctly with percentage', () => {
    // 1000px display, 1% gap = 10px
    expect(calculateGapWidth(1000, 1, 1, 0)).toBe(10);

    // 500px display, 2% gap = 10px
    expect(calculateGapWidth(500, 2, 1, 0)).toBe(10);

    // 1200px display, 0.5% gap = 6px
    expect(calculateGapWidth(1200, 0.5, 1, 0)).toBe(6);
  });

  it('enforce minimum gap width', () => {
    // Small percentage should use minimum width
    expect(calculateGapWidth(1000, 0.01, 5, 0)).toBe(5); // 0.01% = 0.1px, min = 5px
    expect(calculateGapWidth(100, 0.1, 3, 0)).toBe(3); // 0.1% = 0.1px, min = 3px

    // When calculated width equals minimum
    expect(calculateGapWidth(1000, 0.2, 2, 0)).toBe(2); // 0.2% = 2px, min = 2px
  });

  it('enforce maximum gap width when provided', () => {
    // Large percentage should be capped by maximum
    expect(calculateGapWidth(1000, 5, 1, 20)).toBe(20); // 5% = 50px, max = 20px
    expect(calculateGapWidth(500, 10, 1, 15)).toBe(15); // 10% = 50px, max = 15px

    // When calculated width equals maximum
    expect(calculateGapWidth(1000, 2, 1, 20)).toBe(20); // 2% = 20px, max = 20px

    // When calculated width is less than maximum
    expect(calculateGapWidth(1000, 1, 1, 20)).toBe(10); // 1% = 10px, max = 20px
  });

  it('handle min and max constraints together', () => {
    // Min takes precedence when calculated is below min
    expect(calculateGapWidth(1000, 0.01, 5, 10)).toBe(5); // 0.01% = 0.1px, min = 5px, max = 10px

    // Max takes precedence when calculated is above max
    expect(calculateGapWidth(1000, 5, 1, 20)).toBe(20); // 5% = 50px, min = 1px, max = 20px

    // Normal calculation when within bounds
    expect(calculateGapWidth(1000, 1, 2, 20)).toBe(10); // 1% = 10px, min = 2px, max = 20px
  });

  it('return 0 when gapMinWidth is zero or negative', () => {
    expect(calculateGapWidth(1000, 1, 0, 0)).toBe(0);
    expect(calculateGapWidth(1000, 1, -1, 0)).toBe(0);
    expect(calculateGapWidth(1000, 1, -5, 10)).toBe(0);
  });

  it('return 0 when gapPercent is zero or negative', () => {
    expect(calculateGapWidth(1000, 0, 5, 0)).toBe(0);
    expect(calculateGapWidth(1000, -1, 5, 0)).toBe(0);
    expect(calculateGapWidth(1000, -0.5, 5, 10)).toBe(0);
  });

  it('return 0 when gapPercent exceeds 100', () => {
    expect(calculateGapWidth(1000, 100.1, 5, 0)).toBe(0);
    expect(calculateGapWidth(1000, 150, 5, 20)).toBe(0);
    expect(calculateGapWidth(1000, 200, 1, 0)).toBe(0);
  });

  it('handle gapPercent at boundary value of 100', () => {
    expect(calculateGapWidth(1000, 100, 5, 0)).toBe(1000); // 100% = 1000px
  });

  it('handle zero display width', () => {
    expect(calculateGapWidth(0, 1, 5, 0)).toBe(5); // Min width enforced
    expect(calculateGapWidth(0, 1, 0, 0)).toBe(0); // Zero min returns 0
  });

  it('handle very small display widths', () => {
    expect(calculateGapWidth(1, 1, 1, 0)).toBe(1); // 1% of 1px = 0.01px, min = 1px
    expect(calculateGapWidth(0.5, 1, 1, 0)).toBe(1); // 1% of 0.5px = 0.005px, min = 1px
  });

  it('handle very large display widths', () => {
    expect(calculateGapWidth(1000000, 1, 1, 0)).toBe(10000); // 1% of 1M = 10000px
    expect(calculateGapWidth(1000000, 0.001, 1, 0)).toBe(10); // 0.001% of 1M = 10px
  });

  it('handle fractional percentages', () => {
    expect(calculateGapWidth(1000, 0.25, 1, 0)).toBe(2.5); // 0.25% = 2.5px
    expect(calculateGapWidth(1000, 1.5, 1, 0)).toBe(15); // 1.5% = 15px
    expect(calculateGapWidth(333, 1, 1, 0)).toBe(3.33); // 1% of 333 = 3.33px
  });

  it('handle fractional minimum widths', () => {
    expect(calculateGapWidth(1000, 0.01, 2.5, 0)).toBe(2.5); // 0.01% = 0.1px, min = 2.5px
    expect(calculateGapWidth(1000, 1, 1.7, 0)).toBe(10); // 1% = 10px > min = 1.7px
  });

  it('handle fractional maximum widths', () => {
    expect(calculateGapWidth(1000, 5, 1, 25.5)).toBe(25.5); // 5% = 50px, max = 25.5px
    expect(calculateGapWidth(1000, 1, 1, 15.3)).toBe(10); // 1% = 10px < max = 15.3px
  });

  it('handle when gapMaxWidth is 0 (no maximum)', () => {
    expect(calculateGapWidth(1000, 10, 1, 0)).toBe(100); // No max constraint
    expect(calculateGapWidth(1000, 50, 1, 0)).toBe(500); // No max constraint
  });

  it('handle when min equals max', () => {
    expect(calculateGapWidth(1000, 0.5, 10, 10)).toBe(10); // 0.5% = 5px, but min=max=10px
    expect(calculateGapWidth(1000, 2, 15, 15)).toBe(15); // 2% = 20px, but min=max=15px
  });

  it('handle conflicting min/max (min > max)', () => {
    // Min should take precedence when calculated is below min
    expect(calculateGapWidth(1000, 0.1, 20, 10)).toBe(20); // 0.1% = 1px, min = 20px, max = 10px

    // Max should take precedence when calculated is above max but below min
    expect(calculateGapWidth(1000, 1.5, 20, 10)).toBe(10); // 1.5% = 15px, min = 20px, max = 10px
  });

  it('handle floating point arithmetic correctly', () => {
    expect(calculateGapWidth(333.33, 3, 1, 0)).toBeCloseTo(9.9999, 4);
    expect(calculateGapWidth(777.77, 1.111, 1, 0)).toBeCloseTo(8.6410247, 5);
  });

  it('preserve precision in calculations', () => {
    const result = calculateGapWidth(1234.56, 2.345, 1, 0);
    expect(result).toBeCloseTo(28.950432, 6);
  });
});
