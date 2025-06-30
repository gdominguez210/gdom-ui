import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist track primitive component
 */
export type AudioPlaylistTrackPrimitiveProps<T extends ElementType = 'li'> = {
    /** Element to render as @default li */
    as?: T;
    /** Whether the track is active */
    active?: boolean;
} & ComponentPropsWithRef<T>;
/**
 * Primitive component for rendering a single playlist track item
 */
export declare function AudioPlaylistTrackPrimitive<T extends ElementType = 'li'>(props: AudioPlaylistTrackPrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
