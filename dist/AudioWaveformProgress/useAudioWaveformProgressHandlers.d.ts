import { MouseEventHandler, RefObject } from 'react';
import { UseElementDimensionsReturn } from '../useElementDimensions/useElementDimensions';
export type UseAudioWaveformProgressHandlersOptions = {
    /**
     * The duration of the audio to visualize
     */
    duration: number;
    /**
     * The audio element to visualize
     */
    audioRef: RefObject<HTMLAudioElement>;
    /**
     * Callback fired when a seek operation is performed
     * @param time The time in seconds to seek to
     */
    onProgressChange?: (time: number) => void;
    /**
     * Callback fired when the mouse is over the waveform
     * @param time The time in seconds to preview
     */
    onPreviewTimeChange?: (time: number | null) => void;
    /**
     * A function that returns the element's dimensions
     */
    getElementDimensions: UseElementDimensionsReturn['getElementDimensions'];
};
export declare function useAudioWaveformProgressHandlers(options: UseAudioWaveformProgressHandlersOptions): {
    handleClick: MouseEventHandler;
    handleMouseMove: MouseEventHandler<HTMLCanvasElement>;
    handleMouseLeave: MouseEventHandler<HTMLCanvasElement>;
};
