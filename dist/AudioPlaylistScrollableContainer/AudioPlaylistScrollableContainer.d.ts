import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio playlist scrollable container component
 */
export type AudioPlaylistScrollableContainerProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
    /** Maximum height for the scrollable container */
    maxHeight?: string;
} & ComponentPropsWithRef<T>;
/**
 * A scrollable container component for audio playlist elements
 * Provides consistent custom scrollbar styling across browsers
 */
export declare function AudioPlaylistScrollableContainer<T extends ElementType = 'div'>(props: AudioPlaylistScrollableContainerProps<T>): import("react/jsx-runtime").JSX.Element;
export default AudioPlaylistScrollableContainer;
