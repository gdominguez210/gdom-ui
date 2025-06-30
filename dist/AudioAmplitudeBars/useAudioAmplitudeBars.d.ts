import { ColorResult } from '../../types/colors';
export type AmplitudeBarInfo = {
    /**
     * Position in the waveform (0-1)
     */
    position: number;
    /**
     * Amplitude value (0-1)
     */
    value: number;
    /**
     * Index in the waveform data array
     */
    index: number;
    /**
     * Width of this specific bar as a percentage of total width (0-1)
     */
    width: number;
};
export type UseAudioAmplitudeBarsOptions = {
    /**
     * Amplitude data array - normalized values between 0-1
     */
    amplitudeData: number[];
    /**
     * Height scale factor for the waveform
     */
    heightScale?: number;
    /**
     * Color of the waveform
     */
    color?: string;
    /**
     * Function to determine bar color based on state
     */
    getColor?: (barInfo: AmplitudeBarInfo) => ColorResult;
    /**
     * Gap between bars as a percentage of canvas width (value between 0 and 1)
     * For example, 0.005 would make gaps 0.5% of the total width
     * @default 0.003 (0.3% of canvas width)
     */
    barGapRatio?: number;
    /**
     * Minimum gap between bars as a percentage of canvas width
     * @default 0.001 (0.1% of canvas width)
     */
    minBarGapPercent?: number;
    /**
     * Minimum width for bars (in pixels)
     * @default 1
     */
    minBarWidth?: number;
    /**
     * Whether to draw the waveform on when the canvas ref is set
     * @default true
     */
    drawOnCanvasReady?: boolean;
};
export type UseAudioAmplitudeBarsReturn = {
    canvasRef: (canvas: HTMLCanvasElement) => void;
    drawWaveform: () => void;
};
export declare const useAudioAmplitudeBars: (options: UseAudioAmplitudeBarsOptions) => {
    canvasRef: (node: HTMLCanvasElement | null) => void;
    drawWaveform: () => void;
};
