import { AudioPlayerControlShufflePrimitiveProps } from './AudioPlayerControlShufflePrimitive';
/**
 * Props for the shuffle control component
 */
export type AudioPlayerControlShuffleProps = Omit<AudioPlayerControlShufflePrimitiveProps, 'active'>;
/**
 * Shuffle control component that integrates with the audio player context
 */
export declare function AudioPlayerControlShuffle(props: AudioPlayerControlShuffleProps): import("react/jsx-runtime").JSX.Element;
