'use client';

import { type ElementType, type ComponentPropsWithRef } from 'react';
import { useAudioPlaylistContext } from '@lib/AudioPlaylistContextProvider';
import { AudioPlaylistExpandableContainerPrimitive } from './AudioPlaylistExpandableContainerPrimitive';

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
export function AudioPlaylistExpandableContainer<T extends ElementType = 'div'>(
  props: AudioPlaylistExpandableContainerProps<T>,
) {
  const { isPlaylistVisible } = useAudioPlaylistContext();

  return (
    <AudioPlaylistExpandableContainerPrimitive
      isExpanded={isPlaylistVisible}
      {...props}
    />
  );
}

export default AudioPlaylistExpandableContainer;
