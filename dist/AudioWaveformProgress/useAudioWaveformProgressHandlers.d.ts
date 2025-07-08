import { MouseEventHandler, RefObject } from 'react';
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
};
export declare function useAudioWaveformProgressHandlers(options: UseAudioWaveformProgressHandlersOptions): {
    canvasRef: (node: Element | null) => void;
    dimensionsRef: RefObject<import('../useElementDimensions/useElementDimensions').ElementDimensions>;
    handleClick: MouseEventHandler;
    handleMouseMove: MouseEventHandler<HTMLCanvasElement>;
    handleMouseLeave: MouseEventHandler<HTMLCanvasElement>;
};
