import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the playback controls container
 */
export type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Base component for laying out audio player controls
 */
export declare function AudioPlayerControls<T extends ElementType>(props: AudioPlayerControlsProps<T>): import("react/jsx-runtime").JSX.Element;
