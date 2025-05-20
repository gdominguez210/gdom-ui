'use client';

import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  type RefObject,
  useCallback,
} from 'react';
import { useAudioPlayerContextTime } from '@/lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider';
import { useAudioPlayerPreviousTrack } from './useAudioPlayerPreviousTrack';
import { useAudioPlayerContextRefs } from '@/lib/AudioPlayerContextRefsProvider';
import { AudioPlayerControlPreviousPrimitive } from './AudioPlayerControlPreviousPrimitive';

export type AudioPlayerControlPreviousProps = ComponentPropsWithRef<'button'>;

/**
 * Previous track control button that integrates with the audio player context
 */
export function AudioPlayerControlPrevious(props: AudioPlayerControlPreviousProps) {
  const { onClick, ...restProps } = props;
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();

  const { handlePreviousTrack } = useAudioPlayerPreviousTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef: audioRef as RefObject<HTMLAudioElement>,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      handlePreviousTrack();
      onClick?.(e);
    },
    [handlePreviousTrack, onClick],
  );

  return (
    <AudioPlayerControlPreviousPrimitive
      onClick={handleClick}
      {...restProps}
    />
  );
}
