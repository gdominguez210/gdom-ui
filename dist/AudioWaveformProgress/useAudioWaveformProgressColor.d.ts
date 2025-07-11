import { RefObject } from 'react';
import { ColorResult, GradientStop } from '../../types/colors';
import { EnvelopeSegmentInfo } from '../../types/audio';
import { UseMousePositionRefReturn } from '../useMousePositionRef/useMousePositionRef';
import { UseElementDimensionsReturn } from '../useElementDimensions/useElementDimensions';
/**
 * Color modes for the audio progress waveform
 */
declare const AUDIO_PROGRESS_COLOR_MODES: {
    /**
     * Static color for played and unplayed regions
     */
    readonly STATIC: "static";
    /**
     * Gradient effect for played regions
     */
    readonly GRADIENT: "gradient";
};
/**
 * Color mode for the audio progress waveform, as string union
 */
type AudioProgressColorMode = (typeof AUDIO_PROGRESS_COLOR_MODES)[keyof typeof AUDIO_PROGRESS_COLOR_MODES];
export type UseAudioWaveformProgressColorOptions = {
    /**
     * The duration of the audio to visualize
     */
    duration: number;
    /**
     * The audio element to visualize
     */
    audioRef: RefObject<HTMLAudioElement>;
    /**
     * Function to get the element dimensions
     */
    getElementDimensions: UseElementDimensionsReturn['getElementDimensions'];
    /**
     * The color of the progress bar
     */
    progressColor?: string;
    /**
     * The color of the waveform bars
     */
    color?: string;
    /**
     * The color of the waveform bars when hovered
     */
    hoverColor?: string;
    /**
     * A function that returns the relative position (value between 0 and 1) of the mouse on the waveform
     */
    getMousePosition: UseMousePositionRefReturn['getMousePosition'];
    /**
     * How much to adjust the progress color for hover effect
     * Only used when hoverColor is not provided
     * @default 0.15
     */
    hoverColorDelta?: number;
    /**
     * A function that returns whether the mouse is hovering over the waveform
     */
    getIsHovering: UseMousePositionRefReturn['getIsHovering'];
    /**
     * Color mode for the progress visualization
     * @default 'static'
     */
    colorMode?: AudioProgressColorMode;
    /**
     * Custom gradient stops for progressed bars when colorMode is 'gradient'
     * If not provided, stops will be generated based on progressColor and gradientLightnessDelta
     */
    gradientStops?: GradientStop[];
    /**
     * How much to adjust the lightness of the progress color for the gradient top
     * Positive values make it lighter, negative values make it darker
     * Only used when colorMode is 'gradient' and gradientStops are not provided
     * @default -0.15
     */
    gradientLightnessDelta?: number;
};
export type UseAudioWaveformProgressColorReturn = {
    colorFn: (segmentInfo: EnvelopeSegmentInfo) => ColorResult;
};
export declare function useAudioWaveformProgressColor(options: UseAudioWaveformProgressColorOptions): UseAudioWaveformProgressColorReturn;
export {};
