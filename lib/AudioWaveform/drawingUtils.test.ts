import { describe, it, expect } from 'vitest';
import {
  calculateMinGapWidth,
  getActualGapWidth,
  calculateMaxBarsInView,
  calculateSamplingRate,
  sampleWaveformData,
  calculateBarWidth,
} from './drawingUtils';

describe('drawingUtils', () => {
  describe('calculateMinGapWidth should...', () => {
    it('return at least 1px regardless of display width', () => {
      expect(calculateMinGapWidth(10)).toBe(1);
      expect(calculateMinGapWidth(500)).toBe(1);
    });

    it('scale with display width when above minimum', () => {
      expect(calculateMinGapWidth(1000, 0.002)).toBe(2);
      expect(calculateMinGapWidth(2000, 0.002)).toBe(4);
    });

    it('use the default minGapPercent when not provided', () => {
      expect(calculateMinGapWidth(2000)).toBe(2); // 2000 * 0.001 = 2
    });

    it('handle very large display widths', () => {
      expect(calculateMinGapWidth(10000, 0.001)).toBe(10);
    });

    it('handle very small minGapPercent values', () => {
      expect(calculateMinGapWidth(1000, 0.0001)).toBe(1); // Would be 0.1 but minimum is 1
    });
  });

  describe('getActualGapWidth should...', () => {
    it('return 0 when barGapRatio is 0', () => {
      expect(getActualGapWidth(1000, 0)).toBe(0);
    });

    it('return 0 when minGapPercent is 0', () => {
      expect(getActualGapWidth(1000, 0.01, 0)).toBe(0);
    });

    it('use minGapWidth when desired gap is smaller', () => {
      // desiredGapWidth = 0.5, minGapWidth = 1
      expect(getActualGapWidth(1000, 0.0005)).toBe(1);
    });

    it('use desired gap width when larger than min', () => {
      // desiredGapWidth = 5, minGapWidth = 1
      expect(getActualGapWidth(1000, 0.005)).toBe(5);
    });

    it('use custom minGapPercent when provided', () => {
      // desiredGapWidth = 2, minGapWidth = 3
      expect(getActualGapWidth(1000, 0.002, 0.003)).toBe(3);
    });
  });

  describe('calculateMaxBarsInView should...', () => {
    it('calculate maximum number of bars correctly when spaces are equal', () => {
      // can fit 10 bars (100 / 10 = 10)
      expect(calculateMaxBarsInView(100, 10, 0)).toBe(10);
    });

    it('account for gaps between bars', () => {
      // 100 + 5 is the total width + one gap (n-1 gaps for n bars)
      // divided by 15 (bar + gap)
      // = 7 (floored)
      expect(calculateMaxBarsInView(100, 10, 5)).toBe(7);
    });

    it('handle edge cases with tiny bars', () => {
      expect(calculateMaxBarsInView(100, 1, 0)).toBe(100);
    });

    it('handle edge cases with large gaps', () => {
      // (100 + 20) / (5 + 20) = 4.8 → 4 bars
      expect(calculateMaxBarsInView(100, 5, 20)).toBe(4);
    });
  });

  describe('calculateSamplingRate should...', () => {
    it('return 1 when data fits within available bars', () => {
      expect(calculateSamplingRate(50, 100)).toBe(1);
      expect(calculateSamplingRate(100, 100)).toBe(1);
    });

    it('calculate correct sampling rate when downsampling is needed', () => {
      // 200 data points, 100 bars → sample every 2nd point
      expect(calculateSamplingRate(200, 100)).toBe(2);

      // 500 data points, 100 bars → sample every 5th point
      expect(calculateSamplingRate(500, 100)).toBe(5);
    });

    it('round up to ensure we do not exceed max bars in view', () => {
      // 101 data points, 100 bars → sample rate should be 2 (not 1.01)
      expect(calculateSamplingRate(101, 100)).toBe(2);

      // 199 data points, 100 bars → sample rate should be 2 (not 1.99)
      expect(calculateSamplingRate(199, 100)).toBe(2);
    });

    it('handle extreme cases', () => {
      // 10000 data points, 10 bars → sample every 1000th point
      expect(calculateSamplingRate(10000, 10)).toBe(1000);
    });
  });

  describe('sampleWaveformData should...', () => {
    it('return original data when sampling rate is 1', () => {
      const original = [1, 2, 3, 4, 5];
      expect(sampleWaveformData(original, 1)).toBe(original);
    });

    it('sample every nth element from the array', () => {
      const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      // samplingRate 2 should return every 2nd element
      expect(sampleWaveformData(data, 2)).toEqual([0, 2, 4, 6, 8]);

      // samplingRate 3 should return every 3rd element
      expect(sampleWaveformData(data, 3)).toEqual([0, 3, 6, 9]);
    });

    it('handle empty array', () => {
      expect(sampleWaveformData([], 2)).toEqual([]);
    });

    it('handle large sampling rates that exceed array length', () => {
      const data = [0, 1, 2, 3, 4];
      // When samplingRate > array.length, only the first element should be included
      expect(sampleWaveformData(data, 10)).toEqual([0]);
    });
  });

  describe('calculateBarWidth should...', () => {
    it('calculate bar width when no gap is present', () => {
      // Each bar should be 10px wide
      expect(calculateBarWidth(100, 10, 0, 1)).toBe(10);
    });

    it('account for gaps between bars', () => {
      // Total gap width: 9 * 2 = 18px
      // Available for bars: 100 - 18 = 82px
      // Each bar: 82 / 10 = 8.2px, but we use integer math so 8px
      expect(calculateBarWidth(100, 10, 2, 1)).toBe(8.2);
    });

    it('respect minimum bar width', () => {
      // This would normally give a bar width < 1 but we enforce the minimum
      expect(calculateBarWidth(100, 100, 1, 2)).toBe(2);
    });

    it('handle edge cases with a single bar', () => {
      // With one bar, there are no gaps
      expect(calculateBarWidth(100, 1, 5, 1)).toBe(100);
    });

    it('handle edge cases with many bars', () => {
      // Total gap width: 49 * 1 = 49px
      // Available for bars: 100 - 49 = 51px
      // Each bar: 51 / 50 = 1.02px
      expect(calculateBarWidth(100, 50, 1, 1)).toBe(1.02);
    });
  });
});
