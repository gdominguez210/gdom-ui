import { useRef, useCallback } from 'react';
import type { AudioData, SampleWindowTransformFn } from '@/types/audio';
import { calculateSegmentWidth } from '@/utils/calculateSegmentWidth';
import { calculateMaxSegmentsInView } from '@/utils/calculateMaxSegmentsInView';
import { sampleAudioDataByInterpolation } from '@/utils/sampleAudioDataByInterpolation';
import { sampleRawAudioByWindow } from '@/utils/sampleRawAudioByWindow';
import { sampleEnvelopesByWindow } from '@/utils/sampleEnvelopesByWindow';
import { getInterpolatedValueCubic } from '@/utils/getInterpolatedValueCubic';
import { getInterpolatedEnvelopeFromSegments } from '@/utils/getInterpolatedEnvelopeFromSegments';
import { isEnvelopeSegmentArray } from '@/utils/isEnvelopeSegmentArray';

type CurveInterpolationFn = (data: number[] | Float32Array, exactIndex: number) => number;

export type UseAudioResponsiveSamplingForCurvesOptions = {
  data: AudioData;
  segmentMinWidth?: number;
  interpolationFn?: CurveInterpolationFn;
};
export type UseAudioResponsiveSamplingForCurvesReturn = {
  valuesRef: React.RefObject<number[]>;
  segmentWidthRef: React.RefObject<number>;
  leftOffsetRef: React.RefObject<number>;
  rightOffsetRef: React.RefObject<number>;
  actualSegmentCountRef: React.RefObject<number>;
  calculateSegments: (displayWidth: number) => void;
};

export function useAudioResponsiveSamplingForCurves(
  options: UseAudioResponsiveSamplingForCurvesOptions,
): UseAudioResponsiveSamplingForCurvesReturn {
  const { data, segmentMinWidth = 1, interpolationFn = getInterpolatedValueCubic } = options;

  const valuesRef = useRef<number[]>([]);
  const segmentWidthRef = useRef<number>(0);
  const leftOffsetRef = useRef<number>(0);
  const rightOffsetRef = useRef<number>(0);
  const actualSegmentCountRef = useRef<number>(0);

  const calculateSegments = useCallback(
    (displayWidth: number) => {
      const maxSegmentsInView = calculateMaxSegmentsInView(displayWidth, segmentMinWidth, 0);
      const { segmentWidth, actualSegmentCount, remainingPixels } = calculateSegmentWidth(
        displayWidth,
        maxSegmentsInView,
        segmentMinWidth,
        0,
      );

      const leftOffset = Math.floor(remainingPixels / 2);
      const rightOffset = remainingPixels - leftOffset;

      segmentWidthRef.current = segmentWidth;
      leftOffsetRef.current = leftOffset;
      rightOffsetRef.current = rightOffset;
      actualSegmentCountRef.current = actualSegmentCount;

      const sampleSize = data.length / actualSegmentCount;

      if (isEnvelopeSegmentArray(data)) {
        const extractMin: SampleWindowTransformFn<number> = (envelope) => envelope.min;

        valuesRef.current =
          sampleSize > 1
            ? sampleEnvelopesByWindow(data, actualSegmentCount, sampleSize, extractMin)
            : sampleAudioDataByInterpolation(
                data,
                actualSegmentCount,
                (data, exactIndex) => getInterpolatedEnvelopeFromSegments(data, exactIndex).min,
              );
      } else {
        valuesRef.current =
          sampleSize > 1
            ? sampleRawAudioByWindow(data, actualSegmentCount, sampleSize)
            : sampleAudioDataByInterpolation(data, actualSegmentCount, interpolationFn);
      }
    },
    [data, segmentMinWidth, interpolationFn],
  );

  return {
    valuesRef,
    segmentWidthRef,
    leftOffsetRef,
    rightOffsetRef,
    actualSegmentCountRef,
    calculateSegments,
  };
}
