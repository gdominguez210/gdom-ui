'use strict';

function calculateSegmentWidth(displayWidth, segmentCount, minSegmentWidth, gapWidth = 0) {
  const effectiveDisplayWidth = Math.max(0, displayWidth);
  const effectiveSegmentCount = Math.max(1, segmentCount);
  const effectiveMinSegmentWidth = Math.max(1, minSegmentWidth);
  const effectiveGapWidth = Math.max(0, gapWidth);
  const totalGapWidth = (effectiveSegmentCount - 1) * effectiveGapWidth;
  const availableWidthForBars = effectiveDisplayWidth - totalGapWidth;
  const rawSegmentWidth = availableWidthForBars / effectiveSegmentCount;
  const segmentWidth = Math.max(effectiveMinSegmentWidth, Math.floor(rawSegmentWidth));
  const actualSegmentCount = Math.max(0, Math.floor(availableWidthForBars / segmentWidth));
  const actualGapCount = actualSegmentCount > 0 ? actualSegmentCount - 1 : 0;
  const usedWidth = actualSegmentCount * segmentWidth + actualGapCount * effectiveGapWidth;
  const remainingPixels = effectiveDisplayWidth - usedWidth;
  return {
    segmentWidth,
    actualSegmentCount,
    remainingPixels
  };
}

function calculateMaxSegmentsInView(displayWidth, minSegmentWidth, gapWidth = 0) {
  const effectiveDisplayWidth = Math.max(0, displayWidth);
  const effectiveMinSegmentWidth = Math.max(1, minSegmentWidth);
  const effectiveGapWidth = Math.max(0, gapWidth);
  return Math.floor(
    (effectiveDisplayWidth + effectiveGapWidth) / (effectiveMinSegmentWidth + effectiveGapWidth)
  );
}

function findEnvelopeInSampleRange(startSample, endSample, getEnvelopeSamplesAtPosition, oversampleRate = 1) {
  const startPos = Math.round(startSample);
  const endPos = Math.round(endSample);
  let min = Infinity;
  let max = -Infinity;
  if (startPos === endPos) {
    const samples = getEnvelopeSamplesAtPosition(startPos);
    for (const value of samples) {
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    return { min, max };
  }
  if (oversampleRate === 1) {
    for (let i = startPos; i <= endPos; i++) {
      const samples = getEnvelopeSamplesAtPosition(i);
      for (const value of samples) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  } else {
    const numSteps = (endPos - startPos) * oversampleRate;
    for (let i = 0; i <= numSteps; i++) {
      const t = i / numSteps;
      const pos = startPos + t * (endPos - startPos);
      const samples = getEnvelopeSamplesAtPosition(pos);
      for (const value of samples) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }
  }
  return { min, max };
}

function sampleAudioDataByWindow(data, numSegments, sampleSize, getEnvelopeSamplesAtPosition, transformFn = (envelope) => envelope) {
  if (numSegments <= 0 || data.length === 0) {
    return [];
  }
  return Array.from({ length: numSegments }, (_, i) => {
    const start = Math.floor(i * sampleSize);
    const end = Math.min(Math.floor((i + 1) * sampleSize), data.length - 1);
    const clampedStart = Math.min(start, data.length - 1);
    const clampedEnd = Math.max(clampedStart, end);
    const envelope = findEnvelopeInSampleRange(
      clampedStart,
      clampedEnd,
      getEnvelopeSamplesAtPosition
    );
    return transformFn(envelope);
  });
}

function sampleEnvelopesByWindow(data, numSegments, sampleSize, transformFn) {
  const getEnvelopeSamplesAtPosition = (pos) => {
    const segment = data[pos];
    return [segment.min, segment.max];
  };
  return sampleAudioDataByWindow(
    data,
    numSegments,
    sampleSize,
    getEnvelopeSamplesAtPosition,
    transformFn
  );
}

function interpolateCubic(y0, y1, y2, y3, mu) {
  const mu2 = mu * mu;
  const a0 = y3 - y2 - y0 + y1;
  const a1 = y0 - y1 - a0;
  const a2 = y2 - y0;
  const a3 = y1;
  return a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3;
}

function getInterpolatedValueCubic(data, exactIndex) {
  const y0 = data[Math.max(0, Math.floor(exactIndex) - 1)] ?? 0;
  const y1 = data[Math.floor(exactIndex)] ?? 0;
  const y2 = data[Math.min(data.length - 1, Math.floor(exactIndex) + 1)] ?? 0;
  const y3 = data[Math.min(data.length - 1, Math.floor(exactIndex) + 2)] ?? 0;
  const fraction = exactIndex - Math.floor(exactIndex);
  return interpolateCubic(y0, y1, y2, y3, fraction);
}

function interpolateLinear(y1, y2, t) {
  return y1 + (y2 - y1) * t;
}

function getInterpolatedEnvelopeFromSegments(data, exactIndex) {
  if (data.length === 0) {
    return { min: 0, max: 0 };
  }
  const clampedIndex = Math.max(0, exactIndex);
  const floorIndex = Math.floor(clampedIndex);
  const ceilIndex = Math.min(Math.ceil(clampedIndex), data.length - 1);
  if (floorIndex === ceilIndex || floorIndex >= data.length) {
    return data[Math.min(floorIndex, data.length - 1)];
  }
  const t = clampedIndex - floorIndex;
  const current = data[floorIndex];
  const next = data[ceilIndex];
  return {
    min: interpolateLinear(current.min, next.min, t),
    max: interpolateLinear(current.max, next.max, t)
  };
}

function isEnvelopeSegmentArray(arr) {
  return arr.length > 0 && typeof arr[0] === "object" && arr[0] !== null && "min" in arr[0] && "max" in arr[0];
}

function sampleAudioDataByInterpolation(data, numSegments, interpolationFn) {
  return Array.from({ length: numSegments }, (_, i) => {
    const exactIndex = i * data.length / numSegments;
    return interpolationFn(data, exactIndex);
  });
}

exports.calculateMaxSegmentsInView = calculateMaxSegmentsInView;
exports.calculateSegmentWidth = calculateSegmentWidth;
exports.findEnvelopeInSampleRange = findEnvelopeInSampleRange;
exports.getInterpolatedEnvelopeFromSegments = getInterpolatedEnvelopeFromSegments;
exports.getInterpolatedValueCubic = getInterpolatedValueCubic;
exports.isEnvelopeSegmentArray = isEnvelopeSegmentArray;
exports.sampleAudioDataByInterpolation = sampleAudioDataByInterpolation;
exports.sampleAudioDataByWindow = sampleAudioDataByWindow;
exports.sampleEnvelopesByWindow = sampleEnvelopesByWindow;
