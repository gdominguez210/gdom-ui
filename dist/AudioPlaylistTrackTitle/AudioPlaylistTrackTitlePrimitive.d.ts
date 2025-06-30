import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist track title component
 */
export type AudioPlaylistTrackTitlePrimitiveProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Track title component specifically styled for playlist tracks
 */
export declare function AudioPlaylistTrackTitlePrimitive<T extends ElementType = 'span'>(props: AudioPlaylistTrackTitlePrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
