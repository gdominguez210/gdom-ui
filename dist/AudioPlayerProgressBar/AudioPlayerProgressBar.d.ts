import { ComponentPropsWithRef } from 'react';
import { UseKeyboardMediaSeekOptions } from '../useKeyboardMediaSeek/useKeyboardMediaSeek';
/**
 * Props for the progress bar component
 */
export type AudioPlayerProgressBarProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & Omit<UseKeyboardMediaSeekOptions, 'mediaRef' | 'duration'>;
/**
 * Progress bar that integrates with the audio player context for playback control
 */
export declare function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps): import("react/jsx-runtime").JSX.Element;
