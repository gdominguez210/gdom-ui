import { AudioPlayerProgressBarProps } from './AudioPlayerProgressBar';
/**
 * Props for the progress bar component
 */
export type AudioPlayerProgressBarPrimitiveProps = AudioPlayerProgressBarProps & {
    previewPercentage?: number;
};
/**
 * Base component for displaying and styling the audio progress bar
 */
export declare function AudioPlayerProgressBarPrimitive(props: AudioPlayerProgressBarPrimitiveProps): import("react/jsx-runtime").JSX.Element;
