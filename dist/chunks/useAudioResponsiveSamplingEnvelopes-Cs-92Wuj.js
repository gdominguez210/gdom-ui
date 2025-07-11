import { useRef, useCallback } from 'react';
import { e as sampleAudioDataByWindow, f as findEnvelopeInSampleRange, g as getInterpolatedValueCubic, c as calculateSegmentWidth, i as isEnvelopeSegmentArray, a as sampleEnvelopesByWindow, s as sampleAudioDataByInterpolation, d as getInterpolatedEnvelopeFromSegments, b as calculateMaxSegmentsInView } from './index-CFNZl9Ff.js';

function calculateGapWidth(displayWidth, gapPercent, gapMinWidth = 1, gapMaxWidth = 0) {
  if (gapMinWidth <= 0 || gapPercent <= 0 || gapPercent > 100) {
    return 0;
  }
  const gapRatio = gapPercent / 100;
  const desiredGapWidth = displayWidth * gapRatio;
  const effectiveMax = gapMaxWidth || Infinity;
  if (gapMinWidth > effectiveMax) {
    return desiredGapWidth <= effectiveMax ? gapMinWidth : effectiveMax;
  }
  const gapWithMin = Math.max(gapMinWidth, desiredGapWidth);
  return gapMaxWidth === 0 ? gapWithMin : Math.min(effectiveMax, gapWithMin);
}

function sampleRawAudioByWindow(data, numSegments, sampleSize, transformFn) {
  const getEnvelopeSamplesAtPosition = (pos) => [data[pos]];
  return sampleAudioDataByWindow(
    data,
    numSegments,
    sampleSize,
    getEnvelopeSamplesAtPosition,
    transformFn
  );
}

function calculateValidSampleRange(dataLength, exactIndex, numSamples) {
  if (dataLength === 0) {
    return { startSample: 0, endSample: 0 };
  }
  const halfSamples = numSamples / 2;
  const intendedStart = Math.floor(exactIndex - halfSamples);
  const intendedEnd = Math.ceil(exactIndex + halfSamples);
  let startSample = Math.max(0, intendedStart);
  let endSample = Math.min(dataLength - 1, intendedEnd);
  if (startSample > endSample) {
    if (exactIndex < 0) {
      startSample = 0;
      endSample = Math.min(dataLength - 1, numSamples - 1);
    } else {
      startSample = Math.max(0, dataLength - numSamples);
      endSample = dataLength - 1;
    }
  }
  return { startSample, endSample };
}

function getInterpolatedEnvelopeCubic(data, exactIndex, options) {
  if (data.length === 0) {
    return { min: 0, max: 0 };
  }
  const { numSamples = 4, oversampleRate = 4 } = options ?? {};
  const { startSample, endSample } = calculateValidSampleRange(data.length, exactIndex, numSamples);
  const getEnvelopeSamplesAtPosition = (pos) => [getInterpolatedValueCubic(data, pos)];
  return findEnvelopeInSampleRange(
    startSample,
    endSample,
    getEnvelopeSamplesAtPosition,
    oversampleRate
  );
}

function useAudioResponsiveSamplingEnvelopes(options) {
  const {
    data,
    segmentMinWidth = 1,
    gapMinWidth = 1,
    gapMaxWidth,
    gapWidthPercent = 0.1,
    interpolationFn = getInterpolatedEnvelopeCubic
  } = options;
  const segmentsRef = useRef([]);
  const segmentWidthRef = useRef(0);
  const leftOffsetRef = useRef(0);
  const rightOffsetRef = useRef(0);
  const actualSegmentCountRef = useRef(0);
  const gapWidthRef = useRef(0);
  const calculateSegments = useCallback(
    (displayWidth) => {
      const gapWidth = calculateGapWidth(displayWidth, gapWidthPercent, gapMinWidth, gapMaxWidth);
      const maxSegmentsInView = calculateMaxSegmentsInView(displayWidth, segmentMinWidth, gapWidth);
      const { segmentWidth, actualSegmentCount, remainingPixels } = calculateSegmentWidth(
        displayWidth,
        maxSegmentsInView,
        segmentMinWidth,
        gapWidth
      );
      const leftOffset = Math.floor(remainingPixels / 2);
      const rightOffset = remainingPixels - leftOffset;
      gapWidthRef.current = gapWidth;
      segmentWidthRef.current = segmentWidth;
      leftOffsetRef.current = leftOffset;
      rightOffsetRef.current = rightOffset;
      actualSegmentCountRef.current = actualSegmentCount;
      if (isEnvelopeSegmentArray(data)) {
        const envelopeData = data;
        const sampleSize = envelopeData.length / actualSegmentCount;
        const segments = sampleSize > 1 ? sampleEnvelopesByWindow(envelopeData, actualSegmentCount, sampleSize) : sampleAudioDataByInterpolation(
          envelopeData,
          actualSegmentCount,
          getInterpolatedEnvelopeFromSegments
        );
        segmentsRef.current = segments;
      } else {
        const audioData = data;
        const sampleSize = audioData.length / actualSegmentCount;
        const segments = sampleSize > 1 ? sampleRawAudioByWindow(audioData, actualSegmentCount, sampleSize) : sampleAudioDataByInterpolation(audioData, actualSegmentCount, interpolationFn);
        segmentsRef.current = segments;
      }
    },
    [data, segmentMinWidth, gapWidthPercent, gapMinWidth, gapMaxWidth, interpolationFn]
  );
  const getSegments = useCallback(() => {
    return segmentsRef.current;
  }, []);
  const getSegmentWidth = useCallback(() => {
    return segmentWidthRef.current;
  }, []);
  const getLeftOffset = useCallback(() => {
    return leftOffsetRef.current;
  }, []);
  const getRightOffset = useCallback(() => {
    return rightOffsetRef.current;
  }, []);
  const getActualSegmentCount = useCallback(() => {
    return actualSegmentCountRef.current;
  }, []);
  const getGapWidth = useCallback(() => {
    return gapWidthRef.current;
  }, []);
  return {
    getSegments,
    getSegmentWidth,
    getLeftOffset,
    getRightOffset,
    getActualSegmentCount,
    getGapWidth,
    calculateSegments
  };
}

export { useAudioResponsiveSamplingEnvelopes as u };
