import { describe, it, expect } from 'vitest';
import { calculateMaxSegmentsInView } from './index';

describe('calculateMaxSegmentsInView should...', () => {
  it('calculate segments correctly without gaps', () => {
    // 1000px display, 10px min segment width = 100 segments
    expect(calculateMaxSegmentsInView(1000, 10, 0)).toBe(100);

    // 500px display, 5px min segment width = 100 segments
    expect(calculateMaxSegmentsInView(500, 5, 0)).toBe(100);

    // 100px display, 1px min segment width = 100 segments
    expect(calculateMaxSegmentsInView(100, 1, 0)).toBe(100);
  });

  it('calculate segments correctly with gaps', () => {
    // 1000px display, 10px segments, 2px gaps
    // Formula: Math.floor((1000 + 2) / (10 + 2)) = Math.floor(1002 / 12) = 83
    expect(calculateMaxSegmentsInView(1000, 10, 2)).toBe(83);

    // 500px display, 5px segments, 1px gaps
    // Formula: Math.floor((500 + 1) / (5 + 1)) = Math.floor(501 / 6) = 83
    expect(calculateMaxSegmentsInView(500, 5, 1)).toBe(83);

    // 100px display, 10px segments, 5px gaps
    // Formula: Math.floor((100 + 5) / (10 + 5)) = Math.floor(105 / 15) = 7
    expect(calculateMaxSegmentsInView(100, 10, 5)).toBe(7);
  });

  it('handle cases where segments with gaps fit exactly', () => {
    // 120px display, 10px segments, 2px gaps
    // Formula: Math.floor((120 + 2) / (10 + 2)) = Math.floor(122 / 12) = 10
    expect(calculateMaxSegmentsInView(120, 10, 2)).toBe(10);

    // 63px display, 9px segments, 0px gaps
    // Formula: Math.floor((63 + 0) / (9 + 0)) = Math.floor(63 / 9) = 7
    expect(calculateMaxSegmentsInView(63, 9, 0)).toBe(7);
  });

  it('handle very small display widths', () => {
    // 1px display, 1px segments, no gaps = 1 segment
    expect(calculateMaxSegmentsInView(1, 1, 0)).toBe(1);

    // 1px display, 2px segments, no gaps = 0 segments
    expect(calculateMaxSegmentsInView(1, 2, 0)).toBe(0);

    // 3px display, 1px segments, 1px gaps
    // Formula: Math.floor((3 + 1) / (1 + 1)) = Math.floor(4 / 2) = 2
    expect(calculateMaxSegmentsInView(3, 1, 1)).toBe(2);
  });

  it('handle zero display width', () => {
    expect(calculateMaxSegmentsInView(0, 1, 0)).toBe(0);
    expect(calculateMaxSegmentsInView(0, 10, 5)).toBe(0);
    expect(calculateMaxSegmentsInView(0, 1, 1)).toBe(0);
  });

  it('handle very large minimum segment widths', () => {
    // Display smaller than minimum segment width
    expect(calculateMaxSegmentsInView(100, 200, 0)).toBe(0);
    expect(calculateMaxSegmentsInView(50, 100, 10)).toBe(0);

    // Display exactly equals minimum segment width
    expect(calculateMaxSegmentsInView(100, 100, 0)).toBe(1);
  });

  it('handle gaps larger than segment width', () => {
    // 100px display, 5px segments, 10px gaps
    // Formula: Math.floor((100 + 10) / (5 + 10)) = Math.floor(110 / 15) = 7
    expect(calculateMaxSegmentsInView(100, 5, 10)).toBe(7);

    // 50px display, 2px segments, 20px gaps
    // Formula: Math.floor((50 + 20) / (2 + 20)) = Math.floor(70 / 22) = 3
    expect(calculateMaxSegmentsInView(50, 2, 20)).toBe(3);
  });

  it('handle gaps equal to segment width', () => {
    // 100px display, 10px segments, 10px gaps
    // Formula: Math.floor((100 + 10) / (10 + 10)) = Math.floor(110 / 20) = 5
    expect(calculateMaxSegmentsInView(100, 10, 10)).toBe(5);
  });

  it('handle gaps that make no segments fit', () => {
    // Very large gaps relative to display
    expect(calculateMaxSegmentsInView(10, 1, 20)).toBe(1); // (10 + 20) / (1 + 20) = 30/21 = 1.42... = 1
    expect(calculateMaxSegmentsInView(5, 1, 10)).toBe(1); // (5 + 10) / (1 + 10) = 15/11 = 1.36... = 1
  });

  it('handle very large display widths', () => {
    expect(calculateMaxSegmentsInView(1000000, 1, 0)).toBe(1000000);
    expect(calculateMaxSegmentsInView(1000000, 10, 1)).toBe(90909); // (1000000 + 1) / (10 + 1) = 90909.18... = 90909
  });

  it('handle fractional calculations correctly', () => {
    // 100px display, 3px segments, 1px gaps
    // Formula: Math.floor((100 + 1) / (3 + 1)) = Math.floor(101 / 4) = Math.floor(25.25) = 25
    expect(calculateMaxSegmentsInView(100, 3, 1)).toBe(25);

    // 1000px display, 7px segments, 2px gaps
    // Formula: Math.floor((1000 + 2) / (7 + 2)) = Math.floor(1002 / 9) = Math.floor(111.33) = 111
    expect(calculateMaxSegmentsInView(1000, 7, 2)).toBe(111);
  });

  it('handle floating point inputs', () => {
    expect(calculateMaxSegmentsInView(100.5, 10.2, 1.3)).toBe(
      Math.floor((100.5 + 1.3) / (10.2 + 1.3)),
    ); // Should be 8
    expect(calculateMaxSegmentsInView(500.7, 25.1, 2.9)).toBe(
      Math.floor((500.7 + 2.9) / (25.1 + 2.9)),
    ); // Should be 17
  });

  it('handle negative display width', () => {
    expect(calculateMaxSegmentsInView(-100, 10, 2)).toBe(0); // Negative width should result in 0
  });

  it('handle negative segment width', () => {
    // Negative segment width gets clamped to 1
    // Math.floor((100 + 2) / (1 + 2)) = Math.floor(102 / 3) = 34
    expect(calculateMaxSegmentsInView(100, -10, 2)).toBe(34);
  });

  it('handle negative gap width', () => {
    // Negative gaps get clamped to 0
    // Math.floor((100 + 0) / (10 + 0)) = Math.floor(100 / 10) = 10
    expect(calculateMaxSegmentsInView(100, 10, -2)).toBe(10);
  });

  it('handle zero segment width', () => {
    // Zero segment width gets clamped to 1
    // Math.floor((100 + 2) / (1 + 2)) = Math.floor(102 / 3) = 34
    expect(calculateMaxSegmentsInView(100, 0, 2)).toBe(34);
  });

  it('follow the correct mathematical formula', () => {
    const testCases = [
      {
        displayWidth: 1000,
        minSegmentWidth: 50,
        gapWidth: 5,
        expected: Math.floor((1000 + 5) / (50 + 5)),
      },
      {
        displayWidth: 800,
        minSegmentWidth: 20,
        gapWidth: 3,
        expected: Math.floor((800 + 3) / (20 + 3)),
      },
      {
        displayWidth: 1200,
        minSegmentWidth: 15,
        gapWidth: 1,
        expected: Math.floor((1200 + 1) / (15 + 1)),
      },
      {
        displayWidth: 300,
        minSegmentWidth: 8,
        gapWidth: 0,
        expected: Math.floor((300 + 0) / (8 + 0)),
      },
    ];

    testCases.forEach(({ displayWidth, minSegmentWidth, gapWidth, expected }) => {
      expect(calculateMaxSegmentsInView(displayWidth, minSegmentWidth, gapWidth)).toBe(expected);
    });
  });
});
