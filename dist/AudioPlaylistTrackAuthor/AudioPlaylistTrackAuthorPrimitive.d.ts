import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist track author component
 */
export type AudioPlaylistTrackAuthorPrimitiveProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Track author component specifically styled for playlist tracks
 */
export declare function AudioPlaylistTrackAuthorPrimitive<T extends ElementType = 'span'>(props: AudioPlaylistTrackAuthorPrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
