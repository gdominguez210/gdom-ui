import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist tracks container component
 */
export type AudioPlaylistTracksProps<T extends ElementType = 'ul'> = {
    /** Element to render as @default ul */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Audio playlist tracks component for rendering the scrollable list of playlist tracks
 */
export declare function AudioPlaylistTracks<T extends ElementType = 'ul'>(props: AudioPlaylistTracksProps<T>): import("react/jsx-runtime").JSX.Element;
