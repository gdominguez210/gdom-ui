'use client';

import { type ElementType, type ComponentPropsWithRef } from 'react';
import { useAudioPlaylistContext } from '@lib/AudioPlaylistContextProvider';
import { AudioPlaylistExpandableContainerPrimitive } from './AudioPlaylistExpandableContainerPrimitive';
import { useComposedRefs } from '@lib/useComposedRefs';
import { useAudioPlaylistExpandableContainer } from './useAudioPlaylistExpandableContainer';

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
  const { isPlaylistVisible, expandableContainerRef, toggleRef, togglePlaylist, id } =
    useAudioPlaylistContext();

  const composedRef = useComposedRefs(expandableContainerRef, props.ref);

  useAudioPlaylistExpandableContainer({
    isPlaylistVisible,
    containerRef: expandableContainerRef,
    toggleRef,
    onClose: togglePlaylist,
  });

  return (
    <AudioPlaylistExpandableContainerPrimitive
      aria-hidden={!isPlaylistVisible}
      id={id}
      ref={composedRef}
      isExpanded={isPlaylistVisible}
      {...props}
    />
  );
}

export default AudioPlaylistExpandableContainer;
