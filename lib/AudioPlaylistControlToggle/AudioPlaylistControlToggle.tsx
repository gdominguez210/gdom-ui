'use client';

import { type MouseEventHandler, useCallback } from 'react';
import { useComposedRefs } from '@/lib/useComposedRefs';
import { useAudioPlaylistContext } from '@/lib/AudioPlaylistContextProvider';
import {
  AudioPlaylistControlTogglePrimitive,
  type AudioPlaylistControlTogglePrimitiveProps,
} from '@/lib/AudioPlaylistControlToggle/AudioPlaylistControlTogglePrimitive';

/**
 * Props for the playlist toggle component
 */
export type AudioPlaylistControlToggleProps = Omit<
  AudioPlaylistControlTogglePrimitiveProps,
  'active'
>;

/**
 * Toggle button for showing/hiding the audio playlist
 */
export function AudioPlaylistControlToggle(props: AudioPlaylistControlToggleProps) {
  const { onClick, ref, ...restProps } = props;
  const { isPlaylistVisible, togglePlaylist, toggleRef, id } = useAudioPlaylistContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick],
  );

  const composedRef = useComposedRefs(toggleRef, ref);

  return (
    <AudioPlaylistControlTogglePrimitive
      aria-label={isPlaylistVisible ? 'Hide playlist' : 'Show playlist'}
      aria-expanded={isPlaylistVisible}
      aria-controls={id}
      ref={composedRef}
      active={isPlaylistVisible}
      onClick={handleClick}
      {...restProps}
    />
  );
}
