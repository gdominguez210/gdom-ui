import { ChangeEventHandler, MouseEventHandler, RefObject } from 'react';
interface UseAudioPlayerProgressBarProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    progressCssVariableName?: string;
    previewCssVariableName?: string;
    duration: number;
    isPlaying: boolean;
    onProgressChange: (time: number) => void;
    onPreviewTimeChange?: (time: number | null) => void;
    progressBarRef: RefObject<HTMLInputElement | null>;
}
/**
 * Custom hook for managing audio player progress bar
 * Handles progress bar value updates and animation
 */
export declare function useAudioPlayerProgressBar({ audioRef, progressCssVariableName, previewCssVariableName, duration, isPlaying, onProgressChange, onPreviewTimeChange, progressBarRef, }: UseAudioPlayerProgressBarProps): {
    handleProgressChange: ChangeEventHandler<HTMLInputElement>;
    handleMouseEnter: MouseEventHandler<HTMLInputElement>;
    handleMouseMove: MouseEventHandler<HTMLInputElement>;
    handleMouseOut: MouseEventHandler<HTMLInputElement>;
    elementRef: (node: Element | null) => void;
};
export {};
