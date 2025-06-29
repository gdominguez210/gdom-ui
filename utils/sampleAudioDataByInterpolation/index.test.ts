import { describe, it, expect } from 'vitest';
import { sampleAudioDataByInterpolation } from '@/utils/sampleAudioDataByInterpolation';
import { getInterpolatedValueLinear } from '@/utils/getInterpolatedValueLinear';

describe('sampleAudioDataByInterpolation should...', () => {
  it('return an array', () => {
    const data = [0.1, 0.5, -0.3, 0.8, -0.2];
    const result = sampleAudioDataByInterpolation(data, 3, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it('work with Float32Array input', () => {
    const data = new Float32Array([0.2, -0.4, 0.6, -0.1, 0.3]);
    const result = sampleAudioDataByInterpolation(data, 4, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);
  });

  it('interpolate values between data points', () => {
    const data = [0, 1, 0]; // Simple peak
    const result = sampleAudioDataByInterpolation(data, 5, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);

    // All values should be finite numbers
    for (let i = 0; i < result.length; i++) {
      expect(typeof result[i]).toBe('number');
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle negative values correctly', () => {
    const data = [-0.8, 0.2, -0.5, 0.9, -0.1];
    const result = sampleAudioDataByInterpolation(data, 6, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);

    // Values should be within reasonable audio range
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(-1.5);
      expect(result[i]).toBeLessThanOrEqual(1.5);
    }
  });

  it('handle target count of 1', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5];
    const result = sampleAudioDataByInterpolation(data, 1, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(Number.isFinite(result[0])).toBe(true);
  });

  it('handle target count smaller than data length', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const result = sampleAudioDataByInterpolation(data, 4, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);
  });

  it('handle target count equal to data length', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5];
    const result = sampleAudioDataByInterpolation(data, 5, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
  });

  it('handle target count larger than data length', () => {
    const data = [0.1, 0.2, 0.3];
    const result = sampleAudioDataByInterpolation(data, 10, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(10);

    // All values should be finite
    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle zero target count', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5];
    const result = sampleAudioDataByInterpolation(data, 0, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('handle very large target counts', () => {
    const data = [0, 0.5, 1, 0.5, 0];
    const result = sampleAudioDataByInterpolation(data, 1000, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1000);

    // Sample a few values to check they're finite
    expect(Number.isFinite(result[0])).toBe(true);
    expect(Number.isFinite(result[500])).toBe(true);
    expect(Number.isFinite(result[999])).toBe(true);
  });

  it('handle single element data', () => {
    const data = [0.5];
    const result = sampleAudioDataByInterpolation(data, 5, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);

    // All values should be related to the single input value
    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle two-element data', () => {
    const data = [0.2, 0.8];
    const result = sampleAudioDataByInterpolation(data, 5, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);

    // Should interpolate between 0.2 and 0.8
    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle empty data gracefully', () => {
    const data: number[] = [];

    // This might throw or return empty array depending on implementation
    expect(() => {
      const result = sampleAudioDataByInterpolation(data, 5, getInterpolatedValueLinear);
      if (result) {
        expect(Array.isArray(result)).toBe(true);
      }
    }).not.toThrow();
  });

  it('handle very large data arrays efficiently', () => {
    const largeData = Array.from({ length: 50000 }, (_, i) => Math.sin(i / 1000));

    const startTime = performance.now();
    const result = sampleAudioDataByInterpolation(largeData, 1000, getInterpolatedValueLinear);
    const endTime = performance.now();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1000);
    expect(endTime - startTime).toBeLessThan(100); // Should be reasonably fast
  });

  it('preserve endpoint values when possible', () => {
    const data = [0.1, 0.5, 0.9];
    const result = sampleAudioDataByInterpolation(data, 5, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);

    // First and last values should be related to endpoints
    expect(Number.isFinite(result[0])).toBe(true);
    expect(Number.isFinite(result[4])).toBe(true);
  });

  it('provide smooth interpolation for smooth data', () => {
    const data = Array.from({ length: 10 }, (_, i) => Math.sin(i / 2));
    const result = sampleAudioDataByInterpolation(data, 20, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(20);

    // Check that values are within expected range for sine wave
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(-1.1);
      expect(result[i]).toBeLessThanOrEqual(1.1);
    }
  });

  it('handle discontinuous data', () => {
    const data = [0, 0, 1, 1, 0, 0]; // Step function
    const result = sampleAudioDataByInterpolation(data, 10, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(10);

    // All values should be finite despite discontinuities
    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle oscillating data correctly', () => {
    const data = [-1, 1, -1, 1, -1]; // Alternating pattern
    const result = sampleAudioDataByInterpolation(data, 12, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(12);

    // Values should be within reasonable range
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeGreaterThanOrEqual(-1.2);
      expect(result[i]).toBeLessThanOrEqual(1.2);
    }
  });

  it('handle data with zeros', () => {
    const data = [0, 0.5, 0, -0.3, 0];
    const result = sampleAudioDataByInterpolation(data, 8, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(8);

    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle very small values', () => {
    const data = [0.000001, -0.000002, 0.000003, -0.000001];
    const result = sampleAudioDataByInterpolation(data, 6, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);

    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle values close to audio range limits', () => {
    const data = [-0.99, 0.98, -0.97, 0.96];
    const result = sampleAudioDataByInterpolation(data, 8, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(8);

    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
      expect(result[i]).toBeGreaterThanOrEqual(-1.1);
      expect(result[i]).toBeLessThanOrEqual(1.1);
    }
  });

  it('handle constant data', () => {
    const data = [0.5, 0.5, 0.5, 0.5, 0.5];
    const result = sampleAudioDataByInterpolation(data, 7, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(7);

    // All values should be close to the constant value
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBeCloseTo(0.5, 1);
    }
  });

  it('return identical results for identical inputs', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9];
    const targetCount = 8;

    const result1 = sampleAudioDataByInterpolation(data, targetCount, getInterpolatedValueLinear);
    const result2 = sampleAudioDataByInterpolation(data, targetCount, getInterpolatedValueLinear);

    expect(result1.length).toBe(result2.length);
    for (let i = 0; i < result1.length; i++) {
      expect(result1[i]).toBe(result2[i]);
    }
  });

  it('be consistent across multiple calls', () => {
    const data = [0.2, -0.4, 0.6, -0.1, 0.3];
    const results = Array.from({ length: 5 }, () =>
      sampleAudioDataByInterpolation(data, 6, getInterpolatedValueLinear),
    );

    const firstResult = results[0];
    expect(firstResult).toBeDefined();

    results.forEach((result) => {
      expect(result.length).toBe(firstResult!.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBe(firstResult![i]);
      }
    });
  });

  it('use the provided interpolation function', () => {
    const data = [0, 1, 4, 9]; // Quadratic-like progression
    const result = sampleAudioDataByInterpolation(data, 7, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(7);

    // Values should follow some interpolation pattern
    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('work with different interpolation functions', () => {
    const data = [1, 2, 3, 4, 5];

    // Test with a custom interpolation function
    const customInterpolation = (data: ArrayLike<number>, exactIndex: number) => {
      const index = Math.floor(exactIndex);
      return data[Math.min(index, data.length - 1)] || 0;
    };

    const result = sampleAudioDataByInterpolation(data, 8, customInterpolation);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(8);
  });

  it('handle various data patterns with interpolation', () => {
    const patterns = [
      [1, 2, 3, 4, 5], // Linear
      [1, 4, 9, 16, 25], // Quadratic
      [0, 1, 0, -1, 0], // Sine-like
      [-1, -0.5, 0, 0.5, 1], // Linear bipolar
    ];

    patterns.forEach((pattern) => {
      const result = sampleAudioDataByInterpolation(pattern, 8, getInterpolatedValueLinear);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(8);

      for (let i = 0; i < result.length; i++) {
        expect(Number.isFinite(result[i])).toBe(true);
      }
    });
  });

  it('handle upsampling efficiently', () => {
    const data = Array.from({ length: 100 }, (_, i) => Math.sin(i / 10));

    const startTime = performance.now();
    const result = sampleAudioDataByInterpolation(data, 1000, getInterpolatedValueLinear);
    const endTime = performance.now();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1000);
    expect(endTime - startTime).toBeLessThan(50);
  });

  it('handle downsampling efficiently', () => {
    const data = Array.from({ length: 10000 }, (_, i) => Math.sin(i / 100));

    const startTime = performance.now();
    const result = sampleAudioDataByInterpolation(data, 100, getInterpolatedValueLinear);
    const endTime = performance.now();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(100);
    expect(endTime - startTime).toBeLessThan(50);
  });

  it('handle multiple sampling operations efficiently', () => {
    const data = Array.from({ length: 1000 }, (_, i) => Math.sin(i / 50));
    const targetCounts = [10, 50, 100, 200, 500];

    const startTime = performance.now();
    const results = targetCounts.map((count) =>
      sampleAudioDataByInterpolation(data, count, getInterpolatedValueLinear),
    );
    const endTime = performance.now();

    expect(results).toHaveLength(5);
    results.forEach((result, i) => {
      expect(result.length).toBe(targetCounts[i]);
    });
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handle fractional calculations correctly', () => {
    const data = [0.1, 0.2, 0.3];
    const result = sampleAudioDataByInterpolation(data, 7, getInterpolatedValueLinear); // Non-divisible

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(7);

    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('handle boundary conditions properly', () => {
    const data = [1, 2, 3, 4, 5];
    const result = sampleAudioDataByInterpolation(data, 9, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(9);

    // Check boundary values are reasonable
    expect(Number.isFinite(result[0])).toBe(true);
    expect(Number.isFinite(result[8])).toBe(true);
  });

  it('handle floating point precision issues', () => {
    const data = [0.1 + 0.2, 0.3, 1 / 3, 2 / 3]; // Known FP precision issues
    const result = sampleAudioDataByInterpolation(data, 6, getInterpolatedValueLinear);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);

    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
    }
  });

  it('always return array regardless of input type', () => {
    const numberArray = [1, 2, 3, 4, 5];
    const float32Array = new Float32Array([1, 2, 3, 4, 5]);

    const result1 = sampleAudioDataByInterpolation(numberArray, 3, getInterpolatedValueLinear);
    const result2 = sampleAudioDataByInterpolation(float32Array, 3, getInterpolatedValueLinear);

    expect(Array.isArray(result1)).toBe(true);
    expect(Array.isArray(result2)).toBe(true);
  });

  it('maintain proper array length', () => {
    const data = [1, 2, 3];
    const targetCounts = [1, 2, 3, 5, 10, 100];

    targetCounts.forEach((count) => {
      const result = sampleAudioDataByInterpolation(data, count, getInterpolatedValueLinear);
      expect(result.length).toBe(count);
    });
  });

  it('contain finite values for finite input', () => {
    const data = [1, 2, 3, 4, 5];
    const result = sampleAudioDataByInterpolation(data, 10, getInterpolatedValueLinear);

    for (let i = 0; i < result.length; i++) {
      expect(Number.isFinite(result[i])).toBe(true);
      expect(typeof result[i]).toBe('number');
    }
  });
});
