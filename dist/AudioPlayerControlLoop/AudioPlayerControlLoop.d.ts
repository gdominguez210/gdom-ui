import { AudioPlayerControlLoopPrimitiveProps } from './AudioPlayerControlLoopPrimitive';
/**
 * Props for the loop control component
 */
export type AudioPlayerControlLoopProps = Omit<AudioPlayerControlLoopPrimitiveProps, 'active'>;
/**
 * Loop control component that integrates with the audio player context
 */
export declare function AudioPlayerControlLoop(props: AudioPlayerControlLoopProps): import("react/jsx-runtime").JSX.Element;
