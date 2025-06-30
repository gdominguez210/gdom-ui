import { ElementType } from 'react';
import { AudioPlayerImageProps } from './AudioPlayerImage';
export type AudioPlayerImagePrimitiveProps<T extends ElementType = 'div'> = AudioPlayerImageProps<T> & {
    src: string;
    altText: string;
};
/**
 * Base component for displaying an audio track image or placeholder
 */
export declare function AudioPlayerImagePrimitive<T extends ElementType>(props: AudioPlayerImagePrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
