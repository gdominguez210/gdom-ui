import { ComponentPropsWithRef } from 'react';
/**
 * Props for the play/pause button primitive component
 */
export interface AudioPlayerControlPlayPrimitiveProps extends ComponentPropsWithRef<'button'> {
    /** Whether the audio is currently playing */
    active?: boolean;
}
/**
 * Button component that toggles between play and pause icons
 */
export declare function AudioPlayerControlPlayPrimitive(props: AudioPlayerControlPlayPrimitiveProps): import("react/jsx-runtime").JSX.Element;
