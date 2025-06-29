import { describe, it, expect } from 'vitest';
import { sampleAudioDataByWindow } from '@/utils/sampleAudioDataByWindow';
import type { EnvelopeSegment } from '@/types/audio';

describe('sampleAudioDataByWindow should...', () => {
  const createSamplePositionFn = (data: ArrayLike<number>) => {
    return (pos: number): number[] => {
      const clampedPos = Math.max(0, Math.min(pos, data.length - 1));
      return [data[clampedPos] || 0];
    };
  };

  const maxValueTransform = (envelope: EnvelopeSegment): number => envelope.max;

  it('return an array of results', () => {
    const data = [0.1, 0.5, -0.3, 0.8, -0.2, 0.4, -0.1, 0.7];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 4, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);
  });

  it('work with Float32Array input', () => {
    const data = new Float32Array([0.2, -0.4, 0.6, -0.1, 0.3, 0.8, -0.5, 0.1]);
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it('sample data into windows with envelopes', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 4, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('handle negative values correctly', () => {
    const data = [-0.8, 0.2, -0.5, 0.9, -0.1, 0.6, -0.3, 0.4];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    result.forEach((envelope) => {
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
      expect(envelope.min).toBeGreaterThanOrEqual(-1);
      expect(envelope.max).toBeLessThanOrEqual(1);
    });
  });

  it('handle window count of 1', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 1, 5, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('min');
    expect(result[0]).toHaveProperty('max');
  });

  it('handle window count smaller than data length', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it('handle window count equal to data length', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 5, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
  });

  it('handle window count larger than data length', () => {
    const data = [0.1, 0.2, 0.3];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 6, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle zero window count', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 0, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('handle small sample sizes', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 4, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);
  });

  it('handle large sample sizes', () => {
    const data = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 2, 4, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('handle sample size larger than data', () => {
    const data = [0.1, 0.2, 0.3];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 2, 10, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('use custom transform function', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 4, 2, samplePositionFn, maxValueTransform);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);

    result.forEach((value) => {
      expect(typeof value).toBe('number');
      expect(Number.isFinite(value)).toBe(true);
    });
  });

  it('work with default transform (envelope)', () => {
    const data = [1, 2, 3, 4];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 2, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
    });
  });

  it('handle single element data', () => {
    const data = [0.5];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle two-element data', () => {
    const data = [0.2, 0.8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 4, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);

    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle empty data gracefully', () => {
    const data: number[] = [];
    const samplePositionFn = createSamplePositionFn(data);

    expect(() => {
      const result = sampleAudioDataByWindow(data, 3, 1, samplePositionFn);
      if (result) {
        expect(Array.isArray(result)).toBe(true);
      }
    }).not.toThrow();
  });

  it('produce valid envelopes', () => {
    const data = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 4, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    result.forEach((envelope) => {
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
      expect(envelope.min).toBeGreaterThanOrEqual(1);
      expect(envelope.max).toBeLessThanOrEqual(3);
    });
  });

  it('handle data with peaks and valleys', () => {
    const data = [0, 1, 0, -1, 0, 1, 0, -1, 0];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 3, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    result.forEach((envelope) => {
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
      expect(envelope.min).toBeGreaterThanOrEqual(-1.1);
      expect(envelope.max).toBeLessThanOrEqual(1.1);
    });
  });

  it('return identical results for identical inputs', () => {
    const data = [0.1, 0.3, 0.5, 0.7, 0.9, 0.2, 0.4, 0.6];
    const samplePositionFn = createSamplePositionFn(data);

    const result1 = sampleAudioDataByWindow(data, 4, 2, samplePositionFn);
    const result2 = sampleAudioDataByWindow(data, 4, 2, samplePositionFn);

    expect(result1.length).toBe(result2.length);
    for (let i = 0; i < result1.length; i++) {
      expect(result1[i]).toBeDefined();
      expect(result2[i]).toBeDefined();
      expect(result1[i]!.min).toBe(result2[i]!.min);
      expect(result1[i]!.max).toBe(result2[i]!.max);
    }
  });

  it('be consistent across multiple calls', () => {
    const data = [0.2, -0.4, 0.6, -0.1, 0.3, 0.8, -0.5, 0.1];
    const samplePositionFn = createSamplePositionFn(data);
    const results = Array.from({ length: 5 }, () =>
      sampleAudioDataByWindow(data, 4, 2, samplePositionFn),
    );

    const firstResult = results[0];
    expect(firstResult).toBeDefined();

    results.forEach((result) => {
      expect(result.length).toBe(firstResult!.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBeDefined();
        expect(firstResult![i]).toBeDefined();
        expect(result[i]!.min).toBe(firstResult![i]!.min);
        expect(result[i]!.max).toBe(firstResult![i]!.max);
      }
    });
  });

  it('handle many windows efficiently', () => {
    const data = Array.from({ length: 1000 }, (_, i) => Math.sin(i / 50));
    const samplePositionFn = createSamplePositionFn(data);

    const startTime = performance.now();
    const result = sampleAudioDataByWindow(data, 100, 10, samplePositionFn);
    const endTime = performance.now();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(100);
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handle multiple sampling operations efficiently', () => {
    const data = Array.from({ length: 1000 }, (_, i) => Math.sin(i / 20));
    const samplePositionFn = createSamplePositionFn(data);
    const windowCounts = [10, 20, 50, 100];

    const startTime = performance.now();
    const results = windowCounts.map((count) =>
      sampleAudioDataByWindow(data, count, 10, samplePositionFn),
    );
    const endTime = performance.now();

    expect(results).toHaveLength(4);
    results.forEach((result, i) => {
      expect(result.length).toBe(windowCounts[i]);
    });
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handle boundary conditions properly', () => {
    const data = [1, 2, 3, 4, 5];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 7, 1, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(7);

    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
    });
  });

  it('handle floating point precision issues', () => {
    const data = [0.1 + 0.2, 0.3, 1 / 3, 2 / 3, 0.7, 0.8];
    const samplePositionFn = createSamplePositionFn(data);
    const result = sampleAudioDataByWindow(data, 3, 2, samplePositionFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('work with different sample position functions', () => {
    const data = [1, 2, 3, 4, 5];

    // Custom function that returns multiple samples
    const multiSampleFn = (pos: number): number[] => {
      const index = Math.floor(pos);
      return [
        data[Math.max(0, index - 1)] || 0,
        data[index] || 0,
        data[Math.min(data.length - 1, index + 1)] || 0,
      ];
    };

    const result = sampleAudioDataByWindow(data, 3, 1, multiSampleFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
    });
  });

  it('handle sample position function returning empty arrays', () => {
    const data = [1, 2, 3, 4, 5];
    const emptySampleFn = (): number[] => [];

    const result = sampleAudioDataByWindow(data, 3, 1, emptySampleFn);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });
});
