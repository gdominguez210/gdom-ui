import { ElementType } from 'react';
import { AudioPlayerTitleProps } from './AudioPlayerTitle';
export type AudioPlayerTitlePrimitiveProps<T extends ElementType = 'span'> = AudioPlayerTitleProps<T>;
/**
 * Base component for displaying track title with appropriate styling
 */
export declare function AudioPlayerTitlePrimitive<T extends ElementType = 'span'>(props: AudioPlayerTitlePrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
