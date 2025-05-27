import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the time display primitive component
 */
export type AudioPlayerTimePrimitiveProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Base component for displaying formatted audio playback time
 */
export declare function AudioPlayerTimePrimitive<T extends ElementType>(props: AudioPlayerTimePrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
