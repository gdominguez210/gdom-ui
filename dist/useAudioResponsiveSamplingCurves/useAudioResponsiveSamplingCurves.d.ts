import { AudioData, SampleWindowTransformFn } from '../../types/audio';
type CurveInterpolationFn = (data: number[] | Float32Array, exactIndex: number) => number;
export type UseAudioResponsiveSamplingForCurvesOptions = {
    data: AudioData;
    segmentMinWidth?: number;
    interpolationFn?: CurveInterpolationFn;
    transformFn?: SampleWindowTransformFn<number>;
};
export type UseAudioResponsiveSamplingForCurvesReturn = {
    valuesRef: React.RefObject<number[]>;
    segmentWidthRef: React.RefObject<number>;
    leftOffsetRef: React.RefObject<number>;
    rightOffsetRef: React.RefObject<number>;
    actualSegmentCountRef: React.RefObject<number>;
    calculateSegments: (displayWidth: number) => void;
};
export declare function useAudioResponsiveSamplingForCurves(options: UseAudioResponsiveSamplingForCurvesOptions): UseAudioResponsiveSamplingForCurvesReturn;
export {};
