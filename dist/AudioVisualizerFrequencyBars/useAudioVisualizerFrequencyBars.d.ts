export type useAudioVisualizerFrequencyBarOptions = {
    /**
     * Color of the frequency bars
     * @default '#FFFFFF'
     */
    barColor?: string;
    /**
     * Number of frequency bars to display
     * Lower values will group frequencies together for broader analysis
     * @default 128
     */
    barCount?: number;
    /**
     * Gap between bars as a proportion of canvas width (0-1)
     * For example, 0.01 would make gaps 1% of the total width
     * Default is auto-calculated based on bar count
     * @default 0.004
     */
    barGapRatio?: number;
    /**
     * Height multiplier to enhance visualization
     * Higher values make bars taller
     * @default 1
     */
    heightMultiplier?: number;
    /**
     * Minimum height for bars as percentage of canvas height (0-1)
     * Ensures even quiet frequencies have visible presence
     * @default 0
     */
    minBarHeight?: number;
    /**
     * Minimum width for bars (in pixels)
     * @default 1
     */
    minBarWidth?: number;
    /**
     * Whether to use reactive color
     * @default 'static'
     */
    colorMode?: 'static' | 'frequency' | 'intensity' | 'spectrum' | 'dynamic';
    /**
     * Duration of the color transition in milliseconds
     * @default 1000
     */
    colorTransitionDuration?: number;
};
export type useAudioVisualizerFrequencyBarsReturn = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    drawFrequencyBars: (dataArray: Uint8Array) => void;
    clearCanvas: () => void;
};
export declare function useAudioVisualizerFrequencyBars(options?: useAudioVisualizerFrequencyBarOptions): useAudioVisualizerFrequencyBarsReturn;
