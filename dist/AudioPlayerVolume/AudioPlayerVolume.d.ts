import { ComponentPropsWithRef, ElementType } from 'react';
/**
 * Props for the volume control component
 */
export type AudioPlayerVolumeProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
    /** Element to render as @default div */
    as?: T;
};
/**
 * Base container component for volume controls
 */
export declare function AudioPlayerVolume<T extends ElementType = 'div'>(props: AudioPlayerVolumeProps<T>): import("react/jsx-runtime").JSX.Element;
