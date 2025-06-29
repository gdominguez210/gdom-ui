import { describe, it, expect } from 'vitest';
import { calculateValidSampleRange } from './index';

describe('calculateValidSampleRange should...', () => {
  it('return zero range for empty data', () => {
    const result = calculateValidSampleRange(0, 5, 4);
    expect(result).toEqual({ startSample: 0, endSample: 0 });
  });

  it('center range around exact index for normal cases', () => {
    const result = calculateValidSampleRange(10, 5, 4);
    expect(result).toEqual({ startSample: 3, endSample: 7 });
  });

  it('handle odd number of samples correctly', () => {
    const result = calculateValidSampleRange(10, 5, 5);
    expect(result).toEqual({ startSample: 2, endSample: 8 });
  });

  it('handle even number of samples correctly', () => {
    const result = calculateValidSampleRange(10, 5, 6);
    expect(result).toEqual({ startSample: 2, endSample: 8 });
  });

  it('clamp to array bounds when range exceeds start', () => {
    const result = calculateValidSampleRange(10, 1, 6);
    expect(result).toEqual({ startSample: 0, endSample: 4 });
  });

  it('clamp to array bounds when range exceeds end', () => {
    const result = calculateValidSampleRange(10, 8, 6);
    expect(result).toEqual({ startSample: 5, endSample: 9 });
  });

  it('handle exactIndex at array start', () => {
    const result = calculateValidSampleRange(10, 0, 4);
    expect(result).toEqual({ startSample: 0, endSample: 2 });
  });

  it('handle exactIndex at array end', () => {
    const result = calculateValidSampleRange(10, 9, 4);
    expect(result).toEqual({ startSample: 7, endSample: 9 });
  });

  it('handle fractional exact index', () => {
    const result = calculateValidSampleRange(10, 4.7, 4);
    expect(result).toEqual({ startSample: 2, endSample: 7 });
  });

  it('handle negative exact index', () => {
    const result = calculateValidSampleRange(10, -5, 4);
    expect(result).toEqual({ startSample: 0, endSample: 3 });
  });

  it('handle exact index beyond array end', () => {
    const result = calculateValidSampleRange(10, 15, 4);
    expect(result).toEqual({ startSample: 6, endSample: 9 });
  });

  it('handle single sample request', () => {
    const result = calculateValidSampleRange(10, 5, 1);
    expect(result).toEqual({ startSample: 4, endSample: 6 });
  });

  it('handle zero samples request', () => {
    const result = calculateValidSampleRange(10, 5, 0);
    expect(result).toEqual({ startSample: 5, endSample: 5 });
  });

  it('handle numSamples larger than data length', () => {
    const result = calculateValidSampleRange(5, 2, 10);
    expect(result).toEqual({ startSample: 0, endSample: 4 });
  });

  it('handle single element array', () => {
    const result = calculateValidSampleRange(1, 0, 4);
    expect(result).toEqual({ startSample: 0, endSample: 0 });
  });

  it('handle exact index at fractional positions near boundaries', () => {
    const result = calculateValidSampleRange(10, 0.5, 3);
    expect(result).toEqual({ startSample: 0, endSample: 2 });
  });

  it('ensure startSample <= endSample in normal cases', () => {
    const testCases = [
      { dataLength: 10, exactIndex: 0, numSamples: 2 },
      { dataLength: 10, exactIndex: 5, numSamples: 4 },
      { dataLength: 10, exactIndex: 9, numSamples: 6 },
      { dataLength: 100, exactIndex: 50, numSamples: 20 },
    ];

    testCases.forEach(({ dataLength, exactIndex, numSamples }) => {
      const result = calculateValidSampleRange(dataLength, exactIndex, numSamples);
      expect(result.startSample).toBeLessThanOrEqual(result.endSample);
    });
  });

  it('ensure samples are within array bounds', () => {
    const testCases = [
      { dataLength: 10, exactIndex: 0, numSamples: 2 },
      { dataLength: 10, exactIndex: 5, numSamples: 4 },
      { dataLength: 10, exactIndex: 9, numSamples: 6 },
      { dataLength: 1, exactIndex: 0, numSamples: 10 },
    ];

    testCases.forEach(({ dataLength, exactIndex, numSamples }) => {
      const result = calculateValidSampleRange(dataLength, exactIndex, numSamples);
      expect(result.startSample).toBeGreaterThanOrEqual(0);
      expect(result.endSample).toBeLessThanOrEqual(dataLength - 1);
    });
  });

  it('handle large data arrays efficiently', () => {
    const result = calculateValidSampleRange(1000000, 500000, 100);
    expect(result.startSample).toBe(499950); // floor(500000 - 50)
    expect(result.endSample).toBe(500050); // ceil(500000 + 50)
  });

  it('handle very large numSamples', () => {
    const result = calculateValidSampleRange(10, 5, 1000);
    // Should clamp to full array range
    expect(result).toEqual({ startSample: 0, endSample: 9 });
  });

  it('handle negative numSamples gracefully', () => {
    const result = calculateValidSampleRange(10, 5, -4);
    expect(result.startSample).toBeGreaterThanOrEqual(0);
    expect(result.endSample).toBeGreaterThanOrEqual(0);
  });

  it('handle floating point precision edge cases', () => {
    const result = calculateValidSampleRange(10, 4.999999, 3);
    expect(result.startSample).toBeGreaterThanOrEqual(0);
    expect(result.endSample).toBeLessThanOrEqual(9);
    expect(result.startSample).toBeLessThanOrEqual(result.endSample);
  });

  it('return consistent results for equivalent inputs', () => {
    const result1 = calculateValidSampleRange(10, 5, 4);
    const result2 = calculateValidSampleRange(10, 5, 4);

    expect(result1).toEqual(result2);
  });

  it('handle boundary case where intended range exactly matches array', () => {
    const result = calculateValidSampleRange(10, 4.5, 10);
    expect(result).toEqual({ startSample: 0, endSample: 9 });
  });

  it('handle special case correction for negative exactIndex with large numSamples', () => {
    const result = calculateValidSampleRange(5, -10, 3);
    expect(result).toEqual({ startSample: 0, endSample: 2 });
  });

  it('handle special case correction for large positive exactIndex', () => {
    const result = calculateValidSampleRange(5, 20, 3);
    expect(result).toEqual({ startSample: 2, endSample: 4 });
  });

  it('preserve range size when possible', () => {
    const result = calculateValidSampleRange(20, 10, 6);
    const rangeSize = result.endSample - result.startSample + 1;
    expect(rangeSize).toBeGreaterThanOrEqual(6); // May be slightly larger due to ceil/floor
  });

  it('handle edge case where numSamples equals dataLength', () => {
    const result = calculateValidSampleRange(10, 5, 10);
    expect(result).toEqual({ startSample: 0, endSample: 9 });
  });
});
