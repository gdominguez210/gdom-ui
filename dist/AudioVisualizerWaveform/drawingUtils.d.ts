import { OKLCHColor } from 'types/colors';
export declare const WAVEFORM_COLOR_MODES: {
    readonly STATIC: "static";
    readonly AMPLITUDE: "amplitude";
    readonly FREQUENCY: "frequency";
    readonly SPECTRUM: "spectrum";
    readonly DYNAMIC: "dynamic";
};
/**
 * Types of color modes available for the waveform
 */
export type WaveformColorMode = (typeof WAVEFORM_COLOR_MODES)[keyof typeof WAVEFORM_COLOR_MODES];
/**
 * Dynamic color modes (all except 'static')
 */
export type DynamicColorMode = Exclude<WaveformColorMode, 'static'>;
/**
 * Draws a static waveform with a single color
 *
 * @param ctx - Canvas rendering context
 * @param dataArray - Audio frequency data
 * @param displayWidth - Canvas display width
 * @param displayHeight - Canvas display height
 * @param lineColor - Color string to use for the waveform
 */
export declare function drawStaticWaveform(ctx: CanvasRenderingContext2D, dataArray: Uint8Array, displayWidth: number, displayHeight: number, lineColor: string): void;
/**
 * Applies the appropriate color to a waveform segment based on the color mode
 *
 * @param ctx - Canvas rendering context
 * @param segmentStartIndex - Starting index of the current segment
 * @param dataArray - Audio frequency data
 * @param baseOklchColor - Base color in OKLCH format
 * @param colorMode - Color mode to use
 */
export declare function applySegmentColor(ctx: CanvasRenderingContext2D, segmentStartIndex: number, dataArray: Uint8Array, currentColor: OKLCHColor, colorMode: DynamicColorMode): void;
/**
 * Draws a segmented waveform with dynamic coloring
 *
 * @param ctx - Canvas rendering context
 * @param dataArray - Audio frequency data
 * @param displayWidth - Canvas display width
 * @param displayHeight - Canvas display height
 * @param baseOklchColor - Base color in OKLCH format
 * @param colorMode - Color mode to use
 * @param segmentCount - Number of segments to divide the waveform into
 */
export declare function drawSegmentedWaveform(ctx: CanvasRenderingContext2D, dataArray: Uint8Array, displayWidth: number, displayHeight: number, baseOklchColor: [number, number, number], colorMode: DynamicColorMode, segmentCount: number): void;
