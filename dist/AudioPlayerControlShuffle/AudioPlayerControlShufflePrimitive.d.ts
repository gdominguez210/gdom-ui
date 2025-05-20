import { ComponentPropsWithRef } from 'react';
/**
 * Props for the shuffle button primitive component
 */
export interface AudioPlayerControlShufflePrimitiveProps extends ComponentPropsWithRef<'button'> {
    /** Whether shuffle mode is currently active */
    active?: boolean;
}
/**
 * Base button component for toggling shuffle playback mode
 */
export declare function AudioPlayerControlShufflePrimitive(props: AudioPlayerControlShufflePrimitiveProps): import("react/jsx-runtime").JSX.Element;
