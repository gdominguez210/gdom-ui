'use strict';

const React = require('react');
const index = require('./index-CShWZ2Aa.js');
const index$1 = require('./index-BvA9FYyc.js');

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
  return index.sampleAudioDataByWindow(
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
  const getEnvelopeSamplesAtPosition = (pos) => [index.getInterpolatedValueCubic(data, pos)];
  return index.findEnvelopeInSampleRange(
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
  const segmentsRef = React.useRef([]);
  const segmentWidthRef = React.useRef(0);
  const leftOffsetRef = React.useRef(0);
  const rightOffsetRef = React.useRef(0);
  const actualSegmentCountRef = React.useRef(0);
  const gapWidthRef = React.useRef(0);
  const calculateSegments = React.useCallback(
    (displayWidth) => {
      const gapWidth = calculateGapWidth(displayWidth, gapWidthPercent, gapMinWidth, gapMaxWidth);
      const maxSegmentsInView = index$1.calculateMaxSegmentsInView(displayWidth, segmentMinWidth, gapWidth);
      const { segmentWidth, actualSegmentCount, remainingPixels } = index.calculateSegmentWidth(
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
      if (index.isEnvelopeSegmentArray(data)) {
        const envelopeData = data;
        const sampleSize = envelopeData.length / actualSegmentCount;
        const segments = sampleSize > 1 ? index.sampleEnvelopesByWindow(envelopeData, actualSegmentCount, sampleSize) : index.sampleAudioDataByInterpolation(
          envelopeData,
          actualSegmentCount,
          index.getInterpolatedEnvelopeFromSegments
        );
        segmentsRef.current = segments;
      } else {
        const audioData = data;
        const sampleSize = audioData.length / actualSegmentCount;
        const segments = sampleSize > 1 ? sampleRawAudioByWindow(audioData, actualSegmentCount, sampleSize) : index.sampleAudioDataByInterpolation(audioData, actualSegmentCount, interpolationFn);
        segmentsRef.current = segments;
      }
    },
    [data, segmentMinWidth, gapWidthPercent, gapMinWidth, gapMaxWidth, interpolationFn]
  );
  return {
    segmentsRef,
    segmentWidthRef,
    leftOffsetRef,
    rightOffsetRef,
    actualSegmentCountRef,
    gapWidthRef,
    calculateSegments
  };
}

exports.useAudioResponsiveSamplingEnvelopes = useAudioResponsiveSamplingEnvelopes;
