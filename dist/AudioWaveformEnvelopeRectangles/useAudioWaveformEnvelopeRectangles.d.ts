import { ColorResult } from '../../types/colors';
import { UseAudioResponsiveSamplingEnvelopesOptions, UseAudioResponsiveSamplingEnvelopesReturn } from '../useAudioResponsiveSamplingEnvelopes/useAudioResponsiveSamplingEnvelopes';
import { EnvelopeSegmentInfo } from '../../types/audio';
export type UseAudioWaveformEnvelopeRectanglesOptions = {
    /**
     * Height scale factor for the waveform
     */
    heightScale?: number;
    /**
     * Color of the envelope, can be a string or a function that returns a ColorResult
     */
    color?: string | ((segmentInfo: EnvelopeSegmentInfo) => ColorResult);
    /**
     * Whether to draw the waveform on when the canvas ref is set
     * @default true
     */
    drawOnCanvasReady?: boolean;
} & UseAudioResponsiveSamplingEnvelopesOptions;
export type UseAudioWaveformEnvelopeRectanglesReturn = {
    canvasRef: (node: HTMLCanvasElement | null) => void;
    calculateSegments: UseAudioResponsiveSamplingEnvelopesReturn['calculateSegments'];
    drawWaveform: () => void;
    handleResize: () => void;
};
/**
 * Hook for drawing audio waveform envelopes on a canvas.
 *
 * @param props - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export declare function useAudioWaveformEnvelopeRectangles(props: UseAudioWaveformEnvelopeRectanglesOptions): UseAudioWaveformEnvelopeRectanglesReturn;
