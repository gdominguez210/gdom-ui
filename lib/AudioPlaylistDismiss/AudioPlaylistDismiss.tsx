'use client';

import { type MouseEventHandler, useCallback } from 'react';
import { useAudioPlaylistContext } from '@/lib/AudioPlaylistContextProvider';
import {
  AudioPlaylistDismissPrimitive,
  type AudioPlaylistDismissPrimitiveProps,
} from '@/lib/AudioPlaylistDismiss/AudioPlaylistDismissPrimitive';

/**
 * Props for the playlist dismiss component
 */
export type AudioPlaylistDismissProps = AudioPlaylistDismissPrimitiveProps;

/**
 * Dismiss button that integrates with the playlist toggle context
 */
export function AudioPlaylistDismiss(props: AudioPlaylistDismissProps) {
  const { className, onClick, ...restProps } = props;
  const { togglePlaylist } = useAudioPlaylistContext();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      togglePlaylist();
      onClick?.(e);
    },
    [togglePlaylist, onClick],
  );

  return (
    <AudioPlaylistDismissPrimitive
      aria-label="Close playlist"
      onClick={handleClick}
      className={className}
      {...restProps}
    />
  );
}
