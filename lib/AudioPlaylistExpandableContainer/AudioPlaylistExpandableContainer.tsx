'use client';

import { useAudioPlaylistContext } from '@/lib/AudioPlaylistContextProvider';
import { AudioPlaylistExpandableContainerPrimitive } from './AudioPlaylistExpandableContainerPrimitive';
import { useComposedRefs } from '@/lib/useComposedRefs';
import { useAudioPlaylistExpandableContainer } from './useAudioPlaylistExpandableContainer';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

/**
 * Props for the context-connected expandable container component - same as primitive
 * but without the isExpanded prop which comes from context
 */
export type AudioPlaylistExpandableContainerProps = PolymorphicProps<'div'>;

/**
 * Container component that connects to AudioPlaylistContext and expands/collapses based on context state
 * This component is a client component as it uses React hooks and context
 */
const _AudioPlaylistExpandableContainer = (props: AudioPlaylistExpandableContainerProps) => {
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
};

_AudioPlaylistExpandableContainer.displayName = 'AudioPlaylistExpandableContainer';

export const AudioPlaylistExpandableContainer =
  _AudioPlaylistExpandableContainer as PolymorphicComponent<'div'>;
