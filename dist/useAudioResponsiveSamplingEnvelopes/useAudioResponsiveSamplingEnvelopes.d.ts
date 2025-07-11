import { AudioData, EnvelopeSegment, RawAudioInterpolationForEnvelopesFn } from '../../types/audio';
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
export declare function useAudioResponsiveSamplingEnvelopes(options: UseAudioResponsiveSamplingEnvelopesOptions): UseAudioResponsiveSamplingEnvelopesReturn;
