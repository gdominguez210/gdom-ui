import { describe, it, expect } from 'vitest';
import {
  calculateLogarithmicDistributionDenominator,
  calculateLogarithmicIndexRatio,
  calculateLogarithmicIndex,
  calculateAmplifiedValue,
  calculateFrequencyBandAverage,
  FREQUENCY_DISTRIBUTION,
} from './frequencyDistribution';

describe('frequencyDistribution', () => {
  describe('calculateLogarithmicDistributionDenominator should...', () => {
    it('return the correct denominator value', () => {
      const expected =
        Math.pow(FREQUENCY_DISTRIBUTION.LOG_BASE, FREQUENCY_DISTRIBUTION.EXPONENT_MULTIPLIER) -
        FREQUENCY_DISTRIBUTION.ZERO_POINT_OFFSET;

      expect(calculateLogarithmicDistributionDenominator()).toBeCloseTo(expected, 10);
    });
  });

  describe('calculateLogarithmicIndexRatio', () => {
    it('return 0 for the first index (leftmost bar)', () => {
      expect(calculateLogarithmicIndexRatio(0, 100)).toBe(0);
    });

    it('return 1 for the last index (rightmost bar)', () => {
      expect(calculateLogarithmicIndexRatio(100, 100)).toBe(1);
    });

    it('return 0.5 for the middle index', () => {
      expect(calculateLogarithmicIndexRatio(50, 100)).toBe(0.5);
    });

    it('handle various index and barCount combinations', () => {
      expect(calculateLogarithmicIndexRatio(25, 100)).toBe(0.25);
      expect(calculateLogarithmicIndexRatio(75, 100)).toBe(0.75);
      expect(calculateLogarithmicIndexRatio(10, 40)).toBe(0.25);
    });
  });

  describe('calculateLogarithmicIndex should...', () => {
    const denominator = calculateLogarithmicDistributionDenominator();
    const dataArrayLength = 1024;

    it('map ratio 0 to index 0', () => {
      expect(calculateLogarithmicIndex(0, dataArrayLength, denominator)).toBe(0);
    });

    it('map ratio 1 to the last index', () => {
      expect(calculateLogarithmicIndex(1, dataArrayLength, denominator)).toBe(dataArrayLength - 1);
    });

    it('produce a logarithmic distribution', () => {
      // In a logarithmic distribution, more indices should be allocated to lower frequencies
      // So the mapping should not be linear

      // Check indices at 25%, 50%, and 75% of visual space
      const index25percent = calculateLogarithmicIndex(0.25, dataArrayLength, denominator);
      const index50percent = calculateLogarithmicIndex(0.5, dataArrayLength, denominator);
      const index75percent = calculateLogarithmicIndex(0.75, dataArrayLength, denominator);

      // In a logarithmic distribution, the distance between these indices should not be equal
      // and should increase as we move to higher frequencies
      const distance1 = index25percent; // Distance from 0 to 25%
      const distance2 = index50percent - index25percent; // Distance from 25% to 50%
      const distance3 = index75percent - index50percent; // Distance from 50% to 75%
      const distance4 = dataArrayLength - 1 - index75percent; // Distance from 75% to 100%

      // Each segment should be progressively larger
      expect(distance1).toBeLessThan(distance2);
      expect(distance2).toBeLessThan(distance3);
      expect(distance3).toBeLessThan(distance4);
    });

    it('handle a smaller dataArrayLength', () => {
      const smallArrayLength = 256;
      expect(calculateLogarithmicIndex(0.5, smallArrayLength, denominator)).toBeLessThan(
        smallArrayLength,
      );
      expect(calculateLogarithmicIndex(1, smallArrayLength, denominator)).toBe(
        smallArrayLength - 1,
      );
    });

    it('handle corner cases and extreme values', () => {
      // Handle negative ratios (should clamp to 0)
      expect(calculateLogarithmicIndex(-0.1, dataArrayLength, denominator)).toBe(0);

      // Handle ratios > 1 (should map to last index)
      expect(calculateLogarithmicIndex(1.1, dataArrayLength, denominator)).toBe(
        dataArrayLength - 1,
      );

      // Handle zero-length array (should return 0)
      expect(calculateLogarithmicIndex(0.5, 0, denominator)).toBe(0);
    });
  });

  describe('calculateAmplifiedValue...', () => {
    it('return minHeight for zero input', () => {
      expect(calculateAmplifiedValue(0, 0.1)).toBe(0.1);
    });

    it('return 1 for maximum input regardless of minHeight', () => {
      expect(calculateAmplifiedValue(1, 0)).toBe(1);
      expect(calculateAmplifiedValue(1, 0.1)).toBe(1);
      expect(calculateAmplifiedValue(1, 0.5)).toBe(1);
    });

    it('linearly scale values between minHeight and 1', () => {
      expect(calculateAmplifiedValue(0.5, 0)).toBe(0.5);
      expect(calculateAmplifiedValue(0.5, 0.1)).toBe(0.55);
      expect(calculateAmplifiedValue(0.5, 0.2)).toBe(0.6);
    });

    it('handle edge cases and extreme values', () => {
      // Handle negative normalizedValues (should be treated as 0)
      expect(calculateAmplifiedValue(-0.1, 0.1)).toBe(0.1);

      // Handle values > 1 (should be treated as 1)
      expect(calculateAmplifiedValue(1.5, 0.1)).toBe(1);

      // Handle minHeight = 1 (all values should be 1)
      expect(calculateAmplifiedValue(0.5, 1)).toBe(1);
    });
  });

  describe('calculateFrequencyBandAverage should...', () => {
    it('calculate the average of values in the band', () => {
      const dataArray = new Uint8Array([100, 150, 200, 250]);
      const result = calculateFrequencyBandAverage(dataArray, 0, 3);

      expect(result.rawAverage).toBe((100 + 150 + 200 + 250) / 4);
      expect(result.normalizedValue).toBe(result.rawAverage / 255);
    });

    it('handle empty ranges', () => {
      const dataArray = new Uint8Array([100, 150, 200]);
      const result = calculateFrequencyBandAverage(dataArray, 5, 10);

      expect(result.rawAverage).toBe(0);
      expect(result.normalizedValue).toBe(0);
    });

    it('handle partially out-of-bounds ranges', () => {
      const dataArray = new Uint8Array([100, 150, 200]);
      const result = calculateFrequencyBandAverage(dataArray, 1, 5);

      expect(result.rawAverage).toBe((150 + 200) / 2);
      expect(result.normalizedValue).toBe(result.rawAverage / 255);
    });

    it('handle a single value band', () => {
      const dataArray = new Uint8Array([100, 150, 200]);
      const result = calculateFrequencyBandAverage(dataArray, 1, 1);

      expect(result.rawAverage).toBe(150);
      expect(result.normalizedValue).toBe(150 / 255);
    });

    it('use the provided maxValue for normalization', () => {
      const dataArray = new Uint8Array([50, 100]);
      const result = calculateFrequencyBandAverage(dataArray, 0, 1, 100);

      expect(result.rawAverage).toBe(75);
      expect(result.normalizedValue).toBe(75 / 100);
    });

    it('handle zero and non-zero values', () => {
      const dataArray = new Uint8Array([0, 100, 0, 200]);
      const result = calculateFrequencyBandAverage(dataArray, 0, 3);

      expect(result.rawAverage).toBe(75);
      expect(result.normalizedValue).toBe(75 / 255);
    });
  });
});
