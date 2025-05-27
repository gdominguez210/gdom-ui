import { WaveformBarInfo, WaveformBarColorResult } from './types';
export type useAudioWaveformOptions = {
    /**
     * Waveform data array - normalized values between 0-1
     */
    waveformData: number[];
    /**
     * Color of the waveform
     */
    barColor?: string;
    /**
     * Function to determine bar color based on state
     */
    getBarColor?: (barInfo: WaveformBarInfo) => WaveformBarColorResult;
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
     * Height of the waveform as a percentage of canvas height (value between 0 and 1)
     * @default 1 (100% of canvas height)
     */
    heightScale?: number;
    /**
     * Whether to draw the waveform on when the canvas ref is set
     * @default true
     */
    drawOnCanvasReady?: boolean;
};
export declare const useAudioWaveform: (options: useAudioWaveformOptions) => {
    canvasRef: (node: HTMLCanvasElement | null) => void;
    drawWaveform: () => void;
};
