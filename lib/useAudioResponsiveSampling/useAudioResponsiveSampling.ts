import { useRef, useCallback } from 'react';
import type { AudioData, EnvelopeSegment, RawAudioInterpolationFn } from '@/types/audio';
import { calculateSegmentWidth } from '@/utils/calculateSegmentWidth';
import { calculateMaxSegmentsInView } from '@/utils/calculateMaxSegmentsInView';
import { sampleRawAudioByInterpolation } from '@/utils/sampleRawAudioByInterpolation';
import { sampleEnvelopesByInterpolation } from '@/utils/sampleEnvelopesByInterpolation';
import { sampleEnvelopesByWindow } from '@/utils/sampleEnvelopesByWindow';
import { sampleRawAudioByWindow } from '@/utils/sampleRawAudioByWindow';
import { getInterpolatedEnvelopeCubic } from '@/utils/getInterpolatedEnvelopeCubic';
import { getInterpolatedEnvelopeFromSegments } from '@/utils/getInterpolatedEnvelopeFromSegments';
import { isEnvelopeSegmentArray } from '@/utils/isEnvelopeSegmentArray';

type useAudioResponsiveSamplingOptions = {
  data: AudioData;
  minWidthPerSegment?: number;
  gapWidth?: number;
  interpolationFn?: RawAudioInterpolationFn;
};

type useAudioResponsiveSamplingReturn = {
  segmentsRef: React.RefObject<EnvelopeSegment[]>;
  segmentWidthRef: React.RefObject<number>;
  leftOffsetRef: React.RefObject<number>;
  rightOffsetRef: React.RefObject<number>;
  actualSegmentCountRef: React.RefObject<number>;
  calculateSegments: (displayWidth: number) => void;
};

export function useAudioResponsiveSampling(
  options: useAudioResponsiveSamplingOptions,
): useAudioResponsiveSamplingReturn {
  const {
    data,
    minWidthPerSegment = 1,
    gapWidth,
    interpolationFn = getInterpolatedEnvelopeCubic,
  } = options;

  const segmentsRef = useRef<EnvelopeSegment[]>([]);
  const segmentWidthRef = useRef<number>(0);
  const leftOffsetRef = useRef<number>(0);
  const rightOffsetRef = useRef<number>(0);
  const actualSegmentCountRef = useRef<number>(0);

  const calculateSegments = useCallback(
    (displayWidth: number) => {
      const maxSegmentsInView = calculateMaxSegmentsInView(
        displayWidth,
        minWidthPerSegment,
        gapWidth,
      );

      const { segmentWidth, actualSegmentCount, remainingPixels } = calculateSegmentWidth(
        displayWidth,
        maxSegmentsInView,
        minWidthPerSegment,
        gapWidth,
      );

      const leftOffset = Math.floor(remainingPixels / 2);
      const rightOffset = remainingPixels - leftOffset;

      segmentWidthRef.current = segmentWidth;
      leftOffsetRef.current = leftOffset;
      rightOffsetRef.current = rightOffset;
      actualSegmentCountRef.current = actualSegmentCount;

      if (isEnvelopeSegmentArray(data)) {
        const envelopeData = data;
        const sampleSize = data.length / actualSegmentCount;
        const segments: EnvelopeSegment[] =
          sampleSize > 1
            ? sampleEnvelopesByWindow(envelopeData, actualSegmentCount, sampleSize)
            : sampleEnvelopesByInterpolation(
                envelopeData,
                actualSegmentCount,
                getInterpolatedEnvelopeFromSegments,
              );
        segmentsRef.current = segments;
      } else {
        const audioData = data;
        const sampleSize = data.length / actualSegmentCount;
        const segments: EnvelopeSegment[] =
          sampleSize > 1
            ? sampleRawAudioByWindow(audioData, actualSegmentCount, sampleSize)
            : sampleRawAudioByInterpolation(audioData, actualSegmentCount, interpolationFn);
        segmentsRef.current = segments;
      }
    },
    [data, minWidthPerSegment, gapWidth, interpolationFn],
  );

  return {
    segmentsRef,
    segmentWidthRef,
    leftOffsetRef,
    rightOffsetRef,
    actualSegmentCountRef,
    calculateSegments,
  };
}
