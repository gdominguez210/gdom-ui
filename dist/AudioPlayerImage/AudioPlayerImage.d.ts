import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio track image component
 */
export type AudioPlayerImageProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
    /** Image width in pixels @default 96 */
    width?: number;
    /** Image height in pixels @default 96 */
    height?: number;
} & ComponentPropsWithRef<T>;
/**
 * Displays the thumbnail for the current audio track
 * Shows a placeholder icon if no thumbnail is available
 */
export declare function AudioPlayerImage<T extends ElementType = 'div'>(props: AudioPlayerImageProps<T>): import("react/jsx-runtime").JSX.Element;
