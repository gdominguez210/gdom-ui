import { useRef, useCallback } from 'react';
import { g as getInterpolatedValueCubic, c as calculateSegmentWidth, i as isEnvelopeSegmentArray, s as sampleAudioDataByInterpolation, a as sampleEnvelopesByWindow, b as calculateMaxSegmentsInView, d as getInterpolatedEnvelopeFromSegments } from './index-CFNZl9Ff.js';

const defaultTransformFn = (envelope) => Math.abs(envelope.min) > Math.abs(envelope.max) ? envelope.min : envelope.max;
function useAudioResponsiveSamplingForCurves(options) {
  const {
    data,
    segmentMinWidth = 1,
    interpolationFn = getInterpolatedValueCubic,
    transformFn = defaultTransformFn
  } = options;
  const valuesRef = useRef([]);
  const segmentWidthRef = useRef(0);
  const leftOffsetRef = useRef(0);
  const rightOffsetRef = useRef(0);
  const actualSegmentCountRef = useRef(0);
  const calculateSegments = useCallback(
    (displayWidth) => {
      const maxSegmentsInView = calculateMaxSegmentsInView(displayWidth, segmentMinWidth, 0);
      const { segmentWidth, actualSegmentCount, remainingPixels } = calculateSegmentWidth(
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
      if (isEnvelopeSegmentArray(data)) {
        const firstEnvelope = data[0];
        const isInterpolatedData = firstEnvelope && Math.abs(firstEnvelope.min - firstEnvelope.max) < 1e-4;
        if (isInterpolatedData) {
          const audioValues = data.map((envelope) => envelope.min);
          valuesRef.current = sampleAudioDataByInterpolation(
            audioValues,
            actualSegmentCount,
            interpolationFn
          );
          return;
        }
        valuesRef.current = sampleSize > 1 ? sampleEnvelopesByWindow(data, actualSegmentCount, sampleSize, transformFn) : sampleAudioDataByInterpolation(data, actualSegmentCount, (data2, exactIndex) => {
          const envelope = getInterpolatedEnvelopeFromSegments(data2, exactIndex);
          return transformFn ? transformFn(envelope) : envelope.min;
        });
        return;
      }
      valuesRef.current = sampleAudioDataByInterpolation(data, actualSegmentCount, interpolationFn);
    },
    [data, segmentMinWidth, interpolationFn, transformFn]
  );
  const getValues = useCallback(() => {
    return valuesRef.current;
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
  return {
    getValues,
    getSegmentWidth,
    getLeftOffset,
    getRightOffset,
    getActualSegmentCount,
    calculateSegments
  };
}

export { useAudioResponsiveSamplingForCurves as u };
