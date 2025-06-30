import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist primitive component
 */
export type AudioPlaylistProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Base component for displaying a playlist of audio tracks, providing the essential markup
 */
export declare function AudioPlaylist<T extends ElementType = 'div'>(props: AudioPlaylistProps<T>): import("react/jsx-runtime").JSX.Element;
