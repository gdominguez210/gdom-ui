import { ColorResult } from '../../types/colors';
import { UseAudioResponsiveSamplingForCurvesOptions, UseAudioResponsiveSamplingForCurvesReturn } from '../useAudioResponsiveSamplingCurves/useAudioResponsiveSamplingCurves';
import { UseColorTransitionOptions } from '../useColorTransition/useColorTransition';
export type UseAudioWaveformCurvesOptions = {
    /**
     * Height scale factor for the waveform
     */
    heightScale?: number;
    /**
     * Color of the curve, can be a string or a function that returns a ColorResult
     */
    color?: string | (() => ColorResult);
    /**
     * Whether to draw the waveform when the canvas ref is set
     * @default true
     */
    drawOnCanvasReady?: boolean;
    /**
     * Line width for the curve stroke
     * @default 2
     */
    lineWidth?: number;
    /**
     * Line cap style for the curve endpoints
     * @default 'round'
     */
    lineCap?: CanvasLineCap;
    /**
     * Smoothness factor for curves (0 = angular, 1 = very smooth)
     * @default 0.5
     */
    smoothingFactor?: number;
} & UseAudioResponsiveSamplingForCurvesOptions & Omit<UseColorTransitionOptions, 'targetColor'>;
export type UseAudioWaveformCurvesReturn = {
    canvasRef: (node: HTMLCanvasElement | null) => void;
    calculateSegments: UseAudioResponsiveSamplingForCurvesReturn['calculateSegments'];
    drawWaveform: () => void;
    handleResize: () => void;
};
/**
 * Hook for drawing audio waveform curves on a canvas.
 * Creates continuous stroke-based curves without gaps.
 *
 * @param props - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export declare function useAudioWaveformCurves(props: UseAudioWaveformCurvesOptions): UseAudioWaveformCurvesReturn;
