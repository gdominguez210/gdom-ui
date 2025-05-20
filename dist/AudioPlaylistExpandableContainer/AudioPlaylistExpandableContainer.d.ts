import { ElementType, ComponentPropsWithRef } from 'react';
/**
 * Props for the context-connected expandable container component - same as primitive
 * but without the isExpanded prop which comes from context
 */
export type AudioPlaylistExpandableContainerProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;
/**
 * Container component that connects to AudioPlaylistContext and expands/collapses based on context state
 * This component is a client component as it uses React hooks and context
 */
export declare function AudioPlaylistExpandableContainer<T extends ElementType = 'div'>(props: AudioPlaylistExpandableContainerProps<T>): import("react/jsx-runtime").JSX.Element;
export default AudioPlaylistExpandableContainer;
