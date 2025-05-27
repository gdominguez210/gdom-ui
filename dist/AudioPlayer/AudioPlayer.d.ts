import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the audio player wrapper component
 */
export type AudioPlayerProps<T extends ElementType = 'div'> = {
    /** Element to render as
     * @default div
     * */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Base wrapper component for the audio player UI
 */
export declare function AudioPlayer<T extends ElementType>(props: AudioPlayerProps<T>): import("react/jsx-runtime").JSX.Element;
