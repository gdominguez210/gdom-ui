import { describe, it, expect } from 'vitest';
import {
  normalizeAudioValue,
  calculateWaveformY,
  calculateAmplitudeRatio,
  calculatePositionRatio,
  calculateSegmentSize,
} from './waveformUtils';

describe('waveformUtils', () => {
  describe('normalizeAudioValue should...', () => {
    it('convert 128 to 0 (center)', () => {
      expect(normalizeAudioValue(128)).toBe(0);
    });

    it('convert 0 to -1 (minimum)', () => {
      expect(normalizeAudioValue(0)).toBe(-1);
    });

    it('convert 255 to 0.99 (rounded to 2 decimal places)', () => {
      // Using exact equality since the function rounds to 2 decimal places
      expect(normalizeAudioValue(255)).toBe(0.99);
    });

    it('convert values proportionally between the range', () => {
      expect(normalizeAudioValue(64)).toBe(-0.5);
      expect(normalizeAudioValue(192)).toBe(0.5);
    });

    it('handle edge cases outside the normal range', () => {
      expect(normalizeAudioValue(-10)).toBe(-1.08);
      expect(normalizeAudioValue(300)).toBe(1.34);
    });
  });

  describe('calculateWaveformY should...', () => {
    it('return the center Y when normalized value is 0', () => {
      const centerY = 100;
      expect(calculateWaveformY(0, centerY)).toBe(centerY);
    });

    it('return top position when normalized value is -1', () => {
      const centerY = 100;
      // Note: In canvas, y=0 is the top, and negative values go upward
      expect(calculateWaveformY(-1, centerY)).toBe(0);
    });

    it('return bottom position when normalized value is 1', () => {
      const centerY = 100;
      expect(calculateWaveformY(1, centerY)).toBe(200);
    });

    it('calculate positions proportionally between center and edges', () => {
      const centerY = 100;
      expect(calculateWaveformY(0.5, centerY)).toBe(150);
      expect(calculateWaveformY(-0.5, centerY)).toBe(50);
    });

    it('handle extreme values', () => {
      const centerY = 100;
      expect(calculateWaveformY(2, centerY)).toBe(300);
      expect(calculateWaveformY(-2, centerY)).toBe(-100);
    });
  });

  describe('calculateAmplitudeRatio should...', () => {
    it('return absolute value of normalized value', () => {
      expect(calculateAmplitudeRatio(0.5)).toBe(0.5);
      expect(calculateAmplitudeRatio(-0.5)).toBe(0.5);
    });

    it('return 0 for center value', () => {
      expect(calculateAmplitudeRatio(0)).toBe(0);
    });

    it('return 1 for maximum amplitude in either direction', () => {
      expect(calculateAmplitudeRatio(1)).toBe(1);
      expect(calculateAmplitudeRatio(-1)).toBe(1);
    });

    it('handle values outside normal range', () => {
      expect(calculateAmplitudeRatio(1.5)).toBe(1.5);
      expect(calculateAmplitudeRatio(-1.5)).toBe(1.5);
    });
  });

  describe('calculatePositionRatio should...', () => {
    it('return 0 for the first segment', () => {
      expect(calculatePositionRatio(0, 100)).toBe(0);
    });

    it('return 1 for the last segment', () => {
      expect(calculatePositionRatio(99, 100)).toBe(0.99);
      expect(calculatePositionRatio(100, 100)).toBe(1);
    });

    it('calculate values proportionally for segments in between', () => {
      expect(calculatePositionRatio(25, 100)).toBe(0.25);
      expect(calculatePositionRatio(50, 100)).toBe(0.5);
      expect(calculatePositionRatio(75, 100)).toBe(0.75);
    });

    it('handle edge cases', () => {
      // When there's only one segment, it should be at position 0
      expect(calculatePositionRatio(0, 1)).toBe(0);

      // For indices beyond the total length
      expect(calculatePositionRatio(150, 100)).toBe(1.5);
    });
  });

  describe('calculateSegmentSize should...', () => {
    it('divide data length by segment count', () => {
      expect(calculateSegmentSize(1000, 100)).toBe(10);
      expect(calculateSegmentSize(500, 50)).toBe(10);
    });

    it('ensure at least 1 data point per segment', () => {
      expect(calculateSegmentSize(10, 20)).toBe(1);
      expect(calculateSegmentSize(5, 10)).toBe(1);
    });

    it('floor the result to ensure whole segments', () => {
      expect(calculateSegmentSize(103, 10)).toBe(10); // Not 10.3
      expect(calculateSegmentSize(55, 20)).toBe(2); // Not 2.75
    });

    it('handle edge cases', () => {
      // Empty data array - should return 1 due to Math.max(1, 0)
      expect(calculateSegmentSize(0, 10)).toBe(1);

      // Single segment
      expect(calculateSegmentSize(100, 1)).toBe(100);

      // Zero segments requested
      expect(calculateSegmentSize(100, 0)).toBe(Infinity);
    });
  });
});
