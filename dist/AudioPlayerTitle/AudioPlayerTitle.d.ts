import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the track title component
 */
export type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
    /** Element to render as @default p */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Displays the title of the current audio track
 * Returns null if no title is available
 */
export declare function AudioPlayerTitle<T extends ElementType>(props: AudioPlayerTitleProps<T>): import("react/jsx-runtime").JSX.Element | null;
