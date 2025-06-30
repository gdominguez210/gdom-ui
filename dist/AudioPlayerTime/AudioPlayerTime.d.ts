import { AudioPlayerTimePrimitiveProps } from './AudioPlayerTimePrimitive';
/**
 * Props for the time display component (current time and duration from context)
 */
export type AudioPlayerTimeProps = Omit<AudioPlayerTimePrimitiveProps, 'currentTime' | 'duration'>;
/**
 * Displays the current playback time and total duration from context
 */
export declare function AudioPlayerTime(props: AudioPlayerTimeProps): import("react/jsx-runtime").JSX.Element;
