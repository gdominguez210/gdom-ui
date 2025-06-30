import { MouseEventHandler, RefObject } from 'react';
import { UseElementDimensionsReturn } from '../useElementDimensions/useElementDimensions';
import { useMousePositionRefReturn } from '../useMousePositionRef/useMousePositionRef';
export type useAudioProgressWaveformOptions = {
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
export type useAudioProgressWaveformReturn = {
    canvasRef: UseElementDimensionsReturn['elementRef'];
    dimensionsRef: UseElementDimensionsReturn['dimensionsRef'];
    handleWaveformClick: MouseEventHandler;
    handleWaveformMouseMove: MouseEventHandler<HTMLCanvasElement>;
    handleWaveformMouseLeave: MouseEventHandler<HTMLCanvasElement>;
    getPosition: useMousePositionRefReturn['getPosition'];
    getIsHovering: useMousePositionRefReturn['getIsHovering'];
    positionRef: useMousePositionRefReturn['positionRef'];
};
export declare function useAudioProgressWaveform(options: useAudioProgressWaveformOptions): useAudioProgressWaveformReturn;
