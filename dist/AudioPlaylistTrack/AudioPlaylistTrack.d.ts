import { ElementType, ComponentPropsWithRef } from 'react';
/**
 * Props for the audio playlist track component
 */
export type AudioPlaylistTrackProps<T extends ElementType = 'li'> = {
    /** Element to render as @default li */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Individual playlist track component
 */
export declare function AudioPlaylistTrack<T extends ElementType = 'li'>(props: AudioPlaylistTrackProps<T>): import("react/jsx-runtime").JSX.Element;
