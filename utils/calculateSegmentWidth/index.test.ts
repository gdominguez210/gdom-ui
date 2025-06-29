import { describe, it, expect } from 'vitest';
import { calculateSegmentWidth } from './index';

describe('calculateSegmentWidth should...', () => {
  it('calculate segment width when segments fit exactly', () => {
    // 1000px display, 10 segments, 10px min width, no gaps
    const result = calculateSegmentWidth(1000, 10, 10, 0);
    expect(result.segmentWidth).toBe(100); // 1000 / 10 = 100px per segment
    expect(result.actualSegmentCount).toBe(10);
    expect(result.remainingPixels).toBe(0); // 1000 - (10 * 100) = 0
  });

  it('calculate segment width with fractional raw width', () => {
    // 1000px display, 7 segments, 10px min width, no gaps
    const result = calculateSegmentWidth(1000, 7, 10, 0);
    expect(result.segmentWidth).toBe(142); // Math.floor(1000 / 7) = Math.floor(142.857) = 142
    expect(result.actualSegmentCount).toBe(7); // Math.floor(1000 / 142) = 7
    expect(result.remainingPixels).toBe(6); // 1000 - (7 * 142) = 1000 - 994 = 6
  });

  it('enforce minimum segment width', () => {
    // 100px display, 20 segments, 10px min width, no gaps
    const result = calculateSegmentWidth(100, 20, 10, 0);
    expect(result.segmentWidth).toBe(10); // Math.max(10, Math.floor(100/20)) = Math.max(10, 5) = 10
    expect(result.actualSegmentCount).toBe(10); // Math.floor(100 / 10) = 10
    expect(result.remainingPixels).toBe(0); // 100 - (10 * 10) = 0
  });

  it('calculate segment width accounting for gaps', () => {
    // 1000px display, 10 segments, 10px min width, 5px gaps
    // Total gap width: (10 - 1) * 5 = 45px
    // Available for bars: 1000 - 45 = 955px
    // Raw segment width: 955 / 10 = 95.5px -> 95px
    const result = calculateSegmentWidth(1000, 10, 10, 5);
    expect(result.segmentWidth).toBe(95);
    expect(result.actualSegmentCount).toBe(10); // Math.floor(955 / 95) = 10
    expect(result.remainingPixels).toBe(5); // 1000 - (10 * 95 + 9 * 5) = 1000 - (950 + 45) = 5
  });

  it('handle large gaps reducing segment count', () => {
    // 100px display, 10 segments, 5px min width, 20px gaps
    // After clamping: effectiveDisplayWidth=100, effectiveSegmentCount=10, effectiveMinSegmentWidth=5, effectiveGapWidth=20
    // Total gap width: (10 - 1) * 20 = 180px
    // Available for bars: 100 - 180 = -80px (negative!)
    // Raw segment width: -80 / 10 = -8px, clamped to min 5px
    // Actual segments: Math.max(0, Math.floor(-80 / 5)) = Math.max(0, -16) = 0
    // With 0 segments, there are 0 gaps, so usedWidth = 0 * 5 + 0 * 20 = 0
    const result = calculateSegmentWidth(100, 10, 5, 20);
    expect(result.segmentWidth).toBe(5); // Enforced minimum
    expect(result.actualSegmentCount).toBe(0); // Clamped to 0
    expect(result.remainingPixels).toBe(100); // 100 - 0 = 100
  });

  it('calculate correctly when gaps are smaller than segment width', () => {
    // 1000px display, 5 segments, 20px min width, 10px gaps
    // Total gap width: (5 - 1) * 10 = 40px
    // Available for bars: 1000 - 40 = 960px
    // Raw segment width: 960 / 5 = 192px
    const result = calculateSegmentWidth(1000, 5, 20, 10);
    expect(result.segmentWidth).toBe(192);
    expect(result.actualSegmentCount).toBe(5); // Math.floor(960 / 192) = 5
    expect(result.remainingPixels).toBe(0); // 1000 - (5 * 192 + 4 * 10) = 1000 - (960 + 40) = 0
  });

  it('enforce minimum width when calculated width is too small', () => {
    // 100px display, 50 segments, 5px min width, no gaps
    // Raw segment width: 100 / 50 = 2px < 5px min -> use 5px
    const result = calculateSegmentWidth(100, 50, 5, 0);
    expect(result.segmentWidth).toBe(5);
    expect(result.actualSegmentCount).toBe(20); // Math.floor(100 / 5) = 20
    expect(result.remainingPixels).toBe(0); // 100 - (20 * 5) = 0
  });

  it('handle case where minimum width is larger than available space', () => {
    // 50px display, 10 segments, 100px min width, no gaps
    const result = calculateSegmentWidth(50, 10, 100, 0);
    expect(result.segmentWidth).toBe(100); // Enforced minimum
    expect(result.actualSegmentCount).toBe(0); // Math.floor(50 / 100) = 0
    expect(result.remainingPixels).toBe(50); // 50 - (0 * 100) = 50
  });

  it('handle minimum width equal to calculated width', () => {
    // 1000px display, 10 segments, 100px min width, no gaps
    // Raw segment width: 1000 / 10 = 100px = min width
    const result = calculateSegmentWidth(1000, 10, 100, 0);
    expect(result.segmentWidth).toBe(100);
    expect(result.actualSegmentCount).toBe(10);
    expect(result.remainingPixels).toBe(0);
  });

  it('handle single segment without gaps', () => {
    const result = calculateSegmentWidth(500, 1, 10, 0);
    expect(result.segmentWidth).toBe(500); // Full width for single segment
    expect(result.actualSegmentCount).toBe(1);
    expect(result.remainingPixels).toBe(0); // 500 - (1 * 500 + 0 * 0) = 0
  });

  it('handle single segment with gaps (no gaps needed)', () => {
    // With only 1 segment, there are 0 gaps
    const result = calculateSegmentWidth(500, 1, 10, 20);
    expect(result.segmentWidth).toBe(500); // Full width available
    expect(result.actualSegmentCount).toBe(1);
    expect(result.remainingPixels).toBe(0); // 500 - (1 * 500 + 0 * 20) = 0
  });

  it('handle zero display width', () => {
    // After clamping: effectiveDisplayWidth=0, effectiveSegmentCount=10, effectiveMinSegmentWidth=5, effectiveGapWidth=2
    // Total gap width: (10 - 1) * 2 = 18px
    // Available for bars: 0 - 18 = -18px
    // Actual segments: Math.max(0, Math.floor(-18 / 5)) = Math.max(0, -3) = 0
    // With 0 segments, there are 0 gaps, so usedWidth = 0 * 5 + 0 * 2 = 0
    const result = calculateSegmentWidth(0, 10, 5, 2);
    expect(result.segmentWidth).toBe(5); // Minimum width enforced
    expect(result.actualSegmentCount).toBe(0); // Clamped to 0
    expect(result.remainingPixels).toBe(0); // 0 - 0 = 0
  });

  it('handle zero segment count', () => {
    // After clamping: effectiveSegmentCount=1 (clamped from 0)
    // This is mathematically problematic (division by zero) but now handled by clamping to 1
    const result = calculateSegmentWidth(1000, 0, 10, 5);
    expect(result.segmentWidth).toBe(1000); // Full width for single segment: (1000 - 0) / 1 = 1000
    expect(result.actualSegmentCount).toBe(1); // Clamped segmentCount = 1, so Math.floor(1000 / 1000) = 1
    expect(result.remainingPixels).toBe(0); // 1000 - (1 * 1000 + 0 * 5) = 0
  });

  it('handle very large display widths', () => {
    // After clamping: all values stay the same (all positive)
    // Available for bars: 1000000 - 99 = 999901
    // Raw segment width: 999901 / 100 = 9999.01 -> 9999 (floored)
    const result = calculateSegmentWidth(1000000, 100, 1, 1);
    expect(result.segmentWidth).toBe(9999); // Math.floor(999901 / 100) = 9999
    expect(result.actualSegmentCount).toBe(100); // Math.floor(999901 / 9999) = 100
    // Used width: 100 * 9999 + 99 * 1 = 999900 + 99 = 999999
    expect(result.remainingPixels).toBe(1); // 1000000 - 999999 = 1
  });

  it('handle floating point display widths', () => {
    const result = calculateSegmentWidth(100.7, 5, 10, 2.5);
    // Total gap width: (5 - 1) * 2.5 = 10
    // Available for bars: 100.7 - 10 = 90.7
    // Raw segment width: 90.7 / 5 = 18.14 -> 18
    expect(result.segmentWidth).toBe(18);
    expect(result.actualSegmentCount).toBe(5); // Math.floor(90.7 / 18) = 5
    // Used width: 5 * 18 + 4 * 2.5 = 90 + 10 = 100
    expect(result.remainingPixels).toBeCloseTo(0.7, 1);
  });

  it('handle negative display width', () => {
    // After clamping: effectiveDisplayWidth=0 (clamped from -100)
    // Available for bars: 0 - (5-1)*2 = 0 - 8 = -8
    // Actual segments: Math.max(0, Math.floor(-8 / 10)) = Math.max(0, 0) = 0
    // With 0 segments, there are 0 gaps, so usedWidth = 0 * 10 + 0 * 2 = 0
    const result = calculateSegmentWidth(-100, 5, 10, 2);
    expect(result.segmentWidth).toBe(10); // Min width enforced
    expect(result.actualSegmentCount).toBe(0); // Clamped to 0
    expect(result.remainingPixels).toBe(0); // 0 - 0 = 0
  });

  it('handle negative segment count', () => {
    // After clamping: effectiveSegmentCount=1 (clamped from -5)
    // Total gap width: (1 - 1) * 2 = 0
    // Available for bars: 1000 - 0 = 1000
    // Raw segment width: 1000 / 1 = 1000
    const result = calculateSegmentWidth(1000, -5, 10, 2);
    expect(result.segmentWidth).toBe(1000); // Full width for single segment
    expect(result.actualSegmentCount).toBe(1); // Math.floor(1000 / 1000) = 1
    expect(result.remainingPixels).toBe(0); // 1000 - (1 * 1000 + 0 * 2) = 0
  });

  it('handle negative minimum width', () => {
    // After clamping: effectiveMinSegmentWidth=1 (clamped from -50)
    // Available for bars: 1000 - (10-1)*5 = 1000 - 45 = 955
    // Raw segment width: 955 / 10 = 95.5 -> 95
    // Max with clamped min: Math.max(1, 95) = 95
    const result = calculateSegmentWidth(1000, 10, -50, 5);
    expect(result.segmentWidth).toBe(95);
    expect(result.actualSegmentCount).toBe(10); // Math.floor(955 / 95) = 10
    expect(result.remainingPixels).toBe(5); // 1000 - (10 * 95 + 9 * 5) = 1000 - 995 = 5
  });

  it('handle negative gap width', () => {
    // After clamping: effectiveGapWidth=0 (clamped from -5)
    // Total gap width: (10 - 1) * 0 = 0
    // Available for bars: 1000 - 0 = 1000
    // Raw segment width: 1000 / 10 = 100
    const result = calculateSegmentWidth(1000, 10, 10, -5);
    expect(result.segmentWidth).toBe(100);
    expect(result.actualSegmentCount).toBe(10); // Math.floor(1000 / 100) = 10
    expect(result.remainingPixels).toBe(0); // 1000 - (10 * 100 + 9 * 0) = 1000 - 1000 = 0
  });

  it('ensure actualSegmentCount is always integer', () => {
    const result = calculateSegmentWidth(100.7, 3.9, 5.5, 1.1);
    expect(Number.isInteger(result.actualSegmentCount)).toBe(true);
    expect(Number.isInteger(result.segmentWidth)).toBe(true);
  });
});
