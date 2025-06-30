import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
import { UseElementDimensionsReturn } from '../useElementDimensions/useElementDimensions';
export type UseAudioPlayerProgressBarProps = {
    audioRef: RefObject<HTMLAudioElement | null>;
    progressCssVariableName?: string;
    previewCssVariableName?: string;
    duration: number;
    isPlaying: boolean;
    onProgressChange: (time: number) => void;
    onPreviewTimeChange?: (time: number | null) => void;
    progressBarRef: RefObject<HTMLInputElement | null>;
};
export type UseAudioPlayerProgressBarReturn = {
    handleProgressChange: ChangeEventHandler<HTMLInputElement>;
    handleMouseEnter: MouseEventHandler<HTMLInputElement>;
    handleMouseMove: MouseEventHandler<HTMLInputElement>;
    handleMouseOut: MouseEventHandler<HTMLInputElement>;
    elementRef: UseElementDimensionsReturn['elementRef'];
};
/**
 * Custom hook for managing audio player progress bar
 * Handles progress bar value updates and animation
 */
export declare function useAudioPlayerProgressBar({ audioRef, progressCssVariableName, previewCssVariableName, duration, isPlaying, onProgressChange, onPreviewTimeChange, progressBarRef, }: UseAudioPlayerProgressBarProps): UseAudioPlayerProgressBarReturn;
