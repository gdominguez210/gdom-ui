import { useRef, useCallback } from 'react';
import type {
  AudioData,
  EnvelopeSegment,
  RawAudioInterpolationForEnvelopesFn,
} from '@/types/audio';
import { calculateSegmentWidth } from '@/utils/calculateSegmentWidth';
import { calculateMaxSegmentsInView } from '@/utils/calculateMaxSegmentsInView';
import { calculateGapWidth } from '@/utils/calculateGapWidth';
import { sampleEnvelopesByWindow } from '@/utils/sampleEnvelopesByWindow';
import { sampleRawAudioByWindow } from '@/utils/sampleRawAudioByWindow';
import { getInterpolatedEnvelopeCubic } from '@/utils/getInterpolatedEnvelopeCubic';
import { getInterpolatedEnvelopeFromSegments } from '@/utils/getInterpolatedEnvelopeFromSegments';
import { isEnvelopeSegmentArray } from '@/utils/isEnvelopeSegmentArray';
import { sampleAudioDataByInterpolation } from '@/utils/sampleAudioDataByInterpolation';

export type UseAudioResponsiveSamplingEnvelopesOptions = {
  /**
   * Audio data from the Web Audio API (array of numbers in the range [-1, 1]), or a pre-processed envelope segment array.
   */
  data: AudioData;
  /**
   * Minimum width per segment (in pixels)
   * @default 1
   */
  segmentMinWidth?: number;
  /**
   * Gap width as a percentage of the display width
   * @default 0.1
   */
  gapWidthPercent?: number;
  /**
   * Minimum gap width (in pixels)
   * @default 0
   */
  gapMinWidth?: number;
  /**
   * Maximum gap width (in pixels)
   * @default undefined
   */
  gapMaxWidth?: number;
  /**
   * Function to interpolate values when upsampling with raw audio data
   * @default getInterpolatedPeakCubic
   */
  interpolationFn?: RawAudioInterpolationForEnvelopesFn;
};

export type UseAudioResponsiveSamplingEnvelopesReturn = {
  getSegments: () => EnvelopeSegment[];
  getSegmentWidth: () => number;
  getLeftOffset: () => number;
  getRightOffset: () => number;
  getActualSegmentCount: () => number;
  getGapWidth: () => number;
  calculateSegments: (displayWidth: number) => void;
};

export function useAudioResponsiveSamplingEnvelopes(
  options: UseAudioResponsiveSamplingEnvelopesOptions,
): UseAudioResponsiveSamplingEnvelopesReturn {
  const {
    data,
    segmentMinWidth = 1,
    gapMinWidth = 1,
    gapMaxWidth,
    gapWidthPercent = 0.1,
    interpolationFn = getInterpolatedEnvelopeCubic,
  } = options;

  const segmentsRef = useRef<EnvelopeSegment[]>([]);
  const segmentWidthRef = useRef<number>(0);
  const leftOffsetRef = useRef<number>(0);
  const rightOffsetRef = useRef<number>(0);
  const actualSegmentCountRef = useRef<number>(0);
  const gapWidthRef = useRef<number>(0);

  const calculateSegments = useCallback(
    (displayWidth: number) => {
      const gapWidth = calculateGapWidth(displayWidth, gapWidthPercent, gapMinWidth, gapMaxWidth);

      const maxSegmentsInView = calculateMaxSegmentsInView(displayWidth, segmentMinWidth, gapWidth);

      const { segmentWidth, actualSegmentCount, remainingPixels } = calculateSegmentWidth(
        displayWidth,
        maxSegmentsInView,
        segmentMinWidth,
        gapWidth,
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
        const segments: EnvelopeSegment[] =
          sampleSize > 1
            ? sampleEnvelopesByWindow(envelopeData, actualSegmentCount, sampleSize)
            : sampleAudioDataByInterpolation(
                envelopeData,
                actualSegmentCount,
                getInterpolatedEnvelopeFromSegments,
              );
        segmentsRef.current = segments;
      } else {
        const audioData = data;
        const sampleSize = audioData.length / actualSegmentCount;
        const segments: EnvelopeSegment[] =
          sampleSize > 1
            ? sampleRawAudioByWindow(audioData, actualSegmentCount, sampleSize)
            : sampleAudioDataByInterpolation(audioData, actualSegmentCount, interpolationFn);
        segmentsRef.current = segments;
      }
    },
    [data, segmentMinWidth, gapWidthPercent, gapMinWidth, gapMaxWidth, interpolationFn],
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
    calculateSegments,
  };
}
