import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist header component
 */
export type AudioPlaylistHeaderProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Header component for playlist with consistent styling
 */
export declare function AudioPlaylistHeader<T extends ElementType = 'div'>(props: AudioPlaylistHeaderProps<T>): import("react/jsx-runtime").JSX.Element;
