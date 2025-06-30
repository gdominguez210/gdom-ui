import { AudioPlayerControlPlayPrimitiveProps } from './AudioPlayerControlPlayPrimitive';
/**
 * Props for the play/pause control component
 */
export type AudioPlayerControlPlayProps = Omit<AudioPlayerControlPlayPrimitiveProps, 'active'>;
/**
 * Play/pause control component that integrates with the audio player context
 */
export declare function AudioPlayerControlPlay(props: AudioPlayerControlPlayProps): import("react/jsx-runtime").JSX.Element;
