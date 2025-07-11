import { AudioData, SampleWindowTransformFn } from '../../types/audio';
type CurveInterpolationFn = (data: number[] | Float32Array, exactIndex: number) => number;
export type UseAudioResponsiveSamplingForCurvesOptions = {
    data: AudioData;
    segmentMinWidth?: number;
    interpolationFn?: CurveInterpolationFn;
    transformFn?: SampleWindowTransformFn<number>;
};
export type UseAudioResponsiveSamplingForCurvesReturn = {
    getValues: () => number[];
    getSegmentWidth: () => number;
    getLeftOffset: () => number;
    getRightOffset: () => number;
    getActualSegmentCount: () => number;
    calculateSegments: (displayWidth: number) => void;
};
export declare function useAudioResponsiveSamplingForCurves(options: UseAudioResponsiveSamplingForCurvesOptions): UseAudioResponsiveSamplingForCurvesReturn;
export {};
