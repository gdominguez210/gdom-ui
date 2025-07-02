import { ColorResult } from '../../types/colors';
import { UseAudioResponsiveSamplingEnvelopesOptions, UseAudioResponsiveSamplingEnvelopesReturn } from '../useAudioResponsiveSamplingEnvelopes/useAudioResponsiveSamplingEnvelopes';
import { EnvelopeSegmentInfo } from '../../types/audio';
import { UseColorTransitionOptions } from '../useColorTransition/useColorTransition';
export type UseAudioWaveformEnvelopeLinesOptions = {
    /**
     * Height scale factor for the waveform
     */
    heightScale?: number;
    /**
     * Color of the envelope lines (fallback if function is not provided)
     */
    color?: string | ((segmentInfo: EnvelopeSegmentInfo) => ColorResult);
    /**
     * Width of the lines in pixels
     * @default 1
     */
    lineWidth?: number;
    /**
     * Style of line endings
     * @default 'butt'
     */
    lineCap?: CanvasLineCap;
    /**
     * Whether to draw the waveform on when the canvas ref is set
     * @default true
     */
    drawOnCanvasReady: boolean;
} & UseAudioResponsiveSamplingEnvelopesOptions & Omit<UseColorTransitionOptions, 'targetColor'>;
export type UseAudioWaveformEnvelopeLinesReturn = {
    canvasRef: (node: HTMLCanvasElement | null) => void;
    calculateSegments: UseAudioResponsiveSamplingEnvelopesReturn['calculateSegments'];
    drawWaveform: () => void;
    handleResize: () => void;
};
/**
 * Hook for drawing audio waveform envelope lines on a canvas.
 *
 * @param props - Options for the hook
 * @returns An object containing the canvas ref, drawWaveform function, and handleResize function
 */
export declare function useAudioWaveformEnvelopeLines(props: UseAudioWaveformEnvelopeLinesOptions): UseAudioWaveformEnvelopeLinesReturn;
