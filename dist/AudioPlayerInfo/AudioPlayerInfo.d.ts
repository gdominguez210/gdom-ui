import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the track information container component
 */
export type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Container component for displaying track information (image, title, artist)
 */
export declare function AudioPlayerInfo<T extends ElementType>(props: AudioPlayerInfoProps<T>): import("react/jsx-runtime").JSX.Element;
