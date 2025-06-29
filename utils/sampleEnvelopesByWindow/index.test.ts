import { describe, it, expect } from 'vitest';
import { sampleEnvelopesByWindow } from '@/utils/sampleEnvelopesByWindow';
import type { EnvelopeSegment } from '@/types/audio';

describe('sampleEnvelopesByWindow should...', () => {
  it('return an array of envelope segments', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.5, max: 0.5 },
      { min: -0.3, max: 0.8 },
      { min: -0.1, max: 0.2 },
      { min: -0.7, max: 0.4 },
    ];

    const result = sampleEnvelopesByWindow(data, 2, 2);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('sample envelope segments into windows', () => {
    const data: EnvelopeSegment[] = [
      { min: -1, max: 1 },
      { min: -0.5, max: 0.5 },
      { min: -0.8, max: 0.3 },
      { min: -0.2, max: 0.9 },
    ];

    const result = sampleEnvelopesByWindow(data, 2, 2);

    expect(result.length).toBe(2);

    // Each result should be an envelope containing min/max from the window
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
    });
  });

  it('handle envelope data with varying ranges', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.1, max: 0.1 }, // Small range
      { min: -0.9, max: 0.9 }, // Large range
      { min: 0.2, max: 0.3 }, // Positive only
      { min: -0.5, max: -0.2 }, // Negative only
    ];

    const result = sampleEnvelopesByWindow(data, 2, 2);

    expect(result.length).toBe(2);

    result.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('maintain envelope semantics (min <= max)', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.8, max: -0.2 },
      { min: 0.1, max: 0.7 },
      { min: -0.3, max: 0.5 },
      { min: -0.6, max: 0.1 },
    ];

    const result = sampleEnvelopesByWindow(data, 3, 1);

    result.forEach((envelope) => {
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
    });
  });

  it('handle window count of 1', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.5, max: 0.5 },
      { min: -0.2, max: 0.8 },
    ];

    const result = sampleEnvelopesByWindow(data, 1, 2);

    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('min');
    expect(result[0]).toHaveProperty('max');
  });

  it('handle window count smaller than data length', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.1, max: 0.1 },
      { min: -0.2, max: 0.2 },
      { min: -0.3, max: 0.3 },
      { min: -0.4, max: 0.4 },
      { min: -0.5, max: 0.5 },
    ];

    const result = sampleEnvelopesByWindow(data, 3, 1);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle window count equal to data length', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.1, max: 0.1 },
      { min: -0.2, max: 0.2 },
      { min: -0.3, max: 0.3 },
    ];

    const result = sampleEnvelopesByWindow(data, 3, 1);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle window count larger than data length', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.2, max: 0.8 },
      { min: -0.1, max: 0.3 },
    ];

    const result = sampleEnvelopesByWindow(data, 5, 1);

    expect(result.length).toBe(5);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle zero window count', () => {
    const data: EnvelopeSegment[] = [{ min: -0.5, max: 0.5 }];

    const result = sampleEnvelopesByWindow(data, 0, 1);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('handle small sample sizes', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.1, max: 0.1 },
      { min: -0.2, max: 0.2 },
      { min: -0.3, max: 0.3 },
      { min: -0.4, max: 0.4 },
    ];

    const result = sampleEnvelopesByWindow(data, 4, 1);

    expect(result.length).toBe(4);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle large sample sizes', () => {
    const data: EnvelopeSegment[] = Array.from({ length: 10 }, (_, i) => ({
      min: -i * 0.1,
      max: i * 0.1,
    }));

    const result = sampleEnvelopesByWindow(data, 2, 5);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle sample size larger than data', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.5, max: 0.5 },
      { min: -0.3, max: 0.7 },
    ];

    const result = sampleEnvelopesByWindow(data, 3, 10);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('use custom transform function', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.5, max: 0.5 },
      { min: -0.2, max: 0.8 },
    ];

    const rangeTransform = (envelope: EnvelopeSegment): number => envelope.max - envelope.min;

    const result = sampleEnvelopesByWindow(data, 2, 1, rangeTransform);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    result.forEach((range) => {
      expect(typeof range).toBe('number');
      expect(Number.isFinite(range)).toBe(true);
      expect(range).toBeGreaterThanOrEqual(0); // Range should be non-negative
    });
  });

  it('work with default transform (envelope)', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.3, max: 0.7 },
      { min: -0.1, max: 0.9 },
    ];

    const result = sampleEnvelopesByWindow(data, 2, 1);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(envelope).toHaveProperty('min');
      expect(envelope).toHaveProperty('max');
    });
  });

  it('handle single envelope segment', () => {
    const data: EnvelopeSegment[] = [{ min: -0.5, max: 0.8 }];

    const result = sampleEnvelopesByWindow(data, 3, 1);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle two envelope segments', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.2, max: 0.4 },
      { min: -0.8, max: 0.1 },
    ];

    const result = sampleEnvelopesByWindow(data, 4, 1);

    expect(result.length).toBe(4);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('handle empty data gracefully', () => {
    const data: EnvelopeSegment[] = [];

    expect(() => {
      const result = sampleEnvelopesByWindow(data, 3, 1);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    }).not.toThrow();
  });

  it('handle very large envelope arrays efficiently', () => {
    const largeData: EnvelopeSegment[] = Array.from({ length: 10000 }, (_, i) => ({
      min: -Math.sin(i / 1000),
      max: Math.cos(i / 1000),
    }));

    const startTime = performance.now();
    const result = sampleEnvelopesByWindow(largeData, 100, 100);
    const endTime = performance.now();

    expect(result.length).toBe(100);
    expect(endTime - startTime).toBeLessThan(200); // Should be reasonably fast
  });

  it('produce valid envelopes from envelope data', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.8, max: -0.2 },
      { min: -0.1, max: 0.5 },
      { min: 0.2, max: 0.9 },
      { min: -0.3, max: 0.1 },
    ];

    const result = sampleEnvelopesByWindow(data, 2, 2);

    result.forEach((envelope) => {
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
      expect(envelope.min).toBeGreaterThanOrEqual(-1);
      expect(envelope.max).toBeLessThanOrEqual(1);
    });
  });

  it('handle envelopes with extreme values', () => {
    const data: EnvelopeSegment[] = [
      { min: -Infinity, max: Infinity },
      { min: -1000, max: 1000 },
      { min: -0.001, max: 0.001 },
    ];

    const result = sampleEnvelopesByWindow(data, 3, 1);

    expect(result.length).toBe(3);
    result.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('handle envelopes with NaN values', () => {
    const data: EnvelopeSegment[] = [
      { min: NaN, max: 0.5 },
      { min: -0.5, max: NaN },
      { min: 0.1, max: 0.3 },
    ];

    const result = sampleEnvelopesByWindow(data, 2, 1);

    expect(result.length).toBe(2);
    // Should handle NaN values without throwing
    result.forEach((envelope) => {
      expect(typeof envelope.min).toBe('number');
      expect(typeof envelope.max).toBe('number');
    });
  });

  it('return identical results for identical inputs', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.3, max: 0.7 },
      { min: -0.1, max: 0.9 },
      { min: -0.5, max: 0.2 },
      { min: -0.8, max: 0.4 },
    ];

    const result1 = sampleEnvelopesByWindow(data, 3, 1);
    const result2 = sampleEnvelopesByWindow(data, 3, 1);

    expect(result1.length).toBe(result2.length);
    for (let i = 0; i < result1.length; i++) {
      expect(result1[i]?.min).toBe(result2[i]?.min);
      expect(result1[i]?.max).toBe(result2[i]?.max);
    }
  });

  it('be consistent across multiple calls', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.2, max: 0.8 },
      { min: -0.6, max: 0.1 },
      { min: -0.1, max: 0.7 },
    ];

    const results = Array.from({ length: 5 }, () => sampleEnvelopesByWindow(data, 2, 1));

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

  it('handle many windows efficiently', () => {
    const data: EnvelopeSegment[] = Array.from({ length: 1000 }, () => ({
      min: -Math.random(),
      max: Math.random(),
    }));

    const startTime = performance.now();
    const result = sampleEnvelopesByWindow(data, 100, 10);
    const endTime = performance.now();

    expect(result.length).toBe(100);
    expect(endTime - startTime).toBeLessThan(100); // Should be fast
  });

  it('handle multiple sampling operations efficiently', () => {
    const data: EnvelopeSegment[] = Array.from({ length: 500 }, (_, i) => ({
      min: -0.5 + (i % 10) * 0.1,
      max: 0.5 - (i % 10) * 0.05,
    }));

    const windowCounts = [10, 25, 50];

    const startTime = performance.now();
    const results = windowCounts.map((count) => sampleEnvelopesByWindow(data, count, 10));
    const endTime = performance.now();

    expect(results).toHaveLength(3);
    results.forEach((result, i) => {
      expect(result.length).toBe(windowCounts[i]!);
    });
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handle boundary conditions properly', () => {
    const data: EnvelopeSegment[] = [
      { min: -0.1, max: 0.1 },
      { min: -0.2, max: 0.2 },
      { min: -0.3, max: 0.3 },
    ];

    const result = sampleEnvelopesByWindow(data, 5, 1);

    expect(result.length).toBe(5);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
    });
  });

  it('handle floating point precision issues', () => {
    const data: EnvelopeSegment[] = [
      { min: 0.1 + 0.2 - 0.3, max: 1 / 3 },
      { min: 2 / 3, max: 0.6666666666666666 },
    ];

    const result = sampleEnvelopesByWindow(data, 2, 1);

    expect(result.length).toBe(2);
    result.forEach((envelope) => {
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });

  it('sample different sections of envelope data', () => {
    const data: EnvelopeSegment[] = [
      { min: -1, max: 1 }, // Section 1
      { min: -0.8, max: 0.8 }, // Section 1
      { min: -0.5, max: 0.5 }, // Section 2
      { min: -0.3, max: 0.3 }, // Section 2
      { min: -0.1, max: 0.1 }, // Section 3
      { min: 0, max: 0.2 }, // Section 3
    ];

    const result = sampleEnvelopesByWindow(data, 3, 2);

    expect(result.length).toBe(3);

    // Each window should capture different characteristics
    result.forEach((envelope) => {
      expect(envelope.min).toBeLessThanOrEqual(envelope.max);
      expect(Number.isFinite(envelope.min)).toBe(true);
      expect(Number.isFinite(envelope.max)).toBe(true);
    });
  });
});
