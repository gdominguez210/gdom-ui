import { ElementType } from 'react';
import { AudioPlaylistExpandableContainerProps } from './AudioPlaylistExpandableContainer';
/**
 * Props for the expandable container primitive component
 */
export type AudioPlaylistExpandableContainerPrimitiveProps<T extends ElementType = 'div'> = AudioPlaylistExpandableContainerProps<T> & {
    isExpanded?: boolean;
};
/**
 * Primitive container component that can expand/collapse its content
 * This component is purely presentational and can be server-rendered
 */
export declare function AudioPlaylistExpandableContainerPrimitive<T extends ElementType = 'div'>(props: AudioPlaylistExpandableContainerPrimitiveProps<T>): import("react/jsx-runtime").JSX.Element;
