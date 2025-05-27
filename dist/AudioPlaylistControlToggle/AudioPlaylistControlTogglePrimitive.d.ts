import { ComponentPropsWithRef } from 'react';
/**
 * Props for the playlist toggle button primitive component
 */
export type AudioPlaylistControlTogglePrimitiveProps = ComponentPropsWithRef<'button'> & {
    /** Whether the playlist is currently expanded/visible */
    active?: boolean;
};
/**
 * Button component for toggling playlist visibility
 */
export declare function AudioPlaylistControlTogglePrimitive(props: AudioPlaylistControlTogglePrimitiveProps): import("react/jsx-runtime").JSX.Element;
