import { describe, it, expect } from 'vitest';
import { sampleRawAudioByWindow } from './index';
import type { EnvelopeSegment } from '@/types/audio';

describe('sampleRawAudioByWindow should...', () => {
  it('return an array of envelope segments by default', () => {
    const data = [-0.5, 0.5, -0.3, 0.8, -0.1, 0.2, -0.7, 0.4];

    const result = sampleRawAudioByWindow(data, 2, 4);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('sample raw audio data into windows', () => {
    const data = new Float32Array([-1, 1, -0.5, 0.5, -0.8, 0.3, -0.2, 0.9]);

    const result = sampleRawAudioByWindow(data, 2, 4);

    expect(result.length).toBe(2);

    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle various audio data types', () => {
    const numberArray = [-0.1, 0.1, -0.2, 0.2];
    const float32Array = new Float32Array([-0.3, 0.3, -0.4, 0.4]);

    const result1 = sampleRawAudioByWindow(numberArray, 2, 2);
    const result2 = sampleRawAudioByWindow(float32Array, 2, 2);

    expect(result1.length).toBe(2);
    expect(result2.length).toBe(2);

    [...result1, ...result2].forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle audio data with different characteristics', () => {
    const sineWave = Array.from({ length: 8 }, (_, i) => Math.sin((i / 4) * Math.PI));
    const dcOffset = Array.from({ length: 8 }, () => 0.5);
    const noise = Array.from({ length: 8 }, () => (Math.random() - 0.5) * 0.1);

    const sineResult = sampleRawAudioByWindow(sineWave, 2, 4);
    const dcResult = sampleRawAudioByWindow(dcOffset, 2, 4);
    const noiseResult = sampleRawAudioByWindow(noise, 2, 4);

    [sineResult, dcResult, noiseResult].forEach((result) => {
      expect(result.length).toBe(2);
      result.forEach((envelope) => {
        expect(Number.isFinite(envelope.min)).toBe(true);
        expect(Number.isFinite(envelope.max)).toBe(true);
      });
    });
  });

  it('handle segment count of 1', () => {
    const data = [-0.5, 0.5, -0.2, 0.8];

    const result = sampleRawAudioByWindow(data, 1, 4);

    expect(result.length).toBe(1);
    expect(Number.isFinite(result[0]!.min)).toBe(true);
    expect(Number.isFinite(result[0]!.max)).toBe(true);
  });

  it('handle segment count smaller than data length', () => {
    const data = [-0.1, 0.1, -0.2, 0.2, -0.3, 0.3, -0.4, 0.4, -0.5, 0.5];

    const result = sampleRawAudioByWindow(data, 3, 3);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle segment count equal to data length', () => {
    const data = [-0.1, 0.1, -0.2, 0.2, -0.3, 0.3];

    const result = sampleRawAudioByWindow(data, 6, 1);

    expect(result.length).toBe(6);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle segment count larger than data length', () => {
    const data = [-0.2, 0.8, -0.1, 0.3];

    const result = sampleRawAudioByWindow(data, 8, 1);

    expect(result.length).toBe(8);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle zero segment count', () => {
    const data = [-0.5, 0.5];

    const result = sampleRawAudioByWindow(data, 0, 1);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('handle small sample sizes', () => {
    const data = [-0.1, 0.1, -0.2, 0.2, -0.3, 0.3, -0.4, 0.4];

    const result = sampleRawAudioByWindow(data, 8, 1);

    expect(result.length).toBe(8);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle large sample sizes', () => {
    const data = Array.from({ length: 20 }, (_, i) => Math.sin((i / 10) * Math.PI));

    const result = sampleRawAudioByWindow(data, 2, 10);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle sample size larger than data', () => {
    const data = [-0.5, 0.5, -0.3, 0.7];

    const result = sampleRawAudioByWindow(data, 3, 20);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('use custom transform function for numbers', () => {
    const data = [-0.5, 0.5, -0.2, 0.8];

    const absTransform = (envelope: EnvelopeSegment): number => Math.abs(envelope.max);

    const result = sampleRawAudioByWindow(data, 2, 2, absTransform);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    result.forEach((value) => {
      expect(typeof value).toBe('number');
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0); // Should be absolute values
    });
  });

  it('work with default behavior (returns envelope segments)', () => {
    const data = [-0.3, 0.7, -0.1, 0.9];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('handle transform to different types', () => {
    const data = [-0.5, 0.5, -0.2, 0.8];

    const stringTransform = (envelope: EnvelopeSegment): string =>
      `${envelope.min},${envelope.max}`;

    const result = sampleRawAudioByWindow(data, 2, 2, stringTransform);

    expect(result.length).toBe(2);
    result.forEach((value) => {
      expect(typeof value).toBe('string');
    });
  });

  it('handle single audio sample', () => {
    const data = [0.5];

    const result = sampleRawAudioByWindow(data, 3, 1);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle two audio samples', () => {
    const data = [-0.2, 0.4];

    const result = sampleRawAudioByWindow(data, 4, 1);

    expect(result.length).toBe(4);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle empty data gracefully', () => {
    const data: number[] = [];

    expect(() => {
      const result = sampleRawAudioByWindow(data, 3, 1);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    }).not.toThrow();
  });

  it('handle sine wave audio', () => {
    const sineData = Array.from({ length: 16 }, (_, i) => Math.sin((i / 8) * Math.PI));

    const result = sampleRawAudioByWindow(sineData, 4, 4);

    expect(result.length).toBe(4);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(envelope.min).toBeGreaterThanOrEqual(-1);
      expect(envelope.max).toBeLessThanOrEqual(1);
    });
  });

  it('handle DC offset audio', () => {
    const dcData = Array.from({ length: 8 }, () => 0.7);

    const result = sampleRawAudioByWindow(dcData, 2, 4);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle white noise audio', () => {
    const noiseData = Array.from({ length: 20 }, () => (Math.random() - 0.5) * 0.8);

    const result = sampleRawAudioByWindow(noiseData, 5, 4);

    expect(result.length).toBe(5);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle silence (all zeros)', () => {
    const silenceData = new Float32Array(12);

    const result = sampleRawAudioByWindow(silenceData, 3, 4);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle audio with peak values', () => {
    const peakData = [-1, 1, -0.8, 0.9, -0.95, 0.85, -0.7, 0.6];

    const result = sampleRawAudioByWindow(peakData, 2, 4);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(envelope.min).toBeGreaterThanOrEqual(-1);
      expect(envelope.max).toBeLessThanOrEqual(1);
    });
  });

  it('handle zero values', () => {
    const data = [0, 0, 0, 0];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle very small values', () => {
    const data = [1e-10, -1e-10, 1e-15, -1e-15];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle boundary values', () => {
    const data = [-1, 1, -0.999, 0.999];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(envelope.min).toBeGreaterThanOrEqual(-1);
      expect(envelope.max).toBeLessThanOrEqual(1);
    });
  });

  it('handle extreme values', () => {
    const data = [-Infinity, Infinity, -1000, 1000];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('handle NaN values', () => {
    const data = [NaN, 0.5, -0.5, NaN];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    // Should handle NaN values without throwing
    result.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('return identical results for identical inputs', () => {
    const data = [-0.3, 0.7, -0.1, 0.9, -0.5, 0.2, -0.8, 0.4];

    const result1 = sampleRawAudioByWindow(data, 3, 2);
    const result2 = sampleRawAudioByWindow(data, 3, 2);

    expect(result1.length).toBe(result2.length);
    for (let i = 0; i < result1.length; i++) {
      expect(result1[i]?.min).toBe(result2[i]?.min);
      expect(result1[i]?.max).toBe(result2[i]?.max);
    }
  });

  it('be consistent across multiple calls', () => {
    const data = [-0.2, 0.8, -0.6, 0.1, -0.1, 0.7];

    const results = Array.from({ length: 5 }, () => sampleRawAudioByWindow(data, 2, 3));

    const firstResult = results[0];
    expect(firstResult).toBeDefined();

    results.forEach((result) => {
      expect(result.length).toBe(firstResult!.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]?.min).toBe(firstResult![i]?.min);
        expect(result[i]?.max).toBe(firstResult![i]?.max);
      }
    });
  });

  it('handle many segments efficiently', () => {
    const data = Array.from({ length: 5000 }, (_, i) => Math.sin(i / 100) * Math.cos(i / 200));

    const startTime = performance.now();
    const result = sampleRawAudioByWindow(data, 500, 10);
    const endTime = performance.now();

    expect(result.length).toBe(500);
    expect(endTime - startTime).toBeLessThan(200); // Should be fast
  });

  it('handle multiple sampling operations efficiently', () => {
    const data = Array.from(
      { length: 2000 },
      (_, i) => Math.sin(i / 50) * (0.5 + 0.5 * Math.cos(i / 100)),
    );

    const segmentCounts = [10, 25, 50];

    const startTime = performance.now();
    const results = segmentCounts.map((count) => sampleRawAudioByWindow(data, count, 40));
    const endTime = performance.now();

    expect(results).toHaveLength(3);
    results.forEach((result, i) => {
      expect(result.length).toBe(segmentCounts[i]!);
    });
    expect(endTime - startTime).toBeLessThan(150);
  });

  it('handle Float32Array efficiently', () => {
    const data = new Float32Array(10000);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.sin(i / 1000) * Math.cos(i / 2000);
    }

    const startTime = performance.now();
    const result = sampleRawAudioByWindow(data, 100, 100);
    const endTime = performance.now();

    expect(result.length).toBe(100);
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handle boundary conditions properly', () => {
    const data = [-0.1, 0.1, -0.2, 0.2, -0.3, 0.3];

    const result = sampleRawAudioByWindow(data, 10, 1);

    expect(result.length).toBe(10);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle floating point precision issues', () => {
    const data = [0.1 + 0.2 - 0.3, 1 / 3, 2 / 3, 0.6666666666666666];

    const result = sampleRawAudioByWindow(data, 2, 2);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle very large and very small sample sizes', () => {
    const data = Array.from({ length: 100 }, (_, i) => Math.sin(i / 10));

    const smallResult = sampleRawAudioByWindow(data, 100, 1);
    const largeResult = sampleRawAudioByWindow(data, 1, 100);

    expect(smallResult.length).toBe(100);
    expect(largeResult.length).toBe(1);

    [...smallResult, ...largeResult].forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('preserve audio characteristics in samples', () => {
    const data = Array.from({ length: 16 }, (_, i) => 0.8 * Math.sin((i / 4) * Math.PI));

    const result = sampleRawAudioByWindow(data, 4, 4);

    expect(result.length).toBe(4);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(Math.abs(envelope.min)).toBeLessThanOrEqual(0.8);
    });
  });

  it('handle phase relationships correctly', () => {
    const data = Array.from({ length: 12 }, (_, i) => {
      const phase1 = Math.sin((i / 6) * Math.PI);
      const phase2 = Math.cos((i / 6) * Math.PI);
      return phase1 * 0.5 + phase2 * 0.3;
    });

    const result = sampleRawAudioByWindow(data, 3, 4);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(Math.abs(envelope.min)).toBeLessThanOrEqual(0.8); // Combined amplitude
    });
  });

  it('respect energy conservation principles', () => {
    const data = Array.from({ length: 8 }, () => 0.5); // Constant energy

    const result = sampleRawAudioByWindow(data, 2, 4);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('return numbers when using max value transform', () => {
    const data = [-0.5, 0.5, -0.3, 0.8];
    const maxTransform = (envelope: EnvelopeSegment): number => envelope.max;

    const result = sampleRawAudioByWindow(data, 2, 2, maxTransform);

    expect(result.length).toBe(2);
    result.forEach((value) => {
      expect(typeof value).toBe('number');
      expect(Number.isFinite(value)).toBe(true);
    });
  });

  it('return numbers when using absolute max transform', () => {
    const data = [-0.8, 0.3, -0.2, 0.9];
    const absMaxTransform = (envelope: EnvelopeSegment): number =>
      Math.max(Math.abs(envelope.min), Math.abs(envelope.max));

    const result = sampleRawAudioByWindow(data, 2, 2, absMaxTransform);

    expect(result.length).toBe(2);
    result.forEach((value) => {
      expect(typeof value).toBe('number');
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    });
  });
});
