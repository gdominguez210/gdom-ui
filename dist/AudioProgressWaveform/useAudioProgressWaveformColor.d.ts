import { RefObject } from 'react';
import { WaveformBarInfo, WaveformBarColorResult, WaveformGradientStop } from '../AudioWaveform/types';
import { useMousePositionRefReturn } from '../useMousePositionRef/useMousePositionRef';
import { UseElementDimensionsReturn } from '../useElementDimensions/useElementDimensions';
import { AudioProgressColorMode } from './types';
export type useAudioProgressWaveformColorOptions = {
    /**
     * The duration of the audio to visualize
     */
    duration: number;
    /**
     * The audio element to visualize
     */
    audioRef: RefObject<HTMLAudioElement>;
    /**
     * The dimensions of the waveform
     */
    dimensionsRef: UseElementDimensionsReturn['dimensionsRef'];
    /**
     * The color of the progress bar
     */
    progressColor?: string;
    /**
     * The color of the waveform bars
     */
    barColor?: string;
    /**
     * The color of the waveform bars when hovered
     */
    hoverColor?: string;
    /**
     * The relative position (value between 0 and 1) of the mouse on the waveform
     */
    hoverPositionRef?: useMousePositionRefReturn['positionRef'];
    /**
     * How much to adjust the progress color for hover effect
     * Only used when hoverColor is not provided
     * @default 0.15
     */
    hoverColorDelta?: number;
    /**
     * A function that returns whether the mouse is hovering over the waveform
     */
    getIsHovering?: useMousePositionRefReturn['getIsHovering'];
    /**
     * Color mode for the progress visualization
     * @default AUDIO_PROGRESS_COLOR_MODES.SOLID
     */
    colorMode?: AudioProgressColorMode;
    /**
     * Custom gradient stops for progressed bars when colorMode is 'gradient'
     * If not provided, stops will be generated based on progressColor and gradientLightnessDelta
     */
    gradientStops?: WaveformGradientStop[];
    /**
     * How much to adjust the lightness of the progress color for the gradient top
     * Positive values make it lighter, negative values make it darker
     * Only used when colorMode is 'gradient' and gradientStops are not provided
     * @default -0.15
     */
    gradientLightnessDelta?: number;
};
export type useAudioProgressWaveformColorReturn = {
    getWaveformBarColor: (barInfo: WaveformBarInfo) => WaveformBarColorResult;
};
export declare function useAudioProgressWaveformColor(options: useAudioProgressWaveformColorOptions): useAudioProgressWaveformColorReturn;
