import { ColorResult } from '../../types/colors';
import { UseAudioResponsiveSamplingEnvelopesOptions, UseAudioResponsiveSamplingEnvelopesReturn } from '../useAudioResponsiveSamplingEnvelopes/useAudioResponsiveSamplingEnvelopes';
export type UseAudioWaveformEnvelopeCurvesOptions = {
    /**
     * Height scale factor for the waveform
     */
    heightScale?: number;
    /**
     * Color of the envelope, can be a string or a function that returns a ColorResult
     */
    color?: string | (() => ColorResult);
    /**
     * Whether to draw the waveform on when the canvas ref is set
     * @default true
     */
    drawOnCanvasReady?: boolean;
    /**
     * Smoothness factor for curves (0 = angular, 1 = very smooth)
     * @default 0.5
     */
    smoothingFactor?: number;
} & Omit<UseAudioResponsiveSamplingEnvelopesOptions, 'gapWidthPercent' | 'gapMinWidth' | 'gapMaxWidth'>;
export type UseAudioWaveformEnvelopeCurvesReturn = {
    canvasRef: (node: HTMLCanvasElement | null) => void;
    calculateSegments: UseAudioResponsiveSamplingEnvelopesReturn['calculateSegments'];
    drawWaveform: () => void;
    handleResize: () => void;
};
/**
 * Hook for drawing curved audio waveform envelopes on a canvas.
 * Creates continuous filled curves without gaps between segments.
 *
 * @param options - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export declare function useAudioWaveformEnvelopeCurves(options: UseAudioWaveformEnvelopeCurvesOptions): UseAudioWaveformEnvelopeCurvesReturn;
