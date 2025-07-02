import { WaveformColorMode } from './drawingUtils';
import { UseColorTransitionOptions } from '../useColorTransition/useColorTransition';
export type useAudioVisualizerWaveformOptions = {
    /**
     * Color of the waveform line
     */
    lineColor?: string;
    /**
     * Thickness of the waveform line
     */
    lineWidth?: number;
    /**
     * Coloring mode for the waveform
     */
    colorMode?: WaveformColorMode;
    /**
     * Number of colored segments to divide the waveform into
     * Higher values create more color transitions, lower values improve performance
     * Only applies when colorMode is not 'static'
     * @default 40
     */
    segmentCount?: number;
} & Omit<UseColorTransitionOptions, 'targetColor'>;
export type useAudioVisualizerWaveformReturn = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    drawWaveform: (dataArray: Uint8Array) => void;
    clearCanvas: () => void;
};
export declare function useAudioVisualizerWaveform(options?: useAudioVisualizerWaveformOptions): useAudioVisualizerWaveformReturn;
