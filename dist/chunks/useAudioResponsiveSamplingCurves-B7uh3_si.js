'use strict';

const React = require('react');
const index = require('./index-BXxhSJ3v.js');

const defaultTransformFn = (envelope) => Math.abs(envelope.min) > Math.abs(envelope.max) ? envelope.min : envelope.max;
function useAudioResponsiveSamplingForCurves(options) {
  const {
    data,
    segmentMinWidth = 1,
    interpolationFn = index.getInterpolatedValueCubic,
    transformFn = defaultTransformFn
  } = options;
  const valuesRef = React.useRef([]);
  const segmentWidthRef = React.useRef(0);
  const leftOffsetRef = React.useRef(0);
  const rightOffsetRef = React.useRef(0);
  const actualSegmentCountRef = React.useRef(0);
  const calculateSegments = React.useCallback(
    (displayWidth) => {
      const maxSegmentsInView = index.calculateMaxSegmentsInView(displayWidth, segmentMinWidth, 0);
      const { segmentWidth, actualSegmentCount, remainingPixels } = index.calculateSegmentWidth(
        displayWidth,
        maxSegmentsInView,
        segmentMinWidth,
        0
      );
      const leftOffset = Math.floor(remainingPixels / 2);
      const rightOffset = remainingPixels - leftOffset;
      segmentWidthRef.current = segmentWidth;
      leftOffsetRef.current = leftOffset;
      rightOffsetRef.current = rightOffset;
      actualSegmentCountRef.current = actualSegmentCount;
      const sampleSize = data.length / actualSegmentCount;
      if (index.isEnvelopeSegmentArray(data)) {
        const firstEnvelope = data[0];
        const isInterpolatedData = firstEnvelope && Math.abs(firstEnvelope.min - firstEnvelope.max) < 1e-4;
        if (isInterpolatedData) {
          const audioValues = data.map((envelope) => envelope.min);
          valuesRef.current = index.sampleAudioDataByInterpolation(
            audioValues,
            actualSegmentCount,
            interpolationFn
          );
          return;
        }
        valuesRef.current = sampleSize > 1 ? index.sampleEnvelopesByWindow(data, actualSegmentCount, sampleSize, transformFn) : index.sampleAudioDataByInterpolation(data, actualSegmentCount, (data2, exactIndex) => {
          const envelope = index.getInterpolatedEnvelopeFromSegments(data2, exactIndex);
          return transformFn ? transformFn(envelope) : envelope.min;
        });
        return;
      }
      valuesRef.current = index.sampleAudioDataByInterpolation(data, actualSegmentCount, interpolationFn);
    },
    [data, segmentMinWidth, interpolationFn, transformFn]
  );
  const getValues = React.useCallback(() => {
    return valuesRef.current;
  }, []);
  const getSegmentWidth = React.useCallback(() => {
    return segmentWidthRef.current;
  }, []);
  const getLeftOffset = React.useCallback(() => {
    return leftOffsetRef.current;
  }, []);
  const getRightOffset = React.useCallback(() => {
    return rightOffsetRef.current;
  }, []);
  const getActualSegmentCount = React.useCallback(() => {
    return actualSegmentCountRef.current;
  }, []);
  return {
    getValues,
    getSegmentWidth,
    getLeftOffset,
    getRightOffset,
    getActualSegmentCount,
    calculateSegments
  };
}

exports.useAudioResponsiveSamplingForCurves = useAudioResponsiveSamplingForCurves;
